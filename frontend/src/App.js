import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  
  const [isLogin, setIsLogin] = useState(true);

  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const handleRegister = (e) => {
    e.preventDefault();
    
    
    if(!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    axios.post('http://localhost:3001/register', { name, email, password })
    .then(result => {
      console.log(result);
      if(result.data === "Already has an account"){
        alert("Email already used!");
      } else {
        alert("Registered successfully! Please Login.");
        setIsLogin(true); 
      }
    })
    .catch(err => console.log(err));
  }

  
  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/login', { email, password })
    .then(result => {
      console.log(result);
      if(result.data === "Success") {
        alert("Login Successful! Welcome.");
        
      } else {
        alert(result.data);
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="App">
      <div className="container">
        
        {/* Toggle Title */}
        <h2>{isLogin ? "Login Page" : "Register Page"}</h2>

        <form>
          {/* Show Name field only if Registering */}
          {!isLogin && (
            <input 
              type="text" 
              placeholder="Enter Name" 
              onChange={(e) => setName(e.target.value)} 
            />
          )}

          <input 
            type="email" 
            placeholder="Enter Email" 
            onChange={(e) => setEmail(e.target.value)} 
          />
          
          <input 
            type="password" 
            placeholder="Enter Password" 
            onChange={(e) => setPassword(e.target.value)} 
          />

          {/* Switch buttons based on state */}
          {isLogin ? (
            <button onClick={handleLogin}>Login</button>
          ) : (
            <button onClick={handleRegister}>Sign Up</button>
          )}
        </form>

        <div className="toggle-link">
          {isLogin ? (
            <p>Don't have an account? <span onClick={() => setIsLogin(false)}>Register</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => setIsLogin(true)}>Login</span></p>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;