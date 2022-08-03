import React from 'react';
import { Box, Center, /*Divider,*/ Flex, Text/*, useColorModeValue*/ } from '@chakra-ui/react';
import Link from 'next/link';
import styles from '../constants/styles';

import useColorTheme from '../hooks/useColorTheme';
import { FOOTER_LINKS/*, FOOTER_BOTTOM_LINKS*/ } from '../constants';

interface Props {}

const Footer: React.FC<Props> = () => {
    const colors = useColorTheme();
  
    return (
        <Box
            as="footer"
            margin={0}
            borderTop="1px"
            borderColor={colors.border}
            boxShadow="lg"
            paddingX={{ base: '.4rem', md: '1rem' }}
            paddingTop="1.4rem"
            bgColor="black"
            color="black"
           
        >
            <Box maxW={styles.mainMaxWidth}  mx={'auto'} >
                <Flex
                    wrap="wrap"
                    w="100%"
                    direction={{ base: 'column', md: 'row' }}
                    pb="1.4rem"
                >
                    <Flex direction={{ base: 'column', md: 'row' }}>
                        {FOOTER_LINKS.map((link,index) => {
                            return (
                                <Box
                                    mt={3}
                                    key={link.heading}
                                    justifyContent="center"
                                    flex="1"
                                    marginX={{ base: '1rem' }}
                                    border="1px" 
                                    borderRightColor= {{base:"none",md: index+1 === FOOTER_LINKS.length ? "none":"gray.200"}}
                                >
                                    <Box textAlign="left"  >
                                        <Link  href={link.link}>
                                        <Text w="130px" fontSize={'1rem'} color="gray.400"
                                        cursor="pointer"
                                        _hover={{color:"white", textDecoration: 'underline' }}>{link.heading}</Text>
                                        </Link>            
                                    </Box>
                                </Box>
                            );
                        })}
                    </Flex>
                </Flex>
                <Center bgColor="black" textAlign="center" flexDirection={{ base: 'column', md: 'row' }} h={10} >
                    <Text fontSize={'.9rem'} color="gray.400">
                       Copyright © 2021 Playit Right Inc. All right reserved
                    </Text>
                </Center>
            </Box>
        </Box>
    );
};

export default Footer;
