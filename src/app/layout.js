import { Roboto } from "next/font/google";
import DarkModeSwitch from "@/components/DarkModeSwitch";
import "./globals.css";
import Providers from "./Providers";
import { AuthProvider } from "@/components/AuthProvider";
import createClient from "@/lib/supabase-server";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "House of Glamour :: Admin",
  description:
    "Admin application for House of Glamour retail business in Kenya",
};

export const revalidate = 0; //Not to cache this layout

const RootLayout = async ({ children }) => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={roboto.className}>
        <Providers>
          <AuthProvider accessToken={accessToken}>
            <div className="py-5 md:py-0 px-3 bg-black/[0.15] dark:bg-transparent">
              <DarkModeSwitch />
              {children}
            </div>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
