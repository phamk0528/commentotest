// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app';
import '../styles/index.css';
import { Chakra } from '../Chakra';
import Layout from '../components/Layout';
import React, {useEffect, useState } from 'react';
import Router from 'next/router';
import { css } from '@emotion/core';
import { BounceLoader } from 'react-spinners';
import AOS from 'aos';
import 'aos/dist/aos.css'
import {
    Modal, ModalOverlay,
} from '@chakra-ui/react';
import {RecoilRoot} from 'recoil';
import {DefaultSeo} from 'next-seo';
import SEO from '../next-seo.config';
import { CookiesProvider } from 'react-cookie';

const override = css`
position: absolute;
  top: 50%;
  height: 100px;
  margin-top: -50px;
`;
function Application({ Component, pageProps }: AppProps) {

    let [loading, setLoading] = useState(false);
    Router.events.on('routeChangeStart', () => setLoading(true));
    Router.events.on('routeChangeComplete', () => setLoading(false));
    Router.events.on('routeChangeError', () => setLoading(false));


    useEffect(() => {
        AOS.init({duration:2000}) 
    }, []);
    return (
        
        <RecoilRoot>
            <DefaultSeo {...SEO} />
        <Chakra cookies={pageProps.cookies}>    
        <CookiesProvider>  
            <Layout title="Home | Modern News" px={{ base: '.6em', md: '1.2em' }} py="1.4em">
            <Modal isOpen={loading}>
                    <ModalOverlay textAlign="center">
                        <BounceLoader css={override} size={70} color='#A8A248' loading />
                    </ModalOverlay>
                </Modal>
            <Component {...pageProps} />
            </Layout>
        </CookiesProvider>
        </Chakra>
        </RecoilRoot>
       
    );
}

export { getServerSideProps } from '../Chakra';

export default Application;
