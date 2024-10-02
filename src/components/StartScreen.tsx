import Title from "./Title"

export default function StartScreen() {
  function ready() {
    Rune.actions.ready()
  }

  return (
    <div className="start-screen">
      <Title />
      <button className="button text" type="button" onClick={ready}>
        Ready
      </button>
      <button className="button text" type="button" onClick={ready}>
        Ready
      </button>
      <button className="button text" type="button" onClick={ready}>
        Ready
      </button>
      <button className="button text" type="button" onClick={ready}>
        Ready
      </button>
    </div>
  )
}
