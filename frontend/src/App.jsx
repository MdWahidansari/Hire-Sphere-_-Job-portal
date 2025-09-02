import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

// Auth components
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";

// User components
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";

// Admin components
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJobs from "./components/admin/PostJobs";
import Applicants from "./components/admin/Applicants";

// Define application routes
const appRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/description/:id", element: <JobDescription /> },
  { path: "/browse", element: <Browse /> },
  { path: "/profile", element: <Profile /> },

  // Admin routes
  {
    path: "/admin/companies",
    element: (
      <protedtedRoute>
        <Companies />
      </protedtedRoute>
    ),
  },
  { path: "/admin/companies/create", element: <CompanyCreate /> },
  { path: "/admin/companies/:id", element: <CompanySetup /> },
  { path: "/admin/jobs", element: <AdminJobs /> },
  { path: "/admin/jobs/create", element: <PostJobs /> },
  { path: "/admin/jobs/:id/applicants", element: <Applicants /> },
]);

// Main App component with routing provider
function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
