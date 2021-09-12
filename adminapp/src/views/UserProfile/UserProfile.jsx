import { Button, Modal, Fade, Backdrop } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecordForm from "./components/RecordForm";
import MyAccordion from "./components/MyAccordion";
import RecordModal from "./components/RecordModal";

export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
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
            <strong style={{ color: "white" }}>
              DoB: {user && user.dateOfBirth}
            </strong>
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
          onClick={() => setOpen(true)}
        >
          Add Record
        </Button>
        <RecordModal setOpen={setOpen} open={open} />
      </div>
      {user &&
        Object.entries(user.illnesses).map(([illness, records]) => {
          console.log(records);
          return <MyAccordion illness={illness} records={records} />;
        })}
    </div>
  );
}
