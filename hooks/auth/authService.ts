// import IdentiyManager from '@arcgis/core/identity/IdentityManager';
import OAuthInfo from "@arcgis/core/identity/OAuthInfo";

// /**
//  * Initialize OAuthInfo and register with IdentityManager
//  * @param appId
//  * @param portalUrl
//  * @param popup
//  * @returns OAuthInfo
//  */

export const initialize = async (
  appId: string,
  portalUrl: string,
  popup: boolean
) => {
  if (typeof window === "undefined") {
    throw new Error("initialize can only be used in the browser");
  }

  const { default: IdentityManager } = await import(
    "@arcgis/core/identity/IdentityManager"
  );
  const { default: OAuthInfo } = await import(
    "@arcgis/core/identity/OAuthInfo"
  );

  const oauthInfo = new OAuthInfo({ appId, popup, portalUrl });
  IdentityManager.registerOAuthInfos([oauthInfo]);
  // console.log("OAuthInfo initialized:", oauthInfo); // Add log
  return oauthInfo;
};

// /**
//  * Check current logged in status for the provided portal
//  * @param oauthInfo
//  * @returns Promise<Credential>
//  */
export const checkCurrentStatus = async (oauthInfo: OAuthInfo) => {
  if (typeof window === "undefined") {
    throw new Error("checkCurrentStatus can only be used in the browser");
  }

  const { default: IdentityManager } = await import(
    "@arcgis/core/identity/IdentityManager"
  );

  try {
    const credential = await IdentityManager.checkSignInStatus(
      `${oauthInfo.portalUrl}/sharing`
    );
    console.log("Credential found:", credential); // Add log
    return credential;
  } catch (error) {
    console.warn("User is not signed in:", error); // Add log
  }
};

// /**
//  * Attempt to sign in and get credentials
//  * @param oauthInfo
//  * @returns Promise<Credential>
//  */
export const signIn = async (oauthInfo: OAuthInfo) => {
  if (typeof window === "undefined") {
    throw new Error("signIn can only be used in the browser");
  }

  try {
    const credential =
      (await checkCurrentStatus(oauthInfo)) ||
      (await fetchCredentials(oauthInfo));
    return credential;
  } catch (error) {
    const credential = await fetchCredentials(oauthInfo);
    return credential;
  }
};

// /**
//  * Sign out and destroy credentials
//  */
export const signOut = async () => {
  if (typeof window === "undefined") {
    throw new Error("signOut can only be used in the browser");
  }

  // Lazy load the IdentityManager to avoid circular dependencies
  const { default: IdentityManager } = await import(
    "@arcgis/core/identity/IdentityManager"
  );

  IdentityManager.destroyCredentials();
};

// /**
//  * Fetch credentials for the provided portal
//  * @param oauthInfo
//  * @returns Promise<Credential>
//  */
export const fetchCredentials = async (oauthInfo: OAuthInfo) => {
  if (typeof window === "undefined") {
    throw new Error("fetchCredentials can only be used in the browser");
  }

  // Lazy load the IdentityManager to avoid circular dependencies
  const { default: IdentityManager } = await import(
    "@arcgis/core/identity/IdentityManager"
  );

  try {
    const credential = await IdentityManager.getCredential(
      `${oauthInfo.portalUrl}/sharing`
    );
    return credential;
  } catch (error) {
    console.warn(error);
  }
};

/**
 * Fetch user information from the portal
 * @returns Promise<PortalUser>
 */
export const fetchUser = async () => {
  if (typeof window === "undefined") {
    throw new Error("fetchUser can only be used in the browser");
  }

  // Lazy load the Portal to avoid circular dependencies
  const { default: Portal } = await import("@arcgis/core/portal/Portal");

  const portal = new Portal();
  await portal.load();

  console.log("Portal loaded:", portal); // Add log

  if (portal.user) {
    console.log("Portal user:", portal.user); // Add log
  } else {
    console.warn("No user found in portal."); // Add log
  }

  return portal.user;
};

/**
 * Fetch user information from the backend
 * @param username The username to query for user information
 * @returns Promise<User>
 */
export const fetchUserFromBackend = async (username: string) => {
  try {
    const response = await fetch(
      `${process.env.SERVER_URL}/GetRoles?username=${username}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user from backend");
    }
    const data = await response.json();
    console.log("Fetched user data from backend:", data);
    return data.data;
  } catch (error) {
    console.error("Error fetching user from backend:", error);
    return null;
  }
};

// /**
//  * Fetch OAuth Info from the server
//  * @returns Promise<OAuthInfo | null>
//  */
export const fetchOAuthInfo = async (): Promise<OAuthInfo | null> => {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/GetOAuthInfo`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching OAuth info:", error);
    return null;
  }
};
