import React from "react";
import { Image, Box, chakra } from '@chakra-ui/react';
import ProductCart from '../../cards/ProductCart';

type Props = {
    margin?: number;
    containerHeight?: number;
    products: any;
}

const Products = ({
    products,
}: Props) => {
    // const index = Math.floor(Math.random() * articles.length)

    // const items = [];

    // items.push(articles[index])
    // items.push(articles[index === articles.length ? index-1 :index+1])
    return (
        <>{products.length !==0 ? <><Box as="section" d='flex' pl={{ base: '0px', lg: "80px" }}
            pr={{ base: '0px', lg: "80px" }} >
            <chakra.h1
                fontWeight="bold"
                fontSize="2xl"
                textTransform="uppercase"
                marginTop="0.5rem" >
                Shop on
            </chakra.h1>
            <Image pl="5px" w="170px" src="/logo.png" h="42px" />
            </Box>
            <Box d="flex" flexDirection={{ base: 'column', lg: 'row' }} h={{ lg: "520px" }} pl={{ base: '0px', lg: "80px" }}
                pr={{ base: '0px', lg: "80px" }} >
                {products?.map((product: any) => {
                    return (
                        <Box w={{ base: "100%", lg: "25%" }} h={{ base: "100%", lg: "100%" }} key={product.name + product.id} p={2} >
                            <ProductCart
                                product={product}
                            />
                        </Box>
                    );
                })}
            </Box></> : null}

        </>
    );
};

export default Products;