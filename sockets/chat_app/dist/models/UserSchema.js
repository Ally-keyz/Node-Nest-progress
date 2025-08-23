import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    Id: { type: String, required: true },
    userName: { type: String, required: true },
    isActive: { type: Boolean, required: true },
});
const userModel = mongoose.model("Users", userSchema);
export default userModel;
//# sourceMappingURL=UserSchema.js.map