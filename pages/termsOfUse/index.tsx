import React from 'react';

import { GetStaticProps } from 'next';
import { useGetTermsOfUse } from '../../helpers/contentFooter';
import TermsOfUse from '../../components/views/termsOfUse/TermsOfUse';



type Props = {
    content?: any;
    errors?: string;
};

const TermOfUsePage = ({ content }: Props) => {

    return (  
    <>
        <TermsOfUse content={content}/>
    </>
    );
};

export const getStaticProps: GetStaticProps = async (context: any) => {
    try {
        let data = await useGetTermsOfUse();
        return { props: { content: data } , revalidate: 10};
    } catch (err) {
        return { props: { errors: err.message } };
    }
};

export default TermOfUsePage;