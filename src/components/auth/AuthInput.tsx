
interface AuthInputProps {
  label: string
  value: any
  required?: boolean
  type?: 'text' | 'email' | 'password'
  onChange: (newValue: any) => void
}

export function AuthInput(props: AuthInputProps) {
  return (
    <div className="flex flex-col mt-4">
      <label>{props.label}</label>
      <input 
        type={props.type ?? 'text'}
        value={props.value} 
        onChange={(e) => props.onChange?.(e.target.value)}
        required={props.required}
        className={`px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none`}
      />
    </div>
  )
}