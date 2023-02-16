import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Nprogress from 'nprogress'
import { Router } from 'next/router'
import 'nprogress/nprogress.css'
import AccidentProvider from '../context/accidentContext'

Nprogress.configure({ showSpinner: false })

Router.events.on('routeChangeStart', () => {
  Nprogress.start()
})

Router.events.on('routeChangeComplete', () => {
  Nprogress.done()
})

Router.events.on('routeChangeError', () => {
  Nprogress.done()
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AccidentProvider>
      <Component {...pageProps} />
    </AccidentProvider>
  )
}
