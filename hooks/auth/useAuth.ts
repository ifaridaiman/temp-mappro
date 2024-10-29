"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import OAuthInfo from "@arcgis/core/identity/OAuthInfo";
import { signOut } from "./authService";

const CREDENTIALS_EXPIRATION_TIME = 115 * 60 * 1000; // 1 hour and 45 minutes in milliseconds

const setCredentialsWithExpiry = (userData: any) => {
  const now = new Date().getTime();
  const expiryTime = now + CREDENTIALS_EXPIRATION_TIME;
  const item = {
    userData,
    expiryTime
  };
  localStorage.setItem("user", JSON.stringify(item));
};

const getCredentials = () => {
  const itemStr = localStorage.getItem("user");
  if (!itemStr) {
    return null;
  }

  try {
    const item = JSON.parse(itemStr);
    const now = new Date().getTime();
    if (now > item.expiryTime) {
      localStorage.removeItem("user");
      return null;
    }
    return item.userData;
  } catch (error) {
    console.error("Error parsing JSON from localStorage:", error);
    localStorage.removeItem("user");
    return null;
  }
};



export const useAuth = () => {
  const [oauthInfo, setOAuthInfo] = useState<OAuthInfo | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);

      const { fetchOAuthInfo } = await import("./authService");

      const info = await fetchOAuthInfo();
      if (info) {
        const { initialize, checkCurrentStatus, fetchUserFromBackend } =
          await import("./authService");

        setOAuthInfo(info);
        const oauthInfo = await initialize(info.appId, info.portalUrl, false);
        // console.log("OAuthInfo initialized:", oauthInfo);

        const credential = await checkCurrentStatus(oauthInfo);
        if (credential) {
          // console.log("Credential found:", credential);

          // Extract username from the credential
          const username = credential.userId;
          console.log("Extracted username:", username);

          // Fetch additional user data from the backend
          const userData = await fetchUserFromBackend(username);
          if (userData) {
            // console.log("User found:", userData);
            setUser(userData);
            setCredentialsWithExpiry(userData);
            router.push("/");
          } else {
            console.warn("Failed to fetch user from backend.");
          }
        } else {
          console.warn("User is not authenticated.");
        }
      }
      setLoading(false);
    };

    const userData = getCredentials();
    if (userData) {
      setUser(userData);
    } else {
      initializeAuth();
    }
  }, [router]);

  const handleSignIn = async () => {
    if (oauthInfo) {
      const { signIn, fetchUserFromBackend } = await import(
        "./authService"
      );
      const credential = await signIn(oauthInfo);
      if (credential) {
        // console.log("Signed in:", credential);

        // Extract username from the credential
        const username = credential.userId;
        // console.log("Extracted username after sign in:", username);

        // Fetch additional user data from the backend
        const userData = await fetchUserFromBackend(username);
        if (userData) {
          console.log("User found after sign in:", userData);
          setUser(userData);
          setCredentialsWithExpiry(userData);
          router.push("/");
        } else {
          console.warn("Failed to fetch user from backend after sign in.");
        }
      } else {
        console.warn("Failed to sign in.");
      }
    }
  };

  const handleSignOut = () => {
    signOut()
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  return {
    oauthInfo,
    user,
    loading,
    handleSignIn,
    handleSignOut
  };
};
