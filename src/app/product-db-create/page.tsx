import { redirect } from "next/navigation";
import { POST } from "../api/seed/route";

function AddProductPage() {
  async function createUser(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    const body = { name, email };

    await POST(body);
    redirect("/user");
  }

  return (
    <form action={createUser}>
      <label>
        Name
        <input type="text" name="name" />
      </label>
      <label>
        Email
        <input type="text" name="email" />
      </label>
      <button type="submit">Create User</button>
    </form>
  );
}
export default AddProductPage;
