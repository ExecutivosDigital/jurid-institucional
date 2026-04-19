import { ChakraProvider } from "@chakra-ui/react";
import { ApiContextProvider } from "context/ApiContext";
import { CookiesProvider } from "next-client-cookies/server";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CookiesProvider>
        <ApiContextProvider>
          <ChakraProvider>{children}</ChakraProvider>
          <Toaster
            containerStyle={{
              bottom: 40,
              left: 20,
              right: 20,
            }}
            position="top-center"
            gutter={10}
            toastOptions={{
              duration: 2000,
            }}
          ></Toaster>
        </ApiContextProvider>
      </CookiesProvider>
    </>
  );
}
