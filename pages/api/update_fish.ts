import type { NextApiRequest, NextApiResponse } from "next";
import type { FishPutResponse } from "../../common/types";
import { Client } from "pg";
import { credentials } from "../../common/creds";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FishPutResponse>
) {
  let error = "Fish Updated Successfully";

  const client = new Client(credentials);
  await client.connect().catch((e) => {
    console.log(e);
    error = "Failed to connect to db";
  });

  const body = req.body;

  await client
    .query(
      `
    UPDATE fish SET "name"='${body.name}', avg_length=${body.avg_length} WHERE id=${body.fish_id};
  `
    )
    .catch((e) => {
      console.log(e);
      error = "Failed to get fish";
    });

  res.status(200).json({ msg: error });
}
