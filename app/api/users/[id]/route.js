import { NextResponse } from "next/server";
import { users } from "@/app/utils/db";
import fs from "fs";
//2. Get specific user by id

export async function GET(_, res) {
  const id = Number(await res.params.id);
  const user = users.filter((u) => u.id === id);
  return NextResponse.json({ user, ok: true }, { status: 200 });
}

//3. login
export async function POST(req, res) {
  let { name, email, password } = await req.json();
  const id = Number(await res.params.id);

  const user = users.find((u) => u.id === id);
  console.log(user);

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const { name: uName, email: uEmail, password: uPassword } = user;

  if (uName === name && uEmail === email && uPassword === password) {
    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } else if (!name || !email || !password) {
    return NextResponse.json(
      { message: "Please provide all fields" },
      { status: 400 }
    );
  } else {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 400 }
    );
  }
}

//6. Delete User
export async function DELETE(req, res) {
  const id = Number(await res.params.id);

  //find the index of the user to be deleted in the user array
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return NextResponse.json({ result: "user not found" }, { status: 404 });
  }

  //remove the user from the users array
  users.splice(userIndex, 1);

  const updatedUsersArray = users;
  //converts the updated array to json

  const updatedData = JSON.stringify(updatedUsersArray, null, 2);

  //write the updated data to a JSON string  }
  fs.writeFileSync(
    "./app/utils/db.js",
    `export const users= ${updatedData} `,
    "utf-8"
  );

  return NextResponse.json({ success: "user successfully updated" });
}
