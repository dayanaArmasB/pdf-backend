import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  console.log("🕵️‍♀️ Verificando token...");
  const authHeader = req.headers.authorization;
  console.log("Header recibido:", authHeader);

  if (!authHeader) {
    console.log("❌ No se envió token");
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];
  console.log("Token extraído:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto_super_seguro');
    console.log("✅ Token verificado:", decoded);
    (req as any).user = decoded;
    next();
  } catch (error) {
    console.error("⚠️ Error al verificar token:", error);
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};

