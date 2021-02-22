import { get } from "lodash";
import { AuthService } from "./auth.service";

/* 
Middleware to check user authentication via cookies. 
Requires client to send request with `credential=true`
*/
const AuthMiddleware = async (req, res, next) => {
  const token = get(req, "cookies.token");
  if (!token) {
    return res.status(403).json({
      status: 403,
      message: "FORBIDDEN",
    });
  }

  const refreshToken = await new AuthService().getSession({ token });
  const user = get(refreshToken, "user", null);

  if (!user) {
    return res.status(401).json({
      status: 401,
      message: "UNAUTHORIZED",
    });
  }
  req.user = user;
  return next();
};

export { AuthMiddleware };
