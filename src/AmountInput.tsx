import Input, { InputProps } from "./Input"

const AmountInput = (props: InputProps) => {
  return (
    <div className="border-2 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border-indigo-600/50 flex items-center justify-around rounded-lg px-8 text-2xl">
      <Input
        className="w-32 focus:outline-none focus:ring-0 bg-transparent "
        value={props.value}
        onChange={props.onChange}
    
      />
      <span className="text-blue-50/50">USD</span>
    </div>
  )
}

export default AmountInput
