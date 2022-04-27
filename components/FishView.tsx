import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import {Fish, GetFishResponse} from "../common/types";

const columns: GridColDef[] = [
  {field: 'fish_id', headerName: 'Fish ID', 'width': 100},
  { field: 'name', headerName: 'Fish Name', width: 200, editable: true },
  {
    field: 'avg_length',
    headerName: 'Average Length (Inches)',
    type: 'number',
    width: 200,
    editable: true,
  },
  {
    field: 'contributor_name',
    headerName: 'Contributor',
    width: 400,
    editable: false,
  },
];

const FishView = () => {
  const [fish, setFish] = useState<Fish[]>([])

  useEffect(() => {
      axios.get("/api/get_fish").then(res => {
        setFish(res.data.rows)
      }).catch(e => console.log(e))
  }, []);

  const handleRowUpdate = (new_values: any, old_values: any) => {
    console.log(new_values)
    console.log(old_values)

    axios.put("/api/update_fish", new_values).catch(err => console.log(err))
    return new_values
  }


  const Grid = () => (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={(row) => row.fish_id}
        rows={fish}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        editMode="row"
        processRowUpdate={handleRowUpdate}
      />
    </div>
  );

  //const Error = () => (
    //<Box>
      //<p>{error}</p>
    //</Box>
  //);

  return (
    <Box>
      <Grid />
    </Box>
  );
};
export default FishView;
