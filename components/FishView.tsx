import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import {Fish, GetFishResponse} from "../common/types";

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Fish Name', width: 200 },
  {
    field: 'avg_length',
    headerName: 'Average Length (Inches)',
    type: 'number',
    width: 200,
  },
];

const FishForm = () => {
  const [fish, setFish] = useState<Fish[]>([])

  useEffect(() => {
      axios.get("/api/get_fish").then(res => {
        setFish(res.data.rows)
      }).catch(e => console.log(e))
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={(row) => row.name}
        rows={fish}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};
export default FishForm;
