
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  console.log("Data received:", req.body);
  const { identifier, password } = req.body;
  // console.log("Received request with identifier:", identifier);

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { name: identifier }],
      },
    });

    if (!user) {
      console.error("User not found");
      return res.status(401).json({ message: 'Invalid email/username or password' });
    }

    console.log("User found:", user);
    console.log("User's hashed password:", user.hashpassword);

    if (!user.hashpassword) {
      console.error("User does not have a hashed password");
      return res.status(401).json({ message: 'Invalid email/username or hashpassword 401' });
    }
    
    const isPasswordValid = bcrypt.compareSync(password, user.hashpassword);
    console.log("isPasswordValid :",isPasswordValid)
    
    if (!isPasswordValid) {
      console.error("Invalid password");
      return res.status(401).json({ message: 'Invalid email/username or password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    console.log("token in login api",token);
    res.setHeader('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: true,
      maxAge: 3600,
      path: '/',
    }));

    console.log("User logged in successfully");
    return res.status(200).json({ message: 'Logged in successfully' });

  } catch (error) {
    console.error("Error occurred during login:", error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
