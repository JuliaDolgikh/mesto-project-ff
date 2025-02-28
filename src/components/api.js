
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-32",
  headers: {
    authorization: "5a2ddb1d-e0dc-44e8-9e59-444f9597c5b5",
    "Content-Type": "application/json",
  },
};

// Общая функция обработки ответа
function checkResponse(res) {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(`Ошибка ${res.status}: ${err.message || err}`));
}

// Универсальная функция запросов
function request(url, options = {}) {
  return fetch(url, { headers: config.headers, ...options }).then(checkResponse);
}

// Функция запроса данных пользователя
export function getUserData() {
  return request(`${config.baseUrl}/users/me`);
}

// Функция запроса карточек
export function getCards() {
  return request(`${config.baseUrl}/cards`);
}

// Функция редактирования профиля
export function editProfile(name, about) {
  return request(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    body: JSON.stringify({ name, about }),
  });
}

// Функция добавления карточки
export function addNewCard(name, link) {
  return request(`${config.baseUrl}/cards`, {
    method: "POST",
    body: JSON.stringify({ name, link }),
  });
}

// Функция обновления аватара
export function editAvatar(avatarUrl) {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    body: JSON.stringify({ avatar: avatarUrl }),
  });
}

// Функция удаления карточки
export function deleteCardFromServer(cardId) {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
  });
}

// Функция для лайка карточки
export function likeCardRequest(cardId) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
  });
}

// Функция для удаления лайка (дизлайка)
export function dislikeCardRequest(cardId) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
  });
}
