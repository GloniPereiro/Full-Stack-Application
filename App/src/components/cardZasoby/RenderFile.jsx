import { useState } from "react";
import "./RenderFile.css";

export default function RenderFile({ file, onDownload, onRename, onDelete }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(prev => !prev);

    const sizeMB = (file.size * 8 / (1024 * 1024)).toFixed(2);
    const formattedDate = new Date(file.uploadedAt).toLocaleString("pl-PL", { 
        year: "numeric", 
        month: "numeric", 
        day: "numeric", 
        hour: "2-digit", 
        minute: "2-digit" 
    });

    return (
        <div className="file-card">
            <div></div>
            <div className="file-info">{file.name}</div>
            <div className="file-info">{formattedDate}</div>
            <div className="file-info">{file.uploadedBy}</div>
            <div className="file-info">{sizeMB} Mb</div>
            <div></div>

            <div 
                className="menu-wrapper"
                onMouseLeave={() => setMenuOpen(false)}
            >
                <button className="menu-button " onClick={toggleMenu}>⋮</button>

                <div className={`menu-dropdown ${menuOpen ? "open" : ""}`}>
                    <div className="menu-item" onClick={() => onDownload(file)}>Pobierz</div>
                    <div className="menu-item" onClick={() => onRename(file)}>Zmień nazwę</div>
                    <div className="menu-item" onClick={() => onDelete(file)}>Usuń</div>
                </div>
            </div>
        </div>
    );
}
