import { IStudent } from './student.interface';
import Student from './student.model';

const createStudent = async (payload: IStudent): Promise<IStudent | null> => {
   const result = await Student.create(payload);
   return result;
};

const getAllStudent = async (): Promise<IStudent[]> => {
   const result = await Student.find({});
   return result;
};

const getSingleStudent = async (email: string): Promise<IStudent | null> => {
   const result = await Student.findOne({ email });
   return result;
};

export const StudentService = {
   createStudent,
   getAllStudent,
   getSingleStudent,
};
