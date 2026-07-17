import { useContext } from "react";
import AccessContext from "../src/ContextAPI/accessContext";

export default function useAccess(){

return useContext(AccessContext)


}
