import { sections } from "../sections";
export default function Sidebar({ setActiveSection }) {
  return (
    <div className="sidebar">
      {Object.entries(sections).map(([key, value]) => (
        <button key={key} onClick={() => setActiveSection(key)}>
          {value.label}
        </button>
      ))}
    </div>
  );
}
