"use client";
import { React, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarProvider} from './ui/sidebar'
import { SemicircularBtn } from './SemicircularBtn';
import { logout } from '../lib/user'; 
import { LayoutDashboard, BarChart2, Users, BookOpen, Settings } from 'lucide-react';
import useUserInfo from '@/hooks/useUserInfo';

function SidebarComponent({ role }) {
  const router = useRouter();
  const [collapsed, setCollapsed] =useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  // const userInfo = {
  //   name: 'John Doe',
  //   email: '',
  //   role: role
  // }

const menuOptions = {
  admin: [
    { name: "Overview", path: "/admin/overview", icon: LayoutDashboard },
    { name: "Reports", path: "/admin/reports", icon: LayoutDashboard },
    { name: "Students", path: "/admin/students", icon: LayoutDashboard},
    { name: "Subjects", path: "/admin/subjects", icon: LayoutDashboard },
    { name: "Teachers", path: "/admin/teachers", icon: LayoutDashboard },
  ],
  student: [
    { name: "Overview", path: "/dashboard/student", icon: LayoutDashboard },
    { name: "Subjects", path: "/dashboard/subjects", icon: LayoutDashboard },
  ],
  clerk: [
    { name: "Overview", path: "/dashboard/clerk", icon: LayoutDashboard },
    { name: "Students", path: "/dashboard/students", icon: LayoutDashboard },
  ],
};

  const options = menuOptions[role] || [];

  const handleTabChange = (tab, path) => {
    setActiveTab(tab);
    router.push(`${path}?tab=${tab}`);
  };

  const { userInfo, loading } = useUserInfo();


  return (
    <section>
        <SidebarProvider open={true} defaultOpen={true} onOpenChange={setCollapsed}>
          <Sidebar>
            <SidebarHeader className="h-16 border-b border-sidebar-border my-auto">
              <div className="gap-2 items-center text-center">
                <h2 className='text-xl font-semibold text-primary'>{userInfo?.role}</h2>
                <p>Dashboard</p>
              </div>
            </SidebarHeader>
            <SidebarContent className="flex flex-col bg-secondary">
              <div className="gap-2 flex flex-col mr-3 mt-5">
                {options.map((item) => (
                  <SemicircularBtn
                    key={item.path}
                    label={item.name}
                    collapsed={collapsed}
                    isActive={activeTab === item.name.toLowerCase()}
                    onClick={() => handleTabChange(item.name.toLowerCase(), item.path)}
                    btnLink={item.path}
                    Icon={item.icon}
                    
                  />
                ))}
              </div>
            </SidebarContent>
            <SidebarFooter>
              <div className="p-4 border-t">
                <div className="mb-4">
                  <p className="text-sm font-medium">Logged in as:</p>
                  <p className="text-sm">{userInfo?.name}</p>
                  <p className="text-sm text-gray-500">{userInfo?.email}</p>
                </div>
                <button
                  className="p-3 w-full text-left hover:bg-gray-200 rounded-md"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </SidebarFooter>
          </Sidebar>
        </SidebarProvider>
      </section>
  )
}

export default SidebarComponent