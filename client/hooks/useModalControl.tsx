import { useState } from 'react'

export interface ModalControl {
  isShowing: boolean,
  show: (args: any) => void
  hide: () => void
}

interface ModalControlHookArgs {
  onShow?: (args: any) => void,
  onHide?: () => void,
}
type ModalControlHook = (ModalControlHookArgs) => ModalControl

const useModalControl: ModalControlHook = ({
  onHide = () => {},
  onShow = () => {},
}) => {
  const [isShowing, setIsShowing] = useState<boolean>(false)

  return {
    isShowing,
    show: (args) => {
      setIsShowing(true)
      onShow(args)
    },
    hide: () => {
      setIsShowing(false)
      onHide()
    },
  }
}

export default useModalControl
