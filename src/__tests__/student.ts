import supertest from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { StudentService } from '../modules/student/student.service';
import createServer from '../server';
import mongoose from 'mongoose';

const studentData = {
   name: 'Tomuk',
   email: 'tomuk@mail.com',
   age: 40,
};

const app = createServer();

describe('Student', () => {
   beforeAll(async () => {
      const mongoDbMemoryServer = await MongoMemoryServer.create();
      const uri = mongoDbMemoryServer.getUri();
      await mongoose.connect(uri);
   });

   afterAll(async () => {
      await mongoose.disconnect();
   });

   describe('GET student route', () => {
      it('Should return the correct student for email', async () => {
         const student = await StudentService.createStudent(studentData);

         const { statusCode, body } = await supertest(app).get(
            `/api/v1/student/${student?.email}`
         );

         expect(statusCode).toBe(200);
         expect(body.data.email).toBe(student?.email);
      });

      it('Should return 404 if unknown email is provided', async () => {
         const email = 'unknown@mail.com';

         const { statusCode } = await supertest(app).get(
            `/api/v1/student/${email}`
         );

         expect(statusCode).toBe(404);
      });
   });
});
