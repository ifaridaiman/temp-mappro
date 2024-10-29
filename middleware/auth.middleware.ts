import IdentityManager from "@arcgis/core/identity/IdentityManager";
import OAuthInfo from "@arcgis/core/identity/OAuthInfo";
import esriConfig from "@arcgis/core/config";
import Portal from "@arcgis/core/portal/Portal";
import dynamic from "next/dynamic";


export const oauthinfo = new OAuthInfo({
  appId: "JJIvYtzdLuoCRMZI",
  portalUrl: "https://gdas.jupem.gov.my/portal/",
  popup: false,
  popupCallbackUrl: "https://localhost:3000/"
});

IdentityManager.registerOAuthInfos([oauthinfo]);

export const authMiddleware = async () => {
  try {
    const storedUserInfo = localStorage.getItem("userInfo");

    if (storedUserInfo) {
      return JSON.parse(storedUserInfo);
    } else {
      const userInfo = await IdentityManager.checkSignInStatus(
        oauthinfo.portalUrl + "/sharing"
      );

      if (userInfo) {
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      } else {
        console.log("Something went wrong");
      }

      return userInfo;
    }
  } catch (err) {
    console.log(err);
    IdentityManager.getCredential(oauthinfo.portalUrl + "/sharing");
    return false;
  }
};

export const handleLoginSuccess = () => {
  const portal = new Portal();
  portal.authMode = "immediate";

  portal.load().then(() => {
    console.log(portal);
    if (portal.user) {
      console.log("User info", portal.user);
    } else {
      console.log("No user info");
    }
  });
};

export const checkSignIn = async () => {
  IdentityManager.checkSignInStatus(oauthinfo.portalUrl + "/sharing")
    .then(() => {
      handleLoginSuccess();
    })
    .catch(() => {
      console.log("No user info");
    });
};

export const signOut = () => {
  IdentityManager.destroyCredentials();
  localStorage.removeItem("userInfo");
  window.location.reload();
};
