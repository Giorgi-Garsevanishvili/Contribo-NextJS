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
      <div className="flex justify-center bg-gray-200 w-full items-center">
        User
      </div>
      <div className="flex">
        <button
          className="flex m-1 gap-5 bg-blue-200
      p-2 border-1 "
          onClick={getUsers}
        >
          Get Users
        </button>
        <button
          className="flex m-1 gap-5 bg-blue-200
      p-2 border-1 "
          onClick={handleSeed}
        >
          Add Data
        </button>
      </div>
      <div>{loading ? <Loading /> : null}</div>
      <div>
        {person ? <Persons data={person} deleteUser={deleteUser} /> : null}
      </div>
    </>
  );
}

export default UserPage;
