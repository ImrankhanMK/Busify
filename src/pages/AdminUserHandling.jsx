import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../services/Firebase";
import "../css/adminUserHandling.css";

function AdminUserHandling() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from Firestore
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "users"));
      const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Block / Unblock user
  const toggleStatus = async (userId, currentStatus) => {
    try {
      const userRef = doc(db, "users", userId);
      const newStatus = currentStatus === "active" ? "blocked" : "active";
      await updateDoc(userRef, { status: newStatus });
      setUsers(prev =>
        prev.map(u => (u.id === userId ? { ...u, status: newStatus } : u))
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update user status.");
    }
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="users-page">
      <h2>All Users</h2>
      <h3 className="text-white">Total Users : <strong className="text-success">{users.length}</strong></h3>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td className={user.status === "active" ? "text-warning" : "text-danger"}>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone || "-"}</td>
                  <td>{user.role}</td>
                  <td className={user.status === "active" ? "text-warning" : "text-danger"}>{user.status}</td>
                  <td>{new Date(user.createdAt?.seconds * 1000).toLocaleDateString()}</td>
                  <td>
                    <button
                      className={`status-btn ${user.status}`}
                      onClick={() => toggleStatus(user.id, user.status)}
                    >
                      {user.status === "active" ? "Block" : "Unblock"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminUserHandling;