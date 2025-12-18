// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpYEMNlNaNLBZYHqVbU2boaVh2CfwZEuU",
  authDomain: "finsight-78ad1.firebaseapp.com",
  projectId: "finsight-78ad1",
  storageBucket: "finsight-78ad1.firebasestorage.app",
  messagingSenderId: "877048953120",
  appId: "1:877048953120:web:9749d9d01dd7c1bed17f45",
  measurementId: "G-2E7GC7T7EC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only if in browser environment)
let analytics = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export { app, analytics };
export default app;



