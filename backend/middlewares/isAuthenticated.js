import jwt from "jsonwebtoken";

// Middleware to check if user is authenticated via JWT in cookies
const isAuthenticated = async (req, res, next) => {
  try {
   

    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    req.id = decoded.userId;

    console.log("Authenticated userId:", req.id);

    next();
  } catch (error) {
    console.log("Auth middleware error:", error.message);
    return res.status(500).json({
      message: "Something went wrong in auth middleware",
      success: false,
    });
  }
};

export default isAuthenticated;
