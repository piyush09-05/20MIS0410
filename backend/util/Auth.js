function verifyToken(req, res, next) {

    const token = req.headers['authorization'] || req.query.token || req.cookies.token;
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
      }

      req.decoded = decoded;
      next();
    });
}
module.exports = verifyToken;