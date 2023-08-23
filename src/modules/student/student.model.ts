import { Schema, model } from 'mongoose';
import { IStudent } from './student.interface';

const studentSchema = new Schema<IStudent>({
   name: { type: String, required: true },
   email: { type: String, required: true },
   age: String,
});

// creating the model
const Student = model<IStudent>('Student', studentSchema);

export default Student;
