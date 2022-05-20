import React from "react";

const PassengerTableColumns = (props: any): JSX.Element => {
    return (
        <>
            <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Age</th>
                <th scope="col">Email</th>
                <th scope="col">Occupation</th>
                <th scope="col"></th>
            </tr>
        </>
    );
};

export default PassengerTableColumns;