import cloudinary from '../config/cloudinary/config.js';
import { User } from '../models/user.model.js';

// Function to upload multiple fridge images to Cloudinary and save URLs in User model
export const uploadFridgeImages = async (req, res) => {

    try {
        console.log("straww_________")

        const userId = req.user._id;  // Get the logged-in user's ID (assuming you are using a middleware for JWT verification)

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
                folder: 'fridge_images',  // Store in 'fridge_images' folder in Cloudinary
                resource_type: 'image',   // Ensure it's an image
            });

            // Push the secure URL of the uploaded image to the array
            imageUrls.push(result.secure_url);
        }

        // Update the user with the new fridge image URLs (assuming you want to save the image URLs on the user model)
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Assuming you have a 'fridgeImages' field in the User model to store the URLs
        user.fridgeImages = imageUrls;  // You can also append the new images if needed

        await user.save();

        // Return success response with the image URLs
        res.status(200).json({
            message: 'Images uploaded successfully',
            images: imageUrls,
        });
    } catch (error) {
        console.error('Error uploading images to Cloudinary:', error);
        res.status(500).json({ message: 'Error uploading images', error });
    }
};
