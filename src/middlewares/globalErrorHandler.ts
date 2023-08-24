import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const globalErrorHandler = (
   err: Error,
   req: Request,
   res: Response,
   next: NextFunction
) => {
   // console.error(err.stack); // Log the error for debugging

   // Handle the error and send an appropriate response
   res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Internal Server Error',
      errorMessages: [
         {
            path: req.originalUrl,
            message: err.message, // Send the error message to the client
         },
      ],
   });
};

export default globalErrorHandler;
