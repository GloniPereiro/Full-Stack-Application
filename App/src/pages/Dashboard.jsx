import { useState } from "react";
import MainLayout from "../components/MainLayout";
import { sections } from "../components/sections";
import { useEffect } from "react"; 
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("zasoby");
  
  const navigate = useNavigate(); 
  useEffect(() => { 
    const token = localStorage.getItem("token"); 
    if (!token) { navigate("/"); } }, [navigate]
  );
  return (
    <MainLayout setActiveSection={setActiveSection} activeSection={activeSection}>
    {sections[activeSection].component}
  </MainLayout>
  
  );
}
