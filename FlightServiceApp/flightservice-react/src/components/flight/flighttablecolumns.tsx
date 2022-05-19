import React from "react";

const FlightTableColumns = (props: any): JSX.Element => {
    return (
        <>
            <tr>
              <th scope="col">Flight Number</th>
              <th scope="col">Details</th>
              <th scope="col"></th>
            </tr>
        </>            
    );
};

export default FlightTableColumns;