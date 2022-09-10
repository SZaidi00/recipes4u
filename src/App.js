import React from 'react';
import './App.css';
import {db} from "./firebase-config"
import {useState,useEffect} from "react"
import{getDocs ,collection, onSnapshot} from "firebase/firestore"


import Button from '@mui/material/Button';

function App() {
  const [recipes, setRecipes] = useState([]);
  const recipesCollectionRef = collection(db, "recipes")


  const [form, setForm] = useState({
    title: "",
    description: "",
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
      <h1 className='title'> recipesss</h1>
      <Button className = "add" variant="contained">Add Recipe</Button>

      <div className='recipies'>
        {/* loop through the the recipes in the database */}
        {recipes.map((recipe,i) => ( 
          <div className='recipe' key={recipe.id}> 
            <h3> {recipe.title}</h3>
              
            <div dangerouslySetInnerHTML={{__html: recipe.description}}
            /> 

            <h4>Ingredients</h4>
              <ul>
                { recipe.ingredients.map((ingredient, i) => (
                  <li key={i}>{ ingredient }</li>
                ))}
              </ul>
            <h4> Follow These Easy Steps!</h4>
              <ol>
                {recipe.steps.map((step,i) =>(
                  <li key={i}>{step}</li>
                ))}
              </ol>
          </div>
        ))}
      </div>

    </div>
  

  );
}

export default App;
