import { useEffect, useRef, useState } from "react";

export default function CpuChart() {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/monitoring", {
        headers: { Authorization: "Bearer " + token }
      });

      const data = await res.json();
      const cpu = data.cpuUsage;

      setPoints(prev => {
        const updated = [...prev, cpu];
        if (updated.length > 60) updated.shift(); // max 60 punktów
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.strokeStyle = "#00ff00";
    ctx.lineWidth = 2;

    points.forEach((value, index) => {
      const x = (index / 60) * canvas.width;
      const y = canvas.height - (value / 100) * canvas.height;

      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.stroke();
  }, [points]);

  return (
    <div>
      <h3>CPU Usage</h3>
      <canvas
        ref={canvasRef}
        width={300}
        height={100}
        style={{ background: "#111", border: "1px solid #333" }}
      />
    </div>
  );
}
