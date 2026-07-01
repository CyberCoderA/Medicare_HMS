

export default function ComboBox({ options, onChange, value }) {
  return (
    <select onChange={onChange} value={value} className="h-13 p-2 border-2" name="userType" id="userType">
        {options?.map((e, index) => (
            <option key={index} value={e}>{e}</option>
        ))};
    </select>
  )
}