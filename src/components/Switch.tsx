import { ChangeEvent, useId } from "react"

interface ISwitchProps {
  label: string
  onChange: (checked: boolean) => void
  value: boolean
}

export default function Switch(props: ISwitchProps) {
  const { label, onChange, value } = props
  const id = useId()

  return (
    <div className="switch__container">
      <p className="switch__label">{label}</p>
      <input
        className="switch__checkbox hidden"
        id={id}
        type="checkbox"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.checked)
        }
        checked={value}
      />
      <label className="switch" htmlFor={id}>
        <div className="switch__content"></div>
      </label>
    </div>
  )
}
