import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";

export default function NewUserForm() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const fieldWidth = "30%";
  return (
    <form style={{ display: "flex", flexDirection: "column", width: "auto" }}>
      <TextField
        label="Full Name"
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        style={{ margin: "0.5rem" }}
      />
      <TextField
        label="Username"
        onChange={(e) => setUsername(e.target.value)}
        variant="outlined"
        style={{ margin: "0.5rem" }}
      />
      <TextField
        label="Password"
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
        style={{ margin: "0.5rem" }}
      />
      <TextField
        label="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        variant="outlined"
        style={{ margin: "0.5rem" }}
      />
      {confirmPassword.length > 1 && confirmPassword !== password && (
        <p style={{ color: "red", margin: "1rem" }}>Passwords do not match</p>
      )}
      <Button variant="contained" color="primary">
        Create User
      </Button>
    </form>
  );
}
