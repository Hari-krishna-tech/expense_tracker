import jwt from 'jsonwebtoken';
const authMiddleware = (req, res, next) => {
   // console.log(req.headers)
    const accessToken = req.headers['authorization'].split(' ')[1];
    console.log(accessToken);
    if (!accessToken) return res.status(404).send('Access denied');

    try {
        const { email,exp } = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.email = email;
        next();
    } catch (error) {
        return res.send('Invalid token');
    }
}

export default authMiddleware;