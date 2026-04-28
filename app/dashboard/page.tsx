import { AppPageShell } from "@/components/app-page-shell"
import { SmartBuildingDashboard } from "@/components/smart-building-dashboard"

export default function Page() {
  return (
    <AppPageShell
      title="Simulador de edificio inteligente"
      section="Panel principal"
    >
      <SmartBuildingDashboard />
    </AppPageShell>
  )
}
