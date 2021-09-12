import React, { useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Record from "./Record";
import "../../../style.css";
export default function MyAccordion({ illness, records }) {
  useEffect(() => console.log(records), []);
  return (
    <Accordion
      style={{ margin: "1rem", borderRadius: "10px" }}
      className="accordion"
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography
          className="accordion-header"
          style={{ marginLeft: "0.5rem" }}
        >
          <strong>{illness}</strong>
        </Typography>
      </AccordionSummary>
      {records.map((record) => (
        <AccordionDetails
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
          }}
        >
          <Record record={record} />
        </AccordionDetails>
      ))}
    </Accordion>
  );
}
