import { UnauthenticatedError } from '../error/customError.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser = async (req, res, next) => {
  console.log(req.cookies);
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthenticatedError('authentication invalid');
  }
  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid');
  }
};

// import { UnauthenticatedError, UnauthorizedError } from "../error/customError.js";
// import { verifyJWT } from "../utils/tokenUtils.js";

// export const authenticateUser = async (req, res, next) => {
//   console.log(req.headers.authorization);
//   let token = req.headers.authorization;
//   // const { token } = req.cookies;
//   // console.log('auth middleware');
//   // console.log(req.cookies);
//   if (!token) {
//     throw new UnauthenticatedError('authentication invalid');
//   };
//   try {
//     const { userId, role } = verifyJWT(token);
//     req.user = { userId, role };
//     next();
//   } catch (error) {
//     throw new UnauthenticatedError('authentication invalid');
//   }
// };

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route');
    }
    next();
  };
};