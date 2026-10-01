import { Link, Outlet } from "react-router-dom";

function Layout() {
    return (
        <div>
            <header>
                <h1>My React App</h1>

                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/dashboard">Dashboard</Link>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>

            <footer>
                <p>My React App</p>
            </footer>
        </div>
    );
}

export default Layout;