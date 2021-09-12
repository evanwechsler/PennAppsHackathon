import React, { useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Record from "./Record";

const AccordionItem = (props) => {
    return (
        <Accordion style={{ margin: "1rem"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="subtitle1" className="accordion-header">{props.illness}</Typography>
        </AccordionSummary>
        
        {props.records.map((record) => (
          <AccordionDetails
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
          }}>
            <Record record={record} />
          </AccordionDetails>
        ))}
      </Accordion>
    )
}
export default AccordionItem;