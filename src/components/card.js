
export function createCard(userId, cardData, deleteCard, likeCard, handleImageClick, openConfirmPopup, confirmPopup, likeCardRequest,
  dislikeCardRequest) {
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
    deleteCard(cardElement, cardData._id, openConfirmPopup, confirmPopup);
  });
}

  //Добавляем обработчики на лайк и изображение
  likeButton.addEventListener("click", () => likeCard(likeButton, likeCount, cardData._id, userId, likeCardRequest,
    dislikeCardRequest));
  cardImage.addEventListener("click", () => handleImageClick(cardData));

   // Добавляем ID владельца в dataset
   cardElement.dataset.ownerId = cardData.owner._id;

  return cardElement;
}

export function deleteCard(cardElement, cardId, openConfirmPopup, confirmPopup) {

  if (!openConfirmPopup || !confirmPopup) {
    console.error("Ошибка: openConfirmPopup или confirmPopup не переданы!");
    return;
  }

  openConfirmPopup(cardId, cardElement, confirmPopup); // Передаём pop-up явно
}


// Функция для лайка

export function likeCard(likeButton, likeCount, cardId, userId, likeCardRequest, dislikeCardRequest) {
  if (!cardId) {
    console.error("Ошибка: cardId не передан!");
    return;
  }

  console.log(`Лайк от пользователя: ${userId}, cardId: ${cardId}`);

  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  // 📌 Выбираем, какую функцию API вызывать
  const request = isLiked ? dislikeCardRequest : likeCardRequest;

  request(cardId)
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


