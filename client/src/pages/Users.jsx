import React, { useEffect, useMemo, useState } from "react";
import { useTable, useSortBy, usePagination, useGlobalFilter } from "react-table";
import { useForm } from "react-hook-form";
import api from "../api";
import Button from "../components/Button";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // user being edited
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users");
      setUsers(res.data.rows);
    } catch (err) {
      console.error("Error fetching users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  const openAddUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const openEditUser = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Role", accessor: "role" },
      { Header: "Status", accessor: "status" },
      {
        Header: "Created",
        accessor: "created_at",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => openEditUser(row.original)}>
              Edit
            </Button>
            <Button variant="secondary" onClick={() => deleteUser(row.original.id)}>
              Delete
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setGlobalFilter,
    state: { globalFilter, pageIndex },
  } = useTable(
    {
      columns,
      data: users,
      initialState: { pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <Button onClick={openAddUser}>+ Add User</Button>
      </div>

      <input
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search users..."
        className="border px-2 py-1 rounded mb-4"
      />

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table {...getTableProps()} className="w-full bg-white border rounded">
          <thead>
            {headerGroups.map((hg) => (
              <tr {...hg.getHeaderGroupProps()} className="text-left text-sm text-gray-500">
                {hg.headers.map((col) => (
                  <th {...col.getHeaderProps(col.getSortByToggleProps())} className="p-2">
                    {col.render("Header")}
                    <span>{col.isSorted ? (col.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="border-t">
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="p-2">
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <div className="flex justify-between items-center mt-4">
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Prev
        </Button>
        <span>Page {pageIndex + 1}</span>
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </Button>
      </div>

      {isModalOpen && (
        <UserFormModal
          user={editingUser}
          onClose={closeModal}
          onSaved={fetchUsers}
        />
      )}
    </div>
  );
}

/**
 * User Form Modal for Add/Edit
 */
function UserFormModal({ user, onClose, onSaved }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (user) {
      reset(user); // populate form when editing
    } else {
      reset({ name: "", email: "", role: "user", status: "pending" });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      if (user) {
        await api.put(`/users/${user.id}`, data);
      } else {
        await api.post("/users", data);
      }
      onSaved();
      onClose();
    } catch (err) {
      alert("Failed to save user");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded p-6 w-96 shadow">
        <h2 className="text-lg font-bold mb-4">
          {user ? "Edit User" : "Add User"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Name */}
          <div>
            <label className="block text-sm">Full Name</label>
            <input
              className="border w-full rounded px-2 py-1"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm">Email</label>
            <input
              type="email"
              className="border w-full rounded px-2 py-1"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm">Role</label>
            <select
              className="border w-full rounded px-2 py-1"
              {...register("role")}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* ✅ Status */}
          <div>
            <label className="block text-sm">Status</label>
            <select
              className="border w-full rounded px-2 py-1"
              {...register("status")}
            >
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit">{user ? "Update" : "Create"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

