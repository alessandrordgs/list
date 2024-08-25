import { TableVirtuoso } from 'react-virtuoso'
import { IGitHubEventsList } from '../../../types/githubeventslist'
import { CheckCircle } from 'react-feather';
import { useState } from 'react';

interface TableVirtualizedProps {
  events?: IGitHubEventsList[];
  handleRowSelected: (id: string) => void;
  rowsSelected?: Array<string>;
  handleSelectAllRows?: () => void;
  handleEditRow: (id: string, columnName: string, value: string) => void;
}

interface IRowEdit extends IGitHubEventsList {
  columnName: string;
  is_active: boolean;
}
export default function TableVirtualized({ events, handleRowSelected, rowsSelected, handleSelectAllRows, handleEditRow }: TableVirtualizedProps) {
  const [currentRowEdit, setCurrentRowEdit] = useState<IRowEdit | null>(null)

  const keys = ['type', 'login', 'url']

  function handleOnBlur(event: IGitHubEventsList, currentRowEdit: IRowEdit, key: string, value: string) {

    handleEditRow(event.id, key, value)
    setCurrentRowEdit({
      ...currentRowEdit,
      is_active: false
    })
  }
  return (
    <div className='table__container'>
      <tr>
        <th className='table__cell table__cell--checkbox'>
          <input type='checkbox' onClick={handleSelectAllRows} />
        </th>
        <th className='table__cell'>
          Tipo de evento
        </th>
        <th className='table__cell'>
          username
        </th>
        <th className='table__cell'>
          user url
        </th>
        <th className='table__cell'>
          status
        </th>
      </tr>


      <TableVirtuoso
        style={{ height: '100%', width: '100%', overflowX: 'hidden' }}
        data={events}
        totalCount={events?.length}
        itemContent={(_, event) => (
          <>
            <td className='table__cell table__cell--checkbox'><input onClick={() => handleRowSelected(event.id)} type="checkbox" onChange={() => { }} checked={rowsSelected?.includes(event.id)} /></td>
            {keys.map((key) => (
              <td key={key} onClick={() => setCurrentRowEdit(
                currentRowEdit?.id === event.id ? null : {
                  ...event,
                  columnName: key,
                  is_active: true
                }
              )} className='table__cell'>
                {event?.id === currentRowEdit?.id && key === currentRowEdit.columnName ?
                  <input
                    ref={(input) => input?.focus()}
                    onBlur={() => { handleOnBlur(event, currentRowEdit, key, currentRowEdit[key]) }}
                    onClick={(e) => { e.stopPropagation() }}
                    onChange={(e) => { setCurrentRowEdit({ ...currentRowEdit, [key]: e.target.value }) }}
                    className='table__cell table__cell--input' value={currentRowEdit[key]} /> : <strong >{event[key]}</strong>}
              </td>
            ))}
            <td className='table__cell'>
              <div>
                <CheckCircle color={event.description ? '#00B348' : '#FF0E00'} />
              </div>
            </td>
          </>
        )}
      />


    </div>
  )
}