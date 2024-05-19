import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login logic goes here");
    console.log(username);
    console.log(password);
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Login successful:", data);
      console.log("user id :", data.user._id);
      console.log("user name :", data.user.username);
      // Store userid and username in localStorage
      localStorage.setItem("userid", data.user._id);
      localStorage.setItem("username", data.user.username);
    } else {
      console.error("Login failed");
      const errorData = await response.json();
      console.error("Error:", errorData.message);
    }
  };

  return (
    <div className="row mt-3">
      <h1 className="col-6 offset-3">login on wanderlust</h1>
      <div className="col-8 offset-2">
        <form onSubmit={handleSubmit} noValidate className="needs-validation">
          <div className="mt-3">
            <label htmlFor="username" className="form-label">
              userName
            </label>
            <input
              name="username"
              id="username"
              placeholder="enter userName"
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mt-3">
            <label htmlFor="password" className="form-label">
              password
            </label>
            <input
              name="password"
              id="password"
              placeholder="enter password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success mt-3">
            login
          </button>
        </form>
      </div>
      <div>
        <p>not logged in sign up here</p>
        <Link className="nav-link" to="/api/signup">
          <b>Sign Up</b>
        </Link>
      </div>
    </div>
  );
};

export default Login;
