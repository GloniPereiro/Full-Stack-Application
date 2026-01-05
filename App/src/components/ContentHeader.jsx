import { sections } from "./sections";
import "./ContentHeader.css";

export default function ContentHeader({ activeSection }) {
  return (
    <h2 className="content-header">{sections[activeSection].label}</h2>
  );
}
