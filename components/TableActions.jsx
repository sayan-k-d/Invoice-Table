import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import axios from "axios";

import React from "react";

const TableActions = ({ fileName, updateStatus }) => {
  const [value, setValue] = React.useState("");
  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (value) {
      const status = value === "Approve" ? "Approved" : "Rejected";
      const emailBody = {
        to: "sayankumar.d2000@gmail.com",
        subject: `File Status Update: ${fileName}`,
        message: `${fileName} has been ${status}.`,
      };

      axios
        .post("http://localhost:5000/send-email", emailBody)
        .then((response) => {
          alert(`${fileName} ${status} and email sent!`);
          updateStatus(fileName, "Done");
          // setValue("");
        })
        .catch((error) => {
          console.error("Error sending email:", error);
          alert("Failed to send email.");
        });
    } else {
      alert("Please select an option.");
      setValue("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        sx={{ flexDirection: "row" }}
        variant="standard"
        className="action-form"
      >
        <RadioGroup
          row
          aria-labelledby="demo-error-radios"
          value={value}
          onChange={handleRadioChange}
          className="radio-group"
        >
          <FormControlLabel
            value="Approve"
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
            value="Reject"
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
