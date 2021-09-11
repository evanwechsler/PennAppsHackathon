import { ListItem, ListItemText, List, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState("");
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
      <TextField
        label="Name"
        style={{ margin: 8 }}
        onChange={(e) => setSearchName(e.target.value)}
        variant="outlined"
        type="search"
      />
      <List>
        {users &&
          users.map((user) => (
            <ListItem button onClick={() => history.push(`/users/${user.id}`)}>
              <ListItemText primary={user.name} />
            </ListItem>
          ))}
      </List>
    </div>
  );
}
