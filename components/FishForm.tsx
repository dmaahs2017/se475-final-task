import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const defaultValues = {
  name: "",
  avg_length: 0,
};

const FishForm = (user: any) => {
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (
      formValues.name === defaultValues.name ||
      formValues.avg_length === defaultValues.avg_length
    ) {
      console.log("Enter new data");
      return;
    }
    axios
      .post("/api/new_fish", { form: formValues, username: user })
      .catch((e) => console.log(e));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item>
          <TextField
            id="name-input"
            name="name"
            label="Name"
            type="text"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="avg_length-input"
            name="avg_length"
            label="Average length (inches)"
            type="number"
            value={formValues.avg_length}
            onChange={handleInputChange}
          />
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Grid>
    </form>
  );
};
export default FishForm;
