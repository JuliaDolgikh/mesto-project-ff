
export function createCard(userId, cardData, deleteCard, likeCard, dislikeCard, handleImageClick, openConfirmPopup, likeCardRequest, dislikeCardRequest) {
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
    deleteButton.addEventListener("click", () => {
    deleteCard(cardElement, cardData._id, openConfirmPopup);
  });
}
  //Добавляем обработчики на лайк и изображение
  likeButton.addEventListener("click", () => {
    if (likeButton.classList.contains("card__like-button_is-active")) {
      dislikeCard(likeButton, likeCount, cardData._id, userId, dislikeCardRequest);
    } else {
      likeCard(likeButton, likeCount, cardData._id, userId,  likeCardRequest);
    }
  });  

  cardImage.addEventListener("click", () => handleImageClick(cardData));

   // Добавляем ID владельца в dataset
   cardElement.dataset.ownerId = cardData.owner._id;

  return cardElement;
}

export function deleteCard(cardElement, cardId, openConfirmPopup) {
  openConfirmPopup(cardId, cardElement); 
}


// Функция для лайка
export function likeCard(likeButton, likeCount, cardId, userId, likeCardRequest) {
  
  likeCardRequest(cardId)
    .then(updatedCard => {
      console.log("Лайк добавлен:", updatedCard.likes);
      updateLikeUI(likeButton, likeCount, updatedCard.likes, userId);
    })
    .catch(err => console.error("Ошибка при лайке карточки:", err));
}

export function dislikeCard(likeButton, likeCount, cardId, userId, dislikeCardRequest) {
  if (!cardId) {
    console.error("Ошибка: cardId не передан!");
    return;
  }

  dislikeCardRequest(cardId)
    .then(updatedCard => {
      console.log("Лайк удалён:", updatedCard.likes);
      updateLikeUI(likeButton, likeCount, updatedCard.likes, userId);
    })
    .catch(err => console.error("Ошибка при дизлайке карточки:", err));

}

// Функция обновления после лайка/дизлайка
function updateLikeUI(likeButton, likeCount, likes, userId) {
  likeCount.textContent = likes.length;
  if (likes.some(like => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }
}
