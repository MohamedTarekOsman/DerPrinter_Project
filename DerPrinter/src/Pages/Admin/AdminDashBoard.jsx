import { Outlet } from "react-router-dom";
import DashSidebar from "../../components/layouts/DashSidebar";
import { useState } from "react";

const AdminDashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  return (
    <div className="flex">
      <DashSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content */}
      <div
        className={`flex-1 w-full ${
          isSidebarOpen ? "md:ml-[360px]" : "ml-0"
        } p-6 bg-white rounded-l-2xl transition-all duration-300`}
      >
        {/* Overview */}
        <Outlet /> 
      </div>
    </div>
  );
};


export default AdminDashBoard;
