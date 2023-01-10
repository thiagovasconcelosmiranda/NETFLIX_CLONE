import React, {useEffect, useState} from 'react';
import './App.css';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Reader from './components/Header';

import tmdb from './tmdb';

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackheader, setBlackheader] = useState(false);

  useEffect(()=> {
  
     const loadAll = async () =>{
       //pegando a lista total
       let list = await tmdb.getHomeList();

       setMovieList(list);

       //Pegando o featured
        let originals = list.filter(i=>i.slug === 'originals');
        let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
        let chosen = originals[0].items.results[randomChosen];
        let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');
        setFeaturedData(chosenInfo);
       
     }
     loadAll();

  }, []);


  useEffect(()=>{
   const scrollListenner = () => {
      if(window.scrollY  > 10){
            setBlackheader(true);
      }else{
        setBlackheader(false);
      }
   }

   window.addEventListener('scroll', scrollListenner);
   return () =>{
     window.removeEventListener('scroll', scrollListenner);
   }
  }, []);

  return (

    <div className="page">
      <Reader black={blackheader}
       
      />
       {featuredData &&
           <FeaturedMovie
             item={featuredData}
         />
        
       }
       
       <section className="lists">
          {movieList.map((item, key) => (

           <MovieRow 
           key={key}
           title={item.title}
           items={item.items}
           
           />
      
              
          ))}
       </section>

       <footer>
         Feito com <span role='img'  aria-label='coracão'></span>pelo Thiago Vasconcelos<br/>
         Direitos de imagem para Netflix<br/>
         Dados pegos do site themoviedb.org
       </footer>
       {movieList.length <= 0 &&
       <div className='loading'>
            <img src="https://c.tenor.com/Rfyx9OkRI38AAAAM/netflix-netflix-startup.gif"  alt="carregando"/>
       </div>
      }
    </div>
  );
}