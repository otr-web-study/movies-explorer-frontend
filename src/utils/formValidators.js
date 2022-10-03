import { useState, useEffect, useRef } from 'react';

export const useInputWithValidation = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [isRedacted, setIsRedacted] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState(true);

  const onChange = (evt) => {
    changeValue(evt.target.value);
    setIsValid(evt.target.validity.valid);
    setValidationMessage(evt.target.validationMessage);
  }

  const resetInput = () => {
    setValue(initialValue);
    setIsRedacted(false);
    setIsValid(true);
  }

  const changeValue = (newValue) => {
    setValue(newValue);
    setIsRedacted(true);
  }

  return {
    value,
    isValid,
    isRedacted,
    validationMessage,
    onChange,
    'setValue': changeValue,
    resetInput,
  }
}

export const useInputRefWithValidation = (initialValue) => {
  const ref = useRef(initialValue);
  const [isRedacted, setIsRedacted] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState(true);

  const onChange = (evt) => {
    setIsRedacted(true);
    setIsValid(evt.target.validity.valid);
    setValidationMessage(evt.target.validationMessage);
  }

  const resetInput = () => {
    ref.current.value = initialValue;
    setIsRedacted(false);
    setIsValid(true);
  }

  const checkValidity = () => {
    setIsRedacted(true);
    setIsValid(ref.current.validity.valid);
    setValidationMessage(ref.current.validationMessage);
  }

  return {
    ref,
    isValid,
    isRedacted,
    validationMessage,
    onChange,
    checkValidity,
    setIsRedacted,
    resetInput,
  }
}

export const useFormValid = (inputs) => {
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(!inputs.some((input) => !input.isRedacted || !input.isValid));
  }, inputs);

  return [isFormValid];
}
