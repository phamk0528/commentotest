import React, { useState, useEffect, useRef } from "react";
import { Box, Center, Button } from '@chakra-ui/react';
import { useGetArticles } from '../../../helpers/articles';
import PostLastestCard from '../../cards/PostLastestCard';

type Props = {
    margin?: number;
    containerHeight?: number;
    articles: any;
    articleId: any;
}

const NextStories = ({
    articles,
    articleId
}: Props) => {
    // const index = Math.floor(Math.random() * articles.length)

    // const items = [];

    // items.push(articles[index])
    // items.push(articles[index === articles.length ? index-1 :index+1])

    const [items, setItems] = useState<Array<any>>(articles);
    const [start, setStart] = useState(0);
    const [isShow, setIsShow] = useState(true);
    const defaultAticlesShowed = 3;
    const handelLoadMore = (result: any) => { setIsShow(false); setItems(pre => { return [...pre, ...result] }) }
    useEffect(() => {
        if (start === 0) return;
        useGetArticles(`id_ne=${articleId}&_sort=public_date:DESC&_start=${start}&_limit=${defaultAticlesShowed}`).then(
            (result) => {
                result.length === 0 || result.length < defaultAticlesShowed ? handelLoadMore(result) : setItems(pre => { return [...pre, ...result] })
            }
        )
    }, [start])
    
    return (
        <>
            <Box d="flex" flexDirection={{ base: 'column', lg: 'row' }}>
                <Box pl={{ base: '0px', lg: "70px" }}
                    pr={{ base: '0px', lg: "70px" }} d="flex" flexDirection="column" flex="4" as="section" marginY={'.7em'}>
                    {items.map((post: any) =>
                    (
                        <Box key={post.title + post.id}>
                            <PostLastestCard isNextStory={true} post={post} />
                        </Box>
                    ))}
                </Box>

            </Box>
            {isShow && <Center h="100px" color="red">
                <Button onClick={() => setStart(pre => pre + defaultAticlesShowed)} borderRadius={30} colorScheme="red" variant="outline">
                    Load More
            </Button>
            </Center>}
        </>
    );
};

export default NextStories;
