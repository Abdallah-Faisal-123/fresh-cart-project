'use client'
import { AppStore, createStore, preloadedState } from "@/store/store"
import { ReactNode, useRef } from "react"
import { Provider } from "react-redux"
type ProvidersProps = {
  children: ReactNode
  preloadedState: preloadedState
}
export default function Providers({ children, preloadedState }: ProvidersProps) {

  const storeRef = useRef<null | AppStore>(null)
  if (!storeRef.current) {
    storeRef.current = createStore(preloadedState)
  }

  return (
    <Provider store={storeRef.current}>
      {children}
    </Provider>
  )
}