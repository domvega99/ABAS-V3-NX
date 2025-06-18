'use client'
import ThemeContextProvider from "@/utils/context/ModeContext";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/shared/LoadingScreen";
import "./globals.css";
import { Provider } from "react-redux";
import store from "./state/store";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 1000);
  }, []);

  return (
    <html lang="en">
      <body>
        {loading && <LoadingScreen />}
        <Provider store={store}>
          <ThemeContextProvider>
            {children}
          </ThemeContextProvider>
        </Provider>
      </body>
    </html>
  );
}
