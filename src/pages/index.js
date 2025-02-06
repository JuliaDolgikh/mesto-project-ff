import "./index.css"; // импорт главного файла стилей
import { initialCards } from "../components/cards.js";
const logoImage = new URL("../images/logo.svg", import.meta.url);
const avatarImage = new URL("../images/avatar.jpg", import.meta.url);
import { createCard, deleteCard, likeCard, handleImageClick } from "../components/card.js";
import {
  handleFormSubmit,
  handleNewCardSubmit,
  openPopup,
  closePopup,
  closeEsc,
} from "../components/modal.js";

const whoIsTheGoat = [
  // меняем исходные пути на переменны
  { name: "Praktikum", link: logoImage },
  { name: "Kysto", link: avatarImage },
];

/* Находим в шаблоне контейнер, где будут сохраняться карточки, и записываем ссылку на него в переменную cardList */
const cardList = document.querySelector(".places__list");

/* Перебираем массив карточек initialCard: на каждой итерации создаются новые карточки с помощью createCard, их сохраняем в переменную cardContent. Созданные карточки добавляем в конец контейнер cardList */

initialCards.forEach(function (cardData) {
  const cardElement = createCard(
    cardData,
    deleteCard,
    likeCard,
    handleImageClick,
    openPopup
  );
  cardList.append(cardElement);
});

// Находим попапы //
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");

// Находим кнопки, которые открывают попапы //
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

// Находим форму редактирования в DOM
const formElement = document.forms["edit-profile"];
// Находим поля формы в DOM
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

// Находим значения, которые будут подставляться в форму редактирования //
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(
  ".profile__description"
);

// Находим форму добавления карточки в DOM
const formNewCards = document.forms["new-place"];
// Добавляем обработчик на отправку формы
formNewCards.addEventListener("submit", (evt) => {
  handleNewCardSubmit(evt, createCard, deleteCard, likeCard, handleImageClick);
});



/* Открытие формы при клике по кнопке редактирования и заполнение полями */
editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent; // заполняем поле имени
  jobInput.value = profileDescription.textContent; // заполняем поле работы
  openPopup(editPopup); // открываем попап
});

/* Находим все попапы */
const popups = document.querySelectorAll(".popup");
/* Находим кнопку закрытия попапа, который будет реализован по клику */
const closePopupButtons = document.querySelectorAll(".popup__close");

closePopupButtons.forEach((button) => {
  button.addEventListener("click", function (evt) {
    const popup = button.closest(".popup");
    closePopup(popup);
  });
});

/* Реализуем закрытие всех попапов при клике на оверлей */
popups.forEach((popup) => {
  popup.addEventListener("click", function (evt) {
    // Проверяем, что клик был именно на оверлей, а не на содержимое
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});

cardList.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("card__image")) {
    handleImageClick(evt, openPopup);
  }
});



/* Открываем попап для новой карточки по клику на + */
addButton.addEventListener("click", function () {
  openPopup(newCardPopup);
});

// Прикрепляем обработчик к форм
formElement.addEventListener("submit", (evt) => {
  handleFormSubmit(evt, nameInput, jobInput, profileTitle, profileDescription, editPopup);
});