class Api {
  constructor({ baseUrl }) {
    this._link = baseUrl;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  get _headers() {
    const token = localStorage.getItem("token");
    let defaultHeaders = {
      "Content-Type": "application/json"
    }
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }
    return defaultHeaders;
  }

  getInitialProfileData() {
    return fetch(`${this._link}/users/me`, { headers: this._headers }).then(
      this._checkResponse
    );
  }

  setNewProfileData({ name, about }) {
    return fetch(`${this._link}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  setNewAvatar(avatar) {
    return fetch(`${this._link}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    }).then(this._checkResponse);
  }

  getInitialGallery() {
    return fetch(`${this._link}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setNewCard({ name, link }) {
    return fetch(`${this._link}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  setLikeCard(cardId) {
    return fetch(`${this._link}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setDislikeCard(cardId) {
    return fetch(`${this._link}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._link}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "http://api.aesmesto.students.nomoredomains.rocks",
});

export default api;
