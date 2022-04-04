import React, { useState, useMemo } from 'react'
import * as _t from '@babel/core'
// import { useTranslate } from '@common/hooks/useTranslate'
import { useTranslate } from '@common/hooks/useTranslate'

// import App from './pages/App'
import ReactDOM from 'react-dom'

const Test = () => {
  return 'test'
}

const App = () => {
  const a = useState(1)

  const b = useMemo(() => {
    return (
      <div>
        ((dsadsa_dsadsa))
      </div>
    )
  }, [])

  const { t: _t2 } = useTranslate()

  return (
    <div>
      <div>app</div>
      <div>app</div>
      <div>((i18n_key))</div>
      <div>{/* i18n-disabled */}((i18n_key_disabled))</div>
      {b}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
