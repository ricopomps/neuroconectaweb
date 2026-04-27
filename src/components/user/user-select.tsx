"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { User } from "@/models/user";
import * as institutionApi from "@/network/api/institution";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";

interface UserSelectProps {
  readonly institutionId: string;
  readonly value?: string;
  readonly onChange: (userId: string) => void;
  readonly label?: string;
  readonly placeholder?: string;
  readonly pageSize?: number;
  readonly disabled?: boolean;
}

export function UserSelect({
  institutionId,
  value,
  onChange,
  label,
  placeholder = "Selecione um usuário",
  pageSize = 12,
  disabled = false,
}: UserSelectProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    if (!institutionId) {
      return;
    }

    let isCancelled = false;

    async function loadUsers() {
      setLoading(true);
      setError(null);

      try {
        const response = await institutionApi.getUsers(institutionId, {
          excludeInstitution: true,
          search,
        });
        if (isCancelled) return;

        setUsers(response.users);
        setTotalCount(response.count);
      } catch (err) {
        if (isCancelled) return;
        console.error("Failed to load users:", err);
        setError(
          err instanceof Error ? err.message : "Erro ao carregar usuários",
        );
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      isCancelled = true;
    };
  }, [institutionId, currentPage, pageSize, search]);

  const userItems = (() => {
    if (loading) {
      return (
        <CommandItem value="empty" disabled>
          Carregando usuários...
        </CommandItem>
      );
    }

    if (error) {
      return (
        <CommandItem value="empty" disabled>
          {error}
        </CommandItem>
      );
    }

    if (!users || users.length === 0) {
      return (
        <CommandItem value="empty" disabled>
          Nenhum usuário encontrado.
        </CommandItem>
      );
    }

    return users.map((user) => (
      <CommandItem
        key={user.id}
        value={user.id}
        onSelect={() => {
          onChange(user.id);
          setOpen(false);
        }}
      >
        <Check
          className={cn(
            "mr-2 h-4 w-4",
            value === user.id ? "opacity-100" : "opacity-0",
          )}
        />
        {user.name}
      </CommandItem>
    ));
  })();

  return (
    <div className="space-y-2">
      {label ? (
        <label className="text-sm font-medium text-foreground">{label}</label>
      ) : null}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            disabled={disabled || loading || !!error}
          >
            {value
              ? users.find((user) => user.id === value)?.name
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Buscar usuário..."
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              <CommandEmpty>Nenhum usuário encontrado.</CommandEmpty>
              <CommandGroup>{userItems}</CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {totalPages > 1 ? (
        <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
          <Button
            variant="outline"
            size="sm"
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          >
            Anterior
          </Button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
          >
            Próxima
          </Button>
        </div>
      ) : null}
    </div>
  );
}
