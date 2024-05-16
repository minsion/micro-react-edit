import './TextBox.less'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import * as appConstants from '../utils/app-constants';
import { isTextFieldValid } from '../utils/text-validation';

function Textbox({ label, id, type, name, tooltip, value, isRequired, regEx, validationMessage, defaultValue, onChange, saveEvent, ...props }) {
    const [lastErrorCheckedValue, setlastErrorCheckedValue] = useState();
    const [isFieldTouched, setIsFieldTouched] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [fieldErrorMessage, setFieldErrorMessage] = useState('');
    const [counterSaveEvent, setCounterSaveEvent] = useState(0);
    const [localTextValue, setLocalTextValue] = useState('');

    const inputRef = useRef();

    useMemo(() => {
        setLocalTextValue(value);
        if ( typeof validationMessage !== 'undefined' && validationMessage?.length > 0) {
            setFieldErrorMessage(validationMessage);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    // If another field changed the value, we need to validate the new value
    //const oldValue = usePrevious(value);
    useEffect(() => {
        if (value !== lastErrorCheckedValue) {
            handleValueChange(value);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    useEffect(() => {
        handleValueChange(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRequired, regEx, props.customValidationFunction])

    // Show errors on save event and focus
    useEffect(() => {
        if (saveEvent && saveEvent.counter > 0 && saveEvent.counter !== counterSaveEvent) {
            setIsFieldTouched(true);
            if (saveEvent.errorToFocus === id) {
                inputRef.current.focus();
                // Try again in case hidden
                setTimeout(() => inputRef.current.focus(), appConstants.SHOW_HIDE_PANEL_TRANSITION - 100);
            }
            setCounterSaveEvent(saveEvent.counter);
        } else if (saveEvent && saveEvent.counter === 0 && counterSaveEvent > 0) {
            setCounterSaveEvent(0);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [saveEvent])

    function handleInputChange(e) {
        setLocalTextValue(e.target.value);
    }

    function handleInputBlur(e) {
        setIsFieldTouched(true);
        if (e.target.value !== lastErrorCheckedValue) {
            handleValueChange(e.target.value)
        }
    }


    function handleValueChange(newValue) {
        if (newValue === undefined) {
            newValue = defaultValue || "";
        }
        let fieldValidationResult = isTextFieldValid(newValue, isRequired, regEx, validationMessage, props.customValidationFunction);
        setlastErrorCheckedValue(newValue);
        if (fieldValidationResult && typeof (fieldValidationResult.isValid) === 'boolean') {
            setIsValid(fieldValidationResult.isValid)
            if ( typeof validationMessage !== 'undefined' && validationMessage.length > 0 ) {
                setFieldErrorMessage(validationMessage);
            } else if (typeof (fieldValidationResult.validationMessage) !== 'undefined') {
                setFieldErrorMessage(fieldValidationResult.validationMessage);
            }
        }

        onChange && onChange(id, name, newValue, fieldValidationResult);
    }

    function currentOrDefaultValue() {
        if (typeof localTextValue !== 'undefined') {
            return localTextValue;
        } else {
            return defaultValue || "";
        }
    }

    function renderInputText() {
        if (type === 'textarea') {
            return <textarea ref={inputRef} id={id} data-fieldname={name} data-reg-ex-validation-message={validationMessage} value={currentOrDefaultValue()} onChange={handleInputChange}
                onBlur={handleInputBlur} maxLength={appConstants.TEMPLATE_FIELD_LENGTH_LIMIT} disabled={props.disabled} />
        } else {
            return <input ref={inputRef} id={id} data-fieldname={name} data-reg-ex-validation-message={validationMessage} value={currentOrDefaultValue()} onChange={handleInputChange}
                onBlur={handleInputBlur} maxLength={appConstants.TEMPLATE_FIELD_LENGTH_LIMIT} disabled={props.disabled} type="text" />
        }
    }

    return (
        <div className={"apdFieldGroup" + ((!isValid && isFieldTouched) ? " apdFieldError" : "")}>
            <label htmlFor={id} className={isRequired === 'true' ? "apdRequired" : null}>{label}</label>
            {tooltip?.length > 0 &&
                <i className="fas fa-info-circle tooltip" title={tooltip}></i>
            }
            {renderInputText()}
            <span className="apdFieldErrorText">{fieldErrorMessage}</span>
        </div>
    )
}

export default React.memo(Textbox)











