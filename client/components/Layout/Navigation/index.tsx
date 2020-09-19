import Link from 'next/link'
import React, { useState, useContext } from 'react'
import { FaBars  } from 'react-icons/fa'

import Box from '../../../system/Box'
import Card from '../../../system/Card'
import Button from '../../../system/Button'
import Text from '../../../system/Text'

import DeviceContext from '../../../contexts/DeviceContext'
import config from './config'

const MenuHeader: React.FC<{}> = ({ children}) => (
  <Box
    display="flex"
    padding="5px 15px"
    borderBottomColor="grays.bg.lighter"
    borderBottomWidth="1px"
    borderBottomStyle="solid"
  >
    <Text fontSize={3}>{children}</Text>
  </Box>
)

const Navigation: React.FC<{}> = () => {
  const { isPhone } = useContext(DeviceContext)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return <Box position="relative">
    <Box display="flex" flexDirection="row">
      <Box flex="0">
        <Button theme='borderless' onClick={() => { toggleMenu() }}>
          <FaBars />
        </Button>
      </Box>
    </Box>
    {isMenuOpen && <Box
      minWidth="30%"
      width={isPhone ? '100%' : 'auto'}
      position="absolute"
      top="100%"
      left="0%"
      zIndex={1000}
    >
      <Card padding="0" paddingTop={2} paddingBottom={2} bg="white" margin="10px 0">
        {config.map(([header, items]) => (
          <>
            <MenuHeader>{header}</MenuHeader>
            {items.map(([href, label]) => (
              <Link href={href}>
                <Button onClick={() => {}} theme="borderless">{label}</Button>
              </Link>
            ))}
          </>
        ))}
      </Card>
    </Box>}
  </Box>
}

export default Navigation
