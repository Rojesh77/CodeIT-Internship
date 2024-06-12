import React from 'react'
import CodeEditor from './CodeEditor'
import { Box } from '@chakra-ui/react'

const Homepage = () => {
  return (
    <Box h="135vh" bg="#0f0a19" color="gray.500" width='100vw' px={6} py={8}>
    <CodeEditor/>
  </Box>
  )
}

export default Homepage