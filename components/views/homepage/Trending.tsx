import React, { useState } from "react";
import { Box, Flex, Text, HStack } from '@chakra-ui/react';
import PostCard from '../../cards/PostCard';


type Props = {
    margin?: number;
    containerHeight?: number;
    articles: any;
}
const TrendingCard = ({
    articles,
}: Props) => {

  
    const slides = articles;

    const [currentSlide, setCurrentSlide] = useState(0);
    
    const slidesCount = slides.length;

    const prevSlide = () => {
        setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
    };
    const nextSlide = () => {
        setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
    };
    const setSlide = (slide: any) => {
        setCurrentSlide(slide);
    };
    const carouselStyle = {
        pd: "0",
        transition: "all .5s",
        ml: `-${currentSlide * 100}%`,
    };

    return (
        <>
            <Flex
                w="full"
                p={0}
                alignItems="center"
                justifyContent="center"
            >
                <Flex w="full" pos="relative" overflow="hidden" 
               >
                    <Flex w="full" {...carouselStyle} >
                        {
                            slides.map((slide: any) => (
                                <Box key={slide.id +slide.title} h="100%" w="full" cursor="pointer" boxSize="full" shadow="md" flex="none" >
                                    <PostCard 
                                        article={slide}
                                        idArticle={slide.id}
                                        alt={`Picture of ${slide.title}`}
                                    />
                                </Box>
                            ))}
                    </Flex>
                    <Text cursor="pointer" pos="absolute"
                        top="50%"
                        w="auto"
                        mt="-22px"
                        p="16px" color="white"
                        bg="black"
                        
                        fontWeight="bold"
                        fontSize="18px"
                        transition="0.6s ease"
                        borderRadius="0 3px 3px 0"
                        userSelect="none"
                        _hover={{
                            opacity: 0.8,
                            bg: "black"
                        }} left="0" onClick={prevSlide}>
                        &#10094;
                    </Text>
                    <Text cursor="pointer" pos="absolute"
                        top="50%"
                        w="auto"
                        mt="-22px"
                        p="16px" color="white"
                        fontWeight="bold"
                        fontSize="18px"
                        transition="0.6s ease"
                        borderRadius="0 3px 3px 0"
                        userSelect="none"
                        bg="black"
                        _hover={{
                            opacity: 0.8,
                            bg: "black"
                        }} right="0" onClick={nextSlide}>
                        &#10095;
                    </Text>

                    <HStack pl="10px" justify="left" pos="absolute" bottom="8px" w="full">
                        {Array.from({ length: slidesCount }).map((_, slide) => (
                            <Box
                                key={`dots-${slide}`}
                                cursor="pointer"
                                boxSize={["4px", "20px"]}
                                m="0 2px"
                                bg={currentSlide === slide ? 'white' : "blackAlpha.400"}
                                rounded="50%"
                                display="inline-block"
                                transition="background-color 0.6s ease"
                                _hover={{ bg: "blackAlpha.800" }}
                                onClick={() => setSlide(slide)}
                            ></Box>
                        ))}
                    </HStack>
                </Flex>
            </Flex>

        </>
    );
};

export default TrendingCard;

