"use client";
import Auth from "@/components/auth";
import { useAuth, VIEWS } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";

const UserAuth = () => {
  const router = useRouter();
  const { user, view } = useAuth();

  if (view === VIEWS.UPDATE_PASSWORD) {
    return <Auth view={view} />;
  }

  // if (user) router.push("/"); //Too many redirects to homepage {@einbulinda_22.07.2023}

  return <Auth view={view} />;
};

export default UserAuth;
