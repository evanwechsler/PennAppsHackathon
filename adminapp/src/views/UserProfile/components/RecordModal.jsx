import React from "react";
import { Modal, Fade, Backdrop } from "@material-ui/core";
import RecordForm from "./RecordForm";

export default function RecordModal({ setOpen, open }) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Fade in={open}>
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid grey",
            padding: "2rem",
            borderRadius: "15px",
          }}
        >
          <h2 id="transition-modal-title" style={{ textAlign: "center" }}>
            Add a record
          </h2>
          <RecordForm />
        </div>
      </Fade>
    </Modal>
  );
}
