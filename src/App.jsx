import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import MainApp from "./components/MainApp/MainApp";
import NotesPage from "./components/NotesPage/NotesPage";
import { DarkModeProvider, DarkModeContext } from "./context/DarkModeContext";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </Router>
    </DarkModeProvider>
  );
}

function AppContent() {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<MainApp />} />
          <Route path="/notes" element={<NotesPage />} />
        </Routes>
      </Layout>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? "dark" : "light"}
        style={{ zIndex: 10001 }}
      />
    </>
  );
}

export default App;