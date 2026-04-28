import { AppPageShell } from "@/components/app-page-shell"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const integrantes = [
  "Juan Felipe De Hoyos Montes",
  "Juan De La Cruz Moreno Herrera",
  "Cristhian Fernando Melo Montilla",
  "Juan Fernando Jaramillo Jimenez",
  "Jhonny Junior Campo Charris",
]

const riesgosClave = [
  "Fallas en la integración de iluminación, seguridad y climatización.",
  "Errores de diseño del sistema de automatización y de la base de datos.",
  "Retrasos del cronograma por complejidad técnica y carga académica.",
  "Problemas de comunicación y coordinación del equipo de trabajo.",
]

export default function Page() {
  return (
    <AppPageShell
      title="Acerca del proyecto"
      section="Justificación y gestión de riesgos"
    >
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <Card className="border border-border/60">
            <CardHeader>
              <CardTitle>Razón del proyecto</CardTitle>
              <CardDescription>
                Contexto académico de la entrega final del simulador web de
                edificio inteligente.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 text-sm leading-6 text-muted-foreground">
              <p>
                Este proyecto fue desarrollado como entrega final del curso{" "}
                <span className="font-medium text-foreground">
                  Gerencia de proyectos informáticos
                </span>{" "}
                en la Institución Universitaria Politécnico Grancolombiano.
              </p>
              <p>
                La solución plantea un simulador web para representar el
                comportamiento de un edificio inteligente, con foco en
                iluminación, climatización, seguridad, ocupación y respuesta a
                alertas.
              </p>
              <p>
                El objetivo académico es demostrar una propuesta funcional,
                comprensible y defendible, vinculada no solo al desarrollo del
                sistema sino también a la planeación, seguimiento y control de
                riesgos del proyecto.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border/60">
            <CardHeader>
              <CardTitle>Ficha académica</CardTitle>
              <CardDescription>
                Información base tomada del documento de entrega.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 text-sm">
              <div className="rounded-3xl bg-muted/50 p-4">
                <p className="font-medium">Escenario</p>
                <p className="text-muted-foreground">
                  Entrega Final – Escenario 7
                </p>
              </div>
              <div className="rounded-3xl bg-muted/50 p-4">
                <p className="font-medium">Tutor</p>
                <p className="text-muted-foreground">
                  Mahecha Nieto Isabel Andrea
                </p>
              </div>
              <div className="rounded-3xl bg-muted/50 p-4">
                <p className="font-medium">Fecha del documento</p>
                <p className="text-muted-foreground">14-04-2026</p>
              </div>
              <div className="rounded-3xl bg-muted/50 p-4">
                <p className="font-medium">Institución</p>
                <p className="text-muted-foreground">
                  Politécnico Grancolombiano
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <Card className="border border-border/60">
            <CardHeader>
              <CardTitle>Enfoque del trabajo</CardTitle>
              <CardDescription>
                El documento propone una gestión preventiva de riesgos.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground">
              <p>
                El plan de gestión de riesgos se construyó para anticipar
                problemas antes de que afecten tiempo, calidad o integración del
                sistema.
              </p>
              <p>
                El análisis se organiza en tres frentes: técnico, organizacional
                y operativo, con evaluación por probabilidad, impacto y nivel de
                riesgo.
              </p>
              <p>
                Esto permite priorizar acciones de mitigación, seguimiento y
                contingencia durante el desarrollo del proyecto.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border/60">
            <CardHeader>
              <CardTitle>Riesgos priorizados</CardTitle>
              <CardDescription>
                Factores más críticos identificados por el equipo.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {riesgosClave.map((riesgo) => (
                <div
                  key={riesgo}
                  className="rounded-3xl bg-muted/50 p-4 text-sm text-muted-foreground"
                >
                  {riesgo}
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="border border-border/60">
            <CardHeader>
              <CardTitle>Integrantes</CardTitle>
              <CardDescription>
                Equipo reportado en la entrega final.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {integrantes.map((integrante) => (
                <div
                  key={integrante}
                  className="rounded-3xl bg-muted/50 p-4 text-sm text-foreground"
                >
                  {integrante}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border border-border/60">
            <CardHeader>
              <CardTitle>Conclusión del proyecto</CardTitle>
              <CardDescription>
                Relación entre la aplicación y el documento académico.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 text-sm leading-6 text-muted-foreground">
              <p>
                Esta aplicación resume el resultado funcional del proyecto:
                muestra el estado del edificio, permite simular decisiones de
                operación y evidencia la lógica de control propuesta por el
                equipo.
              </p>
              <p>
                Al mismo tiempo, la documentación demuestra que el éxito del
                proyecto depende de una gestión rigurosa de riesgos, del control
                del cronograma y de la coordinación del equipo de trabajo.
              </p>
              <p>
                En conjunto, la plataforma y el documento sustentan la misma
                idea: presentar una solución tecnológica clara, organizada y
                alineada con los objetivos del curso.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </AppPageShell>
  )
}
