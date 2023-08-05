import DarkModeSwitch from "@/components/DarkModeSwitch";
import MobileMenu from "@/components/navigation/MobileMenu";
import Topbar from "@/components/navigation/Topbar";
import clsx from "clsx";
import SideNavMenu from "@/components/navigation/SideNavMenu";

export const metadata = {
  title: "House of Glamour :: Dashboard",
  description: "Admin overview for House of Glamour E-Commerce.",
};

export default async function RootLayout({ children }) {
  return (
    <div className="py-5 md:py-0 px-3 bg-black/[0.15] dark:bg-transparent">
      {/* Removed classes causing xScrollBar  -mx-3  sm:-mx-8 sm:px-8 */}
      <DarkModeSwitch />
      <MobileMenu />

      <div className="flex mt-[4.7rem] md:mt-0 overflow-hidden">
        <SideNavMenu />

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
  );
}
