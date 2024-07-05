import ProfileForm from "./profile-form";
import Navigation from "@/components/navigation";
import getProfileOrRedirect from "@/lib/get-profile-or-redirect";

export default async function Account() {
  const profile = await getProfileOrRedirect();

  return (
    <div>
      <Navigation profile={profile} />
      <ProfileForm profile={profile} />
    </div>
  );
}
