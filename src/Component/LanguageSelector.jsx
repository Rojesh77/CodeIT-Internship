import React from 'react'
import { Box, Button, Text, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { LANGUAGE_VERSIONS } from '../constants'


const languages = Object.entries(LANGUAGE_VERSIONS)


const LanguageSelector = ({language,onSelect}) => {
  return (
    
    <Box ml={2} mb={4} >
      <Text mb={2} fontSize='lg' >Language : </Text>
      <Menu isLazy >
        {/* isLazy vause Menu to not be opened until clicked */}
        <MenuButton as={Button}>
          {language}
        </MenuButton>
        <MenuList >
          {
            languages.map(([language, version]) => (
              <MenuItem key={language} 
             

              onClick={()=>onSelect(language)}>
                {language}&nbsp;
                <Text as="span" color="gray.500" fontSize="sm">
                  {version}
                </Text>
              </MenuItem>
            ))
          }
        </MenuList>
      </Menu>
    </Box>
  )
}

export default LanguageSelector
