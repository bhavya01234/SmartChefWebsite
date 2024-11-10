import React, { useState } from "react";
import axios from "axios";

function UploadImage() {
    const [imagePreviews, setImagePreviews] = useState([]); // Store image preview URLs
    const [error, setError] = useState(""); // State for error message
    const maxImages = 5;
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const uploadToCloudinary = async (files) => {
        const uploadedImages = [];

        for (const file of files) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "fridge");  // Use your correct preset here

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

        setImagePreviews((prev) => [...prev, ...uploadedImages]); // Update state with new previews
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
        uploadToCloudinary(files); // Upload to Cloudinary
        setError(""); // Clear error if images are within limit
    };

    // const handleImageChange = (e) => {
    //     const files = Array.from(e.target.files);

    //     // Check if adding new files exceeds the max limit
    //     if (imagePreviews.length + files.length > maxImages) {
    //         setError(`You can only upload a maximum of ${maxImages} images.`);
    //         return;
    //     }

    //     const previewUrls = files.map((file) => URL.createObjectURL(file)); // Create local previews for UX
    //     setImagePreviews((prev) => [...prev, ...previewUrls]); // Show local previews immediately
    //     uploadToCloudinary(files); // Upload to Cloudinary
    //     setError(""); // Clear error if images are within limit
    // };
    // const submitImages = async () => {
    //     const token = localStorage.getItem("token");

    //     if (!token) {
    //         setError("You must be logged in to submit images.");
    //         return;
    //     }

    //     // Use FormData to send actual files if the backend expects file uploads
    //     const formData = new FormData();
    //     imagePreviews.forEach((image, index) => formData.append(`image_${index}`, image));
    //     console.log("Submitting images:", imagePreviews);

    //     try {
    //         const response = await axios.post(
    //             "http://localhost:8001/users/upload-fridge-images",
    //             formData,
    //             {
    //                 headers: {
    //                     "Authorization": `Bearer ${token}`,
    //                     "Accept": "application/json",
    //                     "Content-Type": "multipart/form-data",  // Ensure multipart form if sending files
    //                 },
    //             }
    //         );

    //         console.log("Images successfully sent to backend:", response.data);
    //     } catch (error) {
    //         console.error("Error sending images to backend:", error);
    //         setError("Failed to upload images. Please try again.");
    //     }
    // };
    const submitImages = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("You must be logged in to submit images.");
            return;
        }

        // Use FormData to send actual files if the backend expects file uploads
        const formData = new FormData();
        uploadedFiles.forEach((file, index) => formData.append(`images`, file)); // Append each file

        try {
            const response = await axios.post(
                "http://localhost:8001/users/upload-fridge-images",
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Accept": "application/json",
                        "Content-Type": "multipart/form-data", // Required for file uploads
                    },
                }
            );

            console.log("Images successfully sent to backend:", response.data);
        } catch (error) {
            console.error("Error sending images to backend:", error);
            setError("Failed to upload images. Please try again.");
        }
    };

    // Function to send image URLs to backend
    // const submitImages = async () => {
    //     const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

    //     if (!token) {
    //         setError("You must be logged in to submit images.");
    //         return;
    //     }

    //     try {
    //         // const token = localStorage.getItem('token');
    //         // console.log("token is presentt :   ", token);
    //         const response = await axios.post(
    //             "http://localhost:8001/users/upload-fridge-images",
    //             {
    //                 images: imagePreviews,  // Send the image URLs
    //             },

    //             {
    //                 headers: {
    //                     Accept: 'application/json',
    //                     'Content-Type': 'application/json',
    //                     Authorization: `Bearer ${token}` // Add the token in the header
    //                 },
    //             }
    //         );

    //         console.log("Images successfully sent to backend:", response.data);
    //     } catch (error) {
    //         console.error("Error sending images to backend:", error);
    //         setError("Failed to upload images. Please try again.");
    //     }
    // };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Upload Fridge Images</h2>
                <p className="text-center text-gray-500 mb-4">
                    Upload up to {maxImages} images of your fridge for analysis.
                </p>

                {/* Error message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-600 text-center rounded-md">
                        {error}
                    </div>
                )}

                <div className="border-dashed border-2 border-gray-300 p-6 rounded-lg mb-4 text-center cursor-pointer">
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                        id="fileInput"
                    />
                    <label htmlFor="fileInput" className="block text-gray-600">
                        Click here or drag and drop images to upload
                    </label>
                </div>

                {/* Displaying selected image previews */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {imagePreviews.map((imgSrc, index) => (
                        <div key={index} className="relative w-full h-32 rounded overflow-hidden">
                            <img src={imgSrc} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>

                <div className="mt-4 text-center">
                    <button
                        onClick={submitImages}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Submit Images
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UploadImage;


// import React, { useState } from "react";
// import axios from "axios";

// // import dotenv from "dotenv"

// // dotenv.config({
// //     path: './.env'
// // })

// function UploadImage() {
//     const [imagePreviews, setImagePreviews] = useState([]); // Store image preview URLs
//     const [error, setError] = useState(""); // State for error message
//     const maxImages = 5;

//     const uploadToCloudinary = async (files) => {
//         const uploadedImages = [];

//         for (const file of files) {
//             const formData = new FormData();
//             formData.append("file", file);
//             formData.append("upload_preset", "fridge");
//             // process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET (instead of fridge)

//             try {
//                 const response = await axios.post(
//                     // ${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
//                     `https://api.cloudinary.com/v1_1/dlzrtaoew/image/upload`,
//                     formData
//                 );
//                 uploadedImages.push(response.data.secure_url);
//             } catch (error) {
//                 console.error("Error uploading to Cloudinary:", error);
//             }
//         }

//         setImagePreviews((prev) => [...prev, ...uploadedImages]); // Update state with new previews
//     };

//     const handleImageChange = (e) => {
//         const files = Array.from(e.target.files);

//         // Check if adding new files exceeds the max limit
//         if (imagePreviews.length + files.length > maxImages) {
//             setError(`You can only upload a maximum of ${maxImages} images.`);
//             return;
//         }

//         const previewUrls = files.map((file) => URL.createObjectURL(file)); // Create local previews for UX
//         setImagePreviews((prev) => [...prev, ...previewUrls]); // Show local previews immediately
//         uploadToCloudinary(files); // Upload to Cloudinary
//         setError(""); // Clear error if images are within limit
//     };
//     // Function to send image URLs to backend
//     const submitImages = async () => {
//         try {
//             const response = await axios.post("http://localhost:8001/users/upload-fridge-images", {
//                 images: imagePreviews,
//             });
//             console.log("Images successfully sent to backend:", response.data);
//         } catch (error) {
//             console.error("Error sending images to backend:", error);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//             <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
//                 <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Upload Fridge Images</h2>
//                 <p className="text-center text-gray-500 mb-4">
//                     Upload up to {maxImages} images of your fridge for analysis.
//                 </p>

//                 {/* Error message */}
//                 {error && (
//                     <div className="mb-4 p-3 bg-red-100 text-red-600 text-center rounded-md">
//                         {error}
//                     </div>
//                 )}

//                 <div className="border-dashed border-2 border-gray-300 p-6 rounded-lg mb-4 text-center cursor-pointer">
//                     <input
//                         type="file"
//                         accept="image/*"
//                         multiple
//                         onChange={handleImageChange}
//                         className="hidden"
//                         id="fileInput"
//                     />
//                     <label htmlFor="fileInput" className="block text-gray-600">
//                         Click here or drag and drop images to upload
//                     </label>
//                 </div>

//                 {/* Displaying selected image previews */}
//                 <div className="grid grid-cols-2 gap-4 mt-4">
//                     {imagePreviews.map((imgSrc, index) => (
//                         <div key={index} className="relative w-full h-32 rounded overflow-hidden">
//                             <img src={imgSrc} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
//                         </div>
//                     ))}
//                 </div>

//                 <div className="mt-4 text-center">
//                     <button
//                         onClick={submitImages}
//                         //  => console.log("Submit images to backend or further processing")
//                         className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                     >
//                         Submit Images
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default UploadImage;
