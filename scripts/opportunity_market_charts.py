"""
Opportunity Scout AI - market analysis chart generator.

Colab/local usage:
    pip install pandas matplotlib
    python scripts/opportunity_market_charts.py --input data/demo_market_data.csv --output reports/charts

Expected CSV columns:
    opportunity, sector, city, tam_usd, sam_usd, som_usd,
    competitors, comparable_price_usd, asking_price_usd,
    required_investment_usd, base_return_pct, downside_return_pct,
    risk_adjusted_score, data_quality_score
"""

from __future__ import annotations

import argparse
from pathlib import Path

import matplotlib.pyplot as plt
import pandas as pd


REQUIRED_COLUMNS = {
    "opportunity",
    "sector",
    "city",
    "tam_usd",
    "sam_usd",
    "som_usd",
    "competitors",
    "comparable_price_usd",
    "asking_price_usd",
    "required_investment_usd",
    "base_return_pct",
    "downside_return_pct",
    "risk_adjusted_score",
    "data_quality_score",
}


def load_data(input_path: Path) -> pd.DataFrame:
    data = pd.read_csv(input_path)
    missing = sorted(REQUIRED_COLUMNS - set(data.columns))
    if missing:
        raise ValueError(f"Missing required columns: {', '.join(missing)}")

    numeric_columns = list(REQUIRED_COLUMNS - {"opportunity", "sector", "city"})
    for column in numeric_columns:
        data[column] = pd.to_numeric(data[column], errors="coerce")

    data = data.dropna(subset=["opportunity", "tam_usd", "sam_usd", "som_usd"])
    if data.empty:
        raise ValueError("No usable rows after validation.")

    return data.sort_values("risk_adjusted_score", ascending=False)


def money_axis(axis: plt.Axes) -> None:
    axis.ticklabel_format(style="plain", axis="y")
    axis.set_ylabel("USD")


def save_market_size_chart(data: pd.DataFrame, output_dir: Path) -> None:
    top = data.head(8).set_index("opportunity")
    chart_data = top[["tam_usd", "sam_usd", "som_usd"]] / 1_000_000

    fig, ax = plt.subplots(figsize=(12, 7))
    chart_data.plot(kind="bar", ax=ax, color=["#183044", "#8EA58C", "#C9A45B"], width=0.78)
    ax.set_title("Market Size Range by Opportunity", fontsize=16, weight="bold", pad=16)
    ax.set_xlabel("")
    ax.set_ylabel("USD millions")
    ax.legend(["TAM", "SAM", "SOM"], frameon=False)
    ax.grid(axis="y", alpha=0.25)
    ax.set_xticklabels(ax.get_xticklabels(), rotation=30, ha="right")
    fig.tight_layout()
    fig.savefig(output_dir / "market_size_range.png", dpi=180)
    plt.close(fig)


def save_competitor_price_chart(data: pd.DataFrame, output_dir: Path) -> None:
    fig, ax = plt.subplots(figsize=(11, 7))
    scatter = ax.scatter(
        data["competitors"],
        data["asking_price_usd"] / 1_000_000,
        s=data["data_quality_score"] * 5,
        c=data["risk_adjusted_score"],
        cmap="viridis",
        alpha=0.82,
        edgecolor="#07121F",
        linewidth=0.7,
    )

    for _, row in data.iterrows():
        ax.annotate(row["city"], (row["competitors"], row["asking_price_usd"] / 1_000_000), xytext=(6, 5), textcoords="offset points", fontsize=9)

    ax.set_title("Competitor Density vs Asking Price", fontsize=16, weight="bold", pad=16)
    ax.set_xlabel("Competitors identified")
    ax.set_ylabel("Asking price, USD millions")
    ax.grid(alpha=0.25)
    colorbar = fig.colorbar(scatter, ax=ax)
    colorbar.set_label("Risk-adjusted score")
    fig.tight_layout()
    fig.savefig(output_dir / "competitor_price_map.png", dpi=180)
    plt.close(fig)


def save_ranking_chart(data: pd.DataFrame, output_dir: Path) -> None:
    top = data.head(10).sort_values("risk_adjusted_score")
    labels = top["opportunity"]

    fig, ax = plt.subplots(figsize=(12, 7))
    ax.barh(labels, top["risk_adjusted_score"], color="#C9A45B", label="Risk-adjusted score")
    ax.scatter(top["base_return_pct"], labels, color="#8EA58C", label="Base return %", zorder=3)
    ax.scatter(top["downside_return_pct"], labels, color="#D86C4A", label="Downside return %", zorder=3)
    ax.set_title("Opportunity Ranking and Return Scenarios", fontsize=16, weight="bold", pad=16)
    ax.set_xlabel("Score or return percentage")
    ax.grid(axis="x", alpha=0.25)
    ax.legend(frameon=False)
    fig.tight_layout()
    fig.savefig(output_dir / "ranking_return_scenarios.png", dpi=180)
    plt.close(fig)


def write_summary(data: pd.DataFrame, output_dir: Path) -> None:
    summary = data[
        [
            "opportunity",
            "sector",
            "city",
            "tam_usd",
            "sam_usd",
            "som_usd",
            "competitors",
            "asking_price_usd",
            "risk_adjusted_score",
            "data_quality_score",
        ]
    ].copy()
    summary.to_csv(output_dir / "analysis_summary.csv", index=False)


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate Opportunity Scout AI market analysis charts.")
    parser.add_argument("--input", required=True, type=Path, help="CSV file with opportunity market data.")
    parser.add_argument("--output", default=Path("reports/charts"), type=Path, help="Output folder for charts.")
    args = parser.parse_args()

    args.output.mkdir(parents=True, exist_ok=True)
    data = load_data(args.input)

    save_market_size_chart(data, args.output)
    save_competitor_price_chart(data, args.output)
    save_ranking_chart(data, args.output)
    write_summary(data, args.output)

    print(f"Generated charts in: {args.output.resolve()}")
    print("- market_size_range.png")
    print("- competitor_price_map.png")
    print("- ranking_return_scenarios.png")
    print("- analysis_summary.csv")


if __name__ == "__main__":
    main()
