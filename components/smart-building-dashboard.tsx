"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Alert02Icon,
  BulbChargingIcon,
  CheckmarkCircle02Icon,
  Notification03Icon,
  SafeIcon,
  ThermometerIcon,
} from "@hugeicons/core-free-icons"
import { useTheme } from "next-themes"

const alerts = [
  {
    title: "Alerta de humo en el piso 3",
    detail: "Se recomienda revisar sensores y protocolo de evacuación.",
    severity: "Alta",
  },
  {
    title: "Acceso no autorizado en laboratorio",
    detail: "La cámara del pasillo detectó movimiento fuera de horario.",
    severity: "Crítica",
  },
  {
    title: "Consumo elevado en climatización",
    detail: "La demanda térmica supera el promedio operativo esperado.",
    severity: "Media",
  },
] as const

type AlertEntry = {
  id: string
  title: string
  detail: string
  severity: "Crítica" | "Alta" | "Media"
  createdAt: string
}

const INITIAL_ALERT: AlertEntry = {
  id: "initial-alert",
  title: alerts[0].title,
  detail: alerts[0].detail,
  severity: alerts[0].severity,
  createdAt: "13:12",
}

export function SmartBuildingDashboard() {
  const { setTheme } = useTheme()
  const [isNightMode, setIsNightMode] = React.useState(false)
  const [lightsOn, setLightsOn] = React.useState(true)
  const [securityActive, setSecurityActive] = React.useState(true)
  const [temperature, setTemperature] = React.useState(22)
  const [occupancy, setOccupancy] = React.useState(64)
  const [alertIndex, setAlertIndex] = React.useState(1)
  const [alertLog, setAlertLog] = React.useState<AlertEntry[]>([INITIAL_ALERT])

  const activeAlert = alertLog[0] ?? null
  const comfort = temperature >= 20 && temperature <= 24 ? "Óptima" : "Ajustar"
  const buildingStatus = getBuildingStatus({
    lightsOn,
    occupancy,
    securityActive,
    activeAlert,
  })

  function simulateAlert() {
    const nextAlert = alerts[alertIndex % alerts.length]

    setAlertLog((current) => [createAlertEntry(nextAlert), ...current])
    setAlertIndex((current) => current + 1)
  }

  function clearAlerts() {
    setAlertLog([])
  }

  function toggleDayNightMode() {
    const nextMode = !isNightMode

    setTheme(nextMode ? "dark" : "light")
    setIsNightMode(nextMode)
    setLightsOn(!nextMode)
    setSecurityActive(true)
    setTemperature(nextMode ? 20 : 22)
    setOccupancy(nextMode ? 12 : 64)
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <section
        id="estado-general"
        className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]"
      >
        <Card className="border border-border/60">
          <CardHeader>
            <CardTitle>Estado general del edificio</CardTitle>
            <CardDescription>
              Vista resumida del comportamiento del edificio inteligente en esta
              simulación.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatusCard
              label="Operación"
              value={buildingStatus.label}
              hint={buildingStatus.description}
              tone={buildingStatus.tone}
              badge={buildingStatus.label}
              icon={CheckmarkCircle02Icon}
            />
            <StatusCard
              label="Iluminación"
              value={lightsOn ? "Encendida" : "Apagada"}
              hint={lightsOn ? "Aulas y pasillos activos" : "Modo de ahorro"}
              tone={lightsOn ? "success" : "muted"}
              badge={lightsOn ? "Activa" : "Apagada"}
              icon={BulbChargingIcon}
            />
            <StatusCard
              label="Temperatura"
              value={`${temperature}°C`}
              hint={`Confort ${comfort.toLowerCase()}`}
              tone={comfort === "Óptima" ? "success" : "warning"}
              badge={comfort}
              icon={ThermometerIcon}
            />
            <StatusCard
              label="Seguridad"
              value={securityActive ? "Activa" : "Inactiva"}
              hint={
                securityActive
                  ? "Sensores y accesos monitoreados"
                  : "Sistema desprotegido"
              }
              tone={securityActive ? "success" : "danger"}
              badge={securityActive ? "Monitoreada" : "Riesgo"}
              icon={SafeIcon}
            />
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-3 border-t border-border/60 pt-6 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">
              Ocupación actual simulada:{" "}
              <span className="font-medium text-foreground">{occupancy}%</span>
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={toggleDayNightMode}>
                {isNightMode ? "Modo día" : "Modo noche"}
              </Button>
              <Button onClick={simulateAlert}>Simular alerta</Button>
            </div>
          </CardFooter>
        </Card>

        <Card className="border border-border/60">
          <CardHeader>
            <CardTitle>Ocupación simulada</CardTitle>
            <CardDescription>
              Distribución estimada de personas dentro del edificio.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="rounded-3xl bg-muted p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Capacidad usada</span>
                <span className="text-sm text-muted-foreground">
                  {occupancy}%
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-background">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    occupancy > 85
                      ? "bg-destructive"
                      : occupancy > 65
                        ? "bg-primary"
                        : "bg-foreground/70"
                  )}
                  style={{ width: `${occupancy}%` }}
                />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <MiniMetric
                label="Lobby"
                value={`${Math.max(8, Math.round(occupancy * 0.2))} pers.`}
              />
              <MiniMetric
                label="Oficinas"
                value={`${Math.max(12, Math.round(occupancy * 0.45))} pers.`}
              />
              <MiniMetric
                label="Laboratorios"
                value={`${Math.max(6, Math.round(occupancy * 0.35))} pers.`}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="controles" className="grid gap-4 lg:grid-cols-[1fr_0.95fr]">
        <Card className="border border-border/60">
          <CardHeader>
            <CardTitle>Controles del simulador</CardTitle>
            <CardDescription>
              Ajusta variables principales para representar escenarios
              operativos del edificio.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <ControlRow
              title="Iluminación"
              description="Encender o apagar la iluminación general."
              value={lightsOn ? "Activa" : "Desactivada"}
              action={
                <Button
                  variant={lightsOn ? "default" : "outline"}
                  onClick={() => setLightsOn((current) => !current)}
                >
                  {lightsOn ? "Apagar luces" : "Encender luces"}
                </Button>
              }
            />
            <ControlRow
              title="Seguridad"
              description="Activa sensores, control de acceso y monitoreo."
              value={securityActive ? "Protegido" : "Sin monitoreo"}
              action={
                <Button
                  variant={securityActive ? "default" : "destructive"}
                  onClick={() => setSecurityActive((current) => !current)}
                >
                  {securityActive
                    ? "Desactivar seguridad"
                    : "Activar seguridad"}
                </Button>
              }
            />
            <div className="grid gap-2">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">Temperatura</p>
                  <p className="text-sm text-muted-foreground">
                    Ajusta la climatización general del edificio.
                  </p>
                </div>
                <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium">
                  {temperature}°C
                </span>
              </div>
              <Slider
                min={16}
                max={30}
                step={1}
                value={[temperature]}
                onValueChange={([value]) => setTemperature(value ?? 22)}
                aria-label="Control de temperatura"
                className="py-1"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">Ocupación simulada</p>
                  <p className="text-sm text-muted-foreground">
                    Define cuánta actividad hay dentro del edificio.
                  </p>
                </div>
                <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium">
                  {occupancy}%
                </span>
              </div>
              <Slider
                min={0}
                max={100}
                step={1}
                value={[occupancy]}
                onValueChange={([value]) => setOccupancy(value ?? 64)}
                aria-label="Control de ocupacion"
                className="py-1"
              />
            </div>
          </CardContent>
        </Card>

        <Card id="sistemas" className="border border-border/60">
          <CardHeader>
            <CardTitle>Estado de sistemas</CardTitle>
            <CardDescription>
              Resumen operativo de iluminacion, clima y seguridad.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <SystemPanel
              title="Iluminación"
              description="Circuitos de zonas comunes y aulas"
              status={lightsOn ? "Normal" : "Ahorro"}
              statusTone={lightsOn ? "success" : "muted"}
            />
            <SystemPanel
              title="Climatización"
              description="Temperatura objetivo del edificio"
              status={`${temperature}°C`}
              statusTone={comfort === "Óptima" ? "success" : "warning"}
            />
            <SystemPanel
              title="Seguridad"
              description="Monitoreo de sensores y accesos"
              status={securityActive ? "Operativa" : "Riesgo"}
              statusTone={securityActive ? "success" : "danger"}
            />
          </CardContent>
        </Card>
      </section>

      <section id="alertas" className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="border border-border/60">
          <CardHeader>
            <CardTitle>Simulación de alertas</CardTitle>
            <CardDescription>
              Genera eventos para mostrar la reacción del sistema.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="rounded-3xl border border-dashed border-border bg-muted/40 p-4">
              <div className="mb-3 flex items-center gap-2">
                <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} />
                <p className="font-medium">Próxima acción recomendada</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Usa el botón para disparar una alerta y actualizar el estado del
                tablero en tiempo real.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={simulateAlert}>Simular alerta</Button>
              <Button variant="outline" onClick={clearAlerts}>
                Limpiar historial
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/60">
          <CardHeader>
            <CardTitle>Historial reciente</CardTitle>
            <CardDescription>
              Eventos reportados por el motor de simulación.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {alertLog.length === 0 ? (
              <div className="rounded-3xl bg-muted p-4 text-sm text-muted-foreground">
                No hay alertas activas. El edificio opera sin incidentes.
              </div>
            ) : (
              alertLog.slice(0, 4).map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-3xl border border-border/60 bg-muted/40 p-4"
                >
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2">
                      <HugeiconsIcon
                        icon={Notification03Icon}
                        strokeWidth={2}
                      />
                      <div>
                        <p className="font-medium">{entry.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {entry.detail}
                        </p>
                      </div>
                    </div>
                    <StatusPill tone={getSeverityTone(entry.severity)}>
                      {entry.severity}
                    </StatusPill>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Registrada a las {entry.createdAt}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

function StatusCard({
  label,
  value,
  hint,
  tone,
  badge,
  icon,
}: {
  label: string
  value: string
  hint: string
  tone: StatusTone
  badge: string
  icon: React.ComponentProps<typeof HugeiconsIcon>["icon"]
}) {
  return (
    <div className="rounded-3xl bg-muted/50 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        <HugeiconsIcon icon={icon} strokeWidth={2} />
      </div>
      <p className="text-2xl font-semibold tracking-tight">{value}</p>
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{hint}</p>
        <StatusPill tone={tone}>{badge}</StatusPill>
      </div>
    </div>
  )
}

function ControlRow({
  title,
  description,
  value,
  action,
}: {
  title: string
  description: string
  value: string
  action: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-border/60 p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <p className="font-medium">{title}</p>
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
            {value}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  )
}

function SystemPanel({
  title,
  description,
  status,
  statusTone,
}: {
  title: string
  description: string
  status: string
  statusTone: StatusTone
}) {
  return (
    <div className="rounded-3xl bg-muted/40 p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="font-medium">{title}</p>
        <StatusPill tone={statusTone}>{status}</StatusPill>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-muted/40 p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-lg font-semibold">{value}</p>
    </div>
  )
}

type StatusTone = "success" | "warning" | "danger" | "muted"

function StatusPill({
  children,
  tone,
}: {
  children: React.ReactNode
  tone: StatusTone
}) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-xs font-medium",
        tone === "success" && "bg-primary/15 text-primary",
        tone === "warning" && "bg-foreground/10 text-foreground",
        tone === "danger" && "bg-destructive/15 text-destructive",
        tone === "muted" && "bg-muted text-muted-foreground"
      )}
    >
      {children}
    </span>
  )
}

