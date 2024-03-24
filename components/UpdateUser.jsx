"use client";

import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";

const UpdateUser = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      alert("Please provide the ID");
      return;
    }

    const requestedData = { id };

    if (name) {
      requestedData.name = name;
    }
    if (age) {
      requestedData.age = age;
    }
    if (email) {
      requestedData.email = email;
    }
    if (password) {
      requestedData.password = password;
    }

    try {
      const response = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestedData),
      });

      if (response.ok) {
        alert("User updated successfully");
        clearForm();
      } else {
        const data = await response.json();
        alert(data.result || "Failed to update user");
      }
    } catch (error) {
      alert("Error while updating user");
    }
  };

  const clearForm = () => {
    setId("");
    setName("");
    setAge("");
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      {" "}
      <div>
        <form className="space-y-2" onSubmit={handleSubmit}>
          <Input
            label="ID"
            type="number"
            placeholder="Enter user id"
            value={id}
            onChange={(e) => setId(+e.target.value)}
          />
          <Input
            label="Name"
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Age"
            type="text"
            placeholder="Enter Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="text"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button className="mt-2" type="submit">
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};
export default UpdateUser;
