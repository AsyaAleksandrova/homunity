export const BASE_URL = 'http://localhost:3001';

export const register = (name, email, password) => {
   return fetch(`${BASE_URL}/auth/signup`, {
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
   return fetch(`${BASE_URL}/auth/login`, {
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
   return fetch(`${BASE_URL}/auth/logout`, {
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

export const checkToken = (id) => {
   return fetch(`${BASE_URL}/auth/profile/${id}`, {
      method: 'GET',
      credentials: 'include'
   })
      .then((response) => {
         if (response.ok) {    
            return response.json();
         }
            return Promise.reject(response);
         })
};

export const refreshLink = (email) => {
   return fetch(`${BASE_URL}/auth/refresh/link`, {
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email})
   })
      .then((response) => {
         if (response.ok) {    
            return response.json();
         }
            return Promise.reject(response);
         })
};

export const getIdByLink = (link) => {
   return fetch(`${BASE_URL}/auth/refresh/pass/${link}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
   })
      .then((response) => {
         if (response.ok) {    
            return response.json();
         }
            return Promise.reject(response);
         })
};

export const refreshPass = (email, password, _id) => {
   return fetch(`${BASE_URL}/auth/refresh/pass/${_id}`, {
      method: 'PATCH',
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