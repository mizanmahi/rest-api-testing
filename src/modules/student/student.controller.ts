import { NextFunction, Request, Response } from 'express';
import { StudentService } from './student.service';
import httpStatus from 'http-status';

const createStudent = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const { ...studentData } = req.body;

   try {
      const result = await StudentService.createStudent(studentData);
      res.status(httpStatus.CREATED).json({
         message: 'Student created successfully',
         data: result,
      });
   } catch (error) {
      next(error);
   }
};

const getAllStudent = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const result = await StudentService.getAllStudent();
      res.status(httpStatus.OK).json({
         message: 'Students fetched successfully',
         data: result,
      });
   } catch (error) {
      next(error);
   }
};

const getSingleStudent = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const { email } = req.params;

   try {
      const result = await StudentService.getSingleStudent(email);
      // const result = null;
      if (result) {
         res.status(httpStatus.OK).json({
            message: 'Student fetched successfully',
            data: result,
         });
      } else {
         res.status(httpStatus.NOT_FOUND).json({
            message: 'No student found with this email',
            data: result,
         });
      }
   } catch (error) {
      next(error);
   }
};

export const StudentController = {
   createStudent,
   getAllStudent,
   getSingleStudent,
};
