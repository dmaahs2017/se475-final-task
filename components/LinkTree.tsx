import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import {Fish, GetFishResponse} from "../common/types";


const LinkTree = () => {
  return (
    <Box>
      <Link href="/">
        <Button>Home Page</Button>
      </Link>
      <br />
      <Link href="/NewFish">
        <Button>Insert new Fish</Button>
      </Link>
      <br />
      <Link href="/ViewFish">
        <Button>View Fish</Button>
      </Link>
      <br />
    </Box>
  );
};
export default LinkTree;
