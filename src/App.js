import React from 'react';
import './App.css';
import {db} from "./firebase-config"
import {useState,useEffect} from "react"
import{collection, onSnapshot} from "firebase/firestore"


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

const handleView = id => {
  const recipesClone = [...recipes]

  recipesClone.forEach(recipe => {
    if(recipe.id === id){
      recipe.viewing = !recipe.viewing
     } else {
      recipe.viewing = false
     }
  })
  setRecipes(recipesClone)
}




  return (
    <div className='App'>
      <h1> Recipesss</h1>
      {/* <Button variant="contained">Add Recipe</Button> */}
      <Button> add</Button>

      <div className='recipes'>
        {/* loop through the the recipes in the database */}
        {recipes.map((recipe,i) => ( 
          <div className='recipe' key={recipe.id}> 
            <h3> {recipe.title}</h3>
              
            <div dangerouslySetInnerHTML={{__html: recipe.description}}
            /> 
            {recipe.viewing && <div>
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
              </div>}

            <div className='buttons'>
                  <button onClick={() => handleView(recipe.id)}> View {recipe.viewing ? 'less' : 'more'}</button>
                  <button className='Remove'> Remove</button>
            </div>

          </div>
        ))}
      </div>
    </div>


  


  );
}

export default App;
