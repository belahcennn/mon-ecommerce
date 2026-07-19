"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string | null;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadUsers() {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();

      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function changeRole(
    id: string,
    currentRole: "USER" | "ADMIN"
  ) {
    const newRole =
      currentRole === "ADMIN"
        ? "USER"
        : "ADMIN";

    const res = await fetch(
      "/api/admin/users",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          role: newRole,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              role: newRole,
            }
          : user
      )
    );
  }

  async function deleteUser(id: string) {
    const confirmed = confirm(
      "Voulez-vous vraiment supprimer cet utilisateur ?"
    );

    if (!confirmed) return;

    const res = await fetch(
      "/api/admin/users",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    setUsers((prevUsers) =>
      prevUsers.filter(
        (user) => user.id !== id
      )
    );
  }

  if (loading) {
    return (
      <div className="p-8">
        Chargement des utilisateurs...
      </div>
    );
  }

  return (
    <main className="p-8">

      <h1 className="text-4xl font-bold text-orange-500 mb-8">
        Gestion des utilisateurs 👥
      </h1>

      <div className="bg-white shadow rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-orange-500 text-white">

            <tr>
              <th className="p-4">Nom</th>
              <th className="p-4">Email</th>
              <th className="p-4">Rôle</th>
              <th className="p-4">Actions</th>
            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-b text-center"
              >

                <td className="p-4">
                  {user.name || "-"}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">

                  <span
                    className={
                      user.role === "ADMIN"
                        ? "text-orange-500 font-bold"
                        : "text-gray-600"
                    }
                  >
                    {user.role}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() =>
                        changeRole(
                          user.id,
                          user.role
                        )
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
                    >
                      🔄 Changer rôle
                    </button>

                    <button
                      onClick={() =>
                        deleteUser(user.id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                    >
                      🗑️ Supprimer
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}