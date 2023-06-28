import DarkModeSwitch from "@/components/DarkModeSwitch";
import "./globals.css";
import Providers from "./Providers";

export const metadata = {
  title: "House of Glamour :: Admin",
  description: "Admin application for House of Glamour Ecommerce site.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="py-5">
            <DarkModeSwitch />

            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
