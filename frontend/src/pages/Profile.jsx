import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const getToken = () => localStorage.getItem("accesstoken")
    const navigate = useNavigate();

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    // ===== ADDED =====
    const [loading, setLoading] = useState(false);

    // ===== ADDED =====
    const [deleteLoading, setDeleteLoading] = useState(false);

    // ===== ADDED =====
    // Fetch current logged in user

  useEffect(() => {
    const getCurrentUser = async () => {
        const token = getToken();

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            console.log(token);

            const response = await axios.get(
                "https://notevault-qd3m.onrender.com/api/v1/user/currentuser",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const user = response.data.data;

            setFullname(user.fullname);
            setEmail(user.email);
            setUsername(user.username);

        } catch (error) {
            console.log(error.response?.data?.message || error.message);

            if (error.response?.status === 401) {
                localStorage.removeItem("accesstoken");
                navigate("/login");
            }
        }
    };

    getCurrentUser();
}, [navigate]);

    // ===== ADDED =====
    // Update User

   const updateUser = async () => {
    if (
        [fullname, email, username].some(
            (field) => field.trim() === ""
        )
    ) {
        alert("All fields are required.");
        return;
    }

    const token = getToken();

    try {
        setLoading(true);

        const response = await axios.put(
            "https://notevault-qd3m.onrender.com/api/v1/user/updateUser",
            {
                fullname,
                email,
                username,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        alert(response.data.message);

    } catch (error) {
        console.log(error.response?.data?.message || error.message);

        if (error.response?.status === 401) {
            localStorage.removeItem("accesstoken");
            navigate("/login");
        }

    } finally {
        setLoading(false);
    }
};

    // ===== ADDED =====
    // Delete User

    const deleteUser = async () => {
    const confirmDelete = window.confirm(
        "Are you sure you want to permanently delete your account?"
    );

    if (!confirmDelete) return;

    const token = getToken();

    try {
        setDeleteLoading(true);

        const response = await axios.delete(
            "https://notevault-qd3m.onrender.com/api/v1/user/delete",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        alert(response.data.message);

        localStorage.removeItem("accesstoken");

        navigate("/register");

    } catch (error) {
        console.log(error.response?.data?.message || error.message);

        if (error.response?.status === 401) {
            localStorage.removeItem("accesstoken");
            navigate("/login");
        }

    } finally {
        setDeleteLoading(false);
    }
};

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-cyan-950 px-4 py-10">

            <div className="max-w-6xl mx-auto">

                {/* Heading */}

                <div className="text-center mb-10">
                    <h1 className="text-5xl font-bold text-cyan-400">
                        👤 My Profile
                    </h1>

                    <p className="text-gray-400 mt-3">
                        Manage your account settings
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">

                    {/* Profile Information */}

                    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

                        <h2 className="text-3xl font-bold text-white mb-6">
                            Profile Information
                        </h2>

                        <div className="space-y-5">

                            <div>
                                <p className="text-gray-400">
                                    Full Name
                                </p>

                                <h3 className="text-white text-xl">
                                    {fullname}
                                </h3>
                            </div>

                            <div>
                                <p className="text-gray-400">
                                    Email
                                </p>

                                <h3 className="text-white text-xl">
                                    {email}
                                </h3>
                            </div>

                            <div>
                                <p className="text-gray-400">
                                    Username
                                </p>

                                <h3 className="text-white text-xl">
                                    @{username}
                                </h3>
                            </div>

                        </div>

                    </div>

                    {/* Update Profile */}

                    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

                        <h2 className="text-3xl font-bold text-white mb-6">
                            ✏️ Update Profile
                        </h2>

                        <div className="space-y-5">

                            <input
                                type="text"
                                placeholder="Full Name"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                className="w-full rounded-xl bg-white/10 border border-cyan-400/30 px-4 py-3 text-white outline-none focus:border-cyan-400"
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl bg-white/10 border border-cyan-400/30 px-4 py-3 text-white outline-none focus:border-cyan-400"
                            />

                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full rounded-xl bg-white/10 border border-cyan-400/30 px-4 py-3 text-white outline-none focus:border-cyan-400"
                            />

                            <button
                                onClick={updateUser}
                                disabled={loading}
                                className={`
                w-full
                py-3
                rounded-xl
                font-semibold
                transition-all

                ${loading
                                        ? "bg-gray-600 cursor-not-allowed"
                                        : "bg-cyan-500 hover:bg-cyan-600"
                                    }
                `}
                            >
                                {loading ? "Updating..." : "💾 Update Profile"}
                            </button>

                        </div>

                    </div>

                </div>

                {/* Danger Zone */}

                <div className="mt-10 bg-red-500/10 backdrop-blur-xl border border-red-500/20 rounded-3xl p-8 shadow-2xl">

                    <h2 className="text-3xl font-bold text-red-400">
                        ⚠️ Danger Zone
                    </h2>

                    <p className="text-gray-400 mt-4">
                        Once you delete your account, there is no going back.
                        All notes and user data will be removed permanently.
                    </p>

                    <button
                        onClick={deleteUser}
                        disabled={deleteLoading}
                        className={`
            mt-8
            px-8
            py-3
            rounded-xl
            font-semibold
            transition-all

            ${deleteLoading
                                ? "bg-gray-600 cursor-not-allowed"
                                : "bg-red-500 hover:bg-red-600"
                            }
            `}
                    >
                        {deleteLoading
                            ? "Deleting..."
                            : "🗑 Delete Account"}
                    </button>

                </div>

            </div>

        </div>
    );
};

export default Profile;