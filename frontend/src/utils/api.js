class Api {
  constructor(options) {
     this._url = options.baseUrl;
     this._headersJson = {
        'Content-Type': 'application/json',
        'credentials': 'include'
     }
  }

   _checkResponse(res) {
      if (res.ok) {    
         return res.json();
      }
         return Promise.reject(`Ошибка ${res.status}`);
   }

   catchError(err) {
      console.log(err);
   }
   
   register(name, email, password) {
      const setUrl = this._url + '/signup'
      return fetch(setUrl,{
         method: 'POST',
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
         headers: this._headersJson,
         body: JSON.stringify({email, password})
      })
         .then((response => response.json()))
         .then((data) => {
            if (data.token){
               return data;
            } 
         })
   };
}

export const api = new Api({
   baseUrl: 'http://localhost:3001',
});