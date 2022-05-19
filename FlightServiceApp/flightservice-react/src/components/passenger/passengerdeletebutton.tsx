import { Component, useEffect, useState } from "react";
import { deletePassenger } from "../../ducks/passengerducks";
import { useDispatch } from "react-redux"
import { getJSDocTemplateTag } from "typescript";
  

export const PassengerDeleteButton = (pId : number) => {
        const [passengerId, setpId] = useState(pId);
        return (<></>);
}

  
export default PassengerDeleteButton;