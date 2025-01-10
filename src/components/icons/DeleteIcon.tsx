import { BsTrash } from 'react-icons/bs'

export const DeleteIcon = ({clicked}: {clicked: Function}) => {
  return (
    <div onClick={() => clicked()}>
      <BsTrash className='cursor-pointer' />
    </div>
  )
}
