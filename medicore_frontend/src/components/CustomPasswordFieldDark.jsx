import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export default function CustomPasswordFieldDark({text, id, onChange, isPassVisible, setPassVisible}) {
  function checkPassVisibilityForIcon() {
    return isPassVisible ? <EyeIcon className="size-6 text-gray-800" onClick={() => {setPassVisible(!isPassVisible)}} /> : <EyeSlashIcon onClick={() => {setPassVisible(!isPassVisible)}} className="size-6 text-gray-800" />;
  }

  function checkPassVisibilityForField() {
    return isPassVisible ? "text" : "password";
  }

  return (
    <div className="h-15 w-full flex gap-5 justify-between border-3 border-gray-800 rounded-2xl p-4 focus-within:shadow-xl focus-within:border-gray-500 focus-within:transition delay-150 duration-300 ease-in-out">
        <input required className="w-full border-none outline-none bg-transparent text-gray-800 text-2xl placeholder:text-2xl placeholder:text-gray-800" type={checkPassVisibilityForField()} name={id} id={id} placeholder={text} onChange={onChange}/>

        {checkPassVisibilityForIcon()}
    </div>
  )
}
