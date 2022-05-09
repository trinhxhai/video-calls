import React, { useState, useEffect } from "react";

import { doc, setDoc } from "firebase/firestore";
import { useFirebase } from "../Context/FirebaseContext";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const { db } = useFirebase();
  const { currentUser, signUp } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!IsInputValid()) {
      alert("invalid input");
    } else {
      signUp(user.email, user.password)
        .then((userCredential) => {
          // Signed in
          const userAuth = userCredential.user;

          // Add a new document in collection "cities"

          setDoc(doc(db, "users", userAuth.uid), {
            name: user.name,
          }).then((e) => {
            console.log("resgister successful " + userCredential);
            navigate("/");
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(error);
          // ..
        });
    }
  };

  const IsInputValid = () => {
    if (!user.name) {
      return false;
    }
    if (!user.email) {
      return false;
    }
    if (!user.password) {
      return false;
    }
    if (!user.repassword) {
      return false;
    }

    if (user.password !== user.repassword) {
      return false;
    }

    return true;
  };

  const handleInputChange = (e) => {
    // console.log(e.target);
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <table>
          <tr>
            <td>
              <label htmlFor="name">Name:</label>
            </td>
            <td>
              <input
                type="text"
                name="name"
                id="name"
                value={user.name}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="email">Email:</label>
            </td>
            <td>
              <input
                type="text"
                name="email"
                id="email"
                value={user.email}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="password">Password:</label>
            </td>
            <td>
              <input
                type="password"
                name="password"
                id="password"
                value={user.password}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="repassword">Repassword:</label>
            </td>
            <td>
              <input
                type="password"
                name="repassword"
                id="repassword"
                value={user.repassword}
                onChange={handleInputChange}
              />
            </td>
          </tr>
        </table>
        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default RegisterPage;
