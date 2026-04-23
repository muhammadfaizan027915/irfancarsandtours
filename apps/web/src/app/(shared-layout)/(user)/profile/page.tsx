import { Suspense } from "react";
import { ProfileContent, ProfileContentSkeleton } from "@icat/features/contents/profile";

export default async function ProfilePage() {
  return (
    <Suspense fallback={<ProfileContentSkeleton />}>
      <ProfileContent />
    </Suspense>
  );
}
