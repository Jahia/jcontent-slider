import React from 'react';
import * as PropTypes from 'prop-types';
import './SliderField.css';
import Slider from '@material-ui/core/Slider';

const SliderField = ({id, field, value, onChange}) => {
    // Value arrives as a string from the Content Editor; MUI Slider needs a number.
    // Guard against non-numeric / empty values (e.g. dirty JCR data) which would give NaN.
    const numericValue = Number(value);
    const sliderValue = Number.isFinite(numericValue) ? numericValue : 0;

    return (
        <Slider id={id}
                className="slider-field"
                name={field.name}
                disabled={field.readOnly}
                aria-label={field.displayName || field.name}
                valueLabelDisplay="auto"
                value={sliderValue}
                onChange={(event, newValue) => {
                    onChange(newValue.toString());
                }}
        />
    );
};

SliderField.propTypes = {
    field: PropTypes.shape({
        name: PropTypes.string.isRequired,
        displayName: PropTypes.string,
        readOnly: PropTypes.bool
    }).isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

SliderField.displayName = 'Slider';

export default SliderField;
