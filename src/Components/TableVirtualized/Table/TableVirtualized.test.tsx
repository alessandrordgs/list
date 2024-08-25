import { render, screen, fireEvent } from '@testing-library/react';
import TableVirtualized from './TableVirtualized';
import '@testing-library/jest-dom';
import { VirtuosoMockContext } from 'react-virtuoso';

// Mock dos dados
const mockEvents = [
  { id: '1', type: 'PushEvent', login: 'user1', url: 'https://github.com/user1', description: 'Event 1' },
  { id: '2', type: 'PullRequestEvent', login: 'user2', url: 'https://github.com/user2', description: '' },
];

// Mock das funções
const mockHandleRowSelected = jest.fn();
const mockHandleSelectAllRows = jest.fn();
const mockHandleEditRow = jest.fn();

describe('TableVirtualized Component', () => {
  beforeEach(() => {
    // Limpar mocks antes de cada teste
    mockHandleRowSelected.mockClear();
    mockHandleSelectAllRows.mockClear();
    mockHandleEditRow.mockClear();
  });

  it('renders correctly with given data', () => {
    render(
      <TableVirtualized
        events={mockEvents}
        handleRowSelected={mockHandleRowSelected}
        rowsSelected={['1']}
        handleSelectAllRows={mockHandleSelectAllRows}
        handleEditRow={mockHandleEditRow}
      />
      , {
        wrapper: ({ children }) => (
          <VirtuosoMockContext.Provider value={{ viewportHeight: 300, itemHeight: 100 }}>{children}</VirtuosoMockContext.Provider>
        ),
      });

    // Verifica se as colunas estão renderizadas corretamente
    expect(screen.getByText('Tipo de evento')).toBeInTheDocument();
    expect(screen.getByText('username')).toBeInTheDocument();
    expect(screen.getByText('user url')).toBeInTheDocument();
    expect(screen.getByText('status')).toBeInTheDocument();

    // Verifica se as linhas estão renderizadas corretamente
    expect(screen.getByText('PushEvent')).toBeInTheDocument();
    expect(screen.getByText('PullRequestEvent')).toBeInTheDocument();
  });

  it('triggers handleRowSelected when a row checkbox is clicked', () => {
    render(
      <TableVirtualized
        events={mockEvents}
        handleRowSelected={mockHandleRowSelected}
        rowsSelected={[]}
        handleSelectAllRows={mockHandleSelectAllRows}
        handleEditRow={mockHandleEditRow}
      />, {
      wrapper: ({ children }) => (
        <VirtuosoMockContext.Provider value={{ viewportHeight: 300, itemHeight: 100 }}>{children}</VirtuosoMockContext.Provider>
      )
    }
    );

    const firstCheckbox = screen.getAllByRole('checkbox')[1]; // Ignorando o checkbox do "select all"
    fireEvent.click(firstCheckbox);

    expect(mockHandleRowSelected).toHaveBeenCalledWith('1');
  });

  it('calls handleEditRow on blur after editing a cell', () => {
    render(
      <TableVirtualized
        events={mockEvents}
        handleRowSelected={mockHandleRowSelected}
        rowsSelected={[]}
        handleSelectAllRows={mockHandleSelectAllRows}
        handleEditRow={mockHandleEditRow}
      />, 
      {
        wrapper: ({ children }) => (
          <VirtuosoMockContext.Provider value={{ viewportHeight: 300, itemHeight: 100 }}>{children}</VirtuosoMockContext.Provider>
        )
      }
    );

    const cell = screen.getByText('PushEvent');
    fireEvent.click(cell);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'NewEvent' } });
    fireEvent.blur(input);

    expect(mockHandleEditRow).toHaveBeenCalledWith('1', 'type', 'NewEvent');
  });
});