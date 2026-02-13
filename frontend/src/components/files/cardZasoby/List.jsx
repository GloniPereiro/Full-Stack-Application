import RenderFile from "./RenderFile";
import "./List.css";

export default function List({ files, onDownload, onDelete, onRename }) {
  return (
    <div className="list">
      <div className="legend">
        <div></div>
        <div className="legendText">nazwa</div>
        <div className="legendText">data</div>
        <div className="legendText">użytkownik</div>
        <div className="legendText">wielkosć</div>
        <div></div>
        <div></div>
      </div>  

      {Array.isArray(files) && files.map(file => (
        <RenderFile 
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
