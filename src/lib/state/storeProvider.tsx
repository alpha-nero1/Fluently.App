"use client"

import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { SettingStore } from "./stores/settingsStore";
import { SetStore } from "./stores/setStore";
import { SnackbarStore } from "./stores/snackbarStore";
import { BottomSheetStore } from "./stores/bottomSheetStore";

// Type for the store context
const stores = {
  settingStore: new SettingStore(),
  setStore: new SetStore(),
  snackbarStore: new SnackbarStore(),
  bottomSheetStore: new BottomSheetStore()
}

// Create a context with a default empty object
export const StoreContext = createContext(stores);

// A provider component to wrap the entire app. When we move around the app, it maintains reference to the "stores" object.
export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <StoreContext.Provider value={stores}>
      {children}
    </StoreContext.Provider>
  );
};

/**
 * Allows us to listen to the stores we want causing re-renders when observable state changes.
 */
export const useStores = () => {
    // Fetch all stores from context (get that object again).
    const allStores = useContext(StoreContext);
    // Arrayify for ease of applying logic to all.
    const storesToObserve = Object.values(allStores);
    // Dummy state to trigger re-renders!!
    const [, setState] = useState(0); 
  
    useEffect(() => {
      // Subscribe to each store
      const subscribers = storesToObserve
        .map((store) => (
            // Any time store is changed, state counter will increment!!
            store.subscribe(() => setState((prev) => prev + 1))
        ));
  
      // Cleanup subscriptions on unmount
      return () => subscribers.forEach((unsubscribe) => unsubscribe());
    });
  
    return allStores;
}
