import SliderField from './Slider';

export const registerSelectorTypes = registry => {
    registry.add('selectorType', 'Slider', {cmp: SliderField, supportMultiple: false});
};
