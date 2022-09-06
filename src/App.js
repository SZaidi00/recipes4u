
import React from 'react';
import './App.css';
import {db} from "./firebase-config"
import {useState,useEffect} from "react"

import{getDocs ,collection} from "firebase/firestore"

function App() {
  const [recipes, setRecipes] = useState([]);
  const recipesCollectionRef = collection(db, "recipes")

  // const [form, setForm] = useState({
  //   title: "",
  //   desc: "",
  //   ingredients: [],
  //   steps: []
  // })
  // const [popupActive, setPopupActive] = useState(false)

  useEffect(() => {
    const getRecipes = async () => {
      const data = await getDocs(recipesCollectionRef);
      console.log(data);
    };
    getRecipes();
  },[]);
 

  return (
  "hello"
  );
}

export default App;
