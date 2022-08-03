import React from "react";
import { Box } from '@chakra-ui/react';
import PostLastestCard from '../../cards/PostLastestCard';

type Props = {
    margin?: number;
    containerHeight?: number;
    articles: any;
}

const LastestCard = ({
    articles,
}: Props) => {


    
    return (
        <>
            <Box d="flex" flexDirection={{ base: 'column', lg: 'row' }}>
                <Box pl={{ base: '0px', lg: "70px" }}
                    pr={{ base: '0px', lg: "70px" }} d="flex" flexDirection="column" flex="4" as="section" marginY={'.7em'}>
                    {articles.map((post: any) => (
                        <Box key={post.id}>
                            <PostLastestCard post={post} />
                        </Box>
                    ))}
                </Box>
           
            </Box>
         
        </>
    );
};

export default LastestCard;

