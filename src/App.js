
import React from 'react';
import './App.css';
import {db} from "./firebase-config"
import {useState,useEffect} from "react"

import{getDocs ,collection, onSnapshot} from "firebase/firestore"

function App() {
  const [recipes, setRecipes] = useState([]);
  const recipesCollectionRef = collection(db, "recipes")

  const [form, setForm] = useState({
    title: "",
    desc: "",
    ingredients: [],
    steps: []
  })
  const [popupActive, setPopupActive] = useState(false)



useEffect (() => {
  onSnapshot(recipesCollectionRef,snapshot => {
    setRecipes(snapshot.docs.map(doc =>{
      return{
        id: doc.id,
        viewing: false,
        ...doc.data()
      }
    }))
    
    //console.log(snapshot)
  })
},[])
 

  return (
    <div>
      <h1> recipesss</h1>
      <button> add recipe </button>

      <div className='recipies'>
        {recipes.map((recipe,i) => (
          <div className='recipe' key={recipe.id}> 
            {recipe.title}
          </div>
        ))}
      </div>

    </div>
  

  );
}

export default App;
