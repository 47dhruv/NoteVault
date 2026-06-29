import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // ===== ADDED =====
    // Loading state
    const [loading, setLoading] = useState(false);

    // ===== ADDED =====
    // Password visibility
    const [showPassword, setShowPassword] = useState(false);

    const validateData = async () => {
        try {
            // ===== ADDED =====
            setLoading(true);

            const response = await axios.post(
                "https://notevault-qd3m.onrender.com/api/v1/user/register",
                {
                    fullname,
                    email,
                    username,
                    password,
                },
                {
                    withCredentials: true,
                }
            );

            console.log(response.data);

            setFullname("");
            setEmail("");
            setUsername("");
            setPassword("");

            navigate("/login");
        } catch (error) {
            console.error(error.response?.data?.message || error.message);
        } finally {
            // ===== ADDED =====
            setLoading(false);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (
            // ===== FIXED =====
            [fullname, email, username, password].some(
                (field) => field.trim() === ""
            )
        ) {
            alert("All fields are required.");
            return;
        }

        validateData();
    };

    return (
        <div
            className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-linear-to-br
      from-slate-950
      via-slate-900
      to-cyan-950
      px-4
      py-10
      "
        >
            <form
                onSubmit={submitHandler}
                className="
        w-full
        max-w-md
        bg-white/10
        backdrop-blur-2xl
        border
        border-white/10
        rounded-3xl
        p-8
        shadow-2xl
        hover:shadow-cyan-500/20
        transition-all
        duration-300
        space-y-5
        "
            >
                {/* Heading */}

                <div className="text-center">
                    <h1 className="text-4xl font-bold text-cyan-400">
                        Create Account
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Welcome! Create your Notes account.
                    </p>
                </div>

                {/* Full Name */}

                <div>
                    <label className="text-gray-300 block mb-2">
                        Full Name
                    </label>

                    <input
                        required
                        type="text"
                        placeholder="John Doe"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        className="
            w-full
            rounded-xl
            bg-white/10
            border
            border-cyan-400/30
            px-4
            py-3
            text-white
            placeholder-gray-400
            outline-none
            focus:border-cyan-400
            focus:ring-2
            focus:ring-cyan-500/30
            transition-all
            "
                    />
                </div>

                {/* Email */}

                <div>
                    <label className="text-gray-300 block mb-2">
                        Email
                    </label>

                    <input
                        required
                        type="email"
                        placeholder="example@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="
            w-full
            rounded-xl
            bg-white/10
            border
            border-cyan-400/30
            px-4
            py-3
            text-white
            placeholder-gray-400
            outline-none
            focus:border-cyan-400
            focus:ring-2
            focus:ring-cyan-500/30
            transition-all
            "
                    />
                </div>

                {/* Username */}

                <div>
                    <label className="text-gray-300 block mb-2">
                        Username
                    </label>

                    <input
                        required
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="
            w-full
            rounded-xl
            bg-white/10
            border
            border-cyan-400/30
            px-4
            py-3
            text-white
            placeholder-gray-400
            outline-none
            focus:border-cyan-400
            focus:ring-2
            focus:ring-cyan-500/30
            transition-all
            "
                    />
                </div>

                {/* Password */}

                <div>
                    <label className="text-gray-300 block mb-2">
                        Password
                    </label>

                    {/* ===== ADDED ===== */}
                    {/* Password with Show/Hide */}

                    <div className="relative">
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="
              w-full
              rounded-xl
              bg-white/10
              border
              border-cyan-400/30
              px-4
              py-3
              pr-14
              text-white
              placeholder-gray-400
              outline-none
              focus:border-cyan-400
              focus:ring-2
              focus:ring-cyan-500/30
              transition-all
              "
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-300
              hover:text-cyan-400
              "
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                </div>

                {/* ===== ADDED ===== */}
                {/* Password Hint */}

                <p className="text-xs text-gray-400">
                    Password should be at least 8 characters.
                </p>

                {/* Submit Button */}

                <button
                    type="submit"
                    disabled={loading}
                    className={`
          w-full
          py-3
          rounded-xl
          font-semibold
          text-lg
          text-white
          transition-all
          duration-300

          ${loading
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-cyan-500 hover:bg-cyan-600 hover:scale-[1.02] shadow-lg shadow-cyan-500/30"
                        }
          `}
                >
                    {/* ===== ADDED ===== */}
                    {loading ? "Creating Account..." : "🚀 Create Account"}
                </button>

                {/* Divider */}

                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-white/20"></div>
                    <span className="text-gray-400 text-sm">OR</span>
                    <div className="flex-1 h-px bg-white/20"></div>
                </div>

                {/* Login */}

                <p className="text-center text-gray-400">
                    Already have an account?

                    <span
                        onClick={() => navigate("/login")}
                        className="
            ml-2
            text-cyan-400
            cursor-pointer
            hover:text-cyan-300
            hover:underline
            "
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Register;