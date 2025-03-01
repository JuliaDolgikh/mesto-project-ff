
/* Функция для открытия попапа */
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEsc);
}


/* Функция закрытия попапа */
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened"); // закрываем попап
  document.removeEventListener("keydown", closeEsc); // удаляем обработчик Esc
}

/* Функция закрытия по Escape */
export function closeEsc(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector('.popup_is-opened');
    if (activePopup) {
      closePopup(activePopup);
    }
  }
}

// Функция для обработчиков событий для конкретных попапов 
export const setCloseModalWindowEventListeners = (popup) => {
  if (!popup) return;

    // добавляем анимацию к каждому попапу
    popup.classList.add("popup_is-animated");

    // добавляем обработчик для оверлея (закрытие при клике на оверлей) 
    popup.addEventListener("click", (event) => {
      if (event.target === popup) {
        closePopup(popup);
      }
    });
    // обработчик закрытия по кнопке
  const closeButton = popup.querySelector(".popup__close");
  if (closeButton) {
    closeButton.addEventListener("click", () => closePopup(popup));
  }
};




