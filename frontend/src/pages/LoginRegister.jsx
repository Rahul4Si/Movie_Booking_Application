import { useState } from "react";
import { motion } from "framer-motion";
import { Apple, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BASE_URL } from "../config/api";
import axios from "axios";


const LoginRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formType, setFormType] = useState("login"); // 'signup' or 'login'
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const registerMutation = useMutation({
    mutationFn: async (data) => {
      const response = await authAPI.post(
        `${BASE_URL}/api/auth/register`,
        data
      );
      if (response.status !== 200) {
        throw new Error("Registration failed");
      }
      return response.data;
    },
  });
  const loginMutation = useMutation({
    mutationFn: async (data) => {
      try{
        const response = await axios.post(
          `${BASE_URL}/api/auth/login`,
          data
        );
        if (response.status !== 200) {
          toast.error("Login failed. Please check your credentials.");
          throw new Error("Login failed");
        }
        return response?.data?.data;
      }catch(error){
        console.log(error);
        toast.error("Login failed. Please check your credentials.");
        throw new Error("Login failed");
      }     
    },
  });
  const handleSignup = (e) => {
    e.preventDefault();
    registerMutation.mutate(
      {
        name: formData.fullName,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        role: "ROLE_USER",
      },
      {
        onSuccess: (data) => {
          toast.success("Registration successful!");
          setFormType("login");
          setFormData({
            fullName: "",
            email: "",
            username: "",
            password: "",
          });
        },
        onError: (error) => {
          toast.error("Registration failed. Please check your credentials.");
        },
      }
    );
  };
  const handleLogin = (e) => {


    e.preventDefault();
    if(formData.username.trim().length === 0 || formData.password.trim().length === 0){
      toast.error("Please fill all the fields");
      return;
    }


    loginMutation.mutate(
      {
        username: formData.username,
        password: formData.password,
      },
      {
        onSuccess: (data) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.role);
          localStorage.setItem("username", data.username);
          toast.success("Login successful!");
          if(data.role === "ROLE_ADMIN"){
            navigate("/admin");
            window.location.reload();
          } else {
            navigate("/");
          }
          setFormData({
            fullName: "",
            email: "",
            username: "",
            password: "",
          });
        },
        onError: (error) => {
          toast.error("Login failed. Please check your credentials.");
          console.error("Error during login:", error.message());
        },
      }
    );
  };
  return (
    <div className="flex min-h-[calc(100vh-14rem)] mt-24 items-center justify-center box-shadow-lg box-shadow-gray-300 ">
      <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl bg-gray-800 shadow-xl md:grid-cols-2">
        {/* Left Side - Signup Form */}
        <div className="flex flex-col justify-between  bg-gradient-to-b  p-10">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-10">
              {formType === "login"
                ? "Sign in to your account"
                : "Create an account"}
            </h2>
            <form className="space-y-4">
              {formType === "signup" && (


                <>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </>
              )}
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 cursor-pointer text-gray-500"
                >
                  👁
                </span>
              </div>
              <button
                onClick={formType === "login" ? handleLogin : handleSignup}
                className="w-full rounded-lg cursor-pointer bg-yellow-400 py-3 font-medium text-white hover:bg-yellow-500 transition"
              >
                {formType === "login" ? "Login" : "Register"}
              </button>
            </form>
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-400 font-medium text-sm select-none">
                or continue with
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            {/* Social Signup */}
            <div className="mt-6 flex justify-center gap-4">
              <button className="flex flex-1 justify-center items-center gap-2 rounded-lg border px-6 py-2 hover:bg-yellow-400">
                <Apple size={18} /> Apple
              </button>
              <button className="flex flex-1 justify-center items-center gap-2 rounded-lg border px-6 py-2 hover:bg-yellow-400">
                <Mail size={18} /> Google
              </button>
            </div>
          </div>
          {/* Footer */}
          <div className="flex justify-between text-sm text-gray-500 mt-8">
            {formType === "login" ? (


              <button href="#">
                Don't have an account?{" "}
                <span
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={() => {
                    setFormType("signup");
                    setFormData({
                      fullName: "",
                      email: "",
                      username: "",
                      password: "",
                    });
                  }}
                >
                  Sign up
                </span>
              </button>
            ) : (
              <button href="#">
                Have an account?{" "}
                <span
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={() => {
                    setFormType("login");
                    setFormData({
                      fullName: "",
                      email: "",
                      username: "",
                      password: "",
                    });
                  }}
                >
                  Sign in
                </span>
              </button>
            )}
            <Link to="/terms-and-conditions">Terms & Conditions</Link>
          </div>
        </div>


        {/* Right Side - Image + Overlay */}
        <div className="relative flex items-center justify-center bg-gray-100">
          <img
            src="https://stat4.bollywoodhungama.in/wp-content/uploads/2025/09/Thamma.jpg"
            alt="Team Meeting"
            className="h-full w-full object-cover"
          />
          {/* Overlays */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-6 left-6 rounded-lg bg-yellow-400 px-4 py-2 text-sm font-medium shadow-md"
          >
            Task Review With Team <br />
            <span className="text-xs">09:30am–10:00am</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-10 left-6 rounded-lg bg-white p-3 shadow-md"
          >
            <p className="text-sm font-semibold">Daily Meeting</p>
            <p className="text-xs text-gray-500">12:00pm–01:00pm</p>
            <div className="mt-2 flex -space-x-2">
              <img
                src="https://randomuser.me/api/portraits/women/1.jpg"
                className="h-6 w-6 rounded-full border-2 border-white"
              />
              <img
                src="https://randomuser.me/api/portraits/men/2.jpg"
                className="h-6 w-6 rounded-full border-2 border-white"
              />
              <img
                src="https://randomuser.me/api/portraits/women/3.jpg"
                className="h-6 w-6 rounded-full border-2 border-white"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};


export default LoginRegister;