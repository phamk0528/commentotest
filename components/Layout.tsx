import React, { useEffect,useState } from 'react';
import Head from 'next/head';
import { Box, BoxProps } from '@chakra-ui/react';
import Navbar from './navbar';
import styles from '../constants/styles';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CookieConsent, { Cookies } from 'react-cookie-consent';
import { useCookies } from 'react-cookie';
import ModalSubscribe from './views/subscribe/ModalSubscribe';
type Props = {
    title?: string;
} & BoxProps;

const Layout = ({ children, title = 'Modern News', ...props }: Props) => {
    const [cookies, setCookie] = useCookies(['subscribe']);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (cookies.subscribe === 'true') {
            return
        } else {
            const timer = setTimeout(() => {
                setCookie('subscribe', 'true');
                setIsOpen(true)
            }, 1000*60*2);
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <Box>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Box fontFamily="Manrope">
                <header>
                    <Navbar />
                </header>
                <Box
                    as="main"
                    minH={'80vh'}
                    maxW={styles.mainMaxWidth}
                    style={{ paddingTop: '0px !important' }}
                    marginX="auto"
                    {...props}
                >
                    <ToastContainer autoClose={2000} />
                    {children}
                </Box>
                <ModalSubscribe open={isOpen} />
                <CookieConsent
                    location="bottom"
                    buttonText="Accept!"
                    cookieName="acceptCookie1"
                    style={{ background: '#2B373B' }}
                    buttonStyle={{ color: 'white', fontSize: '13px', background: 'red', borderRadius: '30px' }}
                    expires={150}
                >
                    This website uses cookies to enhance the user experience. See our
                    <a style={{ color: '#0202e2' }} href="https://playitright.tv/privacyPolicy">
                        {' '}
                        Privacy Policy{' '}
                    </a>{' '}
                    for more
                </CookieConsent>
                <Footer />
            </Box>
        </Box>
    );
};

export default Layout;
