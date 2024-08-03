import jwt from 'jsonwebtoken';

export default function verifyToken(token: string, secret: string): { error: 'TokenExpiredError' | 'JsonWebTokenError' | 'NotBeforeError' | 'Error' | null; decoded: null | jwt.JwtPayload | string } {
  try {
    const decoded = jwt.verify(token, secret);
    return { error: null, decoded };
  }
  catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return { error: 'TokenExpiredError', decoded: jwt.decode(token) };
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return { error: 'JsonWebTokenError', decoded: null };
    }
    if (error instanceof jwt.NotBeforeError) {
      return { error: 'NotBeforeError', decoded: null };
    }
    return { error: 'Error', decoded: null };
  }
}
