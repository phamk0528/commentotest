import React from 'react';
import { GetStaticProps } from 'next';
import { useGetPrivacyPolicy } from '../../helpers/contentFooter';
import PrivacyPolicy from '../../components/views/privacyPolicy/PrivacyPolicy';

type Props = {
    content?: any;
    errors?: string;
};

const PrivacyPolicyPage = ({ content }: Props) => {
    return (  
    <>
        <PrivacyPolicy content={content}/>
    </>
    );
};

export const getStaticProps: GetStaticProps = async (context: any) => {
    try {
        let data = await useGetPrivacyPolicy();           
        return { props: { content: data } , revalidate: 10};
    } catch (err) {
        return { props: { errors: err.message } };
    }
};

export default PrivacyPolicyPage;