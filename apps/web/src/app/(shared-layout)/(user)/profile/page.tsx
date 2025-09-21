import { auth } from "@icat/lib";
import { ChangePasswordForm, ProfileForm } from "@icat/features";
import { Avatar, AvatarFallback, AvatarImage, Badge } from "@icat/ui";
import { UserService } from "@icat/services";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.email) return <p>Not authenticated</p>;

  const userService = new UserService();
  const user = await userService.getDetailedUserByEmail(session.user.email);

  return (
    <div className="grid grid-cols-[300px_1fr] gap-4">
      <div className="p-8 flex flex-col items-center">
        <Avatar className="w-60 h-60">
          <AvatarImage src={user?.image ?? ""} />
          <AvatarFallback>MF</AvatarFallback>
        </Avatar>
        <h2 className="font-bold text-2xl mt-4">{user?.name}</h2>
        <p className="text-muted-foreground">{user?.email}</p>

        <Badge
          variant={"accent"}
          className={"px-4 py-2 text-sm rounded-xl mt-4"}
        >
          Edit Profile
        </Badge>
      </div>
      <div className="flex flex-col gap-8">
        <ProfileForm user={user} />
        <ChangePasswordForm />
      </div>
    </div>
  );
}
