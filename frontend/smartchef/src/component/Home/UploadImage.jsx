// import React, { useState } from "react";
// import axios from "axios";
// import './UploadImage.css';
// import "@fortawesome/fontawesome-free/css/all.css";
// import home from '../images/home.png';
// import { Link } from "react-router-dom";


// function UploadImage() {
//   const [imagePreviews, setImagePreviews] = useState([]); // Store image preview URLs
//   const [error, setError] = useState(""); // State for error message
//   const maxImages = 5;
//   const [uploadedFiles, setUploadedFiles] = useState([]);

//   const uploadToCloudinary = async (files) => {
//     const uploadedImages = [];

//     for (const file of files) {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("upload_preset", "fridge"); // Use your correct preset here

//       try {
//         const response = await axios.post(
//           `https://api.cloudinary.com/v1_1/dlzrtaoew/image/upload`, // Use your Cloudinary URL here
//           formData
//         );
//         uploadedImages.push(response.data.secure_url);
//       } catch (error) {
//         console.error("Error uploading to Cloudinary:", error);
//       }
//     }


//   };
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);

//     // Check if adding new files exceeds the max limit
//     if (imagePreviews.length + files.length > maxImages) {
//       setError(`You can only upload a maximum of ${maxImages} images.`);
//       return;
//     }

//     const previewUrls = files.map((file) => URL.createObjectURL(file)); // Create local previews for UX
//     setImagePreviews((prev) => [...prev, ...previewUrls]); // Show local previews immediately
//     setUploadedFiles((prev) => [...prev, ...files]); // Store original files for backend upload
//     uploadToCloudinary(files); // Upload to Cloudinary
//     setError(""); // Clear error if images are within limit
//   };


// const submitImages = async () => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     setError("You must be logged in to submit images.");
//     return;
//   }

//   // Use FormData to send actual files if the backend expects file uploads
//   const formData = new FormData();
//   uploadedFiles.forEach((file, index) => formData.append(`images`, file)); // Append each file

//   try {
//     const response = await axios.post(
//       "http://localhost:8001/users/upload-fridge-images",
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//           "Content-Type": "multipart/form-data", // Required for file uploads
//         },
//       }
//     );

//     console.log("Images successfully sent to backend:", response.data);
//   } catch (error) {
//     console.error("Error sending images to backend:", error);
//     setError("Failed to upload images. Please try again.");
//   }
// };

//   return (

//     <div className="upload-container">
//       <Link to="/" >
//         <img src={home} alt="" className="home-icon" />
//       </Link>
//       <div className="upload-card">
//         <h2 className="upload-title">Upload Fridge Images</h2>
//         <p className="upload-description">
//           Upload up to {maxImages} images of your fridge for analysis.
//         </p>

//         {error && <div className="upload-error">{error}</div>}

//         <div className="file-input-container">
//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handleImageChange}
//             className="hidden"
//             id="fileInput"
//           />
//           <label htmlFor="fileInput" className="file-input-label">
//             <i className="file-input-icon fas fa-upload"></i>
//             &nbsp; Click here or drag and drop images to upload
//           </label>
//         </div>

//         <div className="image-preview-grid">
//           {imagePreviews.map((imgSrc, index) => (
//             <div key={index} className="image-preview">
//               <img src={imgSrc} alt={`Preview ${index + 1}`} />
//             </div>
//           ))}
//         </div>

//         <button onClick={submitImages} className="submit-button">
//           Submit Images
//         </button>
//       </div>
//     </div>
//   );
// }

// export default UploadImage;


////////////////// break



import React, { useState } from "react";
import axios from "axios";
import './UploadImage.css';
import "@fortawesome/fontawesome-free/css/all.css";
import home from '../images/home.png';
import { Link } from "react-router-dom";

