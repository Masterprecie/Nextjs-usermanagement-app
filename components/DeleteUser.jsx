"use client";

import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";

const DeleteUser = () => {
  const [id, setId] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!id) {
      alert("Please enter user id");
      return;
    }
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("User deleted successfully");
        setId("");
      } else {
        const data = await response.json();
        alert(data.result || "Failed to delete user");
      }
    } catch (error) {
      alert("Error while deleting user");
    }
  };

  return (
    <div>
      <form onSubmit={handleDelete}>
        <Input
          label="User ID"
          type="number"
          placeholder="Enter user id"
          value={id}
          onChange={(e) => setId(+e.target.value)}
        />

        <Button type="submit" className="mt-2">
          Delete User
        </Button>
      </form>
    </div>
  );
};
export default DeleteUser;
