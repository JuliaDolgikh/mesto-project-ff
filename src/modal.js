import {
  profileTitle,
  profileDescription,
  editPopup,
  nameInput,
  jobInput,
  formNewCards,
  placeInput,
  linkInput,
  cardList,
  newCardPopup,
} from "./index.js";
import { createCard, deleteCard, likeCard, handleImageClick } from "./card.js";

/* Функция для открытия попапа */
export function openPopup(popup) {
  /* если попап открыт через editPopup  */
  if (popup === editPopup) {
    // Перед открытием заполняем форму данными из профиля
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  }
  popup.classList.remove("popup_is-animated"); // убираем анимацию закрытия
  popup.classList.add("popup_is-opened"); //добавляем анимацию закрытия
  popup.style.display = "flex";
  document.addEventListener("keydown", closeEsc); // добавляем обработчик Esc
}

/* Функция закрытия попапа */
export function closePopup(popup) {
  popup.classList.add("popup_is-animated"); // Добавляем анимацию закрытия
  setTimeout(() => {
    popup.classList.remove("popup_is-opened"); // удаляем открытие
  }, 1000);
  popup.style.display = "none";
  document.removeEventListener("keydown", closeEsc); // Удаляем обработчик Esc
}

/* Функция закрытия по Escape */
export function closeEsc(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector('.popup[style*="display: flex"]');
    if (openPopup) {
      closePopup(openPopup);
    }
  }
}

export function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  // Закрываем попап после сохранения
  closePopup(editPopup);
}

export function handleNewCardSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартное поведение формы

  // Создаем объект с данными карточки из введённых пользователем данных
  const newCardData = {
    name: placeInput.value,
    link: linkInput.value,
    alt: placeInput.value,
  };

  // Создаём новую карточку и добавляем её в начало списка
  const newCard = createCard(
    newCardData,
    deleteCard,
    likeCard,
    handleImageClick
  );
  cardList.prepend(newCard); // Добавляем карточку в начало списка

  // Очищаем форму
  formNewCards.reset();

  // Закрываем попап
  closePopup(newCardPopup);
}
