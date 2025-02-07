
/* Функция для открытия попапа */
export function openPopup(popup) {
  popup.classList.add("popup_is-opened"); // открываем попап
  document.addEventListener("keydown", closeEsc); // добавляем обработчик закрытия по Esc
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



