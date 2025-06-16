import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import DarkModeButton from "./DarkButton";
import { DarkModeContext } from "../context/DarkModeContext";
import { Navbar, Nav, Container } from "react-bootstrap";
import { List, X } from "react-bootstrap-icons";

function Layout({ children }) {
  const { isDarkMode, toggleDarkMode, colors } = useContext(DarkModeContext);

  const [expanded, setExpanded] = useState(false);

  // Toggle navbar collapse
  const handleToggle = () => {
    setExpanded(!expanded);
  };

  // Close navbar on link click
  const handleNavLinkClick = () => {
    setExpanded(false);
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: colors.background,
        color: colors.text,
      }}
    >
      {/* Navigation bar with links and dark mode toggle */}
      <Navbar
        bg="dark"
        variant="dark"
        expand="md"
        className="py-3 shadow"
        expanded={expanded}
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 10000,
        }}
      >
        <Container>
          <Navbar.Brand as={NavLink} to="/" onClick={handleNavLinkClick}>
            <span style={{ color: "#ff4d4f" }}>Focus</span>
            <span style={{ color: "#4d79ff" }}>Learn</span>
          </Navbar.Brand>
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="basic-navbar-nav"
            aria-expanded={expanded}
            aria-label="Toggle navigation"
            onClick={handleToggle}
          >
            {expanded ? (
              <X size={30} style={{ color: "#FFFFFF" }} />
            ) : (
              <List size={30} style={{ color: "#FFFFFF" }} />
            )}
          </button>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={NavLink} to="/" className="mx-2" onClick={handleNavLinkClick}>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/app" className="mx-2" onClick={handleNavLinkClick}>
                App
              </Nav.Link>
              <Nav.Link as={NavLink} to="/notes" className="mx-2" onClick={handleNavLinkClick}>
                Notes
              </Nav.Link>
              <Nav.Item className="mx-2">
                <DarkModeButton
                  isDarkMode={isDarkMode}
                  toggleDarkMode={toggleDarkMode}
                />
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main content area with padding to avoid navbar overlap */}
      <main
        className="flex-grow-1"
        style={{ paddingTop: "70px" }}
      >
        {children}
      </main>

      {/* Footer with copyright and contact info */}
      <footer className="bg-dark py-3">
        <div className="container text-center">
          <p className="mb-0" style={{ color: "#ffffff" }}>
            © 2025 FocusLearn. All rights reserved.
          </p>
          <p className="mb-0">
            <a
              href="mailto:support@focuslearntube.com"
              style={{ color: "#4d79ff", textDecoration: "none" }}
            >
              support@focuslearntube.com
            </a>
          </p>
        </div>
      </footer>

      <style jsx>{`
        .navbar-toggler {
          border: none;
          padding: 0.25rem 0.75rem;
          transition: transform 0.3s ease;
        }
        .navbar-toggler:focus {
          outline: none;
          box-shadow: none;
        }
        .navbar-toggler:hover .bi-list,
        .navbar-toggler:hover .bi-x {
          color: ${isDarkMode ? "#0A21C0" : "#050A44"};
        }
        .navbar-collapse {
          background-color: ${isDarkMode ? "#141619" : "#2C2E3A"};
          padding: 1rem;
          margin-top: 0.5rem;
          border-radius: 0.25rem;
        }
        @media (min-width: 768px) {
          .navbar-collapse {
            background-color: transparent;
            padding: 0;
            margin-top: 0;
            border-radius: 0;
          }
        }
        @media (max-width: 767.98px) {
          .navbar-toggler {
            position: relative;
            z-index: 10001;
          }
          .navbar-collapse {
            position: fixed;
            top: 70px;
            right: 0;
            width: 100%;
            max-width: 300px;
            height: calc(100vh - 70px);
            box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
            z-index: 10000;
          }
          .nav-link {
            padding: 0.75rem 1rem;
            font-size: 1.1rem;
          }
        }
        @media (max-width: 575.98px) {
          .navbar-collapse {
            width: 100%;
            max-width: none;
          }
          .nav-link {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Layout;
