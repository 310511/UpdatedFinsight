import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signUpWithEmail, signInWithGoogle } from "../firebase/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const s = {
    wrapper: {
      width: "100%",
      height: "100vh",
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
      height: "auto",
      background: "white",
      borderRadius: "25px",
      display: "flex",
      overflow: "hidden",
      boxShadow: "0px 15px 45px rgba(0,0,0,0.2)",
      marginBottom: "0px",
    },

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

    right: {
      width: "50%",
      background: "white",
      padding: "60px 80px",
    },

    inputBox: {
      width: "100%",
      margin: "14px 0",
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

    signUpBtn: {
      width: "100%",
      padding: "14px",
      background: "#25558f",
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
      padding: "14px 20px",
      background: "white",
      border: "2px solid #bfbfbf",
      borderRadius: "10px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "14px",
      fontSize: "16px",
      fontWeight: "500",
      marginTop: "20px",
      marginBottom: "20px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    },
    
    
    divider: {
      textAlign: "center",
      margin: "20px 0 10px",
      fontWeight: "600",
      color: "#777",
      letterSpacing: "1px",
    },
    errorMsg: {
      color: "#dc2626",
      fontSize: "14px",
      marginBottom: "10px",
      textAlign: "center",
    },
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const result = await signUpWithEmail(email, password, fullName);
    setLoading(false);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Failed to create account. Please try again.");
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setLoading(true);

    try {
      const result = await signInWithGoogle();
      
      if (result.success) {
        // User successfully signed in, navigate to dashboard
        navigate("/dashboard", { replace: true });
      } else {
        setLoading(false);
        setError(result.error || "Failed to sign up with Google. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div style={s.wrapper}>
      <div style={s.card}>
        
        {/* LEFT BLUE SIDE */}
        <div style={s.left}>
          <h1 style={{ fontWeight: "700", fontSize: "32px" }}>CREATE YOUR <br /> FINSIGHT ACCOUNT  </h1>
          <h4 style={{ marginTop: "8px", opacity: "0.9" }}>
            
          </h4>

          <div style={s.underline}></div>
          <p style={{ marginTop: "25px", fontWeight: 500 , width: "70%", lineHeight: "1.6" }}>
            Sign up to access insights, dashboards, and smart planning tools.
          </p>

          <div style={s.circle1}></div>
          <div style={s.circle2}></div>
        </div>

        {/* RIGHT WHITE SIDE */}
        <div style={s.right}>
          <h1 style={{ fontSize: "34px", marginBottom: "5px" }}>Sign Up</h1>
          <p style={{ color: "#777", marginBottom: "25px" }}>
            Create your account to get started
          </p>

          {/* Error Message */}
          {error && <div style={s.errorMsg}>{error}</div>}

          <form onSubmit={handleEmailSignup}>
            {/* Full Name */}
            <div style={s.inputBox}>
              <FaUser size={17} color="gray" />
              <input
                style={s.input}
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div style={s.inputBox}>
              <FaEnvelope size={17} color="gray" />
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
                {showPass ? "HIDE" : "SHOW"}
              </span>
            </div>

            {/* Confirm Password */}
            <div style={s.inputBox}>
              <FaLock size={17} color="gray" />
              <input
                style={s.input}
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                style={s.showBtn}
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? "HIDE" : "SHOW"}
              </span>
            </div>

            <button
              type="submit"
              style={s.signUpBtn}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div style={s.divider}>OR</div>

          <button
            style={s.googleBtn}
            onClick={handleGoogleSignup}
            disabled={loading}
          >
            <FcGoogle size={22} />
            Sign up with Google
          </button>

          <p
            style={{
              marginTop: "20px",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#25558f" }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

