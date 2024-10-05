import { memo, MouseEvent } from "react"

import controls from "../assets/controls.png"

interface IHelpProps {
  close: () => void
  open: () => void
  opened: boolean
  t: (word: string) => string
}

function Help(props: IHelpProps) {
  const { close, open, opened, t } = props
  const classNames = ["modale"]
  if (opened) {
    classNames.push("modale--open")
  }

  function stop(event: MouseEvent) {
    event.stopPropagation()
  }

  return (
    <>
      <button className="help__button neon" type="button" onClick={open}>
        {t("help")}
      </button>
      <div className={classNames.join(" ")} onClick={close}>
        <div className="modale__inside box" onClick={stop}>
          <button
            className="modale__close button text"
            type="button"
            onClick={close}
          >
            ✖
          </button>
          <svg
            className="help__defs"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 800 800"
          >
            <defs>
              <marker
                markerWidth="5"
                markerHeight="5"
                refX="2.5"
                refY="2.5"
                viewBox="0 0 5 5"
                orient="auto"
                id="arrow"
              >
                <polygon
                  points="0,5 1.6666666666666667,2.5 0,0 5,2.5"
                  fill="white"
                ></polygon>
              </marker>
            </defs>
          </svg>
          <p>{t("[help]")}</p>
          <img className="help__image" alt="" src={controls} />
          <div className="help__controls help__controls--left neon">
            {t("move left")}
          </div>
          <svg
            className="help__arrow help__arrow--left"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 800 800"
          >
            <g
              strokeWidth="13"
              stroke="white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="matrix(0.992546151641322,0.12186934340514748,-0.12186934340514748,0.992546151641322,34.7292767055302,-67.76619801858783)"
            >
              <path
                d="M321.3662567138672 293.12452697753906Q148.3662567138672 531.1245269775391 532.3662567138672 504.12452697753906 "
                markerEnd="url(#arrow)"
              ></path>
            </g>
          </svg>
          <div className="help__controls help__controls--center neon">
            {t("rotate")}
          </div>
          <svg
            className="help__arrow help__arrow--center"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 800 800"
          >
            <g
              strokeWidth="13"
              stroke="white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="matrix(0.6293203910498375,0.7771459614569708,-0.7771459614569708,0.6293203910498375,442.1302281628533,-184.58654100272327)"
            >
              <path
                d="M223.5 227.64300727844238Q559.5 164.64300727844238 576.5 580.6430072784424 "
                markerEnd="url(#arrow)"
              ></path>
            </g>
          </svg>
          <div className="help__controls help__controls--right neon">
            {t("move right")}
          </div>
          <svg
            className="help__arrow help__arrow--right"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 800 800"
          >
            <g
              strokeWidth="13"
              stroke="white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="matrix(-0.8480480961564261,-0.5299192642332048,0.5299192642332048,-0.8480480961564261,510.2515327692886,929.1869441558524)"
            >
              <path
                d="M280 275.9407501220703Q386 568.9407501220703 520 515.9407501220703 "
                markerEnd="url(#arrow)"
              ></path>
            </g>
          </svg>
          <div className="help__controls help__controls--bottom neon">
            {t("speed up")}
          </div>
          <svg
            className="help__arrow help__arrow--bottom"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 800 800"
          >
            <g
              strokeWidth="13"
              stroke="white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="matrix(-0.8480480961564261,-0.5299192642332048,0.5299192642332048,-0.8480480961564261,510.2515327692886,929.1869441558524)"
            >
              <path
                d="M290 304.1261234283447Q468 192.12612342834473 510 524.1261234283447 "
                markerEnd="url(#arrow)"
              ></path>
            </g>
          </svg>
        </div>
      </div>
    </>
  )
}

export default memo(Help)
