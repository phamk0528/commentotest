import React, { useEffect, useState } from "react";
import { Box,Center,Text } from '@chakra-ui/react';
import PostLastestCard from '../../cards/PostLastestCard';
import { useGetArticles } from '../../../helpers/articles';
import {useRecoilState} from 'recoil';
import {SearchKeyword} from '../../../recoil/search'

const SearchResult = () => {
    const [articles, setArticles] = useState([]);
    const [searchKeyword, setSearchKeyword] = useRecoilState(SearchKeyword);
    useEffect(() => {
        useGetArticles(`_q=${searchKeyword}`).then(
            (result) => {
                setArticles(result);
            }
        )
    }, [searchKeyword])

    return (

        <>
            {  articles.length!==0 ? <Box d="flex" flexDirection={{ base: 'column', lg: 'row' }}>
                <Box pl={{ base: '0px', lg: "70px" }}
                    pr={{ base: '0px', lg: "70px" }} d="flex" flexDirection="column" flex="4" as="section" marginY={'.7em'}>
                    {articles.map((post: any) => (
                        <Box key={post.title+'search' + post.id}>
                            <PostLastestCard post={post} />
                        </Box>
                    ))}
                </Box>
            </Box> : <Box pl={{ base: '0px', lg: "70px" }}
                    pr={{ base: '0px', lg: "70px" }} d="flex" flexDirection="column" flex="4" as="section" marginY={'.7em'}>
                 <Center>
                     <Text fontWeight="bold" fontSize="xl">No result</Text>
                     </Center>
                </Box>
           }

        </>
    );
};

export default SearchResult;