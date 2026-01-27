import { Header } from "@/components/header/header";
import { CardsList } from "@/components/institution/cards-list";
import { Button } from "@/components/ui/button";
import { AppRoutes } from "@/lib/routes";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center  gap-6 p-6 md:p-10">
      {/* <div className="flex w-full max-w-sm flex-col gap-6"> */}
      <Header />
      <Link href={AppRoutes.LOGIN}>
        <Button className="w-full">Faça o Login!</Button>
      </Link>
      <CardsList />
      {/* </div> */}
    </div>
  );
}
