import { ChangeEventHandler } from "react"

export type InputProps = {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  className?: string
  placeholder?: string
}

const Input = (props: InputProps) => {
  return (
    <div>
      <input
        placeholder={props.placeholder || ''}
        type="text"
        className={
          " bg-blue-950 text-indigo-100 px-2 py-1 " +
          props.className
        }
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  )
}

export default Input
