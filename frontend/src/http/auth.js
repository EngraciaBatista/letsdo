const { API_URL } = require("../config");

const authRequest = async (endpoint, user) => {
  try {
    const res = await fetch(`${API_URL}/auth/${endpoint}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
    throw new Error(
      `${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} failed`
    );
  }
};

export const signup = (user) => authRequest("signup", user);

export const signin = (user) => authRequest("signin", user);

export const authenticate = (data, cb) => {
  window.localStorage.setItem("jwt", JSON.stringify(data));
  cb();
};

export const signout = async (cb) => {
  window.localStorage.removeItem("jwt");
  cb();
  try {
    const res = await fetch(`${API_URL}/auth/signout`);
    return console.log("signout", res);
  } catch (err) {
    return console.log(err);
  }
};

export const isAuthenticated = () => {
  if (window.localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
