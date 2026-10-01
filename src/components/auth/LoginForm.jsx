import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../AuthContext";

function LoginForm() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");

    const {
        isAuthenticated,
        setIsAuthenticated,
        user
    } = useContext(AuthContext);

    async function handleLogin(event) {
        event.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const response = await axios.post(
                "https://reqres.in/api/login",
                {
                    email: email,
                    password: password
                }
            );

            console.log(response.data);

            setToken(response.data.token);
            setIsAuthenticated(true);
            setMessage("Login successful!");
        } catch (error) {
            console.log("Login failed:", error);
            setMessage("Login failed");
        } finally {
            setLoading(false);
        }
    }

    async function fetchProfile() {
        try {
            const response = await axios.get(
                "https://reqres.in/api/users/2",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(response.data);
        } catch (error) {
            console.log("Failed to fetch profile:", error);
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>

            <p>
                Authenticated:{" "}
                {isAuthenticated ? "Yes" : "No"}
            </p>

            <p>
                Role: {user.role}
            </p>

            <input
                type="email"
                value={email}
                onChange={(event) =>
                    setEmail(event.target.value)
                }
                placeholder="Email"
            />

            <input
                type="password"
                value={password}
                onChange={(event) =>
                    setPassword(event.target.value)
                }
                placeholder="Password"
            />

            <button
                type="submit"
                disabled={loading}
            >
                {loading ? "Logging in..." : "Login"}
            </button>

            <button
                type="button"
                onClick={fetchProfile}
                disabled={!token}
            >
                Fetch Profile
            </button>

            {message && <p>{message}</p>}

            {token && (
                <p>
                    Token received successfully.
                </p>
            )}
        </form>
    );
}

export default LoginForm;