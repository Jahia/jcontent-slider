# Changelog

All notable changes to the jContent Slider module are documented in this file.

## [Unreleased]

### Fixed
- `SliderField` no longer passes `readOnly` to the Material-UI `Slider` (not a valid prop) — a read-only field is now correctly `disabled`.
- The slider value is passed to Material-UI as a number (it arrived as a string), while the Content Editor `onChange` contract still stores a string.
- Removed a dead `valueText` state hook that was always empty.
- Replaced `SliderField.css`, which contained unrelated copy-paste rules (`.sec-html` / `section ol,ul`) that leaked global styles into the Content Editor, with a scoped rule.

### Accessibility
- The slider's accessible name now comes from the field label (`displayName`/`name`) instead of the meaningless hard-coded `aria-label="Default"`.

### Added
- ESLint configuration (`@jahia/eslint-config`) and a `lint` script; the codebase lints clean.
- First Jest test suite (`@testing-library/react`, 6 tests) for `SliderField` covering accessible name, numeric value, the string `onChange` contract, and the read-only/disabled state. JS coverage (lcov) wired for SonarQube.
