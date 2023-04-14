import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="container">
          <div></div>
          <div className="links">
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Members</a>
              </li>
              <li>
                <a href="#">History</a>
              </li>
            </ul>
          </div>
          <div className="social">
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
