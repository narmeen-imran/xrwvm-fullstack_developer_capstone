import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const registeruser = async (e) => {
    e.preventDefault();
    const register_url = window.location.origin + "/djangoapp/register";
    
    const res = await fetch(register_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "userName": userName,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "email": email
      }),
    });

    const json = await res.json();
    if (json.status === "Authenticated") {
      window.location.href = window.location.origin;
    } else if (json.error) {
      alert(json.error);
    }
  };

  return (
    <div className="register_container" style={{ width: "50%", margin: "auto", marginTop: "5%" }}>
      <div className="header" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <span className="text" style={{ fontSize: "36px", fontWeight: "bold" }}>Sign Up</span>
      </div>
      
      <form onSubmit={registeruser}>
        <div className="inputs" style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
          {/* Username Field */}
          <div className="input">
            <input 
              type="text" 
              name="username" 
              placeholder="Username" 
              className="input_field" 
              onChange={(e) => setUserName(e.target.value)} 
              required 
            />
          </div>

          {/* First Name Field */}
          <div className="input">
            <input 
              type="text" 
              name="first_name" 
              placeholder="First Name" 
              className="input_field" 
              onChange={(e) => setFirstName(e.target.value)} 
              required 
            />
          </div>

          {/* Last Name Field */}
          <div className="input">
            <input 
              type="text" 
              name="last_name" 
              placeholder="Last Name" 
              className="input_field" 
              onChange={(e) => setLastName(e.target.value)} 
              required 
            />
          </div>

          {/* Email Field */}
          <div className="input">
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              className="input_field" 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          {/* Password Field */}
          <div className="input">
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              className="input_field" 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
        </div>

        {/* Register Button */}
        <div className="submit_panel" style={{ marginTop: "20px" }}>
          <input className="btn btn-primary" type="submit" value="Register" />
        </div>
      </form>
    </div>
  );
};

export default Register;