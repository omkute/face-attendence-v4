"use client"
import { Input } from "@/components/ui/input";
import {React, useState} from "react";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from 'next/image'; // Add this import
import axios from "axios";

function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // User State
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  // Handle Change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!user.email || !user.password) {
      alert("Please enter email and password");
      return;
    }

    // Add login logic here
    try {
      const res = await axios.post(
        "http://localhost:3002/api/v1/user/login",
        user,

        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        router.push("/admin/overview");
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className=" w-full min-h-screen flex items-center justify-center ">
      <div className=" lg:flex items-center  ">
        {/* Div -1 */}
        <div className=" px-9 flex flex-col justify-between h-[100%]">
          <div className=" my-5">
            <h2 className=" text-5xl font-extrabold">Smart Attendance Login</h2>
            <p className=" font-thin">
              Seamless, Secure & Effortless Attendance Tracking
            </p>
          </div>
          <hr className=" my-5" />
          <div>
            <div className=" flex flex-col space-y-5">
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className=" rounded-2xl border-primary p-6"
                  value={user.email}
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className=" rounded-2xl border-primary p-6"
                  onChange={handleChange}
                  value={user.password}
                />
                {/* <EyeOff className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 ' /> */}
                <Link href="forgotpass" className=" text-right text-sm">
                  Forgot Password ?
                </Link>
              </div>
              <div className=" mx-3">
                <Button
                  onClick={handleLogin}
                  variant="outline"
                  className=" bg-[#A0D195] hover:bg-[#A0D195] rounded-2xl w-full py-6 "
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Div -2 */}
        <div className=" p-5 lg:w-[50vw]">
          <Image
            src={require("@/public/Login_img.png")}
            width={500}
            height={500}
            alt="Login Page Image"
            className=" my-auto rounded-2xl mx-auto"
          />
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
