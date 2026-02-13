import React, { useEffect } from "react";
import "../css/Home.css";
import { Link } from "react-router-dom";


function Home() {

  return (
    <div className="home-container">
      <nav  id="mainNavbar" className="navbar navbar-expand-lg bg-transparent fixed-top shadow-sm navbar-custom">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Busify</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <a className="nav-link" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#reviews">Reviews</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact Us</a>
              </li>
            </ul>
            <div>
              <Link className="login-btn" to="/login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* SECTIONS */}

      <section id="home" className="section">
        <div className="container text-center">
          <h1>Welcome to Busify</h1>
          <p>Your Smart Bus Booking Solution</p>
        </div>
      </section>

      <section id="about" className="section bg-dark">
        <div className="container">
          <h2>About Us</h2>
          <p>Busify provides seamless and reliable bus booking services.</p>
        </div>
      </section>

      <section id="reviews" className="section">
        <div className="container">
          <h2>Customer Reviews</h2>
          <p>Our customers love our service.</p>
        </div>
      </section>

      <section id="contact" className="section bg-light">
        <div className="container">
          <h2>Contact Us</h2>
          <p>Email: support@busify.com</p>
        </div>
      </section>

    </div>
  );
}

export default Home;
