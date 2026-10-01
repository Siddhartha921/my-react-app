import { createContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [user, setUser] = useState({
        name: "Siddu",
        role: "developer"
    });

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                user,
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider };
export default AuthContext;