interface ModalProps {
  isOpen: boolean;
  click: () => void;
  children: React.ReactNode;
}
import './Modal.scss'
export default function Modal({ click, isOpen, children }: ModalProps) {
  return (
    isOpen ? (
      <div onClick={click} className="modal__background">
        <div onClick={(e) => e.stopPropagation()} className="modal__content">
          <div>{children}</div>
        </div>
      </div>
    ) : null
  )
}