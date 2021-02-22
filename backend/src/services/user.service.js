import { User } from "../models/User";
import { decryptText } from "../utils";

export async function getUserToken(user) {
  var user_data = await User.findById(user._id)
    .then((user) => user)
    .catch((err) => console.error(err));
  return decryptText(user_data.token);
}
