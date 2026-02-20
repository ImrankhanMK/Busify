import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/Firebase";
import "../css/reviews.css";

function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all reviews
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "reviews"));
      const reviewsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReviews(reviewsData);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Delete review
  const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await deleteDoc(doc(db, "reviews", reviewId));
      setReviews(prev => prev.filter(r => r.id !== reviewId));
    } catch (err) {
      console.error("Error deleting review:", err);
      alert("Failed to delete review.");
    }
  };

  if (loading) return <div>Loading reviews...</div>;

  return (
    <div className="reviews-page">
      <h2>All Reviews</h2>
      <p>Total Reviews: <strong>{reviews.length}</strong></p>

      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <div className="reviews-table-container">
          <table className="reviews-table">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Bus</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, index) => (
                <tr key={review.id}>
                  <td>{index + 1}</td>
                  <td>{review.userName || review.userEmail}</td>
                  <td>{review.busName || review.busNumber}</td>
                  <td>{review.rating || "-"}</td>
                  <td>{review.comment || "-"}</td>
                  <td>{review.createdAt?.seconds ? new Date(review.createdAt.seconds * 1000).toLocaleDateString() : "-"}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(review.id)}>
                      Delete
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

export default AdminReviews;