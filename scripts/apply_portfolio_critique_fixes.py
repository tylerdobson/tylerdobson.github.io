"""Apply deterministic portfolio critique copy fixes and Spotify insight.

Usage:
    python scripts/apply_portfolio_critique_fixes.py --spotify-db "C:/path/to/spotify.db"
    python scripts/apply_portfolio_critique_fixes.py --spotify-csv "C:/path/to/listening_history.csv"
    python scripts/apply_portfolio_critique_fixes.py --spotify-finding "Finding: Your real Spotify insight here."

The script intentionally refuses to run with a placeholder Spotify finding. When
given a CSV or SQLite database, it computes a concise public-facing insight from
saved listening history and replaces the Spotify finding placeholder in both
index.html and README.md.
"""

from __future__ import annotations

import argparse
import csv
import re
import sqlite3
from collections import Counter, defaultdict
from datetime import datetime
from pathlib import Path
from typing import Iterable


ROOT = Path(__file__).resolve().parents[1]
INDEX_PATH = ROOT / "index.html"
README_PATH = ROOT / "README.md"
SPOTIFY_PLACEHOLDER_BODY = (
    "Replace this sentence with Tyler's real Spotify insight before publishing, "
    "such as a measured genre shift, most-played hour, or new-artist discovery pattern."
)
SPOTIFY_README_PLACEHOLDER = f"Finding: {SPOTIFY_PLACEHOLDER_BODY}"
SPOTIFY_HTML_PLACEHOLDER = f"<strong>Finding:</strong> {SPOTIFY_PLACEHOLDER_BODY}"

