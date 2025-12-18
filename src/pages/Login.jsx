
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signInWithEmail, signInWithGoogle } from "../firebase/auth";
import { useAuth } from "../firebase/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { currentUser, loading: authLoading } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && currentUser) {
      navigate("/dashboard", { replace: true });
    }
  }, [currentUser, authLoading, navigate]);

  const s = {
    wrapper: {
      width: "100%",
      minHeight: "90vh",
      background: "#F1F1F1",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: "30px",
      paddingBottom: "30px",
      fontFamily: "Poppins, sans-serif",
    },

    underline: {
  width: "100%",
  height: "4px",
  backgroundColor: "#F4B443",
  marginTop: "12px",
  borderRadius: "4px",
},


    card: {
      width: "82%",
      height: "80vh",
      background: "#fff",
      borderRadius: "25px",
      display: "flex",
      overflow: "hidden",
      boxShadow: "0px 15px 45px rgba(0,0,0,0.2)",
    },

    /* LEFT SIDE */
    left: {
      width: "50%",
      background: "#073D7F",
      padding: "60px 70px",
      color: "white",
      position: "relative",
    },

    circle1: {
      position: "absolute",
      bottom: "-40px",
      left: "-40px",
      width: "210px",
      height: "210px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.12)",
    },

    circle2: {
      position: "absolute",
      bottom: "20px",
      left: "200px",
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.15)",
    },

    /* RIGHT SIDE */
    right: {
      width: "50%",
      background: "white",
      padding: "60px 80px",
    },

    inputBox: {
      width: "100%",
      margin: "18px 0",
      padding: "12px 15px",
      display: "flex",
      alignItems: "center",
      background: "#f1f1f1",
      borderRadius: "10px",
      position: "relative",
    },
    input: {
      width: "100%",
      marginLeft: "12px",
      border: "none",
      outline: "none",
      background: "transparent",
      fontSize: "15px",
    },

    showBtn: {
      position: "absolute",
      right: "15px",
      color: "#0a6cff",
      fontWeight: "600",
      cursor: "pointer",
      fontSize: "13px",
    },

    signInBtn: {
      width: "100%",
      padding: "14px",
      background: "#25558f  ",
      border: "none",
      color: "white",
      borderRadius: "10px",
      cursor: "pointer",
      marginTop: "10px",
      fontWeight: "600",
      fontSize: "17px",
    },
     
    googleBtn: {
      width: "100%",
      padding: "14px",
      background: "white",
      border: "2px solid #bfbfbf",
      borderRadius: "10px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      fontSize: "16px",
      fontWeight: "500",
      marginTop: "15px",
    },

    divider: {
      textAlign: "center",
      margin: "12px 0",
      fontWeight: "600",
      color: "#777",
    },
    errorMsg: {
      color: "#dc2626",
      fontSize: "14px",
      marginBottom: "10px",
      textAlign: "center",
    },
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    const result = await signInWithEmail(email, password);
    setLoading(false);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Failed to sign in. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const result = await signInWithGoogle();
      
      if (result.success) {
        // User successfully signed in, navigate to dashboard
        navigate("/dashboard", { replace: true });
      } else {
        setLoading(false);
        setError(result.error || "Failed to sign in with Google. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div style={s.wrapper}>
      <div style={s.card}>

        {/* LEFT */}
        <div style={s.left}>
          <h1 style={{ fontWeight: "700", fontSize: "45px" }}>WELCOME</h1>
          <h4
            style={{
              marginTop: "8px",
              letterSpacing: "1px",
              opacity: "0.9",
            }}
          >
            YOUR SMART FINANCE COMPANION
          </h4>

          <div style={s.underline}></div>

          <p style={{ marginTop: "25px", width: "70%", lineHeight: "1.6" }}>
            FINSIGHT helps you analyze, track, and optimize your financial decisions with AI-powered accuracy.
Log in to continue managing your insights and personalized dashboards.
          </p>

          {/* DECORATIVE CIRCLES */}
          <div style={s.circle1}></div>
          <div style={s.circle2}></div>
        </div>

        {/* RIGHT */}
        <div style={s.right}>
          <h1 style={{ fontSize: "34px", marginBottom: "5px" }}>Sign in to your account</h1>
          <p style={{ color: "#777", marginBottom: "25px" }}>
            Access your personalized finance dashboard and insights.
          </p>

          {/* Error Message */}
          {error && <div style={s.errorMsg}>{error}</div>}

          <form onSubmit={handleEmailLogin}>
            {/* Email */}
            <div style={s.inputBox}>
              <FaUser size={17} color="gray" />
              <input
                style={s.input}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div style={s.inputBox}>
              <FaLock size={17} color="gray" />
              <input
                style={s.input}
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span style={s.showBtn} onClick={() => setShowPass(!showPass)}>
                {showPass ? "HIDE" : "SHOW" }
              </span>
            </div>

            {/* Row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "14px",
                marginBottom: "20px",
              }}
            >
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" style={{ color: "#25558f" }}>
                Forgot Password?
              </a>
            </div>

            {/* SIGN IN BUTTON */}
            <button
              type="submit"
              style={s.signInBtn}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* DIVIDER */}
          <div style={s.divider}>OR</div>

          {/* GOOGLE LOGIN */}
          <button
            style={s.googleBtn}
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <FcGoogle size={22} /> Sign in with Google
          </button>

          <p
            style={{
              marginTop: "20px",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#25558f" }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;


