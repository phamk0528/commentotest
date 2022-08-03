import React from 'react';
import { Box, Image } from '@chakra-ui/react';
const Logo = (props: any) => {
    return (
        <Box {...props} >
            <Image w={{base:'80%',lg:"100%"}} h={{base:"80%"}} src="/logoTV.png" fontWeight="bold" />
        </Box>
    );
};

export default Logo;
