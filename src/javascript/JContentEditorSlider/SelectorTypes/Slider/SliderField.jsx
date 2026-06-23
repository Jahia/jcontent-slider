import React from 'react';
import * as PropTypes from 'prop-types';
import './SliderField.css';
import Slider from '@material-ui/core/Slider';

const SliderField = ({id, field, value, onChange}) => {
    return (
        <Slider id={id}
                name={field.name}
                disabled={field.readOnly}
                aria-label={field.displayName || field.name}
                valueLabelDisplay="auto"
                value={value ? Number(value) : 0}
                onChange={(event, newValue) => {
                    onChange(newValue.toString());
                }}
        />
    );
};

SliderField.propTypes = {
    field: PropTypes.shape({
        name: PropTypes.string,
        displayName: PropTypes.string,
        readOnly: PropTypes.bool
    }).isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

SliderField.displayName = 'Slider';

export default SliderField;
