"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/contexts/auth";
import { useMounted } from "@/hooks/use-mounted";
import { AppRoutes } from "@/lib/routes";
import Link from "next/link";
import { PresetSelector } from "../preset-selector";
import { ThemeToggle } from "../theme-toggle";

export function UserMenu() {
  const { user, institutions, logout } = useAuth();
  const mounted = useMounted();

  const presets =
    institutions?.map((institution) => ({
      id: institution.id,
      name: institution.name,
    })) || [];

  if (!mounted) {
    return (
      <div className="ml-auto flex w-full gap-2 sm:justify-end">
        <PresetSelector presets={presets} />
        <ThemeToggle />
      </div>
    );
  }

  return (
    <div className="ml-auto flex w-full gap-2 sm:justify-end">
      {user ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="flex items-center">
              {user.name}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40">
            <Button
              variant="destructive"
              className="w-full justify-start"
              onClick={logout}
            >
              Logout
            </Button>
          </PopoverContent>
        </Popover>
      ) : (
        <Link href={AppRoutes.LOGIN}>
          <Button className="w-full">Faça o Login!</Button>
        </Link>
      )}
      <PresetSelector presets={presets} />
      <ThemeToggle />
    </div>
  );
}
