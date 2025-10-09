import jwt from 'jsonwebtoken';

export class JwtService {
  private secret: string;

  constructor() {
    this.secret = process.env.JWT_SECRET || 'secreto_super_seguro';
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      return null;
    }
  }
}
