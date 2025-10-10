import { ChangePasswordForm } from "@icat/features/forms/changepassword";
import { ProfileForm } from "@icat/features/forms/profile";
import { UserAvatar } from "@icat/features/useravatar";
import { getUserProfile } from "@icat/web/data/uesrs";

export default async function ProfilePage() {
  const user = await getUserProfile();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
      <UserAvatar user={user} />
      <div className="flex flex-col gap-8">
        <ProfileForm user={user} />
        <ChangePasswordForm />
      </div>
    </div>
  );
}
