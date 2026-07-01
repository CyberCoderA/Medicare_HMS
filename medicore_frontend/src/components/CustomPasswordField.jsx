import visible_icon from '../assets/show.png'
import hidden_icon from '../assets/hide.png'

export default function CustomPasswordField({text, id, onChange, isPassVisible, setPassVisible}) {
  function checkPassVisibilityForIcon() {
    return isPassVisible ? visible_icon : hidden_icon;
  }

  function checkPassVisibilityForField() {
    return isPassVisible ? "text" : "password";
  }

  return (
    <div className="h-20 w-full flex gap-5 justify-between border-3 border-white rounded-2xl p-4 focus-within:shadow-xl focus-within:border-gray-50 focus-within:transition delay-150 duration-300 ease-in-out">
        <input className="w-full border-none outline-none bg-transparent text-white text-2xl placeholder:text-2xl placeholder:text-white" type={checkPassVisibilityForField()} name={id} id={id} placeholder={text} onChange={onChange}/>

        <img className='hover:cursor-pointer' src={checkPassVisibilityForIcon()} alt="icon" onClick={() => setPassVisible(!isPassVisible)}/>
    </div>
  )
}
