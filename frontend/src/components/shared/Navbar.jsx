import React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { persistor } from "@/redux/store";

const Navbar = () => {
  // Get user info from Redux store
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout handler
  const logoutHandler = async () => {
    try {
      // Call backend logout endpoint
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null)); // clear user from Redux
        navigate("/"); // redirect to home
        toast.success(res.data.message); // show success toast
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message); // show error toast
    }
  };

  return (
    // Navbar wrapper with sticky top and gradient background
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-6xl h-16 px-6">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-extrabold tracking-wide">
            Hire <span className="text-blue-500">Sphere</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-10">
          <ul className="flex font-medium items-center gap-6">
            {user && user.role == "recruiter" ? (
              <>
                {/* Links visible to recruiters */}
                <li className="hover:text-blue-400 cursor-pointer transition">
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                {/* Links visible to students / non-logged-in users */}
                <li className="hover:text-blue-400 cursor-pointer transition">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {/* Auth Buttons or User Avatar */}
          {!user ? (
            // Show login/signup buttons if no user
            <div className="flex items-center gap-3">
              <Link to={"/login"}>
                <Button
                  variant="outline"
                  className="border-gray-600 bg-cyan-600 text-white hover:bg-cyan-700"
                >
                  Login
                </Button>
              </Link>
              <Link to={"/signup"}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            // Show avatar and popover if user is logged in
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    // src={user?.profile?.profilePhoto} // optional dynamic photo
                    alt="@shadcn"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4 bg-gray-900 border border-gray-700 text-white rounded-lg shadow-lg">
                {/* User info inside popover */}
                <div className="flex items-center gap-3 border-b border-gray-700 pb-3 mb-3">
                  <Avatar>
                    <AvatarImage
                      // src={user?.profile?.profilePhoto} // optional dynamic photo
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{user?.fullname}</h4>
                    <p className="text-sm text-gray-400">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                {/* Popover actions */}
                <div className="flex flex-col gap-3 text-gray-300">
                  {/* Show profile link only for students */}
                  {user && user.role == "student" && (
                    <div className="flex items-center gap-2 cursor-pointer hover:text-blue-400 transition">
                      <User className="w-4 h-4" />
                      <Button variant="link" className="text-white">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}

                  {/* Logout button */}
                  <div className="flex items-center gap-2 cursor-pointer hover:text-red-400 transition">
                    <LogOut className="w-4 h-4" />
                    <Button
                      onClick={logoutHandler}
                      variant="link"
                      className="text-white"
                    >
                      <Link>Logout</Link>
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;