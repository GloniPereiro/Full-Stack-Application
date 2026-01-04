import FileCard from "./FileCard";
import "./Zasoby.css";

export default function List({ files, onDownload, onDelete, onRename }) {
  return (
    <div className="file-list">
      {Array.isArray(files) && files.map(file => (
        <FileCard 
          key={file._id} 
          file={file} 
          onDownload={onDownload}
          onRename={onRename}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
