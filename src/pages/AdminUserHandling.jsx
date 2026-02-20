
// import React, { useEffect, useState } from "react";
// import { collection, getDocs, doc, updateDoc ,deleteDoc,getDoc } from "firebase/firestore";
// import { db } from "../services/Firebase";
// import "../css/adminUserHandling.css";

// function AdminUserHandling() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch users from Firestore
//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const snapshot = await getDocs(collection(db, "users"));
//       const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setUsers(usersData);
//     } catch (err) {
//       console.error("Error fetching users:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Block / Unblock user
//   const toggleStatus = async (userId, currentStatus) => {
//     try {
//       const userRef = doc(db, "users", userId);
//       const newStatus = currentStatus === "active" ? "blocked" : "active";
//       await updateDoc(userRef, { status: newStatus });
//       setUsers(prev =>
//         prev.map(u => (u.id === userId ? { ...u, status: newStatus } : u))
//       );
//     } catch (err) {
//       console.error("Error updating status:", err);
//       alert("Failed to update user status.");
//     }
//   };

//   // Delete user from Firestore AND Firebase Auth via admin server
//   // const deleteUser = async (userId) => {
//   //   if (!window.confirm("Are you sure you want to delete this user?")) return;

//   //   try {
//   //     // 1️⃣ Call admin-server API to delete from Firebase Auth
//   //     const res = await fetch("http://localhost:5000/deleteUser", {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify({ uid: userId }),
//   //     });

//   //     const data = await res.json();

//   //     if (!res.ok) {
//   //       throw new Error(data.error || "Failed to delete user from Auth");
//   //     }

//   //     // 2️⃣ Delete from Firestore
//   //     const userRef = doc(db, "users", userId);
//   //     await updateDoc(userRef, { deleted: true }); // optional: soft delete or use deleteDoc
//   //     setUsers(prev => prev.filter(u => u.id !== userId));

//   //     alert("User deleted successfully.");
//   //   } catch (err) {
//   //     console.error("Error deleting user:", err);
//   //     alert(`Failed to delete user: ${err.message}`);
//   //   }
//   // };
//   const deleteUser = async (userId) => {
//   if (!window.confirm("Are you sure you want to delete this user?")) return;

//   try {
//     // 1️⃣ Delete from Auth via admin-server
//     const res = await fetch("http://localhost:5000/deleteUser", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ uid: userId }),
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.error || "Failed to delete user from Auth");

//     // 2️⃣ Delete Firestore document only if exists
//     const userRef = doc(db, "users", userId);
//     const userSnap = await getDoc(userRef);
//     if (userSnap.exists()) {
//       await deleteDoc(userRef);
//     }

//     // 3️⃣ Update UI
//     setUsers(prev => prev.filter(u => u.id !== userId));
//     alert("User deleted successfully.");
//   } catch (err) {
//     console.error("Error deleting user:", err);
//     alert(`Failed to delete user: ${err.message}`);
//   }
// };

//   if (loading) return <div>Loading users...</div>;

//   return (
//     <div className="users-page">
//       <h2>All Users</h2>
//       <p>Total Users: <strong>{users.length}</strong></p>

//       {users.length === 0 ? (
//         <p>No users found.</p>
//       ) : (
//         <div className="users-table-container">
//           <table className="users-table">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Role</th>
//                 <th>Status</th>
//                 <th>Created At</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, index) => (
//                 <tr key={user.id}>
//                   <td>{index + 1}</td>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                   <td>{user.phone || "-"}</td>
//                   <td>{user.role}</td>
//                   <td>{user.status}</td>
//                   <td>{new Date(user.createdAt?.seconds * 1000).toLocaleDateString()}</td>
//                   <td>
//                     <button
//                       className={`status-btn ${user.status}`}
//                       onClick={() => toggleStatus(user.id, user.status)}
//                     >
//                       {user.status === "active" ? "Block" : "Unblock"}
//                     </button>
//                     <button
//                       className="delete-btn"
//                       onClick={() => deleteUser(user.id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AdminUserHandling;

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
      <p>Total Users: <strong>{users.length}</strong></p>

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
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone || "-"}</td>
                  <td>{user.role}</td>
                  <td>{user.status}</td>
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