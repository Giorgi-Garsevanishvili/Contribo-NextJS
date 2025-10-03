import { auth } from "@/auth";
import Link from "next/link";
import SignOut from "./log-out";

const Nav = async () => {
  const session = await auth()
  return (
    <header className="bg-gray-600 text-gray-100">
      <nav className="flex justify-between items-center w-full px-10 py-4">
        <div>My Site</div>
        <div className="flex gap-10">
          <Link href={"/"}>Home</Link>
          <Link href={"/CreateUser"}>Create User</Link>
          <Link href={"/ClientMember"}>Client Member</Link>
          <Link href={"/Member"}>Member</Link>
          <Link href={"/Public"}>Public</Link>
          <Link href={"/user"}>Users</Link>
          {session ? (
            <SignOut></SignOut>
          ) : (
            <Link href={"/signin"}>Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Nav;
