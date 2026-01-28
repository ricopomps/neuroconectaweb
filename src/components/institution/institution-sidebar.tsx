import { GalleryVerticalEnd } from "lucide-react";
import * as React from "react";

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
import { Separator } from "../ui/separator";

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
  const data: { navMain: InstitutionSidebarNavItem[] } = {
    navMain: [
      {
        title: "Alunos",
        url: buildRoute(AppRoutes.STUDENTS, { institutionId }),
        items: [
          {
            title: "Casarão",
            url: "#",
          },
          {
            title: "Ensino Médio",
            url: "#",
          },
        ],
      },
      {
        title: "Avaliações",
        url: "#",
        items: [
          {
            title: "PAEE",
            url: "#",
            isActive: true,
          },
        ],
      },
    ],
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div>
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
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
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
