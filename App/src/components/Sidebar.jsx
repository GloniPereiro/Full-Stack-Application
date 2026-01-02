export default function Sidebar({ setActiveSection }) {
  return (
    <aside className="sidebar">
      <button onClick={() => setActiveSection("zasoby")}>Zasoby</button>
      <button onClick={() => setActiveSection("uploady")}>Uploady</button>
      <button onClick={() => setActiveSection("users")}>Użytkownicy</button>
      <button onClick={() => setActiveSection("uprawnienia")}>Uprawnienia</button>
      <button onClick={() => setActiveSection("monitoring")}>Monitoring</button>
      <button onClick={() => setActiveSection("ustawienia")}>Ustawienia</button>
      <button onClick={() => setActiveSection("logi")}>Logi</button>
    </aside>
  );
}
