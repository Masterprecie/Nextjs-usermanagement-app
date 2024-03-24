import { users } from "@/app/utils/db";
import { NextResponse } from "next/server";
import fs from "fs";
//1. Endpoints to get all users
export function GET() {
  const data = users;
  return NextResponse.json({ data }, { status: 200 });
}

//4. create new user
export async function POST(req, res) {
  let { id, name, age, email, password } = await req.json();

  //checks if the data is provided

  if (!id || !name || !age || !email || !password) {
    return NextResponse.json(
      { result: "required fields are missing" },
      { status: 400 }
    );
  } else {
    //add the new user to the in-merroy array
    users.push({ id, name, age, email, password });

    //extract just the user array from the updated data
    const updatedUsersArray = users;
    //converts the updated array to json

    const updatedData = JSON.stringify(updatedUsersArray, null, 2);

    //write the updated data to a JSON string  }
    fs.writeFileSync(
      "./app/utils/db.js",
      `export const users= ${updatedData} `,
      "utf-8"
    );

    return NextResponse.json({ success: "user created" }, { status: 201 });
  }
}

//5. update user
export async function PUT(req, res) {
  let { id, name, age, email, password } = await req.json();

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return NextResponse.json({ result: "user not found" }, { status: 404 });
  }

  if (name) {
    users[userIndex].name = name;
  }
  if (age) {
    users[userIndex].age = age;
  }
  if (email) {
    users[userIndex].email = email;
  }
  if (password) {
    users[userIndex].password = password;
  }

  //extract just the user array from the updated data
  const updatedUsersArray = users;
  //converts the updated array to json
  const updatedData = JSON.stringify(updatedUsersArray, null, 2);

  //write the updated data to a JSON string
  fs.writeFileSync(
    "./app/utils/db.js",
    `export const users= ${updatedData} `,
    "utf-8"
  );

  return NextResponse.json({ success: "user updated" }, { status: 200 });
}
