import { useState } from 'react'
import useList from '../../hooks/useList'
import Modal from '../Modal/Modal'
import './Footer.scss'
import { Virtuoso } from 'react-virtuoso'
import { toast } from 'react-toastify'

export default function Footer() {
  const [openModal, setOpenModal] = useState(false)
  const { eventsTotalOfItens, eventsSelectedLength, rowsSelectedContent, handleDeleteRow } = useList()

  function deleteRow() {
    if (eventsSelectedLength === 0) return toast.error('Nenhum item selecionado')
    setOpenModal(!openModal)

  }

  function handleDeleteRows() {
    setOpenModal(!openModal)
    handleDeleteRow()
    toast.success('Itens deletados com sucesso')
  }
  return (
    <footer className="footer__container">
      <hr />
      <div className='footer__container__counts'>
        <span>Total de itens : {eventsTotalOfItens}</span>

        <span> Total de itens selecionados : <strong>{eventsSelectedLength}</strong></span>
        <div >
          <button onClick={deleteRow} className='button button--danger'>
            Deletar itens selecionados
          </button>
          <Modal click={() => setOpenModal(!openModal)} isOpen={openModal}>
            <div>
              <h1 className='modal__title'>Deseja deletar os seguintes itens?</h1>
              <div>
                <ul>
                  <Virtuoso
                    style={{ height: 400, width: '100%', overflowX: 'hidden' }}
                    data={rowsSelectedContent}
                    totalCount={rowsSelectedContent?.length}
                    itemContent={(index, event) => (
                      <li className='modal__item' key={event?.id}> {index + 1} : {event?.type} - {event?.login}</li>
                    )}
                  />
                </ul>

                <div className='modal__buttons'>
                    <button onClick={() => setOpenModal(!openModal)} className='button'>
                        Cancelar
                    </button>
                    <button onClick={handleDeleteRows} className='button button--danger'>
                        Deletar
                    </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>

    </footer>
  )
}