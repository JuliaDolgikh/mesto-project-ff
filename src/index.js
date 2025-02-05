import "./pages/index.css"; // импорт главного файла стилей
import { initialCards } from "./cards.js";
const logoImage = new URL("./images/logo.svg", import.meta.url);
const avatarImage = new URL("./images/avatar.jpg", import.meta.url);
import { createCard, deleteCard, likeCard, handleImageClick } from "./card.js";
import {
  handleFormSubmit,
  handleNewCardSubmit,
  openPopup,
  closePopup,
  closeEsc,
} from "./modal.js";

const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: "Praktikum", link: logoImage },
  { name: "Kysto", link: avatarImage },
];

/* Находим в шаблоне контейнер, где будут сохраняться карточки, и записываем ссылку на него в переменную cardList */
export const cardList = document.querySelector(".places__list");

/* Перебираем массив карточек initialCard: на каждой итерации создаются новые карточки с помощью createCard, их сохраняем в переменную cardContent. Созданные карточки добавляем в конец контейнер cardList */

initialCards.forEach(function (cardData) {
  const cardContent = createCard(
    cardData,
    deleteCard,
    likeCard,
    handleImageClick
  );
  cardList.append(cardContent);
});

// Находим попапы //
export const editPopup = document.querySelector(".popup_type_edit");
export const imagePopup = document.querySelector(".popup_type_image");
export const newCardPopup = document.querySelector(".popup_type_new-card");

// Находим кнопки, которые открывают попапы //
const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");

// Находим форму редактирования в DOM
const formElement = document.forms["edit-profile"];
// Находим поля формы в DOM
export const nameInput = formElement.elements.name;
export const jobInput = formElement.elements.description;

// Находим значения, которые будут подставляться в форму редактирования //
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);

// Находим форму добавления карточки в DOM
export const formNewCards = document.forms["new-place"];
// Находим поля формы в DOM
export const placeInput = formNewCards.elements["place-name"];
export const linkInput = formNewCards.elements.link;

// Находим попап, который отвечает за картинки карточек и сами картинки //
export const popupImage = document.querySelector(".popup__image");
export const captionPopup = document.querySelector(".popup__caption");

/* Открытие попапа при клике по кнопке редактирования */
editButton.addEventListener("click", function () {
  openPopup(editPopup);
});

/* Находим все попапы */
const popups = document.querySelectorAll(".popup");
/* Находим кнопку закрытия попапа, который будет реализован по клику */
const closePopupButtons = document.querySelectorAll(".popup__close");

closePopupButtons.forEach((button) => {
  button.addEventListener("click", function (evt) {
    const popup = button.closest(".popup");
    popup.style.display = "none";
  });
});

/* Реализуем закрытие всех попапов при клике на оверлей */
popups.forEach((popup) => {
  popup.addEventListener("click", function (evt) {
    // Проверяем, что клик был именно на оверлей, а не на содержимое
    if (evt.target === popup) {
      popup.style.display = "none";
    }
  });
});

/* Открываем попап для новой карточки по клику на + */
addButton.addEventListener("click", function () {
  placeInput.value = "";
  linkInput.value = "";
  openPopup(newCardPopup);
});

// Добавляем обработчик на отправку формы
formNewCards.addEventListener("submit", handleNewCardSubmit);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);
