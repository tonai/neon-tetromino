import { MouseEvent, useEffect } from "react"

import Gear from "../icons/Gear"
import { Locale, locales } from "../constants/i18n"

import Switch from "./Switch"

interface ISettingsProps {
  close: () => void
  locale: Locale
  open: (event: MouseEvent) => void
  opened: boolean
  setLocale: (locale: Locale) => void
  setShowControls: (showControls: boolean) => void
  showControls: boolean
  t: (word: string) => string
}

export default function Settings(props: ISettingsProps) {
  const {
    close,
    locale: currentLocale,
    open,
    opened,
    setLocale,
    setShowControls,
    showControls,
    t,
  } = props
  const classNames = ["settings"]
  if (opened) {
    classNames.push("settings--open")
  }

  useEffect(() => {
    if (opened) {
      window.addEventListener("click", close)
      return () => window.removeEventListener("click", close)
    }
  }, [opened, close])

  function handleLocale(locale: Locale) {
    return () => {
      setLocale(locale)
      Rune.actions.setLocale(locale)
    }
  }

  function handleShowControls(showControls: boolean) {
    setShowControls(showControls)
    Rune.actions.setShowControls(showControls)
  }

  function stop(event: MouseEvent) {
    event.stopPropagation()
  }

  return (
    <>
      <button className="settings__button" type="button" onClick={open}>
        <Gear />
      </button>
      <div className={classNames.join(" ")} onClick={stop}>
        <button
          className="settings__close button text"
          type="button"
          onClick={close}
        >
          ✖
        </button>
        <div className="settings__flags">
          {Object.entries(locales).map(([locale, Component]) => {
            const classNames = ["settings__locale"]
            if (locale === currentLocale) {
              classNames.push("settings__locale--active")
            }
            return (
              <div key={locale} className="settings__flag">
                {locale === currentLocale && (
                  <div className="settings__blur">
                    <Component />
                  </div>
                )}
                <button
                  className={classNames.join(" ")}
                  type="button"
                  onClick={handleLocale(locale)}
                >
                  <Component />
                </button>
              </div>
            )
          })}
        </div>
        <div className="settings__controls">
          <Switch
            label={t("Show controls regions")}
            onChange={handleShowControls}
            value={showControls}
          />
        </div>
      </div>
    </>
  )
}
