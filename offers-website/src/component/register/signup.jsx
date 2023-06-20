import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signup.css"
const SignupForm = () => {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        role: "",
        age: "",
    });
    const [alertMsg, setAlertMsg] = useState("")
    const navigate=useNavigate()
    const handleLogin=()=>{
        navigate('/')
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8081/api/v4/signup", userData)
            .then((response) => {
                console.log(response);
                setTimeout(() => {
                    setAlertMsg("")
                }, 2000)
                setAlertMsg("registeration successfully");
                setUserData({
                    username: "",
                    email: "",
                    password: "",
                    role: "",
                    age: "",
                });
            })
            .catch((error) => {
                console.log(error);
                setAlertMsg("registeration failed");
            });
    };

    return (
        <>
            <div className="form-container">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={userData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={userData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={userData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{"color":"red"}}><p>* Role: admin or guest</p></div>
                    <div className="form-group">
                        <label htmlFor="role">Role:</label>
                        <input
                            type="text"
                            name="role"
                            id="role"
                            value={userData.role}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age:</label>
                        <input
                            type="text"
                            name="age"
                            id="age"
                            value={userData.age}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Submit</button>
                    {alertMsg && <h5>{alertMsg}</h5>}
                    <button onClick={handleLogin}>Login</button>
                </form>
            </div>
        </>
    );
};

export default SignupForm;