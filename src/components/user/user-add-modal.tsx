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
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "@/models/user";
import * as institutionApi from "@/network/api/institution";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { UserSelect } from "./user-select";

interface UserAddModalProps {
  readonly institutionId: string;
  readonly handleCreate: (user: User) => void;
}

export function UserAddModal({
  institutionId,
  handleCreate,
}: UserAddModalProps) {
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [open, setOpen] = useState(false);

  async function onSubmit() {
    if (!selectedUserId) {
      toast.error("Selecione um usuário");
      return;
    }
    try {
      const userResponse = await institutionApi.addUser(
        institutionId,
        selectedUserId,
      );
      if (userResponse?.id) {
        toast.success("Usuário adicionado com sucesso!");
        handleCreate(userResponse);
        setOpen(false);
        setSelectedUserId("");
      }
    } catch (error) {
      if (error instanceof Error)
        toast.error(error.message || "Erro ao adicionar usuário");
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          Adicionar Usuário
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Adicionar usuário</DialogTitle>
          <DialogDescription>
            Selecione o usuário abaixo para adicionar à instituição.
          </DialogDescription>
        </DialogHeader>
        <UserSelect
          institutionId={institutionId}
          value={selectedUserId}
          onChange={setSelectedUserId}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={onSubmit}>Adicionar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
