import useList from '../../hooks/useList'
import './Table.scss'
import TableVirtualized from "./Table/TableVirtualized"

export default function Table() {
  const { events, handleRowSelected, rowsSelected, handleSelectAllRows, handleEditRow } = useList()
  return (
    <main className="table">
      <TableVirtualized
       events={events} 
       handleRowSelected={handleRowSelected}
       rowsSelected={rowsSelected}
       handleSelectAllRows={handleSelectAllRows}
       handleEditRow={handleEditRow}
       />
    </main>
  )
}