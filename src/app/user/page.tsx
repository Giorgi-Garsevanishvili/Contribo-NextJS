"use client";

import axios from "axios";
import Persons from "./Persons";
import { useState } from "react";

function user() {
  const [person, setPerson] = useState<any>(null);

  async function getUsers() {
    try {
      const data = await axios.get("/api/seed");
      setPerson(data.data);
    } catch (error) {
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
  async function deleteUser() {
    try {
      const data = await axios.delete("/api/seed");
      console.log(data);
      alert("user deleted");
    } catch (error) {
      console.error();
    }
  }

  return (
    <>
      <div>user</div>
      <button onClick={getUsers}>Get Users</button>
      <button onClick={handleSeed}>Add Data</button>
      <button onClick={deleteUser}>Delete user</button>
      <div>{person ? <Persons data={person.data}></Persons> : null}</div>
    </>
  );
}

export default user;
