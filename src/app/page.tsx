import { VHCStatusCard } from "../components/VHCStatusCard"
export default function Home() {
  const vhcCompleted = true; // ganti dari API / state

  return (
    <VHCStatusCard status={vhcCompleted ? "checked" : "unchecked"} />
  )
}
