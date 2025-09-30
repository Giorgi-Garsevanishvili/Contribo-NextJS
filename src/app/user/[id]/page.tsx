import { findOne, updateUser } from "./actions";

type Props = {
  params: { id: string };
};

export default async function UpdateUserPage({ params }: Props) {
  const { id } = await params;

  const user = await findOne(id);

  if (!user) {
    return <div>User not found</div>;
  }
  const update = updateUser.bind(null, id);

  return (
    <form action={update}>
      <label>
        Name
        <input type="text" name="name" defaultValue={user.name} />
      </label>
      <label>
        Email
        <input type="email" name="email" defaultValue={user.email} />
      </label>
      <button type="submit">Update</button>
    </form>
  );
}
