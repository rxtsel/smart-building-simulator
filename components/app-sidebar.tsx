"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  DashboardSquare01Icon,
  Logout as LogoutIcon,
  BulbChargingIcon,
} from "@hugeicons/core-free-icons"
import Link from "next/link"
import { signOut } from "@/app/actions"
import Image from "next/image"
import { usePathname } from "next/navigation"

const data = {
  navMain: [
    {
      title: "Panel principal",
      url: "/dashboard",
      items: [
        {
          title: "Estado general",
          url: "/dashboard#estado-general",
          isActive: true,
        },
        {
          title: "Controles",
          url: "/dashboard#controles",
        },
        {
          title: "Alertas",
          url: "/dashboard#alertas",
        },
      ],
    },
    {
      title: "Sistemas",
      url: "/dashboard#sistemas",
      items: [
        {
          title: "Iluminación",
          url: "/dashboard#sistemas",
        },
        {
          title: "Climatización",
          url: "/dashboard#sistemas",
        },
        {
          title: "Seguridad",
          url: "/dashboard#sistemas",
        },
      ],
    },
    {
      title: "Acerca del proyecto",
      url: "/acerca",
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/dashboard" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                <Image
                  src="https://www.poli.edu.co/themes/custom/ptecnico2023/dist/favicons/apple-touch-icon.png"
                  alt="Logo Politécnico Grancolombiano"
                  width={180}
                  height={180}
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">Politécnico Grancolombiano</span>
                <span>Simulador web</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="h-full">
          <SidebarMenu className="flex-1 gap-2">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  isActive={pathname === item.url}
                  render={<Link href={item.url} className="font-medium" />}
                >
                  <SectionIcon title={item.title} />
                  {item.title}
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton
                          isActive={
                            pathname === "/dashboard" && Boolean(item.isActive)
                          }
                          render={<Link href={item.url} />}
                        >
                          {item.title}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <SidebarMenu className="gap-2">
            <SidebarMenuItem>
              <LogoutButton />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export function LogoutButton() {
  const [, formAction, isPending] = React.useActionState(signOut, undefined)
  return (
    <form action={formAction}>
      <SidebarMenuButton type="submit" disabled={isPending}>
        <HugeiconsIcon icon={LogoutIcon} strokeWidth={2} />
        Cerrar sesión
      </SidebarMenuButton>
    </form>
  )
}

function SectionIcon({ title }: { title: string }) {
  if (title === "Panel principal") {
    return <HugeiconsIcon icon={DashboardSquare01Icon} strokeWidth={2} />
  }

  if (title === "Sistemas") {
    return <HugeiconsIcon icon={BulbChargingIcon} strokeWidth={2} />
  }

  return <HugeiconsIcon icon={DashboardSquare01Icon} strokeWidth={2} />
}
