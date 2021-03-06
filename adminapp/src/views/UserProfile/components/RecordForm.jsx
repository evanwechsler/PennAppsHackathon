import {
  Button,
  MenuItem,
  TextField,
  FormControl,
  Grid,
  Select,
  InputLabel,
} from "@material-ui/core";
import React, { useState } from "react";

export default function RecordForm() {
  const [record, setRecord] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          direction="column"
          spacing={2}
          my={2}
          alignItems="center"
        >
          <Grid item>
            <Grid
              container
              direction="row"
              justifyItems="space-evenly"
              spacing={2}
            >
              <Grid item>
                <FormControl>
                  <TextField
                    className="field"
                    label="Agent"
                    variant="outlined"
                    onChange={(e) =>
                      setRecord({ ...record, agent: e.target.value })
                    }
                    className="text-field"
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl>
                  <TextField
                    className="field"
                    label="Product Name"
                    variant="outlined"
                    onChange={(e) =>
                      setRecord({ ...record, productName: e.target.value })
                    }
                    className="text-field"
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl>
                  <TextField
                    className="field"
                    label="Date Administered"
                    variant="outlined"
                    type="date"
                    onChange={(e) =>
                      setRecord({ ...record, dateAdministered: e.target.value })
                    }
                    className="text-field"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justifyItems="space-evenly"
              spacing={2}
            >
              <Grid item>
                <FormControl>
                  <TextField
                    className="field"
                    label="Diluent Product"
                    variant="outlined"
                    onChange={(e) =>
                      setRecord({ ...record, diluentProduct: e.target.value })
                    }
                    className="text-field"
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl>
                  <TextField
                    className="field"
                    label="Lot"
                    variant="outlined"
                    onChange={(e) =>
                      setRecord({ ...record, lot: e.target.value })
                    }
                    className="text-field"
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl>
                  <TextField
                    className="field"
                    label="Dosage (mL)"
                    variant="outlined"
                    type="number"
                    onChange={(e) =>
                      setRecord({ ...record, dosage: e.target.value })
                    }
                    className="text-field"
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={2}>
              <Grid item>
                <FormControl style={{ minWidth: 120 }}>
                  {/* <InputLabel id="route">Route</InputLabel> */}
                  <TextField
                    value={record.route}
                    onChange={(e) =>
                      setRecord({ ...record, record: e.target.value })
                    }
                    className="text-field"
                    label="Route"
                    select
                    variant="outlined"
                  >
                    <MenuItem value="oral">Oral</MenuItem>
                    <MenuItem value="Intranasal">Intranasal</MenuItem>
                    <MenuItem value="Subcutaneous">Subcutaneous</MenuItem>
                    <MenuItem value="Intramuscular">Intramuscular</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl>
                  <TextField
                    className="field"
                    label="Site"
                    variant="outlined"
                    className="text-field"
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={6}>
                <FormControl>
                  <TextField
                    className="field"
                    label="Administered By"
                    variant="outlined"
                    className="text-field"
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl>
                  <TextField
                    className="field"
                    label="Authorized Organized"
                    variant="outlined"
                    className="text-field"
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
