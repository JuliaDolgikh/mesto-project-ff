
const apiUrl = "https://nomoreparties.co/v1/wff-cohort-32";
const token = "5a2ddb1d-e0dc-44e8-9e59-444f9597c5b5";


// Функция запроса данных пользователя
export function getUserData() {
  return fetch(`${apiUrl}/users/me`, {
    headers: {
      authorization: token,
      "Content-Type": "application/json"
    }
  })
  .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  .catch(err => console.error("Ошибка при загрузке профиля:", err));
}

// Функция запроса карточек
export function getCards() {
  return fetch(`${apiUrl}/cards`, { // Используем данные из переменной apiUrl
    headers: {
      authorization: token, //токен у нас объявлен 
      "Content-Type": "application/json"
    }
  })
  .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  .then(data => {
    console.log("Карточки из API:", data); // Проверяем, что возвращает сервер
    return data;
  })
  .catch(err => console.error("Ошибка при загрузке карточек:", err));
}

 // Функция редактирования профиля
 export function editProfile(name, about) {
    return fetch(`${apiUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    .then((userData) => {
      console.log("Профиль успешно обновлён:", userData);
      return userData; 
    })
    .catch(err => console.error("Ошибка при обновлении профиля:", err));
  }
  
  
// Функция добавления карточки
export function addNewCard(name, link) {
    return fetch(`${apiUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    .catch(err => console.error("Ошибка при добавлении карточки:", err));
  }
  
  //Функция обновления аватара
  export function editAvatar(avatarUrl) {
    return fetch(`${apiUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
      .catch((err) => console.error("Ошибка при обновлении аватара:", err));
  }
  
