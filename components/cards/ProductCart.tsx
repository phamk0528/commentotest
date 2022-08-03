import React, { useState } from 'react';
import { chakra, Box, Image, Flex, useColorModeValue, HStack, Button } from '@chakra-ui/react';
type Props = {
    product: any;
};

type ColorProps = {
    colors: any;
};
const ColorCard = ({ colors }: ColorProps) => {
    return (
        <Box spacing="10px">
            {colors.length !== 0 ? (
                <>
                    <Box alignItems="center" justifyContent="space-between" bg="white" roundedBottom="lg" px={4} py={2}>
                        <chakra.h1 color="gray.800" fontWeight="bold" fontSize="xs">
                            {`AVAILABLE COLORS`}
                        </chakra.h1>
                    </Box>
                    <Flex alignItems="center" justifyContent="space-between" px={4} bg="white" roundedBottom="lg">
                        <HStack spacing="10px">
                            {colors.map((color: string) => (
                                <Box w="25px" key={color} h="25px" borderRadius={30} bg={color} />
                            ))}
                        </HStack>
                    </Flex>
                </>
            ) : null}
        </Box>
    );
};

const ProductCard = ({ product }: Props) => {
    const [hover, setHover] = useState(false);
    const urlImage: any = Object.values(product.photos.photo_set) || null
    const onClick = () => {
        window.open(process.env.NEXT_PUBLIC_BASE_URL_SALES_PRODUCT + `/products/${product.id}`, '_blank');
    };

    const colors = product.searchable.colors.filter((color: string) => color.charAt(0) === '#');


    return (
        <Flex
            bg={useColorModeValue('#F9FAFB', 'gray.600')}
            w="full"
            alignItems="center"
            justifyContent="center"
            onClick={() => {
                onClick();
            }}
            cursor="pointer"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ transform: `scale(${hover ? 1.01 : 1})` }}
            transition="ease-in 0.2s"
            h={{ base: '100%', lg: '100%' }}
        >
            <Box
                h={{ base: '100%', lg: '100%' }}
                w="100%"
                bg={useColorModeValue('white', 'gray.800')}
                shadow="lg"
                p={5}
            >
                <Image
                    h={{ base: 'auto', md: '100px', lg: 'auto' }}
                    w="auto"
                    mt={2}
                    src={urlImage[0].photos[0] ? urlImage[0].photos[0] : '/placeholder-1-1.png'}
                    alt={product.name}
                />
                <Box pt={5}>
                    <Box px={4} py={2} h="30%">
                        <chakra.h4
                            color={useColorModeValue('black', 'white')}
                            fontWeight="500"
                            fontSize="md"
                            textTransform="uppercase"
                            pt={5}
                        >
                            {product.name}
                        </chakra.h4>
                    </Box>

                    <Box px={4} py={2} h="30%">
                        <chakra.h4
                            color={useColorModeValue('black', 'white')}
                            fontWeight="bold"
                            fontSize="md"
                            textTransform="uppercase"
                        >
                            {`₱ ${product.price}`}
                        </chakra.h4>
                    </Box>

                    <Button
                        w="100%"
                        onClick={() => {
                            onClick();
                        }}
                        borderRadius={30}
                        colorScheme="red"
                        variant="solid"
                    >
                        SHOP NOW
                    </Button>
                </Box>
            </Box>
        </Flex>
    );
};

export default ProductCard;
