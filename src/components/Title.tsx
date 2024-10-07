interface ITitleProps {
  title: string
  subtitle: string
}

export default function Title(props: ITitleProps) {
  const { subtitle, title } = props

  return (
    <div className={`title reflect ${title.length > 9 ? "title--small" : ""}`}>
      <span className="reflect__back">{title}</span>
      <span className="reflect__front">{title}</span>
      <div className="title__sub-title neon">{subtitle}</div>
    </div>
  )
}
