import React, { useEffect, useState } from "react";
import "./Profile.css";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaBirthdayCake,
  FaUtensils,
  FaHeartbeat,
  FaMapMarkerAlt,
  FaClock,
  FaCarrot,
  FaFlag,
} from "react-icons/fa";
import { toast } from "react-toastify"; // Optional for better notifications
import back from "../images/back.png";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [foodAllergyInput, setFoodAllergyInput] = useState("");

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:8001/users/get-profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setUser(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Failed to load profile!");
      }
    };
    fetchUser();
  }, [token]);

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8001/users/update-profile",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
          
        }
      );
      console.log(JSON.stringify(user));

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      toast.success("Profile updated successfully!");
      window.alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile!");
    }
    window.scrollTo(0, 0);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleAddAllergy = () => {
    if (foodAllergyInput.trim()) {
      setUser({
        ...user,
        foodAllergies: [...(user.foodAllergies || []), foodAllergyInput],
      });
      setFoodAllergyInput(""); // Clear input after adding
    }
  };

  const handleRemoveAllergy = (index) => {
    const updatedAllergies = user.foodAllergies.filter((_, i) => i !== index);
    setUser({ ...user, foodAllergies: updatedAllergies });
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-page">
        <Link to="/" className="back-button" >
        <img src={back} width="10%"/>
      </Link>
    <div className="profile-container">
      <h1 className="profile-heading">My Profile</h1>
      <form className="profile-form" onSubmit={handleUpdate}>
      <div className="form-group">
  <label htmlFor="fullName">Full Name</label>
  <FaUser className="form-icon" />
  <input
    type="text"
    id="fullName"
    name="fullName"
    value={user.fullName || ""}
    onChange={handleChange}
    placeholder="Enter your full name"
    required
  />
</div>

        
        <div className="form-group">
        <label htmlFor="fullName">User Name</label>
          <FaUser className="form-icon" />
          <input
            type="text"
            name="username"
            value={user.username || ""}
            onChange={handleChange}
            placeholder="User name"
            required
          />
        </div>
        <div className="form-group">
        <label htmlFor="fullName">Email</label>
          <FaEnvelope className="form-icon" />
          <input
            type="email"
            name="email"
            value={user.email || ""}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
        <label htmlFor="fullName">Age</label>
          <FaBirthdayCake className="form-icon" />
          <input
            type="number"
            name="age"
            value={user.age || ""}
            onChange={handleChange}
            placeholder="Age"
          />
        </div>
        <div className="form-group">
        <label htmlFor="fullName">Diet Type</label>
          <FaUtensils className="form-icon" />
          <input
            type="text"
            name="dietType"
            value={user.dietType || ""}
            onChange={handleChange}
            placeholder="Diet Type (e.g., veg, vegan)"
          />
        </div>
        <div className="form-group">
        <label htmlFor="fullName">Food Allergy</label>
          <FaCarrot className="form-icon" />
          <div className="allergy-input-container">
            <input
              type="text"
              value={foodAllergyInput}
              onChange={(e) => setFoodAllergyInput(e.target.value)}
              placeholder="Enter a food allergy"
            />
            <button type="button" onClick={handleAddAllergy}>
              Add
            </button>
          </div>
        </div>
        <div className="food-allergies-list">
          {user.foodAllergies?.map((allergy, index) => (
            <span key={index} className="allergy-item">
              {allergy}
              <button
                type="button"
                onClick={() => handleRemoveAllergy(index)}
              >
                &times;
              </button>
            </span>
          ))}
        </div>

        <div className="form-group">
        <label htmlFor="fullName">Health Goal</label>
          <FaHeartbeat className="form-icon" />
          <input
            type="text"
            name="healthGoal"
            value={user.healthGoal || ""}
            onChange={handleChange}
            placeholder="Health Goal (e.g., weight loss)"
          />
        </div>
        <div className="form-group">
        <label htmlFor="fullName">Medical Condition</label>
          <FaFlag className="form-icon" />
          <input
            type="text"
            name="medicalCondition"
            value={user.medicalCondition || ""}
            onChange={handleChange}
            placeholder="Medical Condition"
          />
        </div>
        <div className="form-group">
        <label htmlFor="fullName">Location</label>
          <FaMapMarkerAlt className="form-icon" />
          <input
            type="text"
            name="location"
            value={user.location || ""}
            onChange={handleChange}
            placeholder="Location"
          />
        </div>
        <div className="form-group">
        <label htmlFor="fullName">Cooking Time Availability</label>
          <FaClock className="form-icon" />
          <input
            type="text"
            name="cookingTimeAvailability"
            value={user.cookingTimeAvailability || ""}
            onChange={handleChange}
            placeholder="Cooking Time Availability"
          />
        </div>
        <div className="form-group">
        <label htmlFor="fullName">Calorie Preference</label>
          <FaHeartbeat className="form-icon" />
          <input
            type="text"
            name="caloriePreference"
            value={user.caloriePreference || ""}
            onChange={handleChange}
            placeholder="Calorie Preference (e.g., 2000 kcal)"
          />
        </div>
        <div className="form-group">
        <label htmlFor="fullName">Number of Servings</label>
          <FaUtensils className="form-icon" />
          <input
            type="number"
            name="numberOfServings"
            value={user.numberOfServings || ""}
            onChange={handleChange}
            placeholder="Number of Servings"
          />
        </div>

        <div className="form-group">
        <label htmlFor="fullName">Preferred Cuisine</label>
          <FaCarrot className="form-icon" />
          <input
            type="text"
            name="preferredCuisine"
            value={user.preferredCuisine || ""}
            onChange={handleChange}
            placeholder="Preferred Cuisine"
          />
        </div>
        <button type="submit" className="update-button">
          Update Profile
        </button>
      </form>
    </div>
    </div>
  );
};

export default Profile;
