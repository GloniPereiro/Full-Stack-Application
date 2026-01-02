import { useState } from "react";
import MainLayout from "../components/MainLayout";
import Zasoby from "../components/Content/Zasoby";
import Uploady from "../components/Content/Upload";
import Users from "../components/Content/Users";
import Uprawnienia from "../components/Content/Uprawnienia";
import Monitoring from "../components/Content/Monitoring";
import Ustawienia from "../components/Content/Ustawienia";
import Logi from "../components/Content/Logi";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("zasoby");

  return (
    <MainLayout setActiveSection={setActiveSection}>
      {activeSection === "zasoby" && <Zasoby />}
      {activeSection === "uploady" && <Uploady />}
      {activeSection === "users" && <Users />}
      {activeSection === "uprawnienia" && <Uprawnienia />}
      {activeSection === "monitoring" && <Monitoring />}
      {activeSection === "ustawienia" && <Ustawienia />}
      {activeSection === "logi" && <Logi />}
    </MainLayout>
  );
}
