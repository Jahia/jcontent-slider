import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import SliderField from './SliderField';

const buildField = (overrides = {}) => ({
    name: 'percent',
    displayName: 'Completion percentage',
    readOnly: false,
    ...overrides
});

// In @material-ui/core v4 the element carrying role="slider" is the thumb
// <span>: it holds aria-valuenow / aria-label, and the disabled state is
// expressed via the Mui-disabled class (not a real disabled attribute). The
// slider is keyboard-driven, so a value change is simulated with arrow keys on
// the thumb rather than a change event on the hidden value input.

describe('SliderField', () => {
    it('renders a slider with the accessible name from field.displayName', () => {
        render(
            <SliderField
                id="myField"
                field={buildField()}
                value="40"
                onChange={() => {}}
            />
        );

        const slider = screen.getByRole('slider');
        expect(slider).toBeInTheDocument();
        expect(slider).toHaveAttribute('aria-label', 'Completion percentage');
    });

    it('falls back to field.name when displayName is absent', () => {
        render(
            <SliderField
                id="myField"
                field={buildField({displayName: undefined})}
                value="40"
                onChange={() => {}}
            />
        );

        expect(screen.getByRole('slider')).toHaveAttribute('aria-label', 'percent');
    });

    it('passes the value to the slider as a number', () => {
        render(
            <SliderField
                id="myField"
                field={buildField()}
                value="73"
                onChange={() => {}}
            />
        );

        expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '73');
    });

    it('defaults to 0 when value is empty', () => {
        render(
            <SliderField
                id="myField"
                field={buildField()}
                value=""
                onChange={() => {}}
            />
        );

        expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '0');
    });

    it('defaults to 0 when value is a non-numeric string', () => {
        render(
            <SliderField
                id="myField"
                field={buildField()}
                value="abc"
                onChange={() => {}}
            />
        );

        expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '0');
    });

    it('calls onChange with a STRING when the slider value changes', () => {
        const onChange = jest.fn();
        render(
            <SliderField
                id="myField"
                field={buildField()}
                value="40"
                onChange={onChange}
            />
        );

        // ArrowRight on the focused thumb increments the value by the step (1).
        const slider = screen.getByRole('slider');
        slider.focus();
        fireEvent.keyDown(slider, {key: 'ArrowRight', code: 'ArrowRight'});

        expect(onChange).toHaveBeenCalled();
        const arg = onChange.mock.calls[0][0];
        expect(typeof arg).toBe('string');
        expect(arg).toBe('41');
    });

    it('disables the slider when field.readOnly is true', () => {
        const {container} = render(
            <SliderField
                id="myField"
                field={buildField({readOnly: true})}
                value="40"
                onChange={() => {}}
            />
        );

        // MUI v4 expresses the disabled state via the Mui-disabled class on the
        // root and thumb rather than a native disabled attribute.
        expect(screen.getByRole('slider')).toHaveClass('Mui-disabled');
        expect(container.querySelector('.MuiSlider-root')).toHaveClass('Mui-disabled');
    });
});
