import React, { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useFirebase } from "../Context/FirebaseContext";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const { currentUser, login } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
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
      login(user.email, user.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("login successful" + user.uid);
          navigate("/");

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("login fail" + error);
        });
    }
  };

  const IsInputValid = () => {
    if (!user.email) {
      return false;
    }
    if (!user.password) {
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
        </table>

        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default LoginPage;
