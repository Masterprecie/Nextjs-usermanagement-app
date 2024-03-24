"use client";
import { Button, Card, Input, List, ListItem } from "@material-tailwind/react";
import { useState } from "react";

const SpecificUser = () => {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    const response = await fetch(`/api/users/${userId}`);

    if (response.ok) {
      const res = await response.json();
      setUserData(res.user);
    } else {
      console.log("Error fetching user data");
      setUserData(null);
    }
  };
  return (
    <div>
      <div className="flex">
        <div className="w-72">
          <Input
            label="Enter User ID"
            type="text"
            placeholder="Enter user id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

        <Button className="ml-2 " onClick={fetchUserData}>
          Search
        </Button>
      </div>
      {userData ? (
        userData.length > 0 ? (
          userData.map((d) => (
            <>
              <Card className="w-96 mt-5">
                <List>
                  <ListItem>ID: {d.id}</ListItem>
                  <ListItem>Name: {d.name}</ListItem>
                  <ListItem>Age: {d.age}</ListItem>
                  <ListItem>Email: {d.email}</ListItem>
                </List>
              </Card>
            </>
          ))
        ) : (
          <p className="mt-2">User not found</p>
        )
      ) : (
        <p className="mt-2">Search for specific user</p>
      )}
    </div>
  );
};
export default SpecificUser;
