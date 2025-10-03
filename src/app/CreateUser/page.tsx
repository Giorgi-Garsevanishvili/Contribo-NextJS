import { auth } from "@/auth";

import { redirect } from "next/navigation";

const CreateUser = async () => {
  const session = await auth();
  if (!session) redirect("/signin");

  return (
    <>
      <div>Only Admin</div>
      <p>{session.user?.name}</p>
      <p>{session.user?.role}</p>
    </>
  );
};
export default CreateUser;
