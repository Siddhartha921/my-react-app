import { useContext } from "react";
import UserContext from "../../UserContext";

function Profile() {

    const user = useContext(UserContext);

    return (
        <div>

            <h2>Profile</h2>

            <p>Name: {user.name}</p>

            <p>Role: {user.role}</p>

        </div>
    );
}

export default Profile;