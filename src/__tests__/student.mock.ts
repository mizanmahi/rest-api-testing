import { describe, it, expect, jest } from '@jest/globals';
import supertest from 'supertest';
import httpStatus from 'http-status';
import { StudentService } from '../modules/student/student.service';
import createServer from '../server';

const app = createServer();

jest.mock('../modules/student/student.service');

describe('createStudent Controller', () => {
   it('should create a new student', async () => {
      // Define mock student data
      const mockStudentData = {
         name: 'John Doe',
         email: 'john@example.com',
         age: '25',
      };

      // Mock the service function response
      (StudentService.createStudent as jest.Mock).mockImplementation(() => {
         return Promise.resolve(mockStudentData);
      });

      // Send a POST request to the create student endpoint
      const response = await supertest(app)
         .post('/api/v1/student')
         .send(mockStudentData);

      // Assertions
      expect(StudentService.createStudent).toHaveBeenCalled();
      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body.message).toBe('Student created successfully');
      expect(response.body.data).toEqual(mockStudentData);
   });

   it('should handle errors', async () => {
      // Mock the service function to throw an error
      const errorMessage = 'Internal Server Error';
      (StudentService.createStudent as jest.Mock).mockImplementation(() => {
         return Promise.reject(new Error(errorMessage));
      });

      // Send a POST request to the create student endpoint
      const response = await supertest(app).post('/api/v1/student').send({});

      // Assertions
      expect(response.status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
      expect(response.body.message).toBe(errorMessage);
   });
});
