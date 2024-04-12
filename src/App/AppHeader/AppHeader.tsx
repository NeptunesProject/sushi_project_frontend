import React, { useState, useEffect, CSSProperties } from 'react'
import { Box, Container } from '@chakra-ui/react'
import AppHeaderLg from './AppHeaderLg'
import AppHeaderSm from './AppHeaderSm'

const stickyStyle: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  backgroundColor: 'white',
  transition: 'transform 0.8s ease',
  borderBottom: '1px solid #b8b9ba',
}

const Style: CSSProperties = {
  backgroundColor: 'white',
  borderBottom: '1px solid #b8b9ba',
  zIndex: 1000,
}

const AppHeader = () => {
  const [isSticky, setIsSticky] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      setIsSticky(prevScrollPos > currentScrollPos)
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollPos])

  return (
    <Container
      as="header"
      maxW="container.xl"
      style={isSticky ? stickyStyle : Style}
    >
      <Box display={{ base: 'none', lg: 'block' }}>
        <AppHeaderLg />
      </Box>
      <Box display={{ base: 'block', lg: 'none' }}>
        <AppHeaderSm />
      </Box>
    </Container>
  )
}

export default AppHeader