REPLACEMENTS = {
    "Decision Intelligence Lab": "Retail KPI & Forecasting Sandbox",
    "Flagship Case Studies": "Selected Case Studies",
    "Flagship | ": "",
    "portfolio-grade ": "",
    "portfolio proof": "validation",
    "professional proof": "validation",
    "Proof notes": "Validation notes",
    "synthetic business data": "modeled retail operating data",
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    source = parser.add_mutually_exclusive_group(required=True)
    source.add_argument("--spotify-db", type=Path, help="SQLite database containing a listening_history table.")
    source.add_argument("--spotify-csv", type=Path, help="CSV export containing Spotify listening history.")
    source.add_argument("--spotify-finding", help="Manually supplied real Spotify finding sentence.")
    return parser.parse_args()


def require_real_spotify_finding(finding: str) -> str:
    finding = finding.strip()
    if not finding:
        raise SystemExit("Spotify finding cannot be empty.")

    if not finding.startswith("Finding:"):
        finding = f"Finding: {finding}"

    lower = finding.lower()
    forbidden = ("replace this sentence", "placeholder", "your real spotify insight")
    if any(term in lower for term in forbidden):
        raise SystemExit("Spotify finding still looks like a placeholder.")

    return finding


def read_history_from_db(path: Path) -> list[dict[str, str]]:
    if not path.exists():
        raise SystemExit(f"Spotify database not found: {path}")
    with sqlite3.connect(path) as conn:
        conn.row_factory = sqlite3.Row
        tables = {
            row["name"]
            for row in conn.execute("SELECT name FROM sqlite_master WHERE type='table'")
        }
        if "listening_history" not in tables:
            raise SystemExit("SQLite database does not contain a listening_history table.")
        rows = conn.execute(
            """
            SELECT played_at, track_id, track_name, artist_name, duration_ms, popularity
            FROM listening_history
            WHERE played_at IS NOT NULL
            ORDER BY played_at
            """
        ).fetchall()
    return [dict(row) for row in rows]


def read_history_from_csv(path: Path) -> list[dict[str, str]]:
    if not path.exists():
        raise SystemExit(f"Spotify CSV not found: {path}")
    with path.open("r", encoding="utf-8-sig", newline="") as handle:
        rows = list(csv.DictReader(handle))
    if not rows:
        raise SystemExit("Spotify CSV has no rows.")
    required = {"played_at", "track_name", "artist_name"}
    missing = required - set(rows[0])
    if missing:
        raise SystemExit(f"Spotify CSV is missing required columns: {', '.join(sorted(missing))}")
    return rows


def parse_played_at(value: object) -> datetime | None:
    if value is None:
        return None
    text = str(value).strip()
    if not text:
        return None
    if text.endswith("Z"):
        text = text[:-1] + "+00:00"
    try:
        return datetime.fromisoformat(text)
    except ValueError:
        pass
    for fmt in ("%Y-%m-%d %H:%M:%S", "%Y-%m-%d %H:%M:%S.%f", "%Y-%m-%d"):
        try:
            return datetime.strptime(text, fmt)
        except ValueError:
            continue
    return None


def to_int(value: object) -> int:
    try:
        return int(float(str(value)))
    except (TypeError, ValueError):
        return 0


def most_common(counter: Counter[str]) -> tuple[str, int]:
    if not counter:
        return ("unknown", 0)
    return counter.most_common(1)[0]


def month_label(month_key: str) -> str:
    try:
        return datetime.strptime(month_key, "%Y-%m").strftime("%B %Y")
    except ValueError:
        return month_key


def build_spotify_finding(rows: Iterable[dict[str, object]]) -> str:
    parsed: list[dict[str, object]] = []
    for row in rows:
        played_at = parse_played_at(row.get("played_at"))
        artist = str(row.get("artist_name") or "").strip()
        track = str(row.get("track_name") or "").strip()
        if played_at is None or not artist or not track:
            continue
        parsed.append(
            {
                "played_at": played_at,
                "artist_name": artist,
                "track_name": track,
                "duration_ms": to_int(row.get("duration_ms")),
            }
        )

    if len(parsed) < 10:
        raise SystemExit("Need at least 10 valid listening-history rows to generate a credible finding.")

    by_month: dict[str, list[dict[str, object]]] = defaultdict(list)
    artist_counts: Counter[str] = Counter()
    track_counts: Counter[str] = Counter()
    hour_counts: Counter[str] = Counter()
    total_minutes = 0.0

    for row in parsed:
        played_at = row["played_at"]
        assert isinstance(played_at, datetime)
        month = played_at.strftime("%Y-%m")
        by_month[month].append(row)
        artist_counts[str(row["artist_name"])] += 1
        track_counts[str(row["track_name"])] += 1
        hour_counts[str(played_at.hour)] += 1
        total_minutes += int(row["duration_ms"]) / 60000

    months = sorted(by_month)
    latest_month = months[-1]
    latest_rows = by_month[latest_month]
    latest_artists = Counter(str(row["artist_name"]) for row in latest_rows)
    latest_tracks = Counter(str(row["track_name"]) for row in latest_rows)
    latest_top_artist, latest_top_artist_plays = most_common(latest_artists)
    latest_top_track, latest_top_track_plays = most_common(latest_tracks)

    if len(months) >= 2:
        previous_month = months[-2]
        previous_unique = len({str(row["artist_name"]) for row in by_month[previous_month]})
        latest_unique = len(latest_artists)
        if latest_unique != previous_unique:
            direction = "expanded" if latest_unique > previous_unique else "narrowed"
            return (
                "Finding: My saved Spotify history shows my listening breadth "
                f"{direction} from {previous_unique} to {latest_unique} unique artists between "
                f"{month_label(previous_month)} and {month_label(latest_month)}; "
                f"the leading artist in the latest month had {latest_top_artist_plays} plays."
            )

    top_hour, top_hour_plays = most_common(hour_counts)
    top_artist, top_artist_plays = most_common(artist_counts)
    top_track, top_track_plays = most_common(track_counts)

    if latest_top_track_plays >= 2:
        return (
            f"Finding: In {month_label(latest_month)}, my saved Spotify history showed a repeat-listening pattern: "
            f"the leading artist had {latest_top_artist_plays} plays, and the top repeated track "
            f"appeared {latest_top_track_plays} times, turning the raw API feed into a "
            "repeat-listening pattern."
        )

    return (
        f"Finding: Across {len(parsed)} saved Spotify plays ({round(total_minutes / 60, 1)} hours), "
        f"the dashboard surfaced {len(artist_counts)} unique artists; the leading artist had "
        f"{top_artist_plays} plays and {int(top_hour):02d}:00 was the most common listening hour "
        f"with {top_hour_plays} plays."
    )


def replace_once(text: str, before: str, after: str, path: Path) -> str:
    if before not in text:
        raise SystemExit(f"Expected phrase not found in {path.name}: {before!r}")
    return text.replace(before, after)


def replace_spotify_finding(text: str, spotify_finding: str, path: Path) -> str:
    if path == INDEX_PATH:
        html_finding = spotify_finding.replace("Finding:", "<strong>Finding:</strong>", 1)
        if SPOTIFY_HTML_PLACEHOLDER in text:
            return replace_once(text, SPOTIFY_HTML_PLACEHOLDER, html_finding, path)

        pattern = re.compile(
            r"(<h3>Spotify Analytics Dashboard</h3>.*?<p class=\"finding\">)(.*?)(</p>)",
            re.DOTALL,
        )
        updated, count = pattern.subn(lambda match: f"{match.group(1)}{html_finding}{match.group(3)}", text, count=1)
        if count != 1:
            raise SystemExit(f"Spotify finding block not found in {path.name}.")
        return updated

    if SPOTIFY_README_PLACEHOLDER in text:
        return replace_once(text, SPOTIFY_README_PLACEHOLDER, spotify_finding, path)

    pattern = re.compile(
        r"(### Spotify Analytics Dashboard\s+.*?\n\nFinding: ).*?(\n\nRepository:)",
        re.DOTALL,
    )
    updated, count = pattern.subn(lambda match: f"{match.group(1)}{spotify_finding.removeprefix('Finding: ').strip()}{match.group(2)}", text, count=1)
    if count != 1:
        raise SystemExit(f"Spotify README finding not found in {path.name}.")
    return updated


def main() -> None:
    args = parse_args()
    if args.spotify_db:
        spotify_finding = build_spotify_finding(read_history_from_db(args.spotify_db))
    elif args.spotify_csv:
        spotify_finding = build_spotify_finding(read_history_from_csv(args.spotify_csv))
    else:
        spotify_finding = require_real_spotify_finding(args.spotify_finding)

    files = {
        INDEX_PATH: INDEX_PATH.read_text(encoding="utf-8"),
        README_PATH: README_PATH.read_text(encoding="utf-8"),
    }

    updated: dict[Path, str] = {}
    for path, text in files.items():
        new_text = text
        for before, after in REPLACEMENTS.items():
            if before in new_text:
                new_text = new_text.replace(before, after)
        new_text = replace_spotify_finding(new_text, spotify_finding, path)
        updated[path] = new_text

    index_text = updated[INDEX_PATH]
    readme_text = updated[README_PATH]
    combined = f"{index_text}\n{readme_text}"

    checks = {
        "Retail KPI & Forecasting Sandbox": "renamed retail project",
        "Finding:": "finding sentences",
        "Selected Case Studies": "case study heading",
        "Validation notes": "validation CTA",
    }
    for needle, label in checks.items():
        if needle not in combined:
            raise SystemExit(f"Missing {label}: {needle!r}")

    banned = ("Flagship", "portfolio proof", "synthetic business data", "Try it live")
    for phrase in banned:
        if phrase in combined:
            raise SystemExit(f"Banned phrase still present: {phrase!r}")

    if index_text.index("Additional Projects") > index_text.index("How I Work"):
        raise SystemExit("How I Work must appear after Additional Projects.")

    for path, text in updated.items():
        path.write_text(text, encoding="utf-8", newline="\n")


if __name__ == "__main__":
    main()
