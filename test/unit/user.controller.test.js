// tests/unit/user.controller.test.js
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../../src/controllers/user.controllers.js';
import * as userModel from '../../src/models/user.model.js';
import { validationResult } from 'express-validator';
import logger from '../../src/utils/logger.js';

jest.mock('../../src/models/user.model.js');
jest.mock('express-validator');
jest.mock('../../src/utils/logger.js');

describe('UserControllerTest', () => {
  var req, res;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    validationResult.mockReturnValue({ isEmpty: () => true, array: () => [] });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should return all users OK', async () => {
      const users = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
      userModel.getAllUsers.mockResolvedValue(users);

      await getAllUsers(req, res);

      expect(userModel.getAllUsers).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(users);
    });

    it('should handle errors NOK', async () => {
      const error = new Error('Database error');
      userModel.getAllUsers.mockRejectedValue(error);

      await getAllUsers(req, res);

      expect(logger.error).toHaveBeenCalledWith(`Error getting all users: ${error.message}`, error);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error getting all users' });
    });
  });

  // Similar tests for getUserById, createUser, updateUser, deleteUser
});