import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/Firebase";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import "../css/revenue.css";

function Revenue() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filters, setFilters] = useState({ from: "", to: "" });

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      const snapshot = await getDocs(collection(db, "bookings"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBookings(data);
      setFilteredBookings(data);
    };
    fetchBookings();
  }, []);

  // Apply date filters
  useEffect(() => {
    if (!filters.from && !filters.to) {
      setFilteredBookings(bookings);
      return;
    }
    const filtered = bookings.filter((b) => {
      const bookingDate = new Date(b.bookingDate);
      const from = filters.from ? new Date(filters.from) : null;
      const to = filters.to ? new Date(filters.to) : null;
      if (from && bookingDate < from) return false;
      if (to && bookingDate > to) return false;
      return true;
    });
    setFilteredBookings(filtered);
  }, [filters, bookings]);

  // KPIs
  const totalRevenue = filteredBookings.reduce(
    (sum, b) => sum + Number(b.amount),
    0
  );
  const totalBookings = filteredBookings.length;
  const avgRevenue = totalBookings ? (totalRevenue / totalBookings).toFixed(2) : 0;

  // Revenue per day
  const revenueByDate = {};
  filteredBookings.forEach((b) => {
    const date = new Date(b.bookingDate).toLocaleDateString();
    revenueByDate[date] = (revenueByDate[date] || 0) + Number(b.amount);
  });
  const chartData = Object.entries(revenueByDate).map(([date, revenue]) => ({
    date,
    revenue,
  }));

  // Top 5 buses
  const revenueByBus = {};
  filteredBookings.forEach((b) => {
    revenueByBus[b.busName] = (revenueByBus[b.busName] || 0) + Number(b.amount);
  });
  const topBuses = Object.entries(revenueByBus)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([bus, revenue]) => ({ bus, revenue }));

  // Top 5 routes
  const revenueByRoute = {};
  filteredBookings.forEach((b) => {
    revenueByRoute[b.route] = (revenueByRoute[b.route] || 0) + Number(b.amount);
  });
  const topRoutes = Object.entries(revenueByRoute)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([route, revenue]) => ({ route, revenue }));

  return (
    <div className="revenue-page">
      {/* KPI Cards */}
      <div className="kpi-cards">
        <div className="card">
          <h3>Total Revenue</h3>
          <p>₹{totalRevenue}</p>
        </div>
        <div className="card">
          <h3>Total Bookings</h3>
          <p>{totalBookings}</p>
        </div>
        <div className="card">
          <h3>Average Revenue</h3>
          <p>₹{avgRevenue}</p>
        </div>
        <div className="card">
          <h3>Total customers</h3>
          <p>{totalRevenue}</p>
          <p>Active {totalRevenue}</p>
        </div>
        <div className="card">
          <h3>Total Buses</h3>
          <p> {totalBookings}</p>
          <p> Active{totalBookings}</p>
        </div>
        {/* <div className="card">
          <h3>Active </h3>
          <p>₹{avgRevenue}</p>
        </div> */}
      </div>

      {/* Filters */}
      <div className="filters">
        <label>
          From:{" "}
          <input
            type="date"
            value={filters.from}
            onChange={(e) => setFilters((prev) => ({ ...prev, from: e.target.value }))}
          />
        </label>
        <label>
          To:{" "}
          <input
            type="date"
            value={filters.to}
            onChange={(e) => setFilters((prev) => ({ ...prev, to: e.target.value }))}
          />
        </label>
      </div>

      {/* Charts */}
      <div className="charts">
        <div className="chart-container">
          <h4 className="text-white">Revenue Over Time</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h4 className="text-white">Top 5 Buses by Revenue</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topBuses}>
              <XAxis dataKey="bus" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h4 className="text-white">Top 5 Routes by Revenue</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topRoutes}>
              <XAxis dataKey="route" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Table */}
      <div className="revenue-table">
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User</th>
              <th>Bus</th>
              <th>Route</th>
              <th>Seats</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.userName}</td>
                <td>{b.busName}</td>
                <td>{b.route}</td>
                <td>{b.seats}</td>
                <td>₹{b.amount}</td>
                <td>{new Date(b.bookingDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Revenue;
