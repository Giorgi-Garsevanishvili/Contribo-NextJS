import Link from "next/link";

type Person = {
  email: string;
  id: string;
  name: string;
  role: string;
};

type PersonProps = {
  data: Person[];
  deleteUser: (id: string) => Promise<void>;
};

function Persons({ data, deleteUser }: PersonProps) {
  return data.map((item: Person) => {
    const { name, email, role, id } = item;

    return (
      <div className="flex-r border-1 m-2 p-2 bg-gray-100" key={item.id}>
        <h3 className="font-bold">Person</h3>
        <h4>name: {name}</h4>
        <h4>email: {email}</h4>
        <h4>Role: {role}</h4>

        <button className="p-1 m-1 bg-orange-200 ">
          <Link href={`http://localhost:3000/user/${id}`}>Update Link</Link>
        </button>
        <button className="p-1 m-1 bg-red-100" onClick={() => deleteUser(id)}>Delete</button>
      </div>
    );
  });
}
export default Persons;
