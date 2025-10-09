import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  try {
    const { address, password } = req.body;
    const result = await authService.register(address, password);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};



export const login = async (req: Request, res: Response) => {
  try {
    const { address, password } = req.body;
    const token = await authService.login(address, password);
    res.json({ token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

