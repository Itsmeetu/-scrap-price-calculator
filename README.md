# Scrap Price Calculator

A small, free, open-source calculator for scrap traders to estimate delivered cost, freight per metric ton, margin and credit financing cost. Runs locally in a browser without accounts, dependencies, analytics or a backend.

## Status

Version 0.1.0: initial prototype. No external users, downloads, dependents or community contributions have been established or verified. This repository alone does not establish eligibility for any sponsorship program.

## Try it

Download and extract the project, then open `index.html` in a modern browser. Keep `calculator.js` and `app.js` in the same folder. On iPhone, a hosted version is more convenient than opening local files.

For local development, run `python3 -m http.server 8000` from the project folder and open http://localhost:8000.

## Features

- Quantity in metric tons; prices per kg in INR.
- Full-load freight and additional costs.
- Simple-interest financing for configurable credit periods.
- Profit, loss, break-even and margin on sales.
- Customer quotation download that omits internal purchase costs and margins.
- Responsive interface and offline operation.

## Calculation example

Illustrative inputs: 10 metric tons at ₹30/kg, ₹20,000 freight and ₹2,000 other costs. Delivered cost is ₹322,000, or ₹32.20/kg. At ₹35/kg with immediate payment, estimated profit is ₹28,000 and margin on sales is 8%. With 14 days credit at 12% annual interest, financing is approximately ₹1,482.08 and break-even is approximately ₹32.3482/kg. Display values are rounded; calculations use unrounded values.

Financing = delivered cost × annual percentage rate / 100 × credit days / 365. No compounding. GST, defaults, weight loss and unentered expenses are excluded. This is an estimate, not tax, lending or accounting advice. The app does not supply market prices.

## Tests

With Node.js 18 or newer: `npm test`. No package installation required.

## Publish under itsmeetu

Suggested repository name: `scrap-price-calculator`. This is a suggestion, not an existing or verified repository.

1. Create a public repository on your GitHub account, with no generated files.
2. Upload the extracted files at the repository root, including LICENSE, README and tests.
3. Optionally enable GitHub Pages using the current GitHub Pages documentation, serving the root of the default branch.
4. Test the live calculator, then invite users to report real problems and suggestions.

Never upload supplier lists, customer contact details, bank data or private business records. This package contains sample data only.

## Contribute

See CONTRIBUTING.md. Useful next improvements include Hindi labels, transport comparison, automated browser tests and user-tested accessibility improvements. Contributions should solve real user needs; do not create artificial activity, stars or pull requests for eligibility metrics.

## License

MIT. See LICENSE.
