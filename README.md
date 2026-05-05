# Tyler Dobson | Business Analytics & AI Portfolio

This repository powers my personal GitHub Pages portfolio website:

**Live site:** https://tylerdobson.github.io/

## Overview

This portfolio presents my analytics work as a **Business Analytics & AI Student at the University of South Florida**. It highlights internship-ready projects across Python, SQL, SQLite, Streamlit, Tableau, Plotly, API analytics, data cleaning, dashboarding, and business intelligence.

The site is designed as a professional hub for GitHub, LinkedIn, internship applications, and recruiter review.

## Selected Case Studies

### Retail KPI & Forecasting Sandbox

Streamlit analytics workflow that turns modeled retail operating data into KPIs, forecasts, scenario analysis, exports, and executive-style recommendations.

Finding: The recommendation engine flags low-margin, high-volume segments as a risk; one example action is to improve product economics before pushing more volume.

Repository: https://github.com/tylerdobson/mvp-for-a-decision-intelligence-lab

Validation notes: https://github.com/tylerdobson/mvp-for-a-decision-intelligence-lab/blob/main/docs/PORTFOLIO_PROOF.md

### Spotify Analytics Dashboard

Professional Streamlit dashboard for Spotify OAuth analytics, live playback context, top tracks and artists, local SQLite listening history, playlist workflows, demo-safe review, and data exports.

Finding: In May 2026, my saved Spotify history was led by Twizzlet (8 plays); the top repeated track appeared 4 times, turning the raw API feed into a repeat-listening pattern.

Repository: https://github.com/tylerdobson/Spotify-Analytics-

Validation notes: https://github.com/tylerdobson/Spotify-Analytics-/blob/main/docs/PORTFOLIO_PROOF.md

## Additional Featured Projects

### Airbnb Market Intelligence Dashboard

End-to-end short-term rental analytics project using Python, SQL, SQLite, Streamlit, and Plotly.

Repository: https://github.com/tylerdobson/airbnb-market-intelligence-dashboard

### SEC Financial Statement Pipeline

Reproducible Python ETL pipeline that pulls official SEC EDGAR company facts, standardizes financial metrics, and publishes CSV, SQLite, and Markdown outputs.

Repository: https://github.com/tylerdobson/sec-financial-statement-pipeline

### Canvas Assignment Calendar Agent

Python automation that reads Canvas assignments, finds incomplete work due today, and creates or updates Google Calendar due-time and reminder events.

Repository: https://github.com/tylerdobson/Canvas-Assignment-Calendar-Agent

### Sales Data Cleaning and Standardization

Python data-cleaning pipeline that standardizes messy retail sales exports, separates invalid records, and publishes cleaned outputs to CSV and SQLite.

Repository: https://github.com/tylerdobson/sales-data-cleaning-standardization

### SQL Retail Revenue Analysis

SQL project focused on retail revenue analysis, table creation, joins, aggregations, revenue by region, top customers, best-selling products, and monthly trends.

Repository: https://github.com/tylerdobson/sql-retail-revenue-analysis

### Tableau Forecasting and Discount Analysis

Executive-style Tableau dashboard project analyzing sales performance, discount behavior, profitability, and forecasting trends.

Repository: https://github.com/tylerdobson/tableau-forecasting-discount-analysis

### SQL Labor Market Intelligence

Warehouse-style SQL project focused on labor market and affordability reporting using dimension tables, fact tables, views, and quality checks.

Repository: https://github.com/tylerdobson/sql-labor-market-intelligence

### Job Application Quick-Fill

Small Python CLI for searching saved application answers, filling template variables, copying responses to the clipboard, and tracking usage.

Repository: https://github.com/tylerdobson/Job-Application-Quick-Fill

## Technical Stack

- SQL
- Python
- Pandas
- SQLite
- Streamlit
- Plotly
- Tableau
- Power BI
- Excel
- Spotipy / Spotify API
- GitHub Pages
- Data cleaning
- Dashboard design
- Business analytics

## Repository Structure

```text
tylerdobson.github.io/
|-- index.html
|-- README.md
|-- scripts/
|   |-- apply_portfolio_critique_fixes.py
|   `-- sync_project_media.py
`-- assets/
    |-- css/
    |   `-- styles.css
    |-- js/
    |   `-- main.js
    `-- projects/
```

## Local Maintenance

The Spotify case-study finding is generated from a private local Spotify Analytics export before publishing:

```powershell
python scripts/apply_portfolio_critique_fixes.py --spotify-db "C:\path\to\spotify_analytics.db"
```

or:

```powershell
python scripts/apply_portfolio_critique_fixes.py --spotify-csv "C:\path\to\listening_history.csv"
```

The script reads the local listening history, writes one public-facing finding sentence into `index.html` and `README.md`, and refuses to run if the finding still looks like a placeholder.

Public-safe case-study screenshots are synced into the Pages repo before publishing:

```powershell
python scripts/sync_project_media.py
```

## Contact

- GitHub: https://github.com/tylerdobson
- LinkedIn: https://www.linkedin.com/in/tylerdobson
- Email: tydobson41@gmail.com
