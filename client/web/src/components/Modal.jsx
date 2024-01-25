const Modal = ({visible, setVisible, children}) => {
  return (
    
    <div className={`fixed ${visible? 'flex': 'hidden'} items-center justify-center bg-[#0000006c] left-0 top-0 right-0 min-h-screen pt-4 overflow-auto`}>
        <button onClick={() =>setVisible(false)} className="flex items-center justify-center overflow-hidden p-0 m-0 uppercase text-lg w-[20px] h-[20px] rounded-full bg-white absolute top-[1rem] right-[1rem] ">&times;</button>
        {children}
    </div>
  )
}

export default Modal;