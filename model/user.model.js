import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    email:{type:String,
        require:[true,"email is required"],
        unique:[true,"email already exist"]
    },
    UserName:{type:String,
        require:[true,"UserName is required"],
        unique:[true,"UserName already exist"]
    },
    password:{type:String,
        require:[true,"password is required"]
    },
    phone:{type:String,
        require:[true,"phone is required"],
        unique:[true,"phone already exist"]
    }
})
export default mongoose.model.Users||mongoose.model("User",userSchema)
