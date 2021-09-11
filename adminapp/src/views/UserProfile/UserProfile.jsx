import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyAccordion from "./components/MyAccordion";

export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    function getUser() {
      const res = {
        name: "Evan Wechsler",
        userName: "evan_wechsler",
        dateOfBirth: "2001-02-18",
        illnesses: {
          Covid: [
            {
              date: "2021-02-18",
              agent: "mrna",
              productName: "moderna",
              diluentProduct: "dp",
              lot: "123abc",
              dosage: 10,
              route: "Arm",
              site: "oral",
              administeredBy: "Dr. Test",
              authorizedOrganization: "UHN",
            },
            {
              date: "2001-03-20",
              agent: "mrna",
              productName: "phizer",
              diluentProduct: "dp",
              lot: "123abc",
              dosage: 10,
              route: "Arm",
              site: "oral",
              administeredBy: "Dr. Test",
              authorizedOrganization: "UHN",
            },
          ],
          "Small Pox": [
            {
              date: "2001-02-18",
              agent: "mrna",
              productName: "moderna",
              diluentProduct: "dp",
              lot: "123abc",
              dosage: 10,
              route: "Arm",
              site: "oral",
              administeredBy: "Dr. Test",
              authorizedOrganization: "UHN",
            },
          ],
        },
      };
      return res;
    }
    setUser(getUser());
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1 style={{ margin: "0.3rem 1rem", fontFamily: "sans-serif" }}>
            {user && user.name}
          </h1>
          <small style={{ margin: "1rem", fontFamily: "sans-serif" }}>
            {user && user.dateOfBirth}
          </small>
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{
            height: "fit-content",
            alignSelf: "flex-end",
            margin: "1rem",
          }}
        >
          Add Record
        </Button>
      </div>
      {user &&
        Object.entries(user.illnesses).map(([illness, records]) => {
          console.log(records);
          return <MyAccordion illness={illness} records={records} />;
        })}
    </div>
  );
}
