import type { NextApiRequest, NextApiResponse } from "next";
import type { FishDeleteResponse} from "../../common/types";
import { Client } from "pg";
import { credentials } from "../../common/creds";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FishDeleteResponse>
) {
  let error = null;
  const fish_id = req.query.id;

  const client = new Client(credentials);
  await client.connect().catch((e: any) => {
    console.log(e);
    error = "failed to connect to db";
  });

  await client
    .query(
      `
      DELETE FROM fish WHERE id=${fish_id};
`
    )
    .catch((e: any) => {
      console.log(e);
      error = "failed to get fish";
    });


  if (error) {
    res.status(301).json({ success: false, errors: [error] });
    return;
  }
  res.status(200).json({ success: true, errors: [] });
}
