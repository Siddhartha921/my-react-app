import { createContext } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const user = {
        name: "Siddu",
        role: "Developer"
    };

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;