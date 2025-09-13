import { ProfileForm, ChangePasswordForm } from "@icat/features";
import { Avatar, AvatarFallback, AvatarImage, Badge } from "@icat/ui";

export default function ProfilePage() {
  return (
    <div className="grid grid-cols-[300px_1fr] gap-4">
      <div className="p-8 flex flex-col items-center">
        <Avatar className="w-60 h-60">
          <AvatarImage />
          <AvatarFallback>MF</AvatarFallback>
        </Avatar>
        <h2 className="font-bold text-2xl mt-4">{"Muhammad Faizan"}</h2>
        <p className="text-muted-foreground">muhammadfaizan027915@gmail.com</p>

        <Badge
          variant={"accent"}
          className={"px-4 py-2 text-sm rounded-xl mt-4"}
        >
          Edit Profile
        </Badge>
      </div>
      <div className="flex flex-col gap-8">
        <ProfileForm />
        <ChangePasswordForm />
      </div>
    </div>
  );
}