function getSeverityTone(severity: AlertEntry["severity"]): StatusTone {
  if (severity === "Crítica") {
    return "danger"
  }

  if (severity === "Alta") {
    return "warning"
  }

  return "muted"
}

function createAlertEntry(
  alert: (typeof alerts)[number],
  createdAt = formatSimulationTime(new Date())
): AlertEntry {
  return {
    id: crypto.randomUUID(),
    title: alert.title,
    detail: alert.detail,
    severity: alert.severity,
    createdAt,
  }
}

function formatSimulationTime(date: Date) {
  const hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, "0")
  return `${String(hours).padStart(2, "0")}:${minutes}`
}

function getBuildingStatus({
  lightsOn,
  occupancy,
  securityActive,
  activeAlert,
}: {
  lightsOn: boolean
  occupancy: number
  securityActive: boolean
  activeAlert: AlertEntry | null
}) {
  if (activeAlert) {
    return {
      label: "Alerta",
      description: "Se requiere atención sobre el evento más reciente.",
      tone: getSeverityTone(activeAlert.severity),
    } as const
  }

  if (!securityActive) {
    return {
      label: "Riesgo",
      description: "El edificio opera sin seguridad activa.",
      tone: "danger",
    } as const
  }

  if (!lightsOn && occupancy > 50) {
    return {
      label: "Revisión",
      description: "La ocupación es alta para el modo de ahorro.",
      tone: "warning",
    } as const
  }

  return {
    label: "Estable",
    description: "Todos los sistemas operan dentro del rango esperado.",
    tone: "success",
  } as const
}
