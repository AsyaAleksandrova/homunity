export const BASE_URL = 'http://localhost:3001';

export const register = (name, email, password) => {
   return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password,})
   })
      .then((response) => {
         if (response.ok) {    
            return response.json();
         }
            return Promise.reject(response);
         })
};

export const login = (email, password) => {
   return fetch(`${BASE_URL}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email, password})
   })
      .then((response) => {
         if (response.ok) {    
            return response.json();
         }
            return Promise.reject(response);
         })
};

export const logout = () => {
   return fetch(`${BASE_URL}/logout`, {
      method: 'DELETE',
      credentials: 'include'
   })
      .then((response) => {
         if (response.ok) {    
            return response.json();
         }
            return Promise.reject(response);
         })
};


export const getProfile = (user) => {
   return fetch(`${BASE_URL}/users/me/ ${user._id}`, {
      method: 'GET',
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({user})
   })
      .then((response) => {
         if (response.ok) {    
            return response.json();
         }
            return Promise.reject(response);
         })
};