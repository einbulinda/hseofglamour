import React from "react";
import Providers from "../Providers";
import { Roboto } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import createClient from "@/lib/supabase-server";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "House of Glamour :: Admin",
  description: "Admin application for House of Glamour Ecommerce site.",
};

export const revalidate = 0; //Not to cache this layout

export default async function RootLayout({ children }) {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={roboto.className}>
        <AuthProvider accessToken={accessToken}>
          <Providers>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
