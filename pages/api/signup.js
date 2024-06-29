import bcrypt from 'bcryptjs';
import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    // Check if user with the provided email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }, // Search for user by email
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email. Please register with another email.' });
    }

    const hashpassword = bcrypt.hashSync(password, 10);
    
    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password,
          hashpassword,
        },
      });
     
      res.status(201).json({ message: 'User created successfully', user: newUser });
      // router.push('/login');

    } catch (error) {
      res.status(500).json({ message: 'User creation failed', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
