"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/profile/my-orders");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--arna-accent)]"></div>
    </div>
  );
};

export default ProfilePage;