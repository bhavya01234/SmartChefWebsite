import cloudinary from '../config/cloudinary/config.js';
import { User } from '../models/user.model.js';
import { Blob } from 'buffer';
import axios from 'axios';

/*
// Function to upload multiple fridge images to Cloudinary and save URLs in User model
export const uploadFridgeImages = async (req, res) => {

    // try {
    //     console.log("straww_________")

    //     const userId = req.user._id;  // Get the logged-in user's ID (assuming you are using a middleware for JWT verification)

    //     // Check if images are present
    //     if (!req.files || req.files.length === 0) {
    //         return res.status(400).json({ message: 'Please upload at least one image.' });
    //     }

    //     // Array to store uploaded image URLs
    //     const imageUrls = [];

    //     // Loop through each file and upload to Cloudinary
    //     for (const file of req.files) {
    //         // Upload to Cloudinary
    //         const result = await cloudinary.uploader.upload(file.path, {
    //             folder: 'fridge_images',  // Store in 'fridge_images' folder in Cloudinary
    //             resource_type: 'image',   // Ensure it's an image
    //         });

    //         // Push the secure URL of the uploaded image to the array
    //         imageUrls.push(result.secure_url);
    //     }

    //     // Update the user with the new fridge image URLs (assuming you want to save the image URLs on the user model)
    //     const user = await User.findById(userId);
    //     if (!user) {
    //         return res.status(404).json({ message: 'User not found' });
    //     }

    //     // Assuming you have a 'fridgeImages' field in the User model to store the URLs
    //     user.fridgeImages = imageUrls;  // You can also append the new images if needed

    //     await user.save();

    //     // Return success response with the image URLs
    //     res.status(200).json({
    //         message: 'Images uploaded successfully',
    //         images: imageUrls,
    //     });
    // } catch (error) {
    //     console.error('Error uploading images to Cloudinary:', error);
    //     res.status(500).json({ message: 'Error uploading images', error });
    // }

    try {
        const userId = req.user._id; // Get the logged-in user's ID (JWT middleware)

        // Check if images are present
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'Please upload at least one image.' });
        }

        // Array to store uploaded image URLs
        const imageUrls = [];

        // Loop through each file and upload to Cloudinary
        for (const file of req.files) {
            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(file.path, {
                folder: 'fridge_images', // Store in 'fridge_images' folder in Cloudinary
                resource_type: 'image',  // Ensure it's an image
            });

            // Push the secure URL of the uploaded image to the array
            imageUrls.push(result.secure_url);
        }

        // Send the image URLs to the model API for prediction
        const response = await axios.post(
            "http://127.0.0.1:5001/predict", // Model API endpoint
            { images: imageUrls }
        );

        // Assuming predictions are returned as { predictions: [{ bbox, class, score }, ...] }
        const predictions = response.data.predictions;

        // Map class ids to ingredient names
        const ingredientList = predictions.map((prediction) => ({
            ingredient: getIngredientName(prediction.class),
            confidence: prediction.score,
        }));

        // Send the predictions back to the frontend
        res.status(200).json({
            message: 'Images uploaded and predictions retrieved successfully',
            ingredients: ingredientList,
        });
    } catch (error) {
        console.error('Error uploading images or getting predictions:', error);
        res.status(500).json({ message: 'Error uploading images or getting predictions', error });
    }



    // Helper function to map class id to ingredient name
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

        return ingredientNames[classId] || 'Unknown'; // Return the ingredient name or 'Unknown' if not mapped
    };
*/

