import { getUserProfile } from "@icat/web/data/uesrs";
import dynamic from "next/dynamic";

const UserAvatar = dynamic(() =>
  import("@icat/features/useravatar").then((m) => m.UserAvatar)
);

const ProfileForm = dynamic(() =>
  import("@icat/features/forms/profile").then((m) => m.ProfileForm)
);

const ChangePasswordForm = dynamic(() =>
  import("@icat/features/forms/changepassword").then(
    (m) => m.ChangePasswordForm
  )
);

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
