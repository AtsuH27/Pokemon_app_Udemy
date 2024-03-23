import { useEffect,useState } from 'react';
import './App.css';
import { getAllPokemon,getPokemon } from './utils/pokemon.js';
import Cards from './components/Cards/Cards.js';
import Navbar from './components/Navbar/Navbar.js';


function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  //ロードしているのかしていないのかuseStateで処理を行う。
  const [loading,setLoading]=useState(true);
  const [pokemonDate,setPokemonDate]=useState([]);
  const [nextURL,setNextURL]=useState("");
  const [prevURL,setPrevURL]=useState("");

  useEffect(()=>{ 
    const fetchPokemonDate = async()=>{
    //全てのポケモンを取得する。
    let res = await getAllPokemon(initialURL);
    //各ポケモンの詳細なデータを取得。
     loadPokemon(res.results);
     setNextURL(res.next);
     setPrevURL(res.previous);
     setLoading(false);
  };
      fetchPokemonDate();
  },[]);

  const loadPokemon= async (date)=>{
    let _pokemonDate= await Promise.all(
      date.map((pokemon)=>{
      // console.log(pokemon);
      let pokemonRecord = getPokemon(pokemon.url);
      return pokemonRecord;
      })
    );
    setPokemonDate(_pokemonDate);
  };

  // console.log(pokemonDate);

    const handleNextPage = async()=>{
      setLoading(true);
      let date = await getAllPokemon(nextURL);
      console.log(date);
      await loadPokemon(date.results)
      setNextURL(date.next);
      setPrevURL(date.previous);//null
      setLoading(false);
   };
  
  
  const handlePrevPage= async()=>{
    if(!prevURL) return;//１ページ目は前のページが存在しないので何もしない。

    setLoading(true);
    let date = await getAllPokemon(prevURL);
    await loadPokemon(date.results);
    setNextURL(date.next);
    setPrevURL(date.previous);
    setLoading(false);
  };

  //true or false loadingがtrueの時、falseの時　→　？条件分岐
  return (
    <>
    <Navbar/>
      <div className="App">
        {loading?(
          <h1>ロード中</h1>
        ):(
          <>
          <div className='pokemonCardContainer'>
            {pokemonDate.map((pokemon,i)=>{
              return <Cards key={i} pokemon={pokemon}/>;
        })}
           </div>
           <div className='btn'> 
            <button onClick={handlePrevPage}>前へ</button> 
            <button onClick={handleNextPage}>次へ</button> 
          </div> 
        </>
        )}
      </div>
  </>
  );
}

export default App;
