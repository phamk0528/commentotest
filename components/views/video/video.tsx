import React, { useState, useEffect, useRef } from "react";
import { Box, Center, Button } from '@chakra-ui/react';
import PostLastestCard from '../../cards/PostLastestCard';
import { useGetArticles } from '../../../helpers/articles'


const VideoCard = () => {

    const [items, setItems] = useState<Array<any>>([]);
    const [start, setStart] = useState(0);
    const [isShow, setIsShow] = useState(true);
    const defaultAticlesShowed =20;
    const handelLoadMore=  (result:any)=>{ setIsShow(false); setItems(pre => {return [...pre,...result]}) } 
    useEffect(() => {
      if(start===0) return;
      useGetArticles(`youtube_url_ne=&_sort=public_date:DESC&_start=${start}&_limit=${defaultAticlesShowed}`).then(
          (result) => {
            result.length === 0 || result.length <defaultAticlesShowed ? handelLoadMore(result): setItems(pre => {return [...pre,...result]})
          }
      )
  }, [start])

  useEffect(() => {
    useGetArticles(`youtube_url_ne=&_sort=public_date:DESC&_start=${start}&_limit=${defaultAticlesShowed}`).then(
        (result) => {
            setItems(result);
        }
    )
}, [])
    

    // const [isFetching, setIsFetching] = useState(false);
    // const [items, setItems] = useState<Array<any>>([]);
    // const page = useRef(0);
    // const limit = 3;
    // const total = articles.length;

    // const handleScroll = () => {
    //     if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight)
    //         return;
    //     else {
    //         page.current++;
    //         setIsFetching(true);
    //     }
    // };

    // useEffect(() => {
    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, []);

    // useEffect(() => {
    //     if (!isFetching) return;
    //     if (total <= items.length) {
    //         setIsFetching(false)
    //         return;
    //     };
    //     useGetArticles(`youtube_url_ne=&_sort=public_date:DESC&_start=${limit * page.current}&_limit=${limit}`).then(
    //         (result) => {
    //             const newItem = [...items, ...result]
    //             setItems(newItem);
    //             setIsFetching(false);
    //         }
    //     )
    // }, [isFetching]);



    return (
        <>
            <Box d="flex" flexDirection={{ base: 'column', lg: 'row' }}>
                <Box pl={{ base: '0px', lg: "70px" }}
                    pr={{ base: '0px', lg: "70px" }} d="flex" flexDirection="column" flex="4" as="section" marginY={'.7em'}>
                    {items.map((post: any) => (
                        <Box key={post.title + 'videos' + post.id}>
                            <PostLastestCard post={post} />
                        </Box>
                    ))}
                </Box>
            </Box>
            {isShow && items.length>=defaultAticlesShowed && <Center h="100px" color="red">
                <Button onClick={() => setStart(pre => pre + defaultAticlesShowed)} borderRadius={30} colorScheme="red" variant="outline">
                    Load More
            </Button>
            </Center>}

        </>
    );
};

export default VideoCard;