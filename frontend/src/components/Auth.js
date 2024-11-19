import { useState } from "react";
import { useCookies } from "react-cookie";

// const Auth = () => {
//   //   const [cookies, setCookie, removeCookie] = useCookies(["user"]);
//   //   const [isLogin, setIsLogin] = useState(true);
//   //   const [email, setEmail] = useState(null);
//   //   const [password, setPassword] = useState(null);
//   //   const [confirmPassword, setConfirmPassword] = useState(null);
//   //   const [error, setError] = useState(false);
//   //   const handleSubmit = async (e, endpoint) => {
//   //     e.preventDefault();
//   //     console.log(endpoint);
//   //     if (!isLogin && password !== confirmPassword) {
//   //       setError(" Make sure passwords match");
//   //       return;
//   //     }
//   //     const response = await fetch(
//   //       `${process.env.REACT_APP_SERVERURL}/${endpoint}`,
//   //       {
//   //         method: "POST",
//   //         headers: { "Content-Type": "application/json" },
//   //         body: JSON.stringify({ email, password }),
//   //       }
//   //     );
//   //     const data = await response.json();
//   //     console.log(data);
//   //     if (data.detail) {
//   //       setError(data.detail);
//   //     } else {
//   //       setCookie("Email", data.email);
//   //       setCookie("AuthToken", data.token);
//   //       window.location.reload();
//   //     }
//   //   };
//   //   const viewLogin = (status) => {
//   //     setError(null);
//   //     setIsLogin(status);
//   //   };
//   //   return (
//   //     <div className="auth-container">
//   //       <div className="auth-container-box">
//   //         <form className="auth-container-form">
//   //           <h2>{isLogin ? "Please log in" : "Please sign up!"}</h2>
//   //           <input
//   //             type="email"
//   //             id="email"
//   //             name="email"
//   //             placeholder="email"
//   //             onChange={(e) => setEmail(e.target.value)}
//   //           />
//   //           <input
//   //             type="text"
//   //             id="password"
//   //             name="password"
//   //             placeholder="password"
//   //             onChange={(e) => setPassword(e.target.value)}
//   //           />
//   //           {!isLogin && (
//   //             <input
//   //               type="text"
//   //               id="password-check"
//   //               name="password-check"
//   //               placeholder="confirm password"
//   //               onChange={(e) => setConfirmPassword(e.target.value)}
//   //             />
//   //           )}
//   //           {error && <p>* {error}</p>}
//   //           <input
//   //             type="submit"
//   //             text="GO!"
//   //             className="create"
//   //             onClick={(e) => handleSubmit(e, isLogin ? "login" : "signup")}
//   //           />
//   //         </form>
//   //         <div className="auth-options">
//   //           <button
//   //             onClick={() => viewLogin(false)}
//   //             style={{
//   //               backgroundColor: !isLogin
//   //                 ? "rgb(255,255,255"
//   //                 : "rgb(188, 188, 188)",
//   //             }}
//   //           >
//   //             Sign up
//   //           </button>
//   //           <button
//   //             onClick={() => viewLogin(true)}
//   //             style={{
//   //               backgroundColor: isLogin
//   //                 ? "rgb(255,255,255"
//   //                 : "rgb(188, 188, 188)",
//   //             }}
//   //           >
//   //             Login
//   //           </button>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   );
// };

// export default Auth;

import React from "react";

const Auth = () => {
  const [cookies, setCookies, removeCookies] = useCookies(null);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  console.log(email, password, confirmPassword);
  console.log(cookies);

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };

  const handleSubmit = async (e, endPoint) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/${endPoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      // Check for a successful response
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Something went wrong");
        return;
      }

      // Process successful response
      const data = await response.json();
      console.log("Response data:", data);

      if (data.detail) {
        setError(data.detail);
      } else {
        setCookies("Email", data.email);
        setCookies("AuthToken", data.token);
        window.location.reload();
      }

      //   // Handle data (e.g., save token, redirect, etc.)
      //   if (data.token) {
      //     // Assuming you store the token in local storage for authenticated requests
      //     localStorage.setItem("token", data.token);
      //     // Navigate to a different page or show a success message
      //     // navigate("/dashboard"); // Example: navigate to dashboard
      //   }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form
          onSubmit={(e) => {
            handleSubmit(e, isLogin ? "login" : "signup");
          }}
        >
          <h2>{isLogin ? "Please log in" : "Please sign up!"}</h2>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input type="submit" className="create" />
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{
              backgroundColor: !isLogin
                ? "rgb(255, 255, 255)"
                : "rgb(188, 188, 188)",
            }}
          >
            Sign Up
          </button>
          <button
            onClick={() => viewLogin(true)}
            style={{
              backgroundColor: isLogin
                ? "rgb(255, 255, 255)"
                : "rgb(188, 188, 188)",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
