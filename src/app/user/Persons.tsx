type Person = {
  email: string;
  id: string;
  name: string;
  role: string;
};

type PersonProps = {
  data: Person[];
};

function Persons({ data }: PersonProps) {
  return data.map((item: Person) => {
    const { name, email, role } = item;
    return (
      <div key={item.id}>
        <h3>Person</h3>
        <h4>name: {name}</h4>
        <h4>email: {email}</h4>
        <h4>Role: {role}</h4>
      </div>
    );
  });
}
export default Persons;
