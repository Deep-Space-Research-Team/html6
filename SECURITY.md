# Security Policy

## Scope

HTML6 is an experimental educational prototype. It is not recommended for production workloads or for executing untrusted code.

## Important security model

PSC files execute as Python through Pyodide and may access browser objects exposed through the `js` package. This prototype does not provide a security sandbox for untrusted PSC files.

The engine loads Pyodide from a pinned CDN version and fetches PSC files from their configured URLs. A production deployment should add a carefully tested Content Security Policy, asset integrity and supply-chain controls, strict source-origin rules, and a documented update process.

## Reporting a vulnerability

Please do not publish exploitable details or private information in a public issue. Contact the project maintainer privately using the contact information in the repository profile. Include affected versions, impact, and reproducible steps where possible.
