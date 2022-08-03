import React from 'react';
import { GetStaticProps } from 'next';
import { useGetAboutUs } from '../../helpers/contentFooter';
import Sucess from '../../components/views/subscribe/Sucess';

type Props = {
    content?: any;
    errors?: string;
};

const successPage = ({ content }: Props) => {
    return (  
    <>
        <Sucess content={content}/>
    </>
    );
};

export const getStaticProps: GetStaticProps = async (context: any) => {
    try {
        let data = await useGetAboutUs();    
        return { props: { content: data } , revalidate: 10};
    } catch (err) {
        return { props: { errors: err.message } };
    }
};

export default successPage;