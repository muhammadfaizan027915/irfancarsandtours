import { auth } from "@icat/lib";
import { ChangePasswordForm, ProfileForm, UserAvatar } from "@icat/features";
import { UserService } from "@icat/services";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.email) return <p>Not authenticated</p>;

  const userService = new UserService();
  const user = await userService.getDetailedUserByEmail(session.user.email);

  return (
    <div className="grid grid-cols-[300px_1fr] gap-4">
      <UserAvatar user={user} />
      <div className="flex flex-col gap-8">
        <ProfileForm user={user} />
        <ChangePasswordForm />
      </div>
    </div>
  );
}
