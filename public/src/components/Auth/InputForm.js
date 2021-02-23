import React from 'react';
import PropTypes from 'prop-types';
import IconInput from './IconInput';

const InputForm = ( { error, handleChange, icon, name, placeholder, type, value } ) => {
    return (
        <div className="form-group mb-2">
            <div className="row d-flex align-items-end">
                <IconInput
                    error={ error }
                    icon={ icon }
                />

                <div className="col-11 p-0">
                    <input
                        className={ `form-control ${ error ? 'invalid-input' : 'normal-input' }` }
                        name={ name }
                        placeholder={ placeholder }
                        onChange={ handleChange }
                        type={ type }
                        value={ value }
                    />
                </div>
            </div>
        </div>
    );
};

InputForm.propTypes = {
    error: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
};

export default InputForm;
