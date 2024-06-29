import cookie from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    res.setHeader('Set-Cookie', cookie.serialize('token', '', {
      httpOnly: true,
      maxAge: -1,
      path: '/',
    }));
    res.status(200).json({ message: 'Logged out successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
