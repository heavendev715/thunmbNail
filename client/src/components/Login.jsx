import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function Login({ loginview }) {
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleInput = async (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });

    }

    const login = async (e) => {
        e.preventDefault();
        const request = await fetch('http://localhost:3001/api/auth/login',
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email, password: user.password })
            })
        const response = await request.json();
        if (request.status === 200) {
            console.log(response);
        } else {
            console.log(response);
        }
    }

    return (
        <form onSubmit={login} className="home_login">
            <h1>Login</h1>
            <input
                name="email"
                value={user.email}
                onChange={handleInput}
                className="form_input"
                type="email"
                placeholder="email"
                required={true} />
            <div className="form_password">
                <input
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                    className="form_input"
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    autoComplete="true"
                    required={true} />
                <button
                    className="show_password"
                    onClick={() => { setShowPassword(!showPassword) }}>
                    {showPassword ? <IoEyeOff /> : <IoEye />}
                </button>
            </div>
            <button className="form_submit" type="submit">Login</button>
            <p className="switch_lr" onClick={() => { loginview(false) }}>or create an account.</p>
        </form>
    )
}