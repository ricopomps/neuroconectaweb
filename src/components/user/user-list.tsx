"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/models/user";
import * as institutionApi from "@/network/api/institution";
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface UserListProps {
  readonly users: User[];
  readonly institutionId: string;
  readonly onRemove: (userId: string) => void;
  readonly loading?: boolean;
}
export function UserList({
  users,
  institutionId,
  onRemove,
  loading,
}: UserListProps) {
  const tableHeaders = ["Usuário", "Ações"];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableHeaders.map((header, index) => (
            <TableHead
              key={header}
              className={index === tableHeaders.length - 1 ? "text-right" : ""}
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={tableHeaders.length} className="text-center">
              Carregando usuários...
            </TableCell>
          </TableRow>
        ) : (
          users.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              institutionId={institutionId}
              onRemove={onRemove}
            />
          ))
        )}
      </TableBody>
    </Table>
  );
}
interface UserTableRowProps {
  readonly user: User;
  readonly institutionId: string;
  readonly onRemove: (userId: string) => void;
}

function UserTableRow({ user, institutionId, onRemove }: UserTableRowProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  async function handleRemove() {
    setIsRemoving(true);
    try {
      await institutionApi.removeUser(institutionId, user.id);
      toast.success("Usuário removido com sucesso!");
      onRemove(user.id);
      setConfirmOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Erro ao remover usuário");
      }
    } finally {
      setIsRemoving(false);
    }
  }

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{user.name}</TableCell>
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreHorizontalIcon />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setConfirmOpen(true)}
              >
                Remover
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar remoção</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja remover o usuário &quot;{user.name}&quot;
              desta instituição? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isRemoving}>
                Cancelar
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleRemove}
              disabled={isRemoving}
            >
              {isRemoving ? "Removendo..." : "Remover"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
