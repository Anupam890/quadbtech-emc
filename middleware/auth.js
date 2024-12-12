import jwt from "jsonwebtoken";

const auth = (roles = []) => (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    if (roles.length && !roles.includes(decoded.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;
