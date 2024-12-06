import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    lessSecurePassword: {
        type: String,
    },
    otp: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
    accessToken: {
        type: String,
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
userSchema.pre("save", async function (next) {
    if (!this.isModified("lessSecurePassword")) return next();
    if (!this.lessSecurePassword.length <= 0) return next();
    this.lessSecurePassword = await bcrypt.hash(this.lessSecurePassword, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.REFRESH_TOKEN_KEY,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};
userSchema.methods.generateAccessTeken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.ACCESS_TOKEN_KEY,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};
export const User = mongoose.model("User", userSchema);
