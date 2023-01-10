import React from 'react';
import './Header.css';

export default ({black}) =>{
    return(
     <header className={black ? 'black': ''}>
         <div className="header--logo">
       <a href=''>
           <img src='https://marcas-logos.net/wp-content/uploads/2019/11/Netflix-Logo.png'/>
       </a>

         </div>
         <div className="header--user">
         <a href=''>
           <img src='https://th.bing.com/th/id/R.8b61c1b9698d53bf246e1e245240ebee?rik=kDstmfK1wN4eWA&pid=ImgRaw&r=0'/>
       </a>
             </div>
     </header>

    );
}
