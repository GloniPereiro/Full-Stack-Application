import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout({ children, setActiveSection }) {
  return (
    <div className="layout">
      <Sidebar setActiveSection={setActiveSection} />
      <div className="content">
        <Header />
        <main className="main">
          {children}
        </main>
      </div>
    </div>
  );
}
