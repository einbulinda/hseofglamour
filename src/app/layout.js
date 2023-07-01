import DarkModeSwitch from "@/components/DarkModeSwitch";
import "./globals.css";
import Providers from "./Providers";
import MobileMenu from "@/components/MobileMenu";
import Topbar from "@/components/Topbar";
import clsx from "clsx";
import Link from "next/link";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "House of Glamour :: Admin",
  description: "Admin application for House of Glamour Ecommerce site.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>
          <div className="py-5 md:py-0 px-3 bg-black/[0.15] dark:bg-transparent">
            {/* Removed classes causing xScrollBar  -mx-3  sm:-mx-8 sm:px-8 */}
            <DarkModeSwitch />
            <MobileMenu />

            <div className="flex mt-[4.7rem] md:mt-0 overflow-hidden">
              {/* BEGIN: Side Menu @einbulinda_28.06.2023 */}
              <nav className="hidden md:block md:w-[105px] xl:w-[250px] px-5 pb-16 overflow-x-hidden z-10">
                <Link href="#">
                  <span className="hidden ml-3 text-lg text-white xl:block">
                    House of Gla
                  </span>
                </Link>

                <Divider type="div" className="my-6"></Divider>
              </nav>
              {/* END: Side Menu */}
              {/* BEGIN:Content */}
              <div
                className={clsx([
                  "rounded-[30px] md:rounded-[35px/50px_0px_0px_0px] min-w-0 min-h-screen max-w-full md:max-w-none bg-slate-100 flex-1 pb-10 px-4 md:px-6 relative md:ml-4 dark:bg-darkmode-700",
                  "before:content-[''] before:w-full before:h-px before:block",
                  "after:content-[''] after:z-[-1] after:rounded-[40px_0px_0px_0px] after:w-full after:inset-y-0 after:absolute after:left-0 after:bg-white/10 after:mt-8 after:-ml-4 after:dark:bg-darkmode-400/50",
                ])}
              >
                <Topbar />
                {children}
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

function Divider(props) {
  const { className, ...computedProps } = props;
  const Component = props.as || "div";

  return (
    <Component
      {...computedProps}
      className={clsx([
        props.className,
        "w-full h-px bg-white/[0.08] z-10 relative dark:bg-white/[0.07]",
      ])}
    ></Component>
  );
}
