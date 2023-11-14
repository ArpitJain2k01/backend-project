import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema= new Schema(
    {
        username:{
            type:String,
            required:true,
            trim:true,
            lowercase:true,
            unique:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            trim:true,
            lowercase:true,
            unique:true
        },
        fullName:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String, //cloudinary url
            required:true
        },
        coverImage:{
            type:String
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type:String,
            required:[true, 'Password is required']
        },
        refreshToken:{
            type:String
        }
    },
    {
        timestamps:true
    }
)
//pre will encrypt the password just before saving.
//dont use arrow function since it doesnot have access to this keyword
//we dont want to change the password everytime there is a change in any part of userschema. we want to change only when password gets changed

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()

    this.password= bcrypt.hash(this.password,10)
    next()
})

//just like findOne or findOneandDelete, we can also write our custom method or our modal 

//method to check the password
userSchema.methods.isPasswordCorrect= async function(password){
    return await bcrypt.compare(password,this.password)
}

//Method to generate access token
userSchema.methods.generateAccessToken= function (){
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullName : this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

//Method to generate refresh token
userSchema.methods.generateRefreshToken= function (){
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User= mongoose.model("User",userSchema)