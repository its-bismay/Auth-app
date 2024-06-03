import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    profilePicture:{
        type: String,
        default: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1717429309~exp=1717432909~hmac=a2c6208055135a425810a48b7c2578adfbc89cf97850b9a31f325791b5c52778&w=740",
    },
}, {timestamps: true});


const User = mongoose.model('User', userSchema);

export default User;