import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bycrpt from "bcrypt"


const Userschema = new Schema({
    fullname: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true

    },
    password: {
        type: String,
        required: true,

        

    },
    avtar: {
        type: String,
    



    }
    , refreshtoken: {
        type: String,
        lowercase: true,
        unique: true

    }


}, { timestamps: true })

Userschema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bycrpt.hash(this.password, 10)


})

Userschema.methods.isPasswordCorrect = async function (password) {
    return await bycrpt.compare(password, this.password)
}

Userschema.methods.genrateAccessToken = async function () {
   return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,

        }, process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )


}
Userschema.methods.genrateRefreshToken = async function () {
   return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        })


}


export const User = mongoose.model("User", Userschema)
