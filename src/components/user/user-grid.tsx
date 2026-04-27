"use client";
import { User } from "@/models/user";
import * as institutionApi from "@/network/api/institution";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Pagination } from "../pagination";
import { UserAddModal } from "./user-add-modal";
import { UserList } from "./user-list";

interface UserGridProps {
  readonly institutionId: string;
}

const itemsPerPage = 10;

export function UserGrid({ institutionId }: UserGridProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const page = Number(searchParams.get("page") ?? 1);
        const skip = (page - 1) * itemsPerPage;
        const response = await institutionApi.getUsers(institutionId, {
          take: itemsPerPage,
          skip,
        });
        setUsers(response.users);
        setTotalItems(response.count);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [institutionId, searchParams]);

  const handleAddUser = (user: User) => {
    setUsers((prevUsers) => [user, ...prevUsers]);
  };

  const handleRemoveUser = (userId: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <div className="bg-muted row min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 w-full">
      <div className="text-right mb-4">
        <UserAddModal
          institutionId={institutionId}
          handleCreate={handleAddUser}
        />
      </div>
      <UserList
        users={users}
        institutionId={institutionId}
        onRemove={handleRemoveUser}
        loading={loading}
      />
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        disableScroll
      />
    </div>
  );
}
