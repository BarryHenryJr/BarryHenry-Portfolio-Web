# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0](https://github.com/BarryHenryJr/BarryHenry-Portfolio-Web/compare/barryhenry-portfolio-web-v0.3.0...barryhenry-portfolio-web-v0.4.0) (2026-10-27)


### Features

* **experience:** show teaser-level detail for each position ([#35](https://github.com/BarryHenryJr/BarryHenry-Portfolio-Web/issues/35)) ([0ce928c](https://github.com/BarryHenryJr/BarryHenry-Portfolio-Web/commit/0ce928cc18606bf80fd7682a5b591c27cad3dd8f))

## [0.3.0](https://github.com/BarryHenryJr/BarryHenry-Portfolio-Web/compare/barryhenry-portfolio-web-v0.2.0...barryhenry-portfolio-web-v0.3.0) (2026-10-27)


### Features

* **overview:** show latest commits from public repos ([#32](https://github.com/BarryHenryJr/BarryHenry-Portfolio-Web/issues/32)) ([c671597](https://github.com/BarryHenryJr/BarryHenry-Portfolio-Web/commit/c6715970fa4a72bb1091517e17ec0c1ca6e6a3b0))
* **resume:** make the public resume a one-page teaser ([#34](https://github.com/BarryHenryJr/BarryHenry-Portfolio-Web/issues/34)) ([40f196e](https://github.com/BarryHenryJr/BarryHenry-Portfolio-Web/commit/40f196eb9db506add16d5abf192551e2bba8a27f))

## [0.2.0](https://github.com/BarryHenryJr/BarryHenry-Portfolio-Web/compare/barryhenry-portfolio-web-v0.1.2...barryhenry-portfolio-web-v0.2.0) (2026-10-26)


### Features

* **projects:** add case study pages and accessibility fixes ([#30](https://github.com/BarryHenryJr/BarryHenry-Portfolio-Web/issues/30)) ([5ad03b4](https://github.com/BarryHenryJr/BarryHenry-Portfolio-Web/commit/5ad03b48859d673b4bf037fb4379909b477f25ed))

## [0.1.2](https://github.com/BarryHenryJr/BarryHenry-Portfolio-Web/compare/barryhenry-portfolio-web-v0.1.1...barryhenry-portfolio-web-v0.1.2) (2026-10-26)


### Bug Fixes

* **deploy:** pin pnpm to 9.15.0 so Railway Docker build succeeds ([#26](https://github.com/BarryHenryJr/BarryHenry-Portfolio-Web/issues/26)) ([93a5674](https://github.com/BarryHenryJr/BarryHenry-Portfolio-Web/commit/93a5674c2e2877925f2cf047b6cf964a48c845ad))

## [0.1.1](https://github.com/BarryHenryJr/BarryHenry-Portfolio-Web/compare/barryhenry-portfolio-web-v0.1.0...barryhenry-portfolio-web-v0.1.1) (2026-01-09)


### Bug Fixes

* resolve Railway build failure by configuring Nixpacks ([20f92cf](https://github.com/BarryHenryJr/BarryHenry-Portfolio-Web/commit/20f92cfcfee0250b624a68ab16e2f75e61767815))
* resolve Railway build failure by configuring Nixpacks ([b58297d](https://github.com/BarryHenryJr/BarryHenry-Portfolio-Web/commit/b58297daacd49959fd0793b430fe25f74825aa86))
* specify Node.js 20 version for nixpacks ([6ef4503](https://github.com/BarryHenryJr/BarryHenry-Portfolio-Web/commit/6ef4503340db846b9bbece4e86c24bed426dac2c))
* switch to Dockerfile for reliable Railway builds ([6921706](https://github.com/BarryHenryJr/BarryHenry-Portfolio-Web/commit/69217066cd3d76a825b9bdcf674a3d78e852a47d))
* update nixpacks config to auto-detect Node.js and install pnpm ([5aabdd0](https://github.com/BarryHenryJr/BarryHenry-Portfolio-Web/commit/5aabdd0d11ca4c22be52348700f8cf4e23d0655c))

## [0.1.0] - 2026-01-09

### Added

- Initial portfolio website setup with Next.js
- Tech radar component for technology adoption tracking
- Contact form with validation
- Experience timeline component
- Projects showcase with animated grid
- Stack overview with technology grid
- Responsive design with Tailwind CSS
- CI/CD pipeline with GitHub Actions
- Automated releases with release-please
