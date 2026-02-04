/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const s = styles();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    function handleLogin(e) {
        e.preventDefault();
        
        fetch("http://localhost:5000/v1/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then(async (res) => {
                const data = await res.json();
            
                if (!res.ok) {
                    throw new Error(data.message || "Login failed");
                }
            
                return data;
            })
            .then((data) => {
                // expected backend response:
                // { token: "...", user: { id, name, email } }
            
                localStorage.setItem(
                    "authUser",
                    JSON.stringify({
                        user: data.user,
                        token: data.token,
                        isLoggedIn: true,
                    })
                );
            
                navigate("/dashboard");
            })
            .catch((err) => {
                console.error(err);
                window.alert(err.message);
            });
    }   


    return (
        <div style={s.container}>
            <div style={s.card}>
                <h2 style={s.heading}>Welcome Back</h2>
                <p style={s.subHeading}>Login to your account</p>

                <form onSubmit={handleLogin}>
                    <div style={s.inputGroup}>
                        <label style={s.label}>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            style={s.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div style={s.inputGroup}>
                        <label style={s.label}>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            style={s.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" style={s.button} disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p style={s.registerText}>
                    Don't have an account?{" "}
                    <span
                        style={s.registerLink}
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
}

function styles() {
    return {
        container: {
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#0f172a",
            margin: 0, 
            overflow: "hidden", // prevents scrollbar
        },
        card: {
            backgroundColor: "#020617",
            padding: "32px",
            borderRadius: "14px",
            width: "360px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
            color: "#e5e7eb",
        },
        heading: {
            textAlign: "center",
            marginBottom: "4px",
            fontSize: "26px",
            fontWeight: "600",
        },
        subHeading: {
            textAlign: "center",
            marginBottom: "22px",
            fontSize: "14px",
            color: "#94a3b8",
        },
        inputGroup: {
            marginBottom: "16px",
        },
        label: {
            display: "block",
            marginBottom: "6px",
            fontSize: "13px",
            color: "#cbd5f5",
            textAlign: "left", // Align label to the left
        },
        input: {
            width: "100%",
            padding: "11px",
            borderRadius: "8px",
            border: "1px solid #4a5568",  // A lighter, visible border color
            outline: "none",
            fontSize: "14px",
            backgroundColor: "#020617",
            color: "#e5e7eb",
        },
        button: {
            width: "100%",
            padding: "11px",
            marginTop: "12px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: "500",
        },
        registerText: {
            marginTop: "16px",
            fontSize: "13px",
            textAlign: "center",
            color: "#94a3b8",
        },
        registerLink: {
            color: "#2563eb",
            cursor: "pointer",
            fontWeight: "500",
        }
    }
}

export default Login;
