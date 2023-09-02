import { RouterTransition } from "@/components/RouterTransition";
import { Shell } from "@/components/Shell";
import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "light" }}
      >
        <Notifications />
        <RouterTransition />
        <Shell>
          <Component {...pageProps} />
        </Shell>
      </MantineProvider>
    </QueryClientProvider>
  );
}
