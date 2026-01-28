"use client";

import { useAuth } from "@/contexts/auth";
import { useMounted } from "@/hooks/use-mounted";
import { AppRoutes } from "@/lib/routes";
import Link from "next/link";
import { PresetActions } from "../preset-actions";
import { PresetSave } from "../preset-save";
import { PresetSelector } from "../preset-selector";
import { Button } from "../ui/button";

export function UserMenu() {
  const { user } = useAuth();
  const mounted = useMounted();

  const presets = [
    { id: "preset-1", name: "Preset 1" },
    { id: "preset-2", name: "Preset 2" },
    { id: "preset-3", name: "Preset 3" },
  ];

  if (!mounted) {
    return (
      <div className="ml-auto flex w-full gap-2 sm:justify-end">
        <PresetSelector presets={presets} />
        <PresetSave />
        <PresetActions />
      </div>
    );
  }

  return (
    <div className="ml-auto flex w-full gap-2 sm:justify-end">
      {user ? (
        <div className="flex items-center">
          <p>{user.name}</p>
        </div>
      ) : (
        <Link href={AppRoutes.LOGIN}>
          <Button className="w-full">Faça o Login!</Button>
        </Link>
      )}
      <PresetSelector presets={presets} />
      <PresetSave />
      <PresetActions />
    </div>
  );
}
