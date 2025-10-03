import { signIn } from "@/auth";

type SignInProps = {
  prov: string;
};

export default function SignIn({ prov }: SignInProps) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(`${prov}`, { redirectTo: "/" });
      }}
    >
      <button type="submit">Sign in with {prov}</button>
    </form>
  );
}
