import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { green, red } from "@mui/material/colors";

import React from "react";

const TableActions = ({ fileName, updateStatus }) => {
  const [value, setValue] = React.useState("");

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === "approve") {
      alert(`${fileName} Approved!`);
      updateStatus(fileName, "Approve");
      setValue("");
    } else if (value === "reject") {
      alert(`${fileName} Rejected!`);
      updateStatus(fileName, "Reject");
      setValue("");
    } else {
      alert("Please select an option.");
      setValue("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{ flexDirection: "row" }} variant="standard">
        <RadioGroup
          row
          aria-labelledby="demo-error-radios"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
          className="radio-group"
        >
          <FormControlLabel
            value="approve"
            className="mx-1"
            control={
              <Radio
                sx={{
                  color: green[500],
                  "&.Mui-checked": {
                    color: green[500],
                  },
                }}
              />
            }
            label="Approve"
          />
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            className="mx-1 divider"
          />
          <FormControlLabel
            value="reject"
            className="mx-1"
            control={
              <Radio
                sx={{
                  color: red[500],
                  "&.Mui-checked": {
                    color: red[500],
                  },
                }}
              />
            }
            label="Reject"
          />
        </RadioGroup>
        <Button type="submit" variant="outlined" className="py-0 mx-2">
          Email
        </Button>
      </FormControl>
    </form>
  );
};

export default TableActions;
