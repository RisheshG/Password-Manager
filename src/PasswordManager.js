import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import './PasswordManager.css';

export default function PasswordManager() {
  const [passwords, setPasswords] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchPasswords = async () => {
      if (!currentUser) return;

      try {
        const q = query(
          collection(db, "passwords"),
          where("userId", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        setPasswords(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching passwords: ", error);
      }
    };

    fetchPasswords();
  }, [currentUser]);

  const addPassword = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert("You must be logged in to add a password.");
      return;
    }
    try {
      await addDoc(collection(db, "passwords"), {
        userId: currentUser.uid,
        name,
        username,
        password: passwordValue,
      });
      setName("");
      setUsername("");
      setPasswordValue("");
      setIsFormVisible(false);
      // Refresh the list
      const q = query(
        collection(db, "passwords"),
        where("userId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      setPasswords(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    } catch (error) {
      console.error("Error adding password: ", error);
    }
  };

  const handleDeletePassword = async (id) => {
    try {
      await deleteDoc(doc(db, "passwords", id));
      setPasswords(passwords.filter(password => password.id !== id));
    } catch (error) {
      console.error("Error deleting password: ", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const copyToClipboard = (password) => {
    navigator.clipboard.writeText(password);
  };

  return (
    <div className="password-manager-container">
      <h2>Password Manager</h2>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      {isFormVisible && (
        <form className="password-form" onSubmit={addPassword}>
          <input
            type="text"
            placeholder="Service Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            required
          />
          <button type="submit">Add Password</button>
          <button type="button" onClick={() => setIsFormVisible(false)}>Cancel</button>
        </form>
      )}
      {passwords.length === 0 ? (
    <div className="empty-password-message">
        <h3>It looks like you don't have any saved passwords yet!</h3>
        <p>Start securing your accounts by adding your passwords.</p>
        <button 
            className="call-to-action-button" 
            onClick={() => setIsFormVisible(true)}>
            Add Your First Password
        </button>
    </div>
) : (
    <div className="password-card-container">
        {passwords.map((password) => (
            <div key={password.id} className="password-card">
                <h3>{password.name}</h3>
                <p>Username: {password.username}</p>
                <input type="text" readOnly value="••••••••" />
                <button onClick={() => copyToClipboard(password.password)}>Copy Password</button>
                <button className="delete-button" onClick={() => handleDeletePassword(password.id)}>
                    🗑️
                </button>
            </div>
        ))}
    </div>
)}
      {!isFormVisible && <button className="toggle-form-button" onClick={() => setIsFormVisible(true)}>Add Password</button>}
    </div>
  );
}
