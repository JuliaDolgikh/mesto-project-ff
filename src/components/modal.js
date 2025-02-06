
/* Функция для открытия попапа */
export function openPopup(popup) {
  popup.classList.add("popup_is-opened"); // Открываем попап
  popup.classList.remove("popup_is-animated"); // убираем анимацию закрытия
  popup.style.display = "flex";
  document.addEventListener("keydown", closeEsc); // Добавляем обработчик закрытия по Esc
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
    const activePopup = document.querySelector('.popup[style*="display: flex"]');
    if (activePopup) {
      closePopup(activePopup);
    }
  }
}


export function handleFormSubmit(evt, nameInput, jobInput, profileTitle, profileDescription, editPopup) {
  evt.preventDefault(); // отменили стандартную отправку формы
  profileTitle.textContent = nameInput.value; // обновили имя
  profileDescription.textContent = jobInput.value; // Обновляем описание
  closePopup(editPopup); // Закрываем попап после сохранения
};

export function handleNewCardSubmit(evt, createCard, deleteCard, likeCard, handleImageClick) {
  evt.preventDefault(); // Отменяем стандартное поведение формы
  evt.stopPropagation(); 

  const form = evt.target;
  const newCardPopup = document.querySelector(".popup_type_new-card");
  const placeInput = form.elements["place-name"];
  const linkInput = form.elements.link;
  const cardList = document.querySelector(".places__list");

  // Создаем объект с данными карточки из введённых пользователем данных
  const newCardData = {
    name: placeInput.value.trim(),
    link: linkInput.value.trim(),
    alt: placeInput.value.trim(),
  };

  if (!newCardData.name || !newCardData.link) {
    console.error
    return; // останавливаем выполнение, карточка не создаётся
  }

  // Создаём новую карточку и добавляем её в начало списка
  const newCard = createCard(
    newCardData,
    deleteCard,
    likeCard,
    handleImageClick
  );
  if (!newCard) {
    console.error
    return; // если createCard вернул null, не добавляем карточку
  }

  cardList.prepend(newCard); // Добавляем карточку в начало списка

  // Очищаем форму
  form.reset();

  // Закрываем попап
  closePopup(newCardPopup);
}
