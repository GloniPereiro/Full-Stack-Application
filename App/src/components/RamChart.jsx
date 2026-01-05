import { useEffect, useRef, useState } from "react";

export default function RamChart() {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState(Array(120).fill(0)); // 2 min historii

  // Pobieranie RAM co sekundę
  useEffect(() => {
    const interval = setInterval(async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/monitoring", {
        headers: { Authorization: "Bearer " + token }
      });

      const data = await res.json();

      const total = data.totalMemory;
      const free = data.freeMemory;
      const used = total - free;

      const ramPercent = Math.round((used / total) * 100);

      setPoints(prev => {
        const updated = [...prev.slice(1), ramPercent];
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Rysowanie wykresu
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Tło z gradientem
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, "#0f0f0f");
    gradient.addColorStop(1, "#1a1a1a");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // Siatka
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1;

    for (let i = 0; i < 5; i++) {
      const y = (h / 5) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Linia RAM
    ctx.beginPath();
    ctx.lineWidth = 2;

    const last = points[points.length - 1];

    ctx.strokeStyle =
      last < 50 ? "#00aaff" : last < 75 ? "#ffaa00" : "#ff0000";

    points.forEach((value, index) => {
      const x = (index / points.length) * w;
      const y = h - (value / 100) * h;

      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.stroke();
  }, [points]);

  return (
    <div style={{ width: "100%", padding: "10px" }}>
      <h3 style={{ color: "white" }}>RAM Usage</h3>
      <canvas
        ref={canvasRef}
        width={600}
        height={150}
        style={{
          width: "100%",
          background: "#111",
          border: "1px solid #333",
          borderRadius: "6px"
        }}
      />
    </div>
  );
}
