export function isTextFieldValid(formFieldValue, isRequired, regEx, regExValidationMessage, customValidationFunction) {
  // is it required
  if (isRequired === 'true' && (!formFieldValue || formFieldValue.length < 1)) {
      return { "isValid": false, "validationMessage": "This field is required" }
  }

  // does it pass reg ex
  if (regEx && regEx.length > 0) {
      try {
          let regExTest = new RegExp(regEx);
          if (!regExTest.test(formFieldValue)) {
              return { "isValid": false, "validationMessage": regExValidationMessage };
          };
      } catch (error) {
          console.log('Regular Expression validation fail');
          return { "isValid": false, "validationMessage": "There was an error with validation (regular expression)" };
      }


  }

  // is passed in custom validation function valid
  if (typeof (customValidationFunction) === 'function') {
      let customValidationResult = customValidationFunction(formFieldValue);
      if (!customValidationResult.isValid) {
          return customValidationResult;
      }
  }

  return { "isValid": true, "validationMessage": "none" };
}