function UploadImage() {
  const [imagePreviews, setImagePreviews] = useState([]); // Store image preview URLs
  const [error, setError] = useState(""); // State for error message
  const maxImages = 5;
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState(""); // State to store generated recipe
  const [calories, setCalories] = useState("");






  const uploadToCloudinary = async (files) => {
    const uploadedImages = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "fridge"); // Use your correct preset here

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dlzrtaoew/image/upload`, // Use your Cloudinary URL here
          formData
        );
        uploadedImages.push(response.data.secure_url);
      } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
      }
    }
    return uploadedImages; // Return the array of uploaded image URLs
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Check if adding new files exceeds the max limit
    if (imagePreviews.length + files.length > maxImages) {
      setError(`You can only upload a maximum of ${maxImages} images.`);
      return;
    }

    const previewUrls = files.map((file) => URL.createObjectURL(file)); // Create local previews for UX
    setImagePreviews((prev) => [...prev, ...previewUrls]); // Show local previews immediately
    setUploadedFiles((prev) => [...prev, ...files]); // Store original files for backend upload
    setError(""); // Clear error if images are within limit
  };

  const submitImages = async () => {
    // below to be uncommented* cookie
    // const token = localStorage.getItem("token");

    // if (!token) {
    //   setError("You must be logged in to submit images.");
    //   return;
    // }

    // Upload images to Cloudinary
    // const uploadedImageUrls = await uploadToCloudinary(uploadedFiles);
    // if (uploadedImageUrls.length === 0) {
    //   setError("Failed to upload images to Cloudinary.");
    //   return;
    // }

    try {

      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to submit images.");
        return;
      }

      // Upload images to Cloudinary
      const uploadedImageUrls = await uploadToCloudinary(uploadedFiles);
      if (uploadedImageUrls.length === 0) {
        setError("Failed to upload images to Cloudinary.");
        return;
      }
      // const uploadedImageUrls = ["https://res.cloudinary.com/dlzrtaoew/image/upload/v1732058976/wt2ohh8pjt9jcsinlgcn.png"]
      // Convert image URLs to File objects
      const files = await Promise.all(
        uploadedImageUrls.map(async (url) => {
          const response = await fetch(url); // Fetch the image data
          const blob = await response.blob(); // Convert response to a blob
          const file = new File([blob], "image.jpg", { type: "image/jpeg" }); // Create a File object
          return file;
        })
      );

      // Prepare FormData for the predict API
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file)); // Append the converted files

      // Send files to the predict API
      const response = await axios.post(
        "http://localhost:8001/users/upload-fridge-images", // Backend endpoint
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("API Response Data:", response.data);
      console.log("******************************")

      console.log(response.data.ingredients);
      setIngredients(response.data.ingredients.map(item => item.ingredient));

      const ingredientList = response.data.ingredients.map(item => item.ingredient);
      console.log("Extracted Ingredients:", ingredientList);

      const generatedRecipeResponse = await fetch("http://127.0.0.1:5000/generate-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ ingredients: ingredientList }), // Convert the body to JSON
      });

      if (!generatedRecipeResponse.ok) {
        throw new Error("Failed to generate recipe");
      }

      // Fetching the data
      try {
        const generatedRecipeResponse = await fetch("http://127.0.0.1:5000/generate-recipe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ ingredients: ingredientList }),
        });

        if (!generatedRecipeResponse.ok) {
          throw new Error("Failed to generate recipe");
        }

        const recipeData = await generatedRecipeResponse.json();
        console.log("Generated Recipe Data:", recipeData); // Log the entire response

        // Assuming the response contains the recipe directly or under a 'recipes' key
        // console.log("Type of recipeData.data:", typeof recipeData.data); // Logs the type
        // console.log("Is recipeData.data an array?", Array.isArray(recipeData.data)); // Check if it's an array
        // console.log("Content of recipeData.data:", recipeData.data); // Logs the content


        setRecipe(recipeData.recipes);
        console.log(recipeData)

      } catch (error) {
        console.error("Error fetching recipe data:", error);
      }




      // Estimate Calories
      const ingredientListString = ingredientList.join(", "); // Create comma-separated string from ingredients

      console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++")
      console.log(ingredientListString)

      const responsewow = await axios.post(
        "http://127.0.0.1:4000/calculate-calories",
        { ingredients: ingredientListString },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      // Handle the API response
      if (responsewow.data && responsewow.data.calorie_breakdown) {
        setCalories(responsewow.data.calorie_breakdown); // Set the returned calorie information
      } else {
        setCalories("Calories information not available.");
      }

      console.log(responsewow.data.calorie_breakdown)


      // const estimatedCalories = estimateCalories(responsewow.data.ingredients);
      // setCalories(estimatedCalories);

      // const generatedRecipeResponse = await axios.post(
      //   "http://localhost:5000/generate-recipe", // Flask endpoint for recipe generation
      //   { ingredients: ingredientList }
      // );

      // console.log("Generated Recipe Data:", generatedRecipeResponse.data);
      // setRecipe(generatedRecipeResponse.data.recipes); // Assuming the response contains the recipe under 'recipes'

      console.log("*********************************")
      console.log("Predictions Array:", response.data.predictions);

      // const predictions = response.data.predictions;

      // const predictions = response.data && response.data.predictions;
      const predictions = response.data?.predictions;
      console.log("Type of predictions:", typeof predictions);

    } catch (error) {
      console.error("Error predicting ingredientsss:", error);
      setError("Failed to get predictions from the model.");
    }
  };

  // Handle "Estimate Calories" functionality
  // const estimateCalories = async () => {
  //   const ingredientListString = ingredients.join(", "); // Create comma-separated string from ingredients

  //   try {
  //     const response = await axios.post(
  //       "http://127.0.0.1:4000/calculate-calories",
  //       { ingredients: ingredientListString },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     // Handle the API response
  //     if (response.data && response.data.calories) {
  //       setCalories(response.data.calories); // Set the returned calorie information
  //     } else {
  //       setCalories("Calories information not available.");
  //     }
  //   } catch (error) {
  //     console.error("Error calculating calories:", error);
  //     setCalories("Failed to estimate calories.");
  //   }
  // };


  const getIngredientName = (classId) => {
    const ingredientNames = {
      7: "banana",
      24: "beans",
      10: "beetroot",
      13: "bittergourd",
      6: "bottlegourd",
      12: "bread",
      20: "cabbage",
      21: "capsicum",
      22: "carrot",
      4: "cauliflower",
      2: "cheese",
      1: "chicken",
      5: "coriander",
      14: "curd",
      3: "egg",
      15: "eggplant",
      16: "fenugreek_leaves",
      8: "ladyfinger",
      19: "lemon",
      17: "milk",
      18: "paneer",
      23: "peas",
      9: "potato",
      11: "spinach",
      25: "tomato",
      // Add all ingredient mappings here based on your model's class IDs
    };

    return ingredientNames[classId] || "Unknown"; // Return the ingredient name or 'Unknown' if not mapped
  };

  return (
    <div className="upload-container">
      <Link to="/">
        <img src={home} alt="" className="home-icon" />
      </Link>
      <div className="upload-card">
        <h2 className="upload-title">Upload Fridge Images</h2>
        <p className="upload-description">
          Upload up to {maxImages} images of your fridge for analysis.
        </p>

        {error && <div className="upload-error">{error}</div>}

        <div className="file-input-container">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
            id="fileInput"
          />
          <label htmlFor="fileInput" className="file-input-label">
            <i className="file-input-icon fas fa-upload"></i>
            &nbsp; Click here or drag and drop images to upload
          </label>
        </div>

        <div className="image-preview-grid">
          {imagePreviews.map((imgSrc, index) => (
            <div key={index} className="image-preview">
              <img src={imgSrc} alt={`Preview ${index + 1}`} />
            </div>
          ))}
        </div>

        <button onClick={submitImages} className="submit-button">
          Submit Images
        </button>
        {/* Render ingredients */}
        {/* {ingredients.length > 0 && (
          <div className="ingredients-list">
            <h3>Detected Ingredients:</h3>
            <ul>
              {ingredients.map((item, index) => (
                <li key={index}>
                  {item.ingredient} - Confidence: {item.confidence.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        )} */}
        <h3>Ingredients:</h3>
        {ingredients.length > 0 ? (
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        ) : (
          <p>No ingredients to display.</p>
        )}
      </div>

      <div className="recipe-box">
        <h1>Generated Recipe:</h1>
        {recipe ? (
          <p>{recipe}</p> // Display the generated recipe
        ) : (
          <p>No recipe generated yet.</p>
        )}
      </div>




      {/* <div className="recipe-box">
        <h1>Generated Recipe:</h1>
        {recipe ? (
          <p>{recipe}</p> // Display the generated recipe
        ) : (
          <p>No recipe generated yet.</p>
        )}
      </div> */}

      {/* return ( */}
      {/* <div>
        <h1>Recipes</h1>
        {parsedRecipes.map((recipe, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h2>{recipe.title}</h2>
            <h3>Ingredients:</h3>
            <p>{recipe.ingredients}</p>
            <h3>Directions:</h3>
            <p>{recipe.directions}</p>
          </div>
        ))}
      </div> */}


      {/* ); */}

      <div className="calorie-box">
        <h1>Calorie Estimation:</h1>
        {calories ? (
          <p>{calories}</p> // Display the generated recipe
        ) : (
          <p>No calories generated yet.</p>
        )}
      </div>
      {calories && (
        <div className="calories-info">
          <h3>Estimated Calories:</h3>
          <p>{calories}</p>
        </div>
      )}
    </div>
  );
}

export default UploadImage;

////////////////// break

