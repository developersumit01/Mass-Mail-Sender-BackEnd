import { User } from "../models/user.model.js";
import APIError from "../utils/APIError.js";
import APIResponce from "../utils/APIResponce.js";
import asyncHandler from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (user) {
        throw new APIError(
            402,
            "User with this email is allready registered!!"
        );
    }
    const newUser = await User.create({ name, email, password });
    if (!newUser) {
        throw new APIError(
            500,
            "Their is some server error while registration"
        );
    }
    res.status(201).send(new APIResponce(201, "Registration successfull"));
});

export { registerUser };
