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

const handleSubmit = e => {
  e.preventDefault()
}

const handleIngredient = (e,i) =>{
  const ingredientsClone = [...form.ingredients]

  ingredientsClone[i] = e.target.value
  setForm({
    ...form,
    ingredients: ingredientsClone
  })
}

const handleStep = (e,i) =>{
  const stepsClone = [...form.steps]

  stepsClone[i] = e.target.value
  setForm({
    ...form,
    steps: stepsClone
  })
}

const handleIngredientCount = () => {
  setForm ({
    ...form,
    ingredients: [...form.ingredients,""]
  })
}

const handleStepCount = () => {
  setForm ({
    ...form,
    steps: [...form.steps,""]
  })
}


  return (
    <div className='App'>
      <h1> Recipesss</h1>
      {/* <Button variant="contained">Add Recipe</Button> */}
      <button onClick={() => setPopupActive(!popupActive) }> Add ???</button>

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

      {popupActive && <div className='popup'>
      <div className='popup-inner'> 
          <h2> Add New Recipe</h2> 
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <lable>Title</lable>
                <input
                 type='text'
                 value={form.title}
                 onChange={e => setForm({...form, title: e.target.value})} />
            </div>

            <div className='form-group'>
                <lable>Description</lable>
                <textarea
                 type='text'
                 value={form.description}
                 onChange={e => setForm({...form, description: e.target.value})} />
            </div>

            <div className='form-group'>
                <lable>Ingredients</lable>
                {
                  form.ingredients.map((ingredient,i) => (
                    <textarea
                    type='text'
                    key={i}
                    value={ingredient}
                    onChange={e => handleIngredient(e,i)} />
                  ))
                }
                <br/>
                <button type='button' onClick={handleIngredientCount}>Add Ingredient</button>
            </div>

            <div className='form-group'>
                <lable>Steps</lable>
                {
                  form.steps.map((step,i) => (
                    <textarea
                    type='text'
                    key={i}
                    value={step}
                    onChange={e => handleStep(e,i)} />
                  ))
                }
                <br/>
                <button type='button' onClick={handleStepCount}>Add Steps</button>
            </div>

          </form>     
      </div>
      </div>}

    </div>
  );
}

export default App;
