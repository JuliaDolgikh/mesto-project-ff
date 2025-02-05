import { popupImage, captionPopup, imagePopup } from "./index.js";
import { openPopup } from "./modal.js";
// @todo: Функция создания и удаления карточки
export function createCard(cardData, deleteCard, likeCard, handleImageClick) {
  //  Темплейт карточек
  /* Находим шаблон карточек по id и сохраняем его содержимое в переменную cardTemplate, используем .content для доступа к содержимому */
  const cardTemplate = document.querySelector("#card-template").content;

  /* Клонируем шаблона карточки вместе с содержимым (cloneNode(true)) и записываем в переменную cardContent */
  const cardContent = cardTemplate.cloneNode(true);

  /* Находим карточку по селектору .card внутри клонированного шаблона, чтобы корректно работать с её элементами, сохраняем в переменную cardElement */
  const cardElement = cardContent.querySelector(".card");

  /* Находим элементы внутри склонированных карточек */

  const cardImage =
    cardElement.querySelector(".card__image"); /* изображение карточки */
  const cardTitle =
    cardElement.querySelector(".card__title"); /* заголовок карточки */

  const deleteButton = cardElement.querySelector(
    ".card__delete-button"
  ); /* кнопка удаления карточки */
  const likeButton =
    cardElement.querySelector(".card__like-button"); /* кнопка лайка карточки */

  /* Устанавливаем значение вложенных элементов */
  cardImage.src = cardData.link; /* задаем ссылки на изображения */
  cardTitle.textContent = cardData.name; /* задаем текст заголовка карточек */
  cardImage.alt =
    cardData.name; /* задаем альтернативный текст для изображения */

  deleteButton.addEventListener("click", () => deleteCard(cardElement));
  likeButton.addEventListener("click", () => likeCard(likeButton));
  cardImage.addEventListener("click", (evt) => {
    handleImageClick(evt);
  });

  /* Возвращаем готовую карточку */
  return cardElement;
}

// Функция удаления карточки

export function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция для лайка

export function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

export function handleImageClick(evt) {
  const imageSrc = evt.target.src;
  const imageAlt = evt.target.alt;

  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  captionPopup.textContent = imageAlt;

  openPopup(imagePopup);
}
