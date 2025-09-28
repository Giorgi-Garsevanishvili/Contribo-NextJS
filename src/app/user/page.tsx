"use client";

import axios from "axios";
import Persons from "./Persons";
import { useState } from "react";
import Loading from "../about/loading";

function user() {
  const [person, setPerson] = useState<any>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  async function getUsers() {
    try {
      setPerson(null);
      setLoading(true);
      const data = await axios.get("/api/seed");
      setPerson(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error();
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
  async function deleteUser(id: String) {
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
        {person ? <Persons data={person.data} deleteUser={deleteUser} /> : null}
      </div>
    </>
  );
}

export default user;
