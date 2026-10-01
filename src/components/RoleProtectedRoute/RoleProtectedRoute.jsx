import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../AuthContext";

function RoleProtectedRoute({ children, allowedRole }) {
    const { isAuthenticated, user } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (user.role !== allowedRole) {
        return <Navigate to="/dashboard" />;
    }

    return children;
}

export default RoleProtectedRoute;