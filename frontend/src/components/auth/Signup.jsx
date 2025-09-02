import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { USER_API_END_POINT } from "@/utils/constant.js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";


const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  // handle text/radio changes
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // handle file changes
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  // handle form submit
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
      <Navbar />

      <div className="flex items-center justify-center max-w-7xl mx-auto min-h-[80vh] px-4">
        <form
          onSubmit={submitHandler}
          className="w-full md:w-1/2 lg:w-1/3 border border-gray-700 shadow-lg bg-gray-900 rounded-2xl p-8 my-10 backdrop-blur-sm"
        >
          <h1 className="font-bold text-3xl mb-6 text-center text-white">
            Sign Up
          </h1>

          {/* Full Name */}
          <div className="my-4">
            <Label className="text-gray-300 mb-2">Full Name</Label>
            <Input
              type="text"
              value={input.fullName}
              name="fullName"
              onChange={changeEventHandler}
              placeholder="John Doe"
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          {/* Email */}
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

          {/* Phone Number */}
          <div className="my-4">
            <Label className="text-gray-300 mb-2">Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="+91..."
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          {/* Password */}
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

          {/* Role + File */}
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
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label className="text-gray-300">Recruiter</Label>
              </div>
            </RadioGroup>

            <div className="flex items-center gap-2">
              <Label className="text-gray-300">Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>

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
              signup
            </Button>
          )}

          <p className="text-center text-sm text-gray-400 mt-3">
            Already have an account?{" "}
            <a href="/login" className="text-blue-400 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;