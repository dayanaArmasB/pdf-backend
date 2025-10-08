import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'mi_clave_super_segura';

export class AuthService {
  async register(address: string, password: string) {
    const existingUser = await User.findOne({ address });
    if (existingUser) throw new Error('El usuario ya existe');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ address, password: hashedPassword });
    await user.save();

    // Ya no devolvemos el token aquí
    return { message: 'Usuario registrado correctamente' };
  }


  async login(address: string, password: string) {
    const user = await User.findOne({ address });
    if (!user) throw new Error('Usuario no encontrado');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Contraseña incorrecta');

    const token = jwt.sign(
      { id: user._id, address: user.address },
      process.env.JWT_SECRET || 'secreto_super_seguro',
      { expiresIn: '1h' }
    );

    return token;
  }
}
