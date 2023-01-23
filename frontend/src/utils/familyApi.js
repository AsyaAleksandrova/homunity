export const BASE_URL = 'http://localhost:3001';

export const createNewMember = ({...props}) => {
   return fetch(`${BASE_URL}/member/create`, {
      method: 'POST',
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...props})
   })
      .then((response) => {
         if (response.ok) {    
            return response.json();
         }
            return Promise.reject(response);
         })
};

export const saveMemberPhoto = ({file, parent}) => {
   const formData = new FormData();
   formData.append('file', file);
   return fetch(`${BASE_URL}/file/upload/${parent}`, {
      method: 'POST',
      credentials: 'include',
      body: formData
   })
      .then((response) => {
         if (response.ok) {    
            return response.json();
         }
            return Promise.reject(response);
         })
};

export const getMyFamily = () => {
   return fetch(`${BASE_URL}/member/family`, {
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