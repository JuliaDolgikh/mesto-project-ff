

import "./index.css"; // импорт главного файла стилей
import { createCard, likeCard, dislikeCard} from "../components/card.js";
import { openPopup, closePopup, setCloseModalWindowEventListeners} from "../components/modal.js";
import { enableValidation, clearValidationErrors } from "../components/validation.js";
import { getUserData, getCards, editProfile, addNewCard, editAvatar, deleteCardFromServer, likeCardRequest, dislikeCardRequest } from "../components/api.js"; 


// Находим контейнер карточек
const cardList = document.querySelector(".places__list");

// Находим попапы
const editPopup = document.querySelector(".popup_type_edit");
const imagePopup = document.querySelector(".popup_type_image");
const newCardPopup = document.querySelector(".popup_type_new-card");
const avatarPopup = document.querySelector(".popup_type_avatar"); 
const modalWindows = document.querySelectorAll(".popup");

// Находим формы внутри попапов (сначала находим попап, потом его форму)
const editForm = editPopup.querySelector(".popup__form");
const newCardForm = newCardPopup.querySelector(".popup__form");
const avatarForm = avatarPopup.querySelector(".popup__form");

// Находим форму добавления карточки и её поля
const formNewCards = document.forms["new-place"];
const placeInput = formNewCards.elements["place-name"];
const linkInput = formNewCards.elements.link;

// Находим кнопки открытия попапов
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

// Находим форму редактирования профиля
const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;

// Находим элементы профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

// Находим элементы попапа с картинками
const popupImage = document.querySelector(".popup__image");
const captionPopup = document.querySelector(".popup__caption");

// Находим элементы попапа смены аватара
const avatarEditButton = document.querySelector(".profile__edit-avatar-button"); 
const avatarInput = avatarForm.querySelector(".popup__input"); 
const avatarError = avatarForm.querySelector(".form__input-error"); 
const closeAvatarPopup = avatarPopup.querySelector(".popup__close"); 

//Находим элементы формы подтверждения удаления
const confirmPopup = document.querySelector(".popup_type_confirm");
const confirmButton = confirmPopup.querySelector(".popup__button-confirm");

// Включаем валидацию для всех форм
const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active"
};

// Включаем валидацию
enableValidation(validationSettings);

let userId = "";

// Загружаем профиль и карточки при загрузке страницы
Promise.all([getUserData(), getCards()])
  .then(([userData, cards]) => {
    userId = userData._id;

    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.src = userData.avatar || defaultAvatar; // Если API не вернул аватар — подставляем дефолтный
    cardList.innerHTML = "";

    cards.forEach(cardData => {

        const newCard = createCard(userId, cardData, likeCard, dislikeCard, handleImageClick, openPopupDelete, likeCardRequest, dislikeCardRequest);
      cardList.append(newCard);
    });
  })
    
  .catch(err => console.error("Ошибка при загрузке данных:", err));

// Открываем попап редактирования профиля и заполняем его
editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidationErrors(editForm, validationSettings);
  openPopup(editPopup);
});

// Открываем попап добавления карточки
addButton.addEventListener("click", () => {
  clearValidationErrors(newCardForm, validationSettings);
  openPopup(newCardPopup);
});

// Закрытие попапов по кнопке (универсальная функция)
modalWindows.forEach(popup => {
  setCloseModalWindowEventListeners(popup);
});

// Функция обработки формы редактирования профиля
function handleNewUserSubmit(evt) {
  evt.preventDefault();
  
  const name = nameInput.value.trim();
  const about = jobInput.value.trim();
  const submitButton = editForm.querySelector(".popup__button");

  if (!name || !about) {
    console.error("Ошибка: поля не должны быть пустыми!");
    return;
  }

  renderLoading(submitButton, true);

  editProfile(name, about)
    .then(userData => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closePopup(editPopup);
    })
    .catch(err => console.error("Ошибка при обновлении профиля:", err))
    .finally(() => {
      renderLoading(submitButton, false); 
    });
}

// Функция обработки формы добавления новой карточки
function handleNewCardSubmit(evt) {
  evt.preventDefault();
  
  const name = placeInput.value.trim();
  const link = linkInput.value.trim();
  const submitButton = newCardPopup.querySelector(".popup__button");

  if (!name || !link) {
    console.error("Ошибка: Вы пропустили это поле");
    return;
  }

  renderLoading(submitButton, true);

  addNewCard(name, link)
  .then(cardData => {
    if (document.querySelector(`[data-card-id="${cardData._id}"]`)) {
      console.warn("Карточка уже есть в списке, не добавляем повторно.");
      return;
    }

    const newCard = createCard(userId, cardData, likeCard, dislikeCard, handleImageClick, openPopupDelete, likeCardRequest, dislikeCardRequest);
    cardList.prepend(newCard);
    formNewCards.reset();
    closePopup(newCardPopup);
  })
  .catch(err => console.error("Ошибка при добавлении карточки:", err));
}


// Функция открытия попапа с картинкой
function handleImageClick({ link, name }) {
  popupImage.src = link;
  popupImage.alt = name;
  captionPopup.textContent = name;
  openPopup(imagePopup);
}

// Открываем попап смены аватара при клике на аватар
avatarEditButton.addEventListener("click", () => {
  avatarInput.value = "";
  avatarError.textContent = ""; 
  clearValidationErrors(avatarForm, validationSettings);
  openPopup(avatarPopup);
});


// Обработчик отправки формы смены аватара
avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const submitButton = avatarPopup.querySelector(".popup__button");
  renderLoading(submitButton, true);

  editAvatar(avatarInput.value)
    .then((userData) => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`; // Обновляем аватар
      closePopup(avatarPopup);
    })
    .catch((err) => console.error("Ошибка при обновлении аватара:", err))
    .finally(() => {
      renderLoading(submitButton, false); 
    });
});

// Закрытие попапа
closeAvatarPopup.addEventListener("click", () => closePopup(avatarPopup));

// Добавляем обработчики submit на формы
editForm.addEventListener("submit", handleNewUserSubmit);
formNewCards.addEventListener("submit", handleNewCardSubmit);

let currentCardId = null;
let currentCardElement = null;

const openPopupDelete = (cardId, card) => {
  currentCardId = cardId;
  currentCardElement = card;
  openPopup(confirmPopup); // Открываем попап удаления
};

const handleDeleteCard = () => {
  if (!currentCardId || !currentCardElement) {
    return;
  }
  deleteCardFromServer(currentCardId) // Функция запроса на удаление карточки
    .then(() => {
      currentCardElement.remove(); // Удаляем элемент карточки из DOM
      closePopup(confirmPopup); // Закрываем попап
    })
    .catch(err => console.error("Ошибка при удалении карточки:", err));
};

// Вешаем обработчик на кнопку подтверждения удаления 
confirmButton.addEventListener("click", handleDeleteCard);
// Вешаем обработчик на кнопку подтверждения 
if (confirmButton) {
  confirmButton.addEventListener("click", handleDeleteCard);
} 


//Функция ожидания сохранения 
function renderLoading(button, isLoading, defaultText = "Сохранить") {
  if (isLoading) {
    button.textContent = "Сохранение...";
    button.disabled = true;  
  } else {
    button.textContent = defaultText;
    button.disabled = false; 
  }
}
