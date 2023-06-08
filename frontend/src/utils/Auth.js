class Auth {
  constructor({ baseUrl, headers }) {
    this.url = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  registerUser(email, password) {
    return fetch(`${this.url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        console.log(data);
        return data;
      });
  }

  authorize(email, password) {
    return fetch(`${this.url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return data;
        } else {
          return;
        }
      });
  }

  checkToken(token) {
    return fetch(`${this.url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}

const auth = new Auth({
  baseUrl: "http://api.aesmesto.students.nomoredomains.rocks",
  headers: {
    "Content-Type": "application/json",
  }
});

export default auth;
