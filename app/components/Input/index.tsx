interface InputProps {
  label?: string
  error?: string
  placeholder?: string
}

export function Input({ label, error, placeholder }: InputProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <label htmlFor="">{label}</label>
        <span>{error}</span>
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="rounded p-2 bg-slate-700 border-2 border-slate-600 w-full"
      />
    </div>
  )
}
