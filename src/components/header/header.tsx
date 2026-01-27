import { AppRoutes } from "@/lib/routes";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { UserMenu } from "./user-menu";

export function Header() {
  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-between gap-2 p-4 py-4 sm:flex-row sm:items-center sm:gap-0 md:h-16">
        <Link href={AppRoutes.HOME} className="w-full">
          <h2 className="text-lg font-semibold w-full">Neuro Conecta</h2>
        </Link>
        <UserMenu />
      </div>
      <Separator />
    </div>
  );
}
