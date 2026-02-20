import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../services/Firebase";
import '../css/adminBusesHandling.css';

function AdminBusesHandling() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBus, setEditingBus] = useState(null);
  const [formData, setFormData] = useState({
    serviceName: "",
    busName: "",
    busNumber: "",
    
    from: "",
    to: "",
    totalSeats: "",
     arrivalTime: "",
    departureTime: "",
    fare: "",
    status: "active",
  });

  // Fetch buses
  const fetchBuses = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "buses"));
      const busesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBuses(busesData);
    } catch (err) {
      console.error("Error fetching buses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or Update Bus
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBus) {
        // Update existing bus
        const busRef = doc(db, "buses", editingBus.id);
        await updateDoc(busRef, {
           serviceName: formData.serviceName,
          busName: formData.busName,
          busNumber: formData.busNumber,
         
          from: formData.from,
          to: formData.to,
          totalSeats: Number(formData.totalSeats),
           arrivalTime: formData.arrivalTime,
          departureTime: formData.departureTime,
          fare: Number(formData.fare),
          status: formData.status,
        });
      } else {
        // Add new bus
        await addDoc(collection(db, "buses"), {
            serviceName: formData.serviceName,
          busName: formData.busName,
          busNumber: formData.busNumber,
        
          from: formData.from,
          to: formData.to,
          totalSeats: Number(formData.totalSeats),
           arrivalTime: formData.arrivalTime,
          departureTime: formData.departureTime,
          fare: Number(formData.fare),
          status: formData.status,
          createdAt: serverTimestamp(),
        });
      }

      // Reset form
      setFormData({serviceName: "", busName: "", busNumber: "",  from: "", to: "", totalSeats: "", status: "active", arrivalTime: "",
        departureTime: "",
        fare: "", });
      setEditingBus(null);
      setShowForm(false);
      fetchBuses();
    } catch (err) {
      console.error("Error saving bus:", err);
      alert("Failed to save bus.");
    }
  };

  // Delete bus
  const handleDelete = async (busId) => {
    if (!window.confirm("Are you sure you want to delete this bus?")) return;
    try {
      await deleteDoc(doc(db, "buses", busId));
      setBuses(prev => prev.filter(b => b.id !== busId));
    } catch (err) {
      console.error("Error deleting bus:", err);
      alert("Failed to delete bus.");
    }
  };

  // Toggle bus status
  const toggleStatus = async (bus) => {
    try {
      const busRef = doc(db, "buses", bus.id);
      const newStatus = bus.status === "active" ? "inactive" : "active";
      await updateDoc(busRef, { status: newStatus });
      setBuses(prev => prev.map(b => b.id === bus.id ? { ...b, status: newStatus } : b));
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status.");
    }
  };

  // Edit bus
  const handleEdit = (bus) => {
    setEditingBus(bus);
    setFormData({
      serviceName: bus.serviceName,
      busName: bus.busName,
      busNumber: bus.busNumber,
      from: bus.from,
      to: bus.to,
      totalSeats: bus.totalSeats,
       arrivalTime: bus.arrivalTime ,
      departureTime: bus.departureTime ,
      fare: bus.fare ,
      status: bus.status,
    });
    setShowForm(true);
  };

  if (loading) return <div>Loading buses...</div>;

  return (
    <div className="buses-page">
      <h2>All Buses</h2>
      <p>Total Buses: <strong>{buses.length}</strong></p>
      <button className="add-btn" onClick={() => setShowForm(true)}>Add New Bus</button>

      {showForm && (
        <div className="bus-form-container">
          <h3>{editingBus ? "Edit Bus" : "Add New Bus"}</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" name="serviceName" placeholder="Service Name" value={formData.serviceName} onChange={handleChange} required />
            <input type="text" name="busName" placeholder="Bus Name" value={formData.busName} onChange={handleChange} required />
            <input type="text" name="busNumber" placeholder="Bus Number" value={formData.busNumber} onChange={handleChange} required />
            
            <input type="text" name="from" placeholder="From" value={formData.from} onChange={handleChange} required />
            <input type="text" name="to" placeholder="To" value={formData.to} onChange={handleChange} required />
            <input type="number" name="totalSeats" placeholder="Total Seats" value={formData.totalSeats} onChange={handleChange} required />
             <input type="text" name="arrivalTime" placeholder="Arrival Time" value={formData.arrivalTime} onChange={handleChange} required />
            <input type="text" name="departureTime" placeholder="Departure Time" value={formData.departureTime} onChange={handleChange} required />
            <input type="number" name="fare" placeholder="Fare" value={formData.fare} onChange={handleChange} required />
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button type="submit">{editingBus ? "Update Bus" : "Add Bus"}</button>
            <button type="button" onClick={() => { setShowForm(false); setEditingBus(null); }}>Cancel</button>
          </form>
        </div>
      )}

      <div className="buses-table-container">
        <table className="buses-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Service Name</th>
              <th>Bus Name</th>
              <th>Bus Number</th>
              <th>Route</th>
              <th>Total Seats</th>
               <th>Arrival</th>
              <th>Departure</th>
              <th>Fare</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus, index) => (
              <tr key={bus.id}>
                <td>{index + 1}</td>
                <td>{bus.serviceName }</td>
                <td>{bus.busName}</td>
                <td>{bus.busNumber}</td>
                <td>{bus.from} → {bus.to}</td>
                <td>{bus.totalSeats}</td>
                <td>{bus.arrivalTime }</td>
                <td>{bus.departureTime }</td>
                <td>{bus.fare }</td>
                <td>{bus.status}</td>
                <td>
                  <button className="status-btn" onClick={() => toggleStatus(bus)}>
                    {bus.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                  <button className="edit-btn" onClick={() => handleEdit(bus)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(bus.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminBusesHandling;
