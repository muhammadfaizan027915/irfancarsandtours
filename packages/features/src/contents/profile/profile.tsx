import { getUserProfile } from "@icat/web/data/users";
import { UserAvatar } from "@icat/features/useravatar";
import { ProfileForm } from "@icat/features/forms/profile";
import { ChangePasswordForm } from "@icat/features/forms/changepassword";

export async function ProfileContent() {
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
