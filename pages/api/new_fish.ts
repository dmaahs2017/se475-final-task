import type { NextApiRequest, NextApiResponse } from "next";
import type { FishPostResponse } from "../../common/types";
import { Client } from "pg";
import { credentials } from "../../common/creds";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FishPostResponse>
) {
  let error = null;
  const client = new Client(credentials);
  await client.connect().catch((e) => {
    console.log(e);
    error = "Failed to connect to db";
  });

  console.log(req.body);
  const formValues = req.body.form;
  const username = req.body.username.user;

  const userQuery = await client.query(`
    select username, id from users where username = '${username}'
  `);

  let user = userQuery.rows[0];
  if (!user) {
    const userCreationResponse = await client
      .query(` INSERT INTO users (username) VALUES('${username}'); `)
      .catch((e) => {
        console.log(e);
        error = "Failed to create a new user for fish insertion";
      });

    if (userCreationResponse.rowCount === 0) {
      res.status(301).json({ msg: error });
      return;
    }

    const userData = await client
      .query(` select * from users where username = '${username}' `)
      .catch((e) => {
        console.log(e);
        error = "Failed to get new user information";
      });

    user = userData.rows[0];
  }

  const data = await client
    .query(
      ` INSERT INTO fish ("name", avg_length, contributor_id) VALUES('${formValues.name}', ${formValues.avg_length}, '${user.id}'); `
    )
    .catch((e) => {
      console.log(e);
      error = "Failed to insert fish";
    });

  if (error) {
    res.status(301).json({ msg: error });
    return;
  }
  res.status(200).json({ msg: "success" });
}
