import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../services/Firebase";
import "../css/bookings.css"

function AdminBookingsHandling() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "bookings"));
      const bookingsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(bookingsData);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Update booking status
  const updateStatus = async (bookingId, currentStatus) => {
    try {
      const bookingRef = doc(db, "bookings", bookingId);
      const newStatus = currentStatus === "confirmed" ? "cancelled" : "confirmed";
      await updateDoc(bookingRef, { status: newStatus });
      setBookings(prev =>
        prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b)
      );
    } catch (err) {
      console.error("Error updating booking status:", err);
      alert("Failed to update booking status.");
    }
  };

  if (loading) return <div>Loading bookings...</div>;

  return (
    <div className="bookings-page">
      <h2>All Bookings</h2>
      <p>Total Bookings: <strong>{bookings.length}</strong></p>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="bookings-table-container">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Bus Name</th>
                <th>Service</th>
                <th>Route</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Seats</th>
                <th>Total Fare</th>
                <th>Status</th>
                <th>Booking Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking.id}>
                  <td>{index + 1}</td>
                  <td>{booking.userName || "-"}</td>
                  <td>{booking.userEmail || "-"}</td>
                  <td>{booking.userPhone || "-"}</td>
                  <td>{booking.busName || "-"}</td>
                  <td>{booking.serviceName || "-"}</td>
                  <td>{booking.from} → {booking.to}</td>
                  <td>{booking.departureTime || "-"}</td>
                  <td>{booking.arrivalTime || "-"}</td>
                  <td>{booking.seatsBooked}</td>
                  <td>{booking.totalFare}</td>
                  <td>{booking.status}</td>
                  <td>{booking.createdAt?.seconds ? new Date(booking.createdAt.seconds * 1000).toLocaleDateString() : "-"}</td>
                  <td>
                    <button
                      className="status-btn"
                      onClick={() => updateStatus(booking.id, booking.status)}
                    >
                      {booking.status === "confirmed" ? "Cancel" : "Confirm"}
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

export default AdminBookingsHandling;
