import type { Metadata } from "next";
import "@/index.css";
import Providers from "@/components/providers/QueryProvider";

export const metadata: Metadata = {
  title: "Lantern — Help AI Chatbots Discover Your Business",
  description:
    "Lantern helps local businesses get recommended by AI chatbots and converts that traffic with AI-optimized landing pages. Pay only for results.",
  icons: { icon: "/favicon.png" },
  openGraph: {
    title: "Lantern — Help AI Chatbots Discover Your Business",
    description:
      "Lantern helps local businesses get recommended by AI chatbots. Pay only for results.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
