import React, { createContext, useState, useEffect } from 'react'

export const Desktop: DeviceType = "desktop"
export const Phone: DeviceType = "phone"
const DefaultDevice: DeviceType = "desktop"

type DeviceType = string

interface IDeviceContext {
  deviceType: DeviceType
  isPhone: boolean
  isDesktop: boolean
}

const DefaultDeviceContext = {
  deviceType: DefaultDevice,
  isDesktop: DefaultDevice === Desktop,
  isPhone: DefaultDevice === Phone,
}

const DeviceContext: React.Context<IDeviceContext> = createContext(DefaultDeviceContext)

const detectDeviceType: (width: number) => DeviceType = (width) => width < 640 ? Phone : Desktop

export const DeviceProvider: React.FC<{}> = ({ children }) => {
  const [deviceType, setDeviceType] = useState<DeviceType>(DefaultDevice)
  const context: IDeviceContext = {
    deviceType,
    isPhone: deviceType === Phone,
    isDesktop: deviceType === Desktop,
  }

  const updateDevice = () => {
    setDeviceType(detectDeviceType(window.innerWidth));
  }

  useEffect(() => {
    const listener = () => { updateDevice() }

    window.addEventListener('resize', listener)
    updateDevice()

    return () => {
      window.removeEventListener('resize', listener)
    }
  }, [])

  return (
    <DeviceContext.Provider value={context}>
      {children}
    </DeviceContext.Provider>
  )
}

export default DeviceContext
