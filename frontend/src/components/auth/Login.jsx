// Import necessary components, hooks, and utilities
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  // Local state to handle form inputs
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  // Access Redux store for auth state
  const { loading, user } = useSelector((store) => store.auth);

  // Hooks for navigation and dispatching Redux actions
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle form input changes dynamically
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Set loading state in Redux
      dispatch(setLoading(true));

      // Send login request to backend
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      // If login is successful
      if (res.data.success) {
        toast.success(res.data.message); // Show success message
        dispatch(setUser(res.data.user)); // Store user in Redux
        navigate("/"); // Redirect to home
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message); // Show error message
    } finally {
      dispatch(setLoading(false)); // Reset loading state
    }
  };

  // If user is already logged in, redirect to home
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Login Form Container */}
      <div className="flex items-center justify-center max-w-7xl mx-auto min-h-[80vh] px-4">
        <form
          onSubmit={submitHandler}
          className="w-full md:w-1/2 lg:w-1/3 border border-gray-700 shadow-lg bg-gray-900 rounded-2xl p-8 my-10 backdrop-blur-sm"
        >
          {/* Form Title */}
          <h1 className="font-bold text-3xl mb-6 text-center text-white">
            Login
          </h1>

          {/* Email Input */}
          <div className="my-4">
            <Label className="text-gray-300 mb-2">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="john@gmail.com"
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          {/* Password Input */}
          <div className="my-4">
            <Label className="text-gray-300 mb-2">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="••••••••"
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          {/* Role Selection */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <RadioGroup className="flex items-center gap-6 my-4">
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label className="text-gray-300">Student</Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  value="recruiter"
                  className="cursor-pointer"
                />
                <Label className="text-gray-300">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button className="w-full my-5 py-2 text-lg">
              <Loader2 className="mr-2 h-4 w-4 animate-spin " />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2 text-lg"
            >
              Login
            </Button>
          )}

          {/* Redirect to Signup */}
          <p className="text-center text-sm text-gray-400 mt-3">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-blue-400 hover:underline">
              SignUp
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

