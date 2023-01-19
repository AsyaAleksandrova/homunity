/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from 'react';

function Accept({changePass}) {

   const loc = document.location.href.toString().split('/');
   const link = loc[loc.length - 1];

   useEffect(() => {
      changePass(link);
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