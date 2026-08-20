// College Website - JWT auth helpers
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'college-website-dev-secret-change-me';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '7d';

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

// Express middleware: protects routes for authenticated students.
function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: 'Authentication required. Please sign in.' });
  }
  try {
    req.student = verifyToken(token);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired session. Please sign in again.' });
  }
}

module.exports = { signToken, verifyToken, requireAuth, JWT_SECRET };
