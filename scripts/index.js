// @todo: Темплейт карточки

/* Находим шаблон карточек по id и сохраняем его содержимое в переменную cardTemplate, используем .content для доступа к содержимому */
const cardTemplate = document.querySelector('#card-template').content;


// @todo: Функция создания карточки

function createCard(cardData, { deleteCard }) {

/* Клонируем шаблона карточки вместе с содержимым (cloneNode(true)) и записываем в переменную cardContent */
const cardContent = cardTemplate.cloneNode(true); 

/* Находим карточку по селектору .card внутри клонированного шаблона, чтобы корректно работать с её элементами, сохраняем в переменную cardElement */
const cardElement = cardContent.querySelector('.card'); 

/* Находим элементы внутри склонированных карточек */

const cardImage = cardElement.querySelector('.card__image');  /* изображение карточки */
const cardTitle = cardElement.querySelector('.card__title');  /* заголовок карточки */
const deleteButton = cardElement.querySelector('.card__delete-button');  /* кнопка удаления карточки */

/* Устанавливаем значение вложенных элементов */
cardImage.src = cardData.link; /* задаем ссылки на изображения */
cardTitle.textContent = cardData.name; /* задаем текст заголовка карточек */
cardImage.alt = cardData.alt; /* задаем альтернативный текст для изображения */

/* Добавляем обработчик клика к иконке корзины. По клику вызывается функция удаления карточки */
deleteButton.addEventListener('click', function() {
     deleteCard(cardElement)
});

/* Возвращаем готовую карточку */
return cardElement; 

}


// @todo: Функция удаления карточки

function deleteCard(cardElement) {
    cardElement.remove();
  }



// @todo: Вывести карточки на страницу

/* Находим в шаблоне контейнер, где будут сохраняться карточки, и записываем ссылку на него в переменную cardList */
const cardList = document.querySelector('.places__list');

/* Перебираем массив карточек initialCard: на каждой итерации создаются новые карточки с помощью createCard, их сохраняем в переменную cardContent. Созданные карточки добавляем в конец контейнер cardList */

initialCards.forEach(function(cardData) {
    const cardContent = createCard(cardData,{ deleteCard });
    cardList.append(cardContent);
  });

  

