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