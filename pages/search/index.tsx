import React from 'react';

import { GetStaticProps } from 'next';
import { useGetArticles } from '../../helpers/articles';
import SearchResult from '../../components/views/search/searchResult';


type Props = {
    articles?: any;
    errors?: string;
};

const VideosPage = ({ articles }: Props) => {

    return (  
    <>
        <SearchResult />
    </>
    );
};

export const getStaticProps: GetStaticProps = async (context: any) => {
    try {

        let data = await useGetArticles(`youtube_url_ne=`);

        return { props: { articles: data } , revalidate: 10};
    } catch (err) {
        return { props: { errors: err.message } };
    }
};

export default VideosPage;