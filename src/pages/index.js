import "./index.css"; // импорт главного файла стилей
import { initialCards } from "../components/cards.js";
import { createCard, deleteCard, likeCard } from "../components/card.js";
import { openPopup, closePopup, setCloseModalWindowEventListeners } from "../components/modal.js";

// Находим в шаблоне контейнер, где будут сохраняться карточки, и записываем ссылку на него в переменную cardList //
const cardList = document.querySelector(".places__list");

// Перебираем массив карточек initialCard: на каждой итерации создаются новые карточки с помощью createCard, их сохраняем в переменную cardContent. Созданные карточки добавляем в конец контейнер cardList //
if (!document.querySelector(".card")) {
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
}

// Находим попапы //
const editPopup = document.querySelector(".popup_type_edit");
const imagePopup = document.querySelector(".popup_type_image");
const newCardPopup = document.querySelector(".popup_type_new-card");
const modalWindows = document.querySelectorAll(".popup");

// Находим значки, которые открывают попапы //
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

// Находим форму редактирования профиля в DOM и её поля //
const editForm = document.forms["edit-profile"];
const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;

// Находим значения, которые будут подставляться в форму редактирования //
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Находим форму добавления карточки в DOM и её поля //
const formNewCards = document.forms["new-place"];
const placeInput = formNewCards.elements["place-name"];
const linkInput = formNewCards.elements.link;

 // Находим элементы попапа с картинками //
 const popupImage = document.querySelector(".popup__image");
 const captionPopup = document.querySelector(".popup__caption");

 // Открываем попап редактирования при клике по кнопке и заполнение полей //
editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value =  profileDescription.textContent;
  openPopup(editPopup);
});

// Открываем попап для новой карточки по клику на + //
addButton.addEventListener("click", function () {
  openPopup(newCardPopup);
});

// Цикл для всех модальных окон //
modalWindows.forEach((popup) => {
  setCloseModalWindowEventListeners(popup);
});

 // Функция обработки формы с данными пользователя //
function handleNewUserSubmit(evt) {  
  evt.preventDefault(); // отменили стандартную отправку формы
  profileTitle.textContent = nameInput.value; // обновили имя
  profileDescription.textContent = jobInput.value; // обновили описание
  closePopup(editPopup); // закрываем попап после сохранения
};


// Функция обработки формы  для создания новой карточки //
function handleNewCardSubmit(evt) {
  evt.preventDefault(); // отменили стандартную отправку формы
  // создаем объект с данными карточки из введённых пользователем данных
  const newCardData = {
    name: placeInput.value.trim(),
    link: linkInput.value.trim(),
    alt: placeInput.value.trim(),
  };
  if (!newCardData.name || !newCardData.link) {
    return; // останавливаем выполнение, если пустые данные, карточка не создаётся
  }
  // создаём новую карточку и добавляем её в начало списка
  const newCard = createCard(
    newCardData,
    deleteCard,
    likeCard,
    handleImageClick 
  );
  if (!newCard) {
    return; // если createCard вернул null, не добавляем карточку
  }
  cardList.prepend(newCard); // Добавляем карточку в начало списка
  // очищаем форму
  formNewCards.reset();
  // закрываем попап
  closePopup(newCardPopup);
}

// Функция открытия попапа с картинкой // 
function handleImageClick({ link, name }) {
  popupImage.src = link; 
  popupImage.alt = name; 
  captionPopup.textContent = name;
  openPopup(imagePopup);
}

// Прикрепляем обработчик к форме создания нового профиля //
editForm.addEventListener("submit", (evt) => {
  handleNewUserSubmit(evt);
});

// Добавляем обработчик к форме создания новой карточки //
formNewCards.addEventListener("submit", (evt) => {
  handleNewCardSubmit(evt);
});


