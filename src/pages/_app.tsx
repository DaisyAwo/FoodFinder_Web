import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { TRPCProvider } from "@/utils/TRPCProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TRPCProvider>
      <Component {...pageProps} />
    </TRPCProvider>
  );
}
