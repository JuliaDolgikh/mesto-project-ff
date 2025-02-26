
  // Функция показа ошибки
  export const showInputError = (form, input, errorMessage, settings) => {
    const errorElement = form.querySelector(`#${input.id}-error`);
    if (!errorElement) return;
  
    input.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  };
  
  // Функция скрытия ошибки
  export const hideInputError = (form, input, settings) => {
    const errorElement = form.querySelector(`#${input.id}-error`);
    if (!errorElement) return;
  
    input.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = "";
  };
  
  // Функция проверки инпутов на валидность 
  export const isValid = (form, input, settings) => {
    if (input.classList.contains("popup__input_type_url") && input.validity.typeMismatch) {
        // Проверяем, что это поле с URL и у него неправильный формат
        input.setCustomValidity(input.dataset.errorMessage || "Введите адрес сайта");
    } else if (input.validity.patternMismatch) {
      input.setCustomValidity(input.dataset.errorMessage || "Введите корректное значение");
    } else if (input.validity.valueMissing && !input.value.trim()) {
      input.setCustomValidity("Вы пропустили это поле");
    } else if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity(
        `Минимальное количество символов: ${input.minLength}. Длина символов сейчас: ${input.value.length}.`
      );
    } else {
      input.setCustomValidity("");
    }
  
    if (!input.validity.valid) {
      showInputError(form, input, input.validationMessage, settings);
    } else {
      hideInputError(form, input, settings);
    }
  };
  
  // Ищем, есть ли невалидный инпут 
  export const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((input) => {
          // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
  
      return !input.validity.valid;
    })
  };
  
  // Функция принимает массив полей ввода
  // и элемент кнопки, состояние которой нужно менять
  
  const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(settings.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(settings.inactiveButtonClass);
    }
  };
  
  // Добавляем обработчик на форму 
  export const setEventListeners = (form, settings) => {
    const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
    const buttonElement = form.querySelector(settings.submitButtonSelector);
  
    inputList.forEach((input) => {
      if (input.value.trim()) {
        isValid(form, input, settings);
      }
    });
  
    toggleButtonState(inputList, buttonElement, settings);
  
    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        isValid(form, input, settings);
        toggleButtonState(inputList, buttonElement, settings);
      });
    });
  
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      inputList.forEach((input) => isValid(form, input, settings));
      toggleButtonState(inputList, buttonElement, settings);
    });
  };
  
  //Включаем валидацию 
  export const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((form) => {
      setEventListeners(form, settings);
    });
  };
  
  
  // Очищаем ошибки валидации 
  export const clearValidationErrors = (form, settings) => {
    const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
    const buttonElement = form.querySelector(settings.submitButtonSelector);
  
    inputList.forEach((input) => {
      hideInputError(form, input, settings); // Очищаем ошибки
    });
  
    toggleButtonState(inputList, buttonElement, settings);
  };

  