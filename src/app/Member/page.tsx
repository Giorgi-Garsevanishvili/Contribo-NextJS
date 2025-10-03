import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Member = async () => {
  const session = await auth();

  if (!session) redirect("/signin");
  return (
    <>
      <div>Member server session</div>
    </>
  );
};
export default Member;


