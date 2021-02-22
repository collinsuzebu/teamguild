import crypto from "crypto";
import jwt from "jsonwebtoken";
import { IV_PLAIN, TOKEN_ENCRYPTION_KEY } from "./config";

const getBearerToken = (authHeader) => {
  var token = authHeader.split(" ")[1];
  return token;
};

const verifyTokenAndGetUID = (token) => {
  var result = jwt.verify(token, "SECRET");
  return result.userId;
};

const isUserAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({
      status: 403,
      message: "FORBIDDEN",
    });
  } else {
    const token = getBearerToken(authHeader);

    if (token) {
      return verifyTokenAndGetUID(token)
        .then((userId) => {
          res.locals.auth = { userId };
          next();
        })
        .catch((err) => {
          return res.status(401).json({
            status: 401,
            message: "UNAUTHORIZED",
          });
        });
    } else {
      return res.status(403).json({
        status: 403,
        message: "FORBIDDEN",
      });
    }
  }
};

const randomBytes = (size = 48) => {
  return crypto.randomBytes(size).toString("hex").slice(0, size);
};

function encryptText(text) {
  const encrypt = crypto.createCipheriv(
    "aes-128-cbc",
    TOKEN_ENCRYPTION_KEY,
    IV_PLAIN
  );
  encrypt.setAutoPadding(true);
  let hex = encrypt.update(text, "ascii", "hex");
  hex += encrypt.final("hex");
  return hex;
}

function decryptText(text) {
  const decrypt = crypto.createDecipheriv(
    "aes-128-cbc",
    TOKEN_ENCRYPTION_KEY,
    IV_PLAIN
  );
  decrypt.setAutoPadding(true);
  let plain = decrypt.update(text, "hex");
  plain += decrypt.final("latin1");
  return plain;
}

export { isUserAuthenticated, randomBytes, encryptText, decryptText };
