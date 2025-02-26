
export function createCard(userId, cardData, deleteCard, likeCard, handleImageClick, openPopup, closePopup) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true).querySelector(".card");

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");

  const defaultImage = "../images/card_1.jpg";

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCount.textContent = cardData.likes.length;
  cardImage.src = cardData.link || defaultImage;


  //Проверяем, поставил ли пользователь лайк
  if (cardData.likes.some(like => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  //Проверяем, является ли пользователь владельцем карточки
  if (cardData.owner && cardData.owner._id !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () => deleteCard(cardElement, cardData._id, openPopup, closePopup));
  }

  //Добавляем обработчики на лайк и изображение
  likeButton.addEventListener("click", () => likeCard(likeButton, likeCount, cardData._id, userId));
  cardImage.addEventListener("click", () => handleImageClick(cardData));

  return cardElement;
}


// Функция удаления карточки

export function deleteCard(cardElement, cardId, openPopup, closePopup) {
  const confirmPopup = document.querySelector(".popup_type_confirm");

  if (!confirmPopup) {
    console.error("Ошибка: Попап подтверждения не найден!");
    return;
  }

  const confirmButton = confirmPopup.querySelector(".popup__button-confirm");

  if (!confirmButton) {
    console.error("Ошибка: Кнопка 'Да' не найдена!");
    return;
  }

  openPopup(confirmPopup);

  confirmButton.replaceWith(confirmButton.cloneNode(true));
  const newConfirmButton = confirmPopup.querySelector(".popup__button-confirm");

  newConfirmButton.addEventListener("click", () => {
    console.log(`Кнопка 'Да' нажата, удаляем карточку ID: ${cardId}`);

    fetch(`https://nomoreparties.co/v1/wff-cohort-32/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: "5a2ddb1d-e0dc-44e8-9e59-444f9597c5b5",
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(errData => {
          console.error(`Ошибка ${res.status}: ${errData.message}`);
          alert(`Ошибка ${res.status}: ${errData.message}`);
          return Promise.reject(`Ошибка ${res.status}: ${errData.message}`);
        });
      }
      return res.json();
    })
    .then(() => {
      console.log("Карточка удалена!");
      cardElement.remove();

      console.log("Проверяем closePopup:", closePopup);
      console.log("Проверяем confirmPopup:", confirmPopup);

      if (typeof closePopup === "function") {
        closePopup(confirmPopup); // Закрываем попап после удаления
      } else {
        console.error("closePopup не является функцией!");
      }
    })
    .catch(err => {
      console.error("Ошибка при удалении карточки:", err);
      alert(`Ошибка удаления: ${err}`);
    });
  });
}




// Функция для лайка

export function likeCard(likeButton, likeCount, cardId, userId) { 
  if (!cardId) {
    console.error("Ошибка: cardId не передан!");
    return;
  }

  console.log(` Лайк от пользователя: ${userId}, cardId: ${cardId}`);

  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const method = isLiked ? "DELETE" : "PUT";

  fetch(`https://nomoreparties.co/v1/wff-cohort-32/cards/likes/${cardId}`, {
    method: method,
    headers: {
      authorization: "5a2ddb1d-e0dc-44e8-9e59-444f9597c5b5",
      "Content-Type": "application/json",
    }
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(errData => Promise.reject(`Ошибка ${res.status}: ${errData.message}`));
      }
      return res.json();
    })
    .then(updatedCard => {
      console.log("Обновленный список лайков:", updatedCard.likes);

      likeCount.textContent = updatedCard.likes.length;

      if (updatedCard.likes.some(like => like._id === userId)) {
        likeButton.classList.add("card__like-button_is-active");
      } else {
        likeButton.classList.remove("card__like-button_is-active");
      }
    })
    .catch(err => console.error("Ошибка при лайке карточки:", err));
}



