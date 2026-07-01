
export default function CustomTextFieldDark({text, value, id, onChange, icon}) {
    
  return (
    <div className="h-15 w-full flex gap-5 items-center justify-between border-3 border-gray-800 rounded-2xl p-4 focus-within:shadow-xl focus-within:border-gray-500 focus-within:transition delay-150 duration-300 ease-in-out">
        <input className="w-full border-none outline-none bg-transparent text-gray-800 text-2xl placeholder:text-xl placeholder:text-gray-800" type="text" name={id} id={id} placeholder={text} value={value} onChange={onChange} />

        <label htmlFor="text">{icon}</label>
    </div>
  )
}
