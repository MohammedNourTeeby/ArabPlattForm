import React from "react";
import Header from "./Header";
import ProfessionalSidebar from "./Sidebar";
import HomePage from "./HomePage";
import Footer from "@/components/Footer";

function page() {
  return (
    <div>
    <div className="flex">
      {" "}
      <ProfessionalSidebar />{" "}
      <div className="flex-1">
        {" "}
        <Header />
        <HomePage />
      </div>
      
    </div>
    <Footer />
    </div>
  );
}

export default page;
