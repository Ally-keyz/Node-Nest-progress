import { Document, Model } from "mongoose";
import { Message } from "../../types.js";
interface messageBluePrint extends Message, Document {
}
declare const messageModel: Model<messageBluePrint>;
export default messageModel;
//# sourceMappingURL=MessagesSchema.d.ts.map