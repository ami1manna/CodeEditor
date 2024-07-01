import {
    Box,
    Button,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
import {LANGUAGES_VERSIONS} from '../constants.js'

const languages = Object.entries(LANGUAGES_VERSIONS)
//Color 
const ACTIVE_COLOR = 'blue.400';
// eslint-disable-next-line react/prop-types
const LanguageSelector = ({language,onSelect}) => {
    return (
        <Box ml={2} mb={4}>
            <Text mb={2} fontSize='lg'>Language:</Text>
            <Menu isLazy bg='#110c1b'>
                <MenuButton as={Button}>
                    {language}
                </MenuButton>
                <MenuList>
                    {languages.map(([lang, version]) => (
                        <MenuItem 
                            color={
                             lang===language?ACTIVE_COLOR:''
                            }
                            bg={
                                lang===language?'gray.900':'transparent'
                            }
                            _hover={{
                                color:ACTIVE_COLOR,
                                bg:"gray:900"
                            }}
                            key={lang} 
                            onClick={()=>onSelect(lang)}>
                            {lang}

                            &nbsp;
                            <Text as='span' color='gray.600' fontSize='sm'>
                                ({version})
                            </Text>
                        </MenuItem>


                    ))}

                </MenuList>
            </Menu>
        </Box>
    )
}

export default LanguageSelector