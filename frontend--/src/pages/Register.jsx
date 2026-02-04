import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const s = styles();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleRegister(e) {
        e.preventDefault();

        if (!name || !email || !password) {
            alert("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                "http://localhost:5000/v1/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Registration failed");
                return;
            }

            alert("Registration successful. Please login.");
            navigate("/login");

        } catch (error) {
            alert("Something went wrong. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={s.container}>
            <div style={s.card}>
                <h2 style={s.heading}>Create Account</h2>
                <p style={s.subHeading}>Register to get Started</p>

                <form onSubmit={handleRegister}>
                    <div style={s.inputGroup}>
                        <label style={s.label}>Name</label>
                        <input
                            type="text"
                            placeholder="Enter Your Name"
                            style={s.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div style={s.inputGroup}>
                        <label style={s.label}>Email</label>
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            style={s.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div style={s.inputGroup}>
                        <label style={s.label}>Password</label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            style={s.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" style={s.button} disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p style={s.loginText}>
                    Already have an account?{" "}
                    <span
                        style={s.loginLink}
                        onClick={() => navigate("/login")}
                    >
                        Login
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
        },
        input: {
            width: "100%",
            padding: "11px",
            borderRadius: "8px",
            border: "1px solid #1e293b",
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
        loginText: {
            marginTop: "16px",
            fontSize: "13px",
            textAlign: "center",
            color: "#94a3b8",
        },
        loginLink: {
            color: "#2563eb",
            cursor: "pointer",
            fontWeight: "500",
        },
    };
}
