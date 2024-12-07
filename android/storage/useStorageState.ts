import { useEffect, useCallback, useReducer } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { storageKeys } from "./keys";

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

/*
 * A hook that returns a stateful value, and a function to update it.
 */
function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
  return useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null
    ): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === "web") {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

export async function getStorageItemAsync(key: string): Promise<string | null> {
  if (Platform.OS === "web") {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error("Local storage is unavailable:", e);
      return null;
    }
  } else {
    return await SecureStore.getItemAsync(key);
  }
}

/**
 * A hook that persists a stateful value to local storage.
 * @param key The key to store the value under.
 * @returns A tuple containing the current value, and a function to update it.
 */
export function useStorageState(key: storageKeys): UseStateHook<string> {
  // Public
  const [state, setState] = useAsyncState<string>();

  // Get
  useEffect(() => {
    const loadStorageItem = async () => {
      if (Platform.OS === "web") {
        try {
          if (typeof localStorage !== "undefined") {
            setState(localStorage.getItem(key));
          }
        } catch (e) {
          console.error("Local storage is unavailable:", e);
        }
      } else {
        const value = await SecureStore.getItemAsync(key);
        setState(value);
      }
    };

    loadStorageItem();
  }, [key]);

  // Set
  const setValue = useCallback(
    (value: string | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}
