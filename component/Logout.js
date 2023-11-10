import Cookies from "js-cookie";
import React from "react";

const Logout = () => {
    const handleLogout = async (e) => {
        e.preventDefault();
        Cookies.remove('user');
        window.location.href = "/";
    };

    return (
        <div>
            <button type="submit" onClick={handleLogout} className=" hover:underline ">Logout</button>
        </div>
    );
};

export default Logout;
