import React, {useEffect, useState} from "react";
import AccordionItem from "./AccordionItem";
import { Button } from "@material-ui/core";

function RecordsPage(props){
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
                {props.user && props.user.name}
              </h1>
              <small style={{ margin: "1rem", fontFamily: "sans-serif" }}>
                {props.user && props.user.dateOfBirth}
              </small>
            </div>
          </div>
          {props.user &&
          
            Object.entries(props.user.illnesses).map(([illness, records]) => {
              console.log(records);
              return <AccordionItem illness={illness} records={records} />;
            })
          
            //<h1>{user.illnesses}</h1>
          }
        </div>
      );

}
export default RecordsPage;