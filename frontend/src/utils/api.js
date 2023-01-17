import axios from 'axios';

class Api {
  constructor(options) {
     this._url = options.baseUrl;
     this._headersJson = {
        'Content-Type': 'application/json',
     }
  }

   _checkResponse(res) {
      if (res.ok) {    
         return res.json();
      } else
         return Promise.reject(res);
         
   }

   catchError(err) {
      console.error(`Ошибка ${err.status}`);
   }
   
   register(name, email, password) {
      const setUrl = this._url + '/signup'
      return fetch(setUrl,{
         method: 'POST',
         credentials: 'include',
         headers: this._headersJson,
         body: JSON.stringify({
            name: name,
            email: email,
            password: password,
         })
      })
      .then(this._checkResponse)
   }

   login(email, password) {
      const setUrl = this._url + '/signin'
      return fetch(setUrl,{
         method: 'POST',
         credentials: 'include',
         headers: this._headersJson,
         body: JSON.stringify({email, password})
      })
         .then((response => response.json()))
         .then((data) => {
            return data;
         })
   };

   getUserInfo(user) {
      const setUrl = this._url + '/users/me/' + user
      return fetch(setUrl, {
         method: 'GET',
         credentials: 'include',
         headers: this._headersJson,
      })
      .then(this._checkResponse)      
   }
}

export const api = new Api({
   baseUrl: 'http://localhost:3001',
});