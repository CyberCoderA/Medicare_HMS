
export default function CustomTextField({text, id, onChange, icon}) {
    
  return (
    <div className="h-20 w-full flex gap-5 justify-between border-3 border-white rounded-2xl p-4 focus-within:shadow-xl focus-within:border-gray-50 focus-within:transition delay-150 duration-300 ease-in-out">
        <input className="w-full border-none outline-none bg-transparent text-white text-2xl placeholder:text-2xl placeholder:text-white" type="text" name={id} id={id} placeholder={text} onChange={onChange} />

        <label htmlFor="text"><img src={icon} alt="icon"/></label>
    </div>
  )
}
