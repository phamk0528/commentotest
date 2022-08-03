import React from 'react';
import { GetStaticProps } from 'next';
import { useGetContactUs } from '../../helpers/contentFooter';
import ContactUs from '../../components/views/contactUs/ContactUs';

type Props = {
    content?: any;
    errors?: string;
};

const contactUsPage = ({ content }: Props) => {
    return (  
    <>
        <ContactUs content={content}/>
    </>
    );
};

export const getStaticProps: GetStaticProps = async (context: any) => {
    try {
        let data = await useGetContactUs();    
        return { props: { content: data } , revalidate: 10};
    } catch (err) {
        return { props: { errors: err.message } };
    }
};

export default contactUsPage;