"use client";
import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";

const CreatUser = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id || !name || !age || !email || !password) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name, age, email, password }),
      });

      if (response.ok) {
        alert("User created successfully");
        setId("");
        setName("");
        setAge("");
        setEmail("");
        setPassword("");
      } else {
        alert("Failed to create user");
        return;
      }
    } catch (error) {
      alert("Error while creating user");
      console.log("Error while creating user");
    }
  };

  return (
    <div>
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
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};
export default CreatUser;
