import { StatusCodes } from "http-status-codes";

const errorHandleMiddleware = (err, req, res, next) => {
    console.log(err);
    const statusCodes = err.statusCodes || StatusCodes.INTERNAL_SERVER_ERROR ;
    const msg = err.message || 'something went wrong, try again later';
    res.status(statusCodes).json({ msg });
 };

 export default errorHandleMiddleware;