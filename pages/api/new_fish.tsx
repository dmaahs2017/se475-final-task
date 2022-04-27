import type { NextApiRequest, NextApiResponse } from "next";
import type {FishPostResponse} from "../../common/types";
import { Client } from 'pg';
import { credentials } from '../../common/creds';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FishPostResponse>
) {
  let error = null;
  const client = new Client(credentials);
  await client.connect().catch(e => { 
    console.log(e);
    error = "Failed to connect to db"
  });

  const body = req.body;
  console.log(body)

  const data = await client.query(`
      INSERT INTO fish ("name", avg_length) VALUES('${body.name}', ${body.avg_length});
  `).catch(e => { console.log(e); error = "Failed to insert fish" });


  console.log(data);

  if (error) {
    res.status(301).json({msg: error})
    return
  }
  res.status(200).json({ msg: "success" });
}
