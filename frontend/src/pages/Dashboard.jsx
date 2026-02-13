import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { sections } from "../components/sections";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("zasoby");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  fetch("http://localhost:5000/api/protected", {
    headers: {
      "Authorization": "Bearer " + token
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.message === "jwt expired") {
        sessionStorage.removeItem("token");
        navigate("/");
      }
    })
    .catch((err) => {
      console.error(err);
    });

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  },
  );
  return (
    <MainLayout setActiveSection={setActiveSection} activeSection={activeSection}>
      {sections[activeSection].component}
    </MainLayout>

  );
}
