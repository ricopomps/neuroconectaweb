"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth";
import { useMounted } from "@/hooks/use-mounted";
import { AppRoutes } from "@/lib/routes";
import Link from "next/link";
import { PresetActions } from "../preset-actions";
import { PresetSave } from "../preset-save";
import { PresetSelector } from "../preset-selector";

export function UserMenu() {
  const { user, institutions } = useAuth();
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
