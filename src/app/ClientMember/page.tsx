"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const ClientMember = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/ClientMember");
    },
  });

  return (
    <>
      <div>Member Client session</div>
      <p>{session?.user?.role}</p>
      <p>{session?.user?.name}</p>
      <p>{session?.user?.email}</p>
    </>
  );
};
export default ClientMember;
