import type { NextApiRequest, NextApiResponse } from "next";
import type { GetFishResponse, Fish } from "../../common/types";
import { Client } from "pg";
import { credentials } from "../../common/creds";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetFishResponse>
) {
  let error = null;
  const search_param = req.body.search_param;

  const client = new Client(credentials);
  await client.connect().catch((e) => {
    console.log(e);
    error = "Failed to connect to db";
  });

  const data = await client
    .query(
      `
      select 
        fish.name as name, 
        fish.avg_length as avg_length,
        fish.id as fish_id,
        users.id as contributor_id,
        users.username as contributor_name
      from fish
      inner join users on fish.contributor_id = users.id 
      where fish.name like '%${search_param}%'
  `
    )
    .catch((e) => {
      console.log(e);
      error = "Failed to get fish";
    });

  const fishies: Fish[] = data.rows;

  if (error) {
    res.status(301).json({ rows: [], errors: [error] });
    return;
  }
  res.status(200).json({ rows: fishies, errors: null });
}
