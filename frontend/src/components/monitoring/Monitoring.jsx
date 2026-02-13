import CpuChart from "./CpuChart2";
import RamChart from "./RamChart"
import "./Monitoring.css"

export default function Monitoring() {
  return (
    <div className="wykresy">
      <div className="wykres">
      <CpuChart />
      </div>
      <div className="wykres">
      <RamChart/>
      </div>
    </div>
  );
}
