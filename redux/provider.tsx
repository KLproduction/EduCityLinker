"use client";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <main suppressHydrationWarning>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </main>
    </Provider>
  );
};
