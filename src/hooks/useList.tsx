import { useContext } from "react";
  import { ListContext } from "../contexts/ListContext";

export default function useList() {
  const value = useContext(ListContext)

  return value 
}