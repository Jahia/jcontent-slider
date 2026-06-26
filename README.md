# jContent - Slider

A Jahia module that adds a **slider** input to the Content Editor. It registers a
custom Content Editor `selectorType` named `Slider` (a Material-UI slider rendered
in React) and ships a sample content type, `jnt:sliderField`, that uses it.

## What it provides

| Piece | Detail |
|-------|--------|
| Content type | `jnt:sliderField` with a single `percent (long)` property (`src/main/resources/META-INF/definitions.cnd`) |
| Selector type | `Slider` — registered via `@jahia/ui-extender` (`src/javascript/.../SelectorTypes/SelectorTypes.js`) |
| Field binding | `jnt_sliderField.json` maps the `percent` field to `"selectorType": "Slider"` |
| Front-end view | `jnt_sliderField/html/sliderField.jsp` outputs the stored value |

## Range and behaviour

The slider uses the Material-UI defaults: **range 0–100, step 1**, which suit the
shipped `percent` (percentage) property. The component:

- reads the stored value as a string and coerces it with `parseFloat`; empty,
  `null`, `undefined` or non-numeric data default to `0`;
- writes the value back to the Content Editor as a **string** (the editor contract);
- renders read-only fields as a disabled slider that is removed from the keyboard
  tab order;
- derives its accessible name from the field label (`displayName`, falling back to
  the field `name`);
- shows the current value on interaction (`valueLabelDisplay="auto"`) and draws a
  high-contrast focus ring on the thumb.

> The range/step are not yet configurable per field. The selector is currently
> intended for percentage-style 0–100 values; a configurable range via
> `selectorOptions` is a possible future enhancement.

## Using the selector on your own content type

1. Add a numeric (`long`) property to your content type in its CND.
2. In your fieldset definition under
   `src/main/resources/META-INF/jahia-content-editor-forms/fieldsets/`, bind the
   property to the slider:
   ```json
   {
     "name": "your:nodeType",
     "fields": [
       {"name": "yourProperty", "selectorType": "Slider"}
     ]
   }
   ```
3. Deploy both modules. The property will render as a 0–100 slider in the Content
   Editor.

## Build & test

Requires JDK 17 and Maven; the frontend toolchain (Node + Yarn) is provisioned by
the build.

```bash
# Full build (Java + webpack bundle + OSGi packaging)
mvn clean install

# Frontend lint and tests (run from the module root)
yarn lint
yarn test          # Jest + @testing-library/react, with coverage (lcov for SonarQube)
```

JavaScript coverage is enforced at 80% (`jest.config.js`); framework bootstrap and
registration entrypoints are excluded from the coverage set as they are validated by
the build rather than by unit tests.

## Accessibility

The slider targets WCAG 2.2 AAA for what the component controls (accessible name,
keyboard operability, disabled-state semantics, enhanced focus appearance). A
unit-aware `aria-valuetext` and an `aria-labelledby` association with the editor's
visible label are deferred: both need metadata that the Content Editor `field`
contract does not currently expose to selector-type components. See `CHANGELOG.md`.

## Compatibility

Built against the `org.jahia.modules:jahia-modules` 8.2.1.0 parent (Jahia 8.2.x).
