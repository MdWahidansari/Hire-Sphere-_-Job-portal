// Import necessary React and Redux hooks
const { Children, useEffect } = require("react");
const { useSelector } = require("react-redux");
const { useNavigate } = require("react-router-dom");
import { useEffect } from "react";

// Protected route component for recruiter-only access
const protedtedRoute = ({ Children }) => {
  // Get the current logged-in user from Redux store
  const { user } = useSelector((store) => store.auth);

  // Initialize navigation
  const navigate = useNavigate();

  // Redirect to home if user is not logged in or not a recruiter
  useEffect(() => {
    if (user == null || user.role != "recruiter") {
      navigate("/");
    }
  }, []);

  // Render the protected children components
  return <>{Children}</>;
};

export default protedtedRoute;

