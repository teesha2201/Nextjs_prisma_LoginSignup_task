import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { token } = cookie.parse(req.headers.cookie || '');
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
      if (dbUser) {
        res.status(200).json({ user: dbUser });
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
