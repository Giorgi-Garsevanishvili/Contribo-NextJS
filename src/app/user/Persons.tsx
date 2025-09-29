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
      <div key={item.id}>
        <h3>Person</h3>
        <h4>name: {name}</h4>
        <h4>email: {email}</h4>
        <h4>Role: {role}</h4>
        <button onClick={() => deleteUser(id)}>Delete</button>
      </div>
    );
  });
}
export default Persons;