// Controller to handle fridge image upload
export const uploadFridgeImages = async (req, res) => {
    try {
        // Modify your backend to check for 'image' in the body of the request
        // if (!req.body.image) {
        //     return res.status(400).json({ message: 'Please provide an image URL.' });
        // }
        // console.log("debigg")
        // const userId = req.user._id; // Get the logged-in user's ID (JWT middleware)

        // Check if images are present
        // if (!req.files || req.files.length === 0) {
        //     return res.status(400).json({ message: 'Please upload at least one image.' });
        // }

        // Array to store uploaded image URLs
        // const imageUrls = [];

        // Loop through each file and upload to Cloudinary
        // for (const file of req.files) {
        //     // Upload to Cloudinary
        //     const result = await cloudinary.uploader.upload(file.path, {
        //         folder: 'fridge_images', // Store in 'fridge_images' folder in Cloudinary
        //         resource_type: 'image',  // Ensure it's an image
        //     });

        //     // Push the secure URL of the uploaded image to the array
        //     imageUrls.push(result.secure_url);
        // }

        // Send the image URLs to the model API for prediction
        // const response = await axios.post(
        //     "http://127.0.0.1:5001/predict", // Model API endpoint
        //     { images: imageUrls }
        // );
        const userId = req.user._id;
        if (!userId) {
            return res.status(400).json({ message: "No user logged in haw" });
        }
        const files = req.files; // Access uploaded files
        if (!files || files.length === 0) {
            return res.status(400).json({ message: "No files provided." });
        }
        files.forEach((file) => {
            console.log({
                fieldname: file.fieldname,
                originalname: file.originalname,
                bufferExists: !!file.buffer,
                size: file.size,
            });
        });
        console.log(typeof files, files);
        // const predictions = await Promise.all(
        //     files.map(async (file) => {
        //         try {
        //             const formData = new FormData();
        //             formData.append("image", file.buffer, file.originalname);

        //             const response = await axios.post("http://127.0.0.1:5001/predict", formData, {
        //                 headers: { "Content-Type": "multipart/form-data" },
        //             });

        //             return response.data; // Return prediction results
        //         } catch (err) {
        //             console.error(`Error processing file ${file.originalname}:`, err.message);
        //             throw err; // Re-throw error to propagate to the outer try-catch
        //         }
        //     })
        // );
        const predictions = await Promise.all(
            files.map(async (file) => {
                // Convert buffer to Blob
                const blob = new Blob([file.buffer], { type: file.mimetype });

                const formData = new FormData();
                formData.append("image", blob, file.originalname);

                // Send file to Flask API
                const response = await axios.post("http://127.0.0.1:5001/predict", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                console.log(response.data)
                // const predictionsFromApi = response.data[0]?.predictions || []; // Access predictions

                // return predictionsFromApi;
                // console.log(response.data)

                return response.data; // Return prediction results
            })
        );
        const nestedPredictions = predictions; // Ensure you get an empty array if predictions are missing
        console.log("helooooooo", nestedPredictions)
        // Check if the nested predictions array is not empty
        if (nestedPredictions.length === 0) {
            console.error("No predictions found in the response.");
            setError("No predictions found.");
            return;
        }

        // Access the first element of the outer predictions array
        const innerPredictions = nestedPredictions[0].predictions || []; // Access the inner predictions array

        // Check if inner predictions is an array
        if (!Array.isArray(innerPredictions) || innerPredictions.length === 0) {
            console.error("No inner predictions found.");
            setError("No inner predictions found.");
            return;
        }

        // Map the inner predictions to ingredient names
        const ingredientList = innerPredictions.map((prediction) => ({
            ingredient: getIngredientName(prediction.class), // Get ingredient name from the class
            confidence: prediction.score, // Get confidence score
        }));

        console.log("Predictionsssssss:", ingredientList);
        // const predictions = await Promise.all(
        //     files.map(async (file) => {
        //         // Pass file directly to predict API
        //         const formData = new FormData();
        //         formData.append("image", file.buffer, file.originalname);

        //         const response = await axios.post("http://127.0.0.1:5001/predict", formData, {
        //             headers: { "Content-Type": "multipart/form-data" },
        //         });

        //         return response.data; // Return prediction results
        //     })
        // );
        if (!predictions || !Array.isArray(predictions)) {
            throw new Error("Predictions are missing or not an array.");
        }

        console.log("cute_____________________")
        // console.log(predictions);
        // Assuming predictions are returned as { predictions: [{ bbox, class, score }, ...] }
        // const predictions = response.data.predictions;

        // Map class ids to ingredient names
        // const ingredientList = predictions.map((prediction) => ({
        //     ingredient: getIngredientName(prediction.class),
        //     confidence: prediction.score,
        // }));

        //////////////
        // const allPredictions = predictions.flat(); // Flatten nested array if needed
        // console.log("allpredss_________", allPredictions)
        // if (!allPredictions || allPredictions.length === 0) {
        //     throw new Error("Predictions are missing or empty.");
        // }

        // // Map the predictions to ingredient names
        // const ingredientList = allPredictions.map((prediction) => ({
        //     ingredient: getIngredientName(prediction.class),
        //     confidence: prediction.score,
        // }));

        // console.log(ingredientList)

        ////////////////////////
        // Send the predictions back to the frontend
        res.status(200).json({
            message: 'Images uploaded and predictions retrieved successfully',
            ingredients: ingredientList,
        });
    } catch (error) {
        console.error('Error uploading images or getting predictions:', error);
        res.status(500).json({ message: 'Error uploading images or getting predictions', error });
    }
};

// Helper function to map class id to ingredient name
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

    return ingredientNames[classId] || 'Unknown'; // Return the ingredient name or 'Unknown' if not mapped
};