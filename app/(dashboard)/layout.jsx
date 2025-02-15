import Sidebar from "@/components/Sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import Navbar from "@/components/Navbar";

export default async function DashboardLayout({ children }) {
  // Use `cookies` from `next/headers` to get the cookies correctly
  const roleCookie = await cookies().get("token"); 
  const token = roleCookie?.value;
  console.log(roleCookie);

  let role;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      role = decodedToken.role; // Extract the role from the decoded token
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }

  if (!role) {
    redirect("/login"); // If not logged in, send to login
  }

  return (
    <div className="dashboard-container flex">
      <Sidebar role={role} />
      <div className="flex flex-col w-full">
        <Navbar />
        <div className="dashboard-content">{children}</div>
      </div>
    </div>
  );
}
