import Sidebar from "./Sidebar";
import Header from "./Header";
import ContentHeader from "./ContentHeader";
import "./MainLayout.css";


export default function MainLayout({ children, setActiveSection, activeSection }) {
  return (
    <div className="layout">
      <Header />
      <Sidebar setActiveSection={setActiveSection} />

      <main className="main">
        <ContentHeader activeSection={activeSection} />
        {children}
      </main>
    </div>
  );
}
