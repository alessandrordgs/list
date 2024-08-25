import React, { createContext, useEffect, useMemo, useState } from "react";
import { IGitHubEvents } from "../types/githubevents";
import { IGitHubEventsList } from "../types/githubeventslist";
import axios from "axios";

interface IListContext {
  events?: Array<IGitHubEventsList>;
  eventsTotalOfItens?: number ;
  eventsSelectedLength?: number;
  handleRowSelected: (id: string) => void;
  rowsSelected?: Array<string>;
  handleSelectAllRows?: () => void;
  rowsSelectedContent?: Array<IGitHubEventsList | undefined>;
  handleEditRow: (id: string, columnName: string, value: string) => void;
  handleDeleteRow: () => void;
}
export const ListContext = createContext({} as IListContext)
export default function ListContextProvider({ children }: { children: React.ReactNode }) {
  const [rowsSelected, setRowsSelected] = useState<Array<string> | undefined>([])
  const [events, setEvents] = useState<IGitHubEventsList[]>();
  useEffect(() => {
    axios.get('https://alessandrordgs.com.br/large.json').then((response) => {
      const data: IGitHubEvents[] = response.data
      const events = data.map((log) => ({
        id: log.id,
        type: log.type,
        login: log.actor.login,
        url: log.actor.url,
        description: log.payload.description,
      }));
      setEvents(events)
    })
  }, [])

  const eventsMap = useMemo(() => {
    const map = new Map();
    events?.forEach(event => map.set(event.id, event));
    return map;
  }, [events]);

  const rowsSelectedContent = useMemo(() => {
    return rowsSelected?.map(id => eventsMap.get(id));
  }, [eventsMap, rowsSelected])


  const eventsTotalOfItens = events?.length
  const eventsSelectedLength = rowsSelected?.length


  function handleRowSelected(id: string) {
    const row = rowsSelected?.includes(id)
    if (row) {
      const newRows = rowsSelected?.filter((row) => row !== id)
      return setRowsSelected(newRows)
    }

    setRowsSelected([...rowsSelected ?? [], id])
  }


  function handleSelectAllRows() {

    if (eventsSelectedLength === eventsTotalOfItens) {
      return setRowsSelected([])
    }
    const newRows = events?.map((event) => event.id)
    setRowsSelected(newRows)
  }


  function handleEditRow(id: string, columnName: string, value: string) {
    const event = eventsMap.get(id);
    const newEvent = { ...event, [columnName]: value };
    const newEvents = events?.map(event => event.id === id ? newEvent : event);
    setEvents(newEvents);
  }


  function handleDeleteRow() {
    const newEvents = events?.filter(event => !rowsSelected?.includes(event.id));
    setEvents(newEvents);
    setRowsSelected([]);
  }
  return (
    <ListContext.Provider value={{
      events,
      eventsTotalOfItens,
      handleRowSelected,
      rowsSelected,
      eventsSelectedLength,
      handleSelectAllRows,
      rowsSelectedContent,
      handleEditRow,
      handleDeleteRow
    }}>
      {children}
    </ListContext.Provider>
  )
}

