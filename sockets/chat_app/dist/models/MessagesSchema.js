import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    content: { type: String, required: true },
    timeStamp: { type: Date, default: Date.now() }
});
const messageModel = mongoose.model("Messages", messageSchema);
export default messageModel;
//# sourceMappingURL=MessagesSchema.js.map