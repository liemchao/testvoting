import React from "react";
import { Grid, Paper } from "@mui/material";

import ListCandidate from "../List Candidate/ListCandidate";
function DetailCandidate() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper>
          <ListCandidate />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default DetailCandidate;
