"use client";

import axios from "axios";
import Persons from "./Persons";
import { useState } from "react";
import Loading from "../about/loading";

type Individual = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type People = Array<Individual>;

function UserPage() {
  const [person, setPerson] = useState<People | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  console.log(person);

  async function getUsers() {
    try {
      setPerson(null);
      setLoading(true);
      const data = await axios.get("/api/seed");
      setPerson(data.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error(`failed to fetch ${error}`);
    }
  }

  async function handleSeed() {
    try {
      const data = await axios.post("/api/seed");
      console.log(data);
      alert(data.data.message || "Done");
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteUser(id: string) {
    try {
      const data = await axios.delete("/api/seed", { data: { id } });
      console.log(data);

      if (data.data.success) {
        alert("user deleted");
        await getUsers();
      } else {
        alert("failed to delete");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div>user</div>
      <button onClick={getUsers}>Get Users</button>
      <button onClick={handleSeed}>Add Data</button>
      <div>{loading ? <Loading /> : null}</div>
      <div>
        {person ? <Persons data={person} deleteUser={deleteUser} /> : null}
      </div>
    </>
  );
}

export default UserPage;
