export default function StartScreen() {
  function ready() {
    Rune.actions.ready()
  }

  return (
    <div className="start-screen">
      <button className="button" type="button" onClick={ready}>
        Ready
      </button>
    </div>
  )
}
