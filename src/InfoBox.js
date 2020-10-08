import React from 'react';
import "./InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, active, isRed, total, ...props }) {
    return (
        
       <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}`}>
           <CardContent>
               <Typography className="infoBox-title" color="textPrimary">{title}</Typography>
                <h2 className={`infoBox-cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2>
               <Typography  className="infoBox-total" color="text-primary">{total} Total</Typography>
           </CardContent>
       </Card>

       
    );
}

export default InfoBox;
