import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await auth();

  if (!session) redirect("/signin");

  return (
    <>
      <div>Welcome to Contribo</div>
    
    </>
  );
};
export default Home;
