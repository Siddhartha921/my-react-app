import Profile from "./profile";

function Dashboard({ user }) {
    return (
        <div>
            <h1>Dashboard</h1>

            <p>Dashboard does not need the user.</p>

            <Profile user={user} />
        </div>
    );
}

export default Dashboard;