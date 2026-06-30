import { isValidObjectId } from "mongoose"
import { Note } from "../models/note.model.js"
import { User } from "../models/user.model.js"
import { apiErrors } from "../utils/apiErrors.js"
import { apiResponse } from "../utils/apiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import { response } from "express"

const genrateNewAccesTokenandRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accesstoken = await user.genrateAccessToken()
        if (!accesstoken) {
            throw new apiErrors(501, "accesToken not genrated")
        }
        const refreshtoken = await user.genrateRefreshToken()
        if (!refreshtoken) {
            throw new apiErrors(501, "refersg token not genrated")
        }
        user.refreshtoken = refreshtoken
        await user.save({ validateBeforeSave: false })
        return { accesstoken, refreshtoken }

    } catch (error) {
        throw new apiErrors(501, error.message)
    }
}

const registerUser = asyncHandler(async (req, res) => {
    // 1. get fullname, email, username, password from req.body
    // 2. check all fields are not empty
    // 3. check if user already exists (by email or username)
    // 4. crate user Schema
    // 5. if not created retutn
    // 6. return response
    const { email, username, fullname, password } = req.body
    if ([email, username, fullname, password].some((feild) => feild.trim() == "")) {
        throw new apiErrors(401, "All feild must be rquired")
    }
    const existingUser = await User.findOne({ $or: [{ email }, { username }] })

    if (existingUser) {
        throw new apiErrors(401, "userAlreadyExist")
    }
    const createUser = await User.create({
        email,
        username,
        fullname,
        password,
    })

    if (!createUser) {
        throw new apiErrors(401, "user not created")
    }
    const user = await User.findById(createUser._id).select("-password -refreshtoken")


    return res
        .status(201)
        .json(new apiResponse(201, user, "user created suscessfuly"))



})
const loginUser = asyncHandler(async (req, res) => {
    // get email and username,password
    // check both are valid or not
    // then find user exist or not
    // if exist then check password
    // then genrate refreshtokan
    // and return response

    const { email, username, password } = req.body
    if ([email, username, password].some((feild) => feild.trim() == "")) {
        throw new apiErrors(401, "All feild must be rquired")
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] })
    if (!existingUser) {
        throw new apiErrors(401, "user need regestier")
    }

    const loggedinUser = await User.findById(existingUser._id).select("-password -refreshtoken")
    if (!loggedinUser) {
        throw new apiErrors(401, "user not found")
    }

    const checkValidpassword = await existingUser.isPasswordCorrect(password)
    if (!checkValidpassword) {
        throw new apiErrors(401, "password is not correct")
    }
    const { accesstoken, refreshtoken } = await genrateNewAccesTokenandRefreshToken(existingUser._id)
    if (!accesstoken && !refreshtoken) {
        throw new apiErrors(501, "server not genrated referesh token and accestoken")
    }
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(201)
        .cookie("accestoken", accesstoken, options)
        .cookie("refreshtoken", refreshtoken, options)
        .json(
            new apiResponse(200,
                {
                    user: loggedinUser,
                    accesstoken,
                    refreshtoken
                },
                "User loggedIn Successfully"
            )
        )


})
const upadteUser = asyncHandler(async (req, res) => {
    const userId = req.user?._id
    const { fullname, password, email } = req.body

    if (!userId) {
        throw new apiErrors(401, "useerId not  found")
    }
    if ([email, fullname].some((feild) => feild.trim() == "")) {
        throw new apiErrors(401, "All feild must be rquired")
    }


    const updateuser = await User.findByIdAndUpdate(userId, { email, fullname }, { new: true }).select("-password -refreshtoken")
    if (!updateuser) {
        throw new apiErrors(401, "user not updated")
    }



    return res
        .status(201)
        .json(new apiResponse(201, updateuser, "User updted Successfully"))

})
const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.user?._id


    if (!userId) {
        throw new apiErrors(401, "useerId not  found")
    }
    const deleteuser = await User.findByIdAndDelete(userId)
    if (!deleteuser) {
        throw new apiErrors(401, "user not deleted")
    }
    return res
        .status(201)
        .json(new apiResponse(201, {}, "User updted Successfully"))

})
const logoutUser = asyncHandler(async (req, res) => {
    // get userid from user req .params
    // then check 
    // then find database
    // then claer refreshtoken
    // 
    // then clear cookies
    const userId = req.user?._id


    if (!userId) {
        throw new apiErrors(401, "useerId not  found")
    }
    const logoutuser = await User.findByIdAndUpdate(userId, { $unset: { refreshtoken: 1 } }, { new: true })

    if (!logoutuser) {
        throw new apiErrors(401, "user is not logout")
    }
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(201)
        .clearCookie("accestoken",options)
        .clearCookie("refreshtoken",options)
        .json(new apiResponse(200, {}, "user LoggedOut"))

})
const upadtePassword = asyncHandler(async (req, res) => {
    // get old password and newPassword
    // find req.user._id
    // check both are exist or not
    // find user
    // then validate old password
    // then updte new password

   const userId = req.user?._id
    const{oldPassword,newPassword} = req.body
    if (!userId) {
        throw new apiErrors(401, "useerId not  found")
    }
    if ([newPassword,oldPassword].some((feild) => feild.trim() == "")) {
        throw new apiErrors(401, "All feild must be rquired")
    }

    const user = await User.findById(userId)
    if (!user) {
        throw new apiErrors(401,"user not found")
    }
    const checkValidpassword = await user.isPasswordCorrect(oldPassword)
    if (!checkValidpassword) {
        throw new apiErrors(401, "password is not correct")
    }
    user.password=newPassword
     await user.save({ validateBeforeSave: false })

     return res
     .status(201)
     .json(new apiResponse(201,{},"oassword is upadted"))

     
 })
const getCurrentUser = asyncHandler(async (req, res) => {
//  get userId from user
// thenfind in db
// then return 
const userId=req.user?._id

if (!isValidObjectId(userId)) {
    throw new apiErrors(401,"user  not found")
}
const user= await User.findById(userId).select("-password -refreshtoken")
if (!user) {
   throw new apiErrors(401,"user  not found") 
}

return res
        .status(201)
        .json(new apiResponse(201, user, "current user get suscessfuly"))


})

 

export {
    registerUser,
    loginUser,
    upadtePassword,
    upadteUser,
    deleteUser,
    logoutUser,
    getCurrentUser


}