"use client";
import { GalleryVerticalEnd } from "lucide-react";
import { usePathname } from "next/navigation";
import * as React from "react";

import { Separator } from "@/components/ui/separator";
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
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppRoutes, buildRoute } from "@/lib/routes";
import Link from "next/link";

interface InstitutionSidebarProps extends React.ComponentProps<typeof Sidebar> {
  readonly institutionId: string;
}

interface InstitutionSidebarNavItem {
  title: string;
  url: string;
  items?: InstitutionSidebarNavSubItem[];
}

interface InstitutionSidebarNavSubItem {
  title: string;
  url: string;
  isActive?: boolean;
}

export function InstitutionSidebar({
  institutionId,
  ...props
}: InstitutionSidebarProps) {
  const pathname = usePathname();

  const isActive = (url: string) => pathname.startsWith(url);

  const data: { navMain: InstitutionSidebarNavItem[] } = {
    navMain: [
      {
        title: "Alunos",
        url: buildRoute(AppRoutes.STUDENTS, { institutionId }),
      },
      {
        title: "Avaliações",
        url: buildRoute(AppRoutes.ASSESSMENTS, { institutionId }),
        items: [
          {
            title: "PAEE",
            url: buildRoute(AppRoutes.ASSESSMENTS, { institutionId }),
            isActive: true,
          },
        ],
      },
      {
        title: "Usuários",
        url: buildRoute(AppRoutes.INSTITUTIONS_USERS, { institutionId }),
      },
    ],
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link
                href={buildRoute(AppRoutes.INSTITUTION, { institutionId })}
                className="flex items-center gap-3"
              >
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">NeuroConecta</span>
                    <div className="flex items-center gap-2 px-3">
                      <SidebarTrigger />
                      <Separator orientation="vertical" className="mr-2 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={isActive(item.url)}>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={isActive(item.url)}
                        >
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
