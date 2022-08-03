import React from 'react';
import { GetStaticProps } from 'next';
import { useGetAboutUs } from '../../helpers/contentFooter';
import AboutUs from '../../components/views/aboutUs/AboutUs';

type Props = {
    content?: any;
    errors?: string;
};

const aboutUsPage = ({ content }: Props) => {
    return (  
    <>
        <AboutUs content={content}/>
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

export default aboutUsPage;