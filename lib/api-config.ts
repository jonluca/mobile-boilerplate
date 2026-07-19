import Constants from "expo-constants";
import { Platform } from "react-native";

const API_PORT = 3001;

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

function getExpoDevelopmentHost() {
  const hostUri = Constants.expoConfig?.hostUri;

  if (!hostUri) {
    return null;
  }

  try {
    const url = new URL(hostUri.includes("://") ? hostUri : `http://${hostUri}`);
    return url.hostname;
  } catch {
    return null;
  }
}

function getLocalApiUrl() {
  const expoHost = getExpoDevelopmentHost();

  if (Platform.OS === "android" && (!expoHost || expoHost === "127.0.0.1" || expoHost === "localhost")) {
    return `http://10.0.2.2:${API_PORT}`;
  }

  return `http://${expoHost ?? "127.0.0.1"}:${API_PORT}`;
}

export function getApiBaseUrl() {
  const configuredUrl = process.env.EXPO_PUBLIC_API_URL?.trim();

  if (configuredUrl) {
    return trimTrailingSlash(configuredUrl);
  }

  return getLocalApiUrl();
}
