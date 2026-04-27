import { UserGrid } from "@/components/user/user-grid";
interface UsersPageProps {
  params: Promise<{ institutionId: string }>;
}
export default async function UsersPage({ params }: Readonly<UsersPageProps>) {
  const { institutionId } = await params;
  return <UserGrid institutionId={institutionId} />;
}
