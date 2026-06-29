import React from 'react';
import PropTypes from 'prop-types';
import './SliderField.css';
import Slider from '@material-ui/core/Slider';

const SliderField = ({id, field, value, onChange}) => {
    // Value arrives as a string from the Content Editor; MUI Slider needs a number.
    // parseFloat (not Number) is used so that empty / null / undefined parse to NaN
    // and fall through to the 0 default — Number('') would silently coerce to 0 and
    // bypass the guard. Dirty JCR data (e.g. 'abc') is likewise defaulted to 0.
    const numericValue = parseFloat(value);
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
