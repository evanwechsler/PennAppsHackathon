import {
  ListItem,
  ListItemText,
  List,
  TextField,
  Button,
  Modal,
  Fade,
  Backdrop,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import NewUserModal from "./components/NewUserModal";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [open, setOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    function getUsers() {
      const res = [
        { name: "Evan Wechsler", id: "1" },
        { name: "Jason Rosner", id: "2" },
        { name: "Patty Blais", id: "3" },
        { name: "Spencer Beaty", id: "4" },
      ];
      return res;
    }

    setUsers(getUsers());
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          label="Name"
          style={{ margin: 8 }}
          onChange={(e) => setSearchName(e.target.value)}
          type="search"
          style={{ minWidth: "30%", borderRadius: "10px", margin: "0.5rem" }}
        />
        <Button
          variant="contained"
          style={{ height: "fit-content" }}
          onClick={() => setOpen(true)}
          className="MuiButton-root"
        >
          Add User
        </Button>
        <NewUserModal setOpen={setOpen} open={open} />
      </div>
      <List>
        {users &&
          users
            .filter((user) =>
              user.name.toLowerCase().includes(searchName.toLowerCase())
            )
            .map((user) => (
              <ListItem
                button
                onClick={() => history.push(`/users/${user.id}`)}
                style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  margin: "0.5rem",
                }}
                className="accordion"
              >
                <ListItemText primary={user.name} />
              </ListItem>
            ))}
      </List>
    </div>
  );
}
