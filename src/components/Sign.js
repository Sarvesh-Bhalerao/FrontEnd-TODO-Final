import React, { useState } from "react";
import "./sign.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Sign() {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  async function signUp() {
    let item = { username, email, password };
    console.warn(item);

    axios
      .post("http://127.0.0.1:8000/api/register/", item, {
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
    // result = await result.json();
    // localStorage.setItem("user-info",JSON.stringify(result));
    history.push("/to-do");
  }
  return (
    <>
      <div className="signup">
        <img src="user.png" alt="" />
        <h1>Sign Up Now</h1>
        <form>
          <input
            type="text"
            className="input-box"
            value={username}
            onChange={(e) => setName(e.target.value)}
            placeholder="Username"
          />
          <input
            type="email"
            className="input-box"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email-id"
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
            I Agree to Sign Up
          </p>
          <button onClick={signUp} className="btn btn-primary">
            SignUp
          </button>
          <hr />
          <h6 className="or">OR</h6>
          <hr />
          <p>
            Do you Have an account ? <Link to="Login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
}
