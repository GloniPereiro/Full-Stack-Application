import { useState } from "react";
import MainLayout from "../components/MainLayout";
import { sections } from "../components/sections";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("zasoby");

  return (
    <MainLayout setActiveSection={setActiveSection} activeSection={activeSection}>
    {sections[activeSection].component}
  </MainLayout>
  );
}
