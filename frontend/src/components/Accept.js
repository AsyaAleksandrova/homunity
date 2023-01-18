/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from 'react';

function Accept({getUser}) {

   const link = document.location.href.toString().split('/');
   const id = link[link.length - 1];

   useEffect(() => {
      getUser(id);
   }, [])      

   return (
      <div className="root">
         <main className="main">
            <section className="main__container">
            </section>
         </main>         
      </div>
   );
}

export default Accept;