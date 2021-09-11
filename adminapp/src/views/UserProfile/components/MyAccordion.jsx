import React, { useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Record from "./Record";
export default function MyAccordion({ illness, records }) {
  useEffect(() => console.log(records), []);
  return (
    <Accordion style={{ margin: "1rem" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className="accordion-header">{illness}</Typography>
      </AccordionSummary>
      {records.map((record) => (
        <AccordionDetails>
          <Record record={record} />
        </AccordionDetails>
      ))}
    </Accordion>
  );
}
