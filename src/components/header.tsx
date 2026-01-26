import { AppRoutes } from "@/lib/routes";
import Link from "next/link";
import { PresetActions } from "./preset-actions";
import { PresetSave } from "./preset-save";
import { PresetSelector } from "./preset-selector";
import { Separator } from "./ui/separator";

export function Header() {
  const presets = [
    { id: "preset-1", name: "Preset 1" },
    { id: "preset-2", name: "Preset 2" },
    { id: "preset-3", name: "Preset 3" },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-between gap-2 p-4 py-4 sm:flex-row sm:items-center sm:gap-0 md:h-16">
        <Link href={AppRoutes.HOME} className="w-full">
          <h2 className="text-lg font-semibold w-full">Neuro Conecta</h2>
        </Link>
        <div className="ml-auto flex w-full gap-2 sm:justify-end">
          <PresetSelector presets={presets} />
          <PresetSave />
          <div className="hidden gap-2 md:flex"></div>
          <PresetActions />
        </div>
      </div>
      <Separator />
    </div>
  );
}
