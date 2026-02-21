"use client";

import ProfileSection from "@/components/profile/ProfileSection";
import { useGetMeQuery } from "@/redux/slices/authApislice";

export default function ProfileDetailsPage() {
    const { data, isLoading } = useGetMeQuery();

    if (isLoading) return <div>Loading...</div>;
    if (!data?.user) return null;

    return <ProfileSection user={data.user} />;
}
