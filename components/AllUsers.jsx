"use client";

import { List, ListItem, Card } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const AllUsers = () => {
  const [users, setUsers] = useState("");

  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await fetch("/api/users");
      const usersInfo = await response.json();
      console.log(usersInfo.data);
      setUsers(usersInfo.data);
    };
    fetchAllUsers();
  }, []);
  return (
    <div>
      {users &&
        users.map((user) => (
          <Card key={user.id} className="mb-4">
            <List>
              <ListItem>
                <h1>{user.name}</h1>
              </ListItem>
            </List>
          </Card>
        ))}
    </div>
  );
};
export default AllUsers;
