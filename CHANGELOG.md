# Changelog

All notable changes to the jContent Slider module are documented in this file.

## [Unreleased]

### Fixed
- `SliderField` no longer passes `readOnly` to the Material-UI `Slider` (not a valid prop) — a read-only field is now correctly `disabled`.
- The slider value is passed to Material-UI as a number (it arrived as a string), while the Content Editor `onChange` contract still stores a string.
- Removed a dead `valueText` state hook that was always empty.
- Replaced `SliderField.css`, which contained unrelated copy-paste rules (`.sec-html` / `section ol,ul`) that leaked global styles into the Content Editor, with a scoped rule.
- Value coercion now uses `parseFloat` rather than `Number`, so empty / `null` / `undefined` values genuinely fall through to the documented `0` default (`Number('')` silently coerced to `0` and bypassed the guard).

### Accessibility
- The slider's accessible name now comes from the field label (`displayName`/`name`) instead of the meaningless hard-coded `aria-label="Default"`.
- Added a high-contrast two-tone focus ring on the slider thumb (WCAG 2.2 SC 2.4.12 Focus Appearance, enhanced); MUI v4's default translucent focus halo did not reliably meet the enhanced contrast/area requirements against the light Content Editor background.

### Added
- ESLint configuration (`@jahia/eslint-config`) and a `lint` script; the codebase lints clean.
- Jest test suite (`@testing-library/react`) for `SliderField` covering accessible name, numeric value, default-to-0 (empty / non-numeric / omitted), the string `onChange` contract, and the read-only/disabled state (`Mui-disabled` class + thumb removed from the keyboard tab order), plus a `registerSelectorTypes` registration test. JS coverage (lcov) wired for SonarQube with an 80% threshold (framework bootstrap/registration entrypoints excluded from the coverage set).

### Notes
- The slider announces its value as a bare number (`aria-valuenow`). A unit-aware `aria-valuetext` and an `aria-labelledby` association with the Content Editor's visible label are intentionally deferred: both require unit metadata / a label `id` that the Content Editor `field` contract does not currently expose to selector-type components.
