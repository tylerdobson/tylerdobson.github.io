"""Sync public-safe project media into the GitHub Pages portfolio.

The portfolio should not depend on cross-repository raw image URLs for its first
impression. This script copies known demo-safe screenshots/posters from sibling
project checkouts when available, or downloads them from the public GitHub repos.
It fails loudly if any expected media file is missing or empty.
"""

from __future__ import annotations

import shutil
import urllib.error
import urllib.request
from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
WORK_ROOT = ROOT.parent


@dataclass(frozen=True)
class MediaFile:
    source_repo: str
    source_path: str
    output_path: str

    @property
    def raw_url(self) -> str:
        return f"https://raw.githubusercontent.com/{self.source_repo}/main/{self.source_path}"


MEDIA_FILES = [
    MediaFile(
        "tylerdobson/mvp-for-a-decision-intelligence-lab",
        "assets/demo/hero.png",
        "assets/projects/retail-kpi/hero.png",
    ),
    MediaFile(
        "tylerdobson/mvp-for-a-decision-intelligence-lab",
        "assets/demo/dashboard-overview.png",
        "assets/projects/retail-kpi/dashboard-overview.png",
    ),
    MediaFile(
        "tylerdobson/mvp-for-a-decision-intelligence-lab",
        "assets/demo/forecasting-lab.png",
        "assets/projects/retail-kpi/forecasting-lab.png",
    ),
    MediaFile(
        "tylerdobson/mvp-for-a-decision-intelligence-lab",
        "assets/demo/demo-poster.png",
        "assets/projects/retail-kpi/demo-poster.png",
    ),
    MediaFile(
        "tylerdobson/Spotify-Analytics-",
        "assets/demo/hero.png",
        "assets/projects/spotify-analytics/hero.png",
    ),
    MediaFile(
        "tylerdobson/Spotify-Analytics-",
        "assets/demo/dashboard.png",
        "assets/projects/spotify-analytics/dashboard.png",
    ),
    MediaFile(
        "tylerdobson/Spotify-Analytics-",
        "assets/demo/workflow.png",
        "assets/projects/spotify-analytics/workflow.png",
    ),
    MediaFile(
        "tylerdobson/Spotify-Analytics-",
        "assets/demo/demo-poster.png",
        "assets/projects/spotify-analytics/demo-poster.png",
    ),
]


LOCAL_REPOS = {
    "tylerdobson/mvp-for-a-decision-intelligence-lab": WORK_ROOT / "mvp-for-a-decision-intelligence-lab",
    "tylerdobson/Spotify-Analytics-": WORK_ROOT / "Spotify-Analytics-",
}


def copy_or_download(media_file: MediaFile) -> Path:
    output_path = ROOT / media_file.output_path
    output_path.parent.mkdir(parents=True, exist_ok=True)

    local_repo = LOCAL_REPOS[media_file.source_repo]
    local_source = local_repo / media_file.source_path
    if local_source.exists():
        shutil.copyfile(local_source, output_path)
    else:
        try:
            with urllib.request.urlopen(media_file.raw_url, timeout=30) as response:
                output_path.write_bytes(response.read())
        except urllib.error.URLError as exc:
            raise SystemExit(f"Could not fetch {media_file.raw_url}: {exc}") from exc

    if not output_path.exists() or output_path.stat().st_size == 0:
        raise SystemExit(f"Synced media is missing or empty: {output_path}")
    return output_path


def main() -> None:
    synced = [copy_or_download(media_file) for media_file in MEDIA_FILES]
    for path in synced:
        print(f"synced {path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
