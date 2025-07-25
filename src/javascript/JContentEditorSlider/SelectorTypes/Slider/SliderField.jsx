import React, {useState} from 'react';
import * as PropTypes from 'prop-types';
import './SliderField.css';
import Slider from '@material-ui/core/Slider';

const SliderField = ({id, field, value, onChange}) => {
    const [valueText] = useState('');

    return (
        <Slider id={id}
                name={field.name}
                readOnly={field.readOnly}
                aria-label="Default"
                valueLabelDisplay="auto"
                value={valueText || value}
                onChange={(event, newValue) => {
                    onChange(newValue.toString());
                }}
        />
    );
};

SliderField.propTypes = {
    field: PropTypes.object,
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

SliderField.displayName = 'Slider';

export default SliderField;
