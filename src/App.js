// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import PasswordManager from "./PasswordManager";
import Login from "./Login";
import SignUp from "./SignUp";

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Default route: If authenticated, go to PasswordManager, else Login */}
          <Route
            path="/"
            element={
              <DefaultRoute />
            }
          />
          <Route
            path="/password-manager"
            element={
              <PrivateRoute>
                <PasswordManager />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Catch-all route to redirect unknown paths to default route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

function DefaultRoute() {
  const { currentUser } = useAuth();
  return currentUser ? (
    <Navigate to="/password-manager" />
  ) : (
    <Navigate to="/login" />
  );
}

export default App;
