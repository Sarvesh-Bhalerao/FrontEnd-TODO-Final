import React, { useState } from "react";
import "./sign.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function handlelogin() {
    let item = { username, password };
    console.warn(item);

    axios
      .post("http://127.0.0.1:8000/api/login/", item, {
        //method :'POST',
        Headers: {
          "Content-Type": "application/json",
          //"Accept" : "application/json"
        },
      })
      .then((data) => {
        console.log(data);
        return data.json();
      })
      .catch((error) => console.error(error));
    // result = await result.JSON();
    // localStorage.setItem("user-info",JSON.stringify(result));
    history.push("/to-do");
  }
  return (
    <>
      <div className="signup">
        <img src="user.png" alt="" />
        <h1>Login</h1>
        <form>
          <input
            type="text"
            className="input-box"
            value={username}
            onChange={(e) => setName(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            className="input-box"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <p>
            {" "}
            <span>
              <input type="checkbox" required />
            </span>{" "}
            I Agree to Login into my Account
          </p>
          <button onClick={handlelogin} className="btn btn-primary">
            Login
          </button>
          <hr />
          <h6 className="or">OR</h6>
          <hr />
          <p>
            Create a New Account <Link to="Sign">Sign Up</Link>
          </p>
        </form>
      </div>
    </>
  );
}
