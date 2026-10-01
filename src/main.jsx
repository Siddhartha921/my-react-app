import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./UserContext";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { AuthProvider } from "./AuthContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <UserProvider>
                <Provider store={store}>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </Provider>
            </UserProvider>
        </BrowserRouter>
    </StrictMode>
);