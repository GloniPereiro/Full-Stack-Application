import CpuChart from "./CpuChart2";
import RamChart from "./RamChart"

export default function Monitoring() {
  return (
    <div>
      Monitoring
      <CpuChart />
      <RamChart/>
    </div>
  );
}
