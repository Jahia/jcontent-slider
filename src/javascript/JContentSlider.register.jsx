import {registry} from '@jahia/ui-extender';
import {registerSelectorTypes} from './JContentEditorSlider/SelectorTypes';

export default function () {
    registerSelectorTypes(registry);
    console.debug('%c Content Editor - Slider is activated', 'color: #3c8cba');
}
