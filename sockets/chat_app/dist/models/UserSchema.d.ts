import { Document, Model } from "mongoose";
import { User } from "../../types.js";
interface UserBluePrint extends User, Document {
}
declare const userModel: Model<UserBluePrint>;
export default userModel;
//# sourceMappingURL=UserSchema.d.ts.map