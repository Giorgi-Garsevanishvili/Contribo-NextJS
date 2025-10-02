import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const Member = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Member");
  }

  return (
    <>
      <div>Member server session</div>
      <p>{session?.user?.role}</p>
      <p>{session?.user?.name}</p>
      <p>{session?.user?.email}</p>
    </>
  );
};
export default Member;
