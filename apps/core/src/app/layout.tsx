'use client'
import { ModeContextProvider } from "@abasv3/themes";
// import { useEffect, useState } from "react";
// import LoadingScreen from "./components/shared/LoadingScreen";
// import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@abasv3/shared-lib";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false); 
  //   }, 1000);
  // }, []);

  return (
    <html lang="en">
      <body>
        {/* {loading && <LoadingScreen />} */}
        <Provider store={store}>
          <ModeContextProvider>
            {children}
          </ModeContextProvider>
        </Provider>
      </body>
    </html>
  );
}
