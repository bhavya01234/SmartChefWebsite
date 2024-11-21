import React, { useState, useEffect } from "react";
import "./RandomRecipes.css";
import { FaListUl } from "react-icons/fa"; // For ingredients icon
import { AiOutlineFileText } from "react-icons/ai"; // For button icon
import pasta from "../images/pasta.jpeg";
import noodles from "../images/noodles.jpeg";
import pizza from "../images/pizza.jpeg";
import samosa from "../images/samosa.jpeg";
import dosa from "../images/dosa.jpeg";
import chilliPotato from "../images/chilliPotato.jpg";
import burger from "../images/burger.jpeg";
import back from "../images/back.png";
import { Link } from "react-router-dom";

const RandomRecipes = () => {
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const recipes = [
    {
      name: "Pasta Carbonara",
      image: pasta,
      ingredients: ["200g Pasta (Spaghetti or your preferred type)", "2 Large Eggs", "100g Parmesan Cheese, grated", "100g Pancetta or Bacon, diced", "2 Cloves Garlic, minced", "Salt (to taste)", "Black Pepper (freshly cracked, to taste)", "1 tbsp Olive Oil"],
      instructions: "Boil a pot of salted water and cook the pasta until al dente (as per the package instructions). Reserve ½ cup of the pasta water before draining. In a bowl, whisk together the eggs and grated Parmesan cheese. Add a pinch of salt and black pepper to taste. Heat olive oil in a pan over medium heat. Add the diced pancetta (or bacon) and cook until crispy. Add the minced garlic and sauté for 30 seconds until fragrant (don’t burn it). Reduce the heat to low and add the cooked pasta to the pan with the pancetta. Remove the pan from the heat to prevent scrambling the eggs. Pour the egg and cheese mixture over the pasta, tossing quickly to coat. Add a splash of reserved pasta water to create a creamy sauce if needed. Plate the pasta and sprinkle with additional Parmesan and freshly cracked black pepper. Serve immediately while hot.",
    },
    {
      name: "Pizza",
      image: pizza,
      ingredients: ["2½ cups All-Purpose Flour", "1 tsp Salt", "1 tsp Sugar", "1 packet (2¼ tsp) Active Dry Yeast", "¾ cup Warm Water", "2 tbsp Olive Oil", "1 cup Tomato Puree", "1 tbsp Olive Oil", "1 tsp Garlic, minced"],
      instructions: "In a small bowl, dissolve yeast and sugar in warm water. Let it sit for 5-10 minutes until frothy. In a large mixing bowl, combine flour and salt. Make a well in the center and pour in the yeast mixture and olive oil. Mix and knead the dough for about 8-10 minutes until smooth and elastic. Cover the dough with a damp cloth and let it rise for 1-1.5 hours or until doubled in size. Preheat your oven to 475°F (245°C). Place a pizza stone or baking tray in the oven to heat. Roll out the dough on a floured surface to your desired thickness. Transfer it to parchment paper for easy handling. Spread the prepared pizza sauce evenly over the dough. Sprinkle mozzarella cheese generously. Add your favorite toppings (bell peppers, onions, mushrooms, olives, pepperoni, etc.). Garnish with fresh basil leaves. Slice and enjoy your homemade pizza while it’s hot!",
    },
    {
      name: "Noodles",
      image: noodles,
      ingredients: ["200g Noodles (boiled as per package instructions)", "1 tbsp Oil", "1 tbsp Soy Sauce", "1 tbsp Vinegar", "1 cup Cabbage, shredded", "1 medium Capsicum (Bell Pepper), julienned"],
      instructions: "In a small bowl, dissolve yeast and sugar in warm water. Let it sit for 5-10 minutes until frothy. In a large mixing bowl, combine flour and salt. Make a well in the center and pour in the yeast mixture and olive oil. Mix and knead the dough for about 8-10 minutes until smooth and elastic. Cover the dough with a damp cloth and let it rise for 1-1.5 hours or until doubled in size. Preheat your oven to 475°F (245°C). Place a pizza stone or baking tray in the oven to heat. Roll out the dough on a floured surface to your desired thickness. Transfer it to parchment paper for easy handling. Spread the prepared pizza sauce evenly over the dough. Sprinkle mozzarella cheese generously. Add your favorite toppings (bell peppers, onions, mushrooms, olives, pepperoni, etc.). Garnish with fresh basil leaves. Slice and enjoy your homemade pizza while it’s hot."
    },
    {
      name: "Samosa",
      image: samosa,
      ingredients: ["2½ cups All-Purpose Flour", "1 tsp Salt", "1 tsp Sugar", "1 packet (2¼ tsp) Active Dry Yeast", "¾ cup Warm Water", "2 tbsp Olive Oil", "1 cup Tomato Puree", "1 tbsp Olive Oil", "1 tsp Garlic, minced"],
      instructions: "In a small bowl, dissolve yeast and sugar in warm water. Let it sit for 5-10 minutes until frothy. In a large mixing bowl, combine flour and salt. Make a well in the center and pour in the yeast mixture and olive oil. Mix and knead the dough for about 8-10 minutes until smooth and elastic. Cover the dough with a damp cloth and let it rise for 1-1.5 hours or until doubled in size. Preheat your oven to 475°F (245°C). Place a pizza stone or baking tray in the oven to heat. Roll out the dough on a floured surface to your desired thickness. Transfer it to parchment paper for easy handling. Spread the prepared pizza sauce evenly over the dough. Sprinkle mozzarella cheese generously. Add your favorite toppings (bell peppers, onions, mushrooms, olives, pepperoni, etc.). Garnish with fresh basil leaves. Slice and enjoy your homemade pizza while it’s hot!",
    },
    {
      name: "Burger",
      image: burger,
      ingredients: ["200g Noodles (boiled as per package instructions)", "1 tbsp Oil", "1 tbsp Soy Sauce", "1 tbsp Vinegar", "1 cup Cabbage, shredded", "1 medium Capsicum (Bell Pepper), julienned"],
      instructions: "In a small bowl, dissolve yeast and sugar in warm water. Let it sit for 5-10 minutes until frothy. In a large mixing bowl, combine flour and salt. Make a well in the center and pour in the yeast mixture and olive oil. Mix and knead the dough for about 8-10 minutes until smooth and elastic. Cover the dough with a damp cloth and let it rise for 1-1.5 hours or until doubled in size. Preheat your oven to 475°F (245°C). Place a pizza stone or baking tray in the oven to heat. Roll out the dough on a floured surface to your desired thickness. Transfer it to parchment paper for easy handling. Spread the prepared pizza sauce evenly over the dough. Sprinkle mozzarella cheese generously. Add your favorite toppings (bell peppers, onions, mushrooms, olives, pepperoni, etc.). Garnish with fresh basil leaves. Slice and enjoy your homemade pizza while it’s hot!",
    },
    {
      name: "Chilli Potato",
      image: chilliPotato,
      ingredients: ["2½ cups All-Purpose Flour", "1 tsp Salt", "1 tsp Sugar", "1 packet (2¼ tsp) Active Dry Yeast", "¾ cup Warm Water", "2 tbsp Olive Oil", "1 cup Tomato Puree", "1 tbsp Olive Oil", "1 tsp Garlic, minced"],
      instructions: "Cook paneer in tomato-based butter sauce.Cook pasta, mix with eggs and cheese, add bacon.Cook pasta, mix with eggs and cheese, add bacon.Cook pasta, mix with eggs and cheese, add bacon.Cook pasta, mix with eggs and cheese, add bacon.Cook pasta, mix with eggs and cheese, add bacon.",
    },
    {
      name: "Dosa",
      image: dosa,
      ingredients: ["200g Noodles (boiled as per package instructions)", "1 tbsp Oil", "1 tbsp Soy Sauce", "1 tbsp Vinegar", "1 cup Cabbage, shredded", "1 medium Capsicum (Bell Pepper), julienned"],
      instructions: "In a small bowl, dissolve yeast and sugar in warm water. Let it sit for 5-10 minutes until frothy. In a large mixing bowl, combine flour and salt. Make a well in the center and pour in the yeast mixture and olive oil. Mix and knead the dough for about 8-10 minutes until smooth and elastic. Cover the dough with a damp cloth and let it rise for 1-1.5 hours or until doubled in size. Preheat your oven to 475°F (245°C). Place a pizza stone or baking tray in the oven to heat. Roll out the dough on a floured surface to your desired thickness. Transfer it to parchment paper for easy handling. Spread the prepared pizza sauce evenly over the dough. Sprinkle mozzarella cheese generously. Add your favorite toppings (bell peppers, onions, mushrooms, olives, pepperoni, etc.). Garnish with fresh basil leaves. Slice and enjoy your homemade pizza while it’s hot."
    },
    {
      name: "Pasta Carbonara",
      image: pasta,
      ingredients: ["200g Pasta (Spaghetti or your preferred type)", "2 Large Eggs", "100g Parmesan Cheese, grated", "100g Pancetta or Bacon, diced", "2 Cloves Garlic, minced", "Salt (to taste)", "Black Pepper (freshly cracked, to taste)", "1 tbsp Olive Oil"],
      instructions: "Boil a pot of salted water and cook the pasta until al dente (as per the package instructions). Reserve ½ cup of the pasta water before draining. In a bowl, whisk together the eggs and grated Parmesan cheese. Add a pinch of salt and black pepper to taste. Heat olive oil in a pan over medium heat. Add the diced pancetta (or bacon) and cook until crispy. Add the minced garlic and sauté for 30 seconds until fragrant (don’t burn it). Reduce the heat to low and add the cooked pasta to the pan with the pancetta. Remove the pan from the heat to prevent scrambling the eggs. Pour the egg and cheese mixture over the pasta, tossing quickly to coat. Add a splash of reserved pasta water to create a creamy sauce if needed. Plate the pasta and sprinkle with additional Parmesan and freshly cracked black pepper. Serve immediately while hot.",
    },
    {
      name: "Noodles",
      image: noodles,
      ingredients: ["200g Pasta (Spaghetti or your preferred type)", "2 Large Eggs", "100g Parmesan Cheese, grated", "100g Pancetta or Bacon, diced", "2 Cloves Garlic, minced", "Salt (to taste)", "Black Pepper (freshly cracked, to taste)", "1 tbsp Olive Oil"],
      instructions: "Boil a pot of salted water and cook the pasta until al dente (as per the package instructions). Reserve ½ cup of the pasta water before draining. In a bowl, whisk together the eggs and grated Parmesan cheese. Add a pinch of salt and black pepper to taste. Heat olive oil in a pan over medium heat. Add the diced pancetta (or bacon) and cook until crispy. Add the minced garlic and sauté for 30 seconds until fragrant (don’t burn it). Reduce the heat to low and add the cooked pasta to the pan with the pancetta. Remove the pan from the heat to prevent scrambling the eggs. Pour the egg and cheese mixture over the pasta, tossing quickly to coat. Add a splash of reserved pasta water to create a creamy sauce if needed. Plate the pasta and sprinkle with additional Parmesan and freshly cracked black pepper. Serve immediately while hot.",
    },
    {
      name: "burger",
      image: burger,
      ingredients: ["200g Noodles (boiled as per package instructions)", "1 tbsp Oil", "1 tbsp Soy Sauce", "1 tbsp Vinegar", "1 cup Cabbage, shredded", "1 medium Capsicum (Bell Pepper), julienned"],
      instructions: "In a small bowl, dissolve yeast and sugar in warm water. Let it sit for 5-10 minutes until frothy. In a large mixing bowl, combine flour and salt. Make a well in the center and pour in the yeast mixture and olive oil. Mix and knead the dough for about 8-10 minutes until smooth and elastic. Cover the dough with a damp cloth and let it rise for 1-1.5 hours or until doubled in size. Preheat your oven to 475°F (245°C). Place a pizza stone or baking tray in the oven to heat. Roll out the dough on a floured surface to your desired thickness. Transfer it to parchment paper for easy handling. Spread the prepared pizza sauce evenly over the dough. Sprinkle mozzarella cheese generously. Add your favorite toppings (bell peppers, onions, mushrooms, olives, pepperoni, etc.). Garnish with fresh basil leaves. Slice and enjoy your homemade pizza while it’s hot."
    },
    // Add more recipes...
  ];

  const getRandomRecipes = (num) => {
    return recipes.sort(() => 0.5 - Math.random()).slice(0, num);
  };

  useEffect(() => {
    const fetchRandomRecipes = () => {
      setRandomRecipes(getRandomRecipes(5)); // Fetch 3 random recipes
    };
    fetchRandomRecipes();
  }, []);

  return (
    <div className="recipe-container">
      <Link to="/" className="back-button" >
        <img src={back} width="10%" />
      </Link>
      <h1 className="header">Recipes for You</h1>
      {randomRecipes.map((recipe, index) => (
        <div key={index} className="recipe-card">
          <img src={recipe.image} alt={recipe.name} className="recipe-image" />
          <div className="recipe-details">
            <h3>{recipe.name}</h3>
            <div className="ingredients">
              <FaListUl className="icon" />
              <ul>
                {recipe.ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <button
              className="view-recipe-btn"
              onClick={() => setSelectedRecipe(recipe)}
            >
              <AiOutlineFileText className="icon" /> View Full Recipe
            </button>
          </div>
        </div>
      ))}

      {selectedRecipe && (
        <div className="recipe-modal">
          <div className="modal-content">
            <h2>{selectedRecipe.name}</h2>
            <p>{selectedRecipe.instructions}</p>
            <button className="close-modal-btn" onClick={() => setSelectedRecipe(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomRecipes;



