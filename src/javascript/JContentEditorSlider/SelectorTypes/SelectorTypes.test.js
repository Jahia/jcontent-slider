import {registerSelectorTypes} from './SelectorTypes';
import SliderField from './Slider';

describe('registerSelectorTypes', () => {
    it('registers the Slider selectorType with the SliderField component', () => {
        const registry = {add: jest.fn()};

        registerSelectorTypes(registry);

        expect(registry.add).toHaveBeenCalledTimes(1);
        expect(registry.add).toHaveBeenCalledWith(
            'selectorType',
            'Slider',
            {cmp: SliderField, supportMultiple: false}
        );
    });
});
