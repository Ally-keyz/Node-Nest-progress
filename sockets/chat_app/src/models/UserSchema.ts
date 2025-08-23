import mongoose, {Document , Model} from "mongoose";
import { User } from "../../types.js";

interface UserBluePrint extends User , Document {}

const userSchema = new mongoose.Schema<UserBluePrint>({
    Id:{type:String , required:true},
    userName :{type:String , required:true},
    isActive: {type:Boolean , required: true},
});


const userModel: Model<UserBluePrint> = mongoose.model("Users",userSchema);

export default userModel