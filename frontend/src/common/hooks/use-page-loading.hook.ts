import { useEffect, useState } from 'react'
import Router from 'next/router'

export const usePageLoading = (): boolean => {
  const [loading, setLoading] = useState(false)

  const routeEventStart = () => {
    setLoading(true)
  }
  const routeEventEnd = () => {
    setLoading(false)
  }

  useEffect(() => {
    Router.events.on('routeChangeStart', routeEventStart)
    Router.events.on('routeChangeComplete', routeEventEnd)
    Router.events.on('routeChangeError', routeEventEnd)
    return () => {
      Router.events.off('routeChangeStart', routeEventStart)
      Router.events.off('routeChangeComplete', routeEventEnd)
      Router.events.off('routeChangeError', routeEventEnd)
    }
  })

  return loading
}
