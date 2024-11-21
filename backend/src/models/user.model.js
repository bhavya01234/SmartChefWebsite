import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, // Cloudinary URL
        },
        coverImage: {
            type: String, // Cloudinary URL
        },
        fridgeImages: [String],
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: true
        },
        refreshToken: {
            type: String
        },
        // New fields
        age: {
            type: Number
        },
        dietType: {
            type: String, // E.g., 'veg', 'non-veg', 'vegan', 'gluten-free'
            trim: true
        },
        foodAllergies: [String], // E.g., ['nuts', 'dairy']
        healthGoal: {
            type: String, // E.g., 'weight loss', 'muscle gain'
            trim: true
        },
        medicalCondition: {
            type: String, // E.g., 'diabetes', 'cholesterol'
            trim: true
        },
        numberOfServings: {
            type: Number
        },
        location: {
            type: String,
            trim: true
        },
        caloriePreference: {
            type: String, // E.g., 'high', 'low'
            trim: true
        },
        cookingTimeAvailability: {
            type: String, // E.g., 'quick', 'moderate', 'elaborate'
            trim: true
        },
        preferredCuisine: {
            type: String, // E.g., 'Indian', 'Italian'
            trim: true
        }
    },
    {
        timestamps: true
    }
);
//pre hook -> hook that helps us execute a piece of code just* before an action (here -> save)
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    // used function so this* identifies pw (thats what hooks are)
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    // sign - generates token
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)