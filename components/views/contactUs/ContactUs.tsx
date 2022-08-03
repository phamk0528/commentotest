import {
    chakra,
    Box,
    Center,
    Link
} from "@chakra-ui/react";
import Markdown from "markdown-to-jsx";

type Props = {
    content: any;
}

const ContactUs = ({ content }: Props) => {
    const MyParagraph = ({ children, ...props }: any) => {
        return (
            <Link {...props}>{children}</Link>
        );
    }
    const fixMarkDown = () => {
        return content.content.split('&#39;').join(`'`);
    }
    return (
        <Box
            bg="white"
            py={{ base: '0px', md: '0px', lg: "10px" }}
            px={{ base: '0px', md: '0px', lg: "15px" }}
            pl={{ base: '0px', md: '0px', lg: "100px" }}
            pr={{ base: '0px', md: '0px', lg: "100px" }}
            textAlign="left" w={{ base: "100%", lg: "100%" }}
        >
            <Box
                flexDirection={{ base: 'column', md: 'row' }}>
                <Box mt={[0, 0, 20]}
                >
                    <Box bgColor="red" w="100%"
                        h="5px"
                    ></Box>
                    <Center> <chakra.h1
                        fontSize={{ base: "2xl", md: "3xl" }}
                        color="black"
                        fontWeight="bold"
                        pt={10}
                    >
                        Contact Us
                        </chakra.h1></Center>

                    <Box pl={{ base: '0px', lg: "80px" }}
                        pr={{ base: '0px', lg: "80px" }} as="section" d="flex" flex="3">
                        <Box as="article" margin=".5rem">
                            <Markdown options={{
                                overrides: {
                                    a: {
                                        component: MyParagraph,
                                        props: {
                                            color: 'blue',
                                        },
                                    },

                                },
                            }}>
                                {fixMarkDown()}
                            </Markdown>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box mt={10} bgColor="red" w="100%"
                h="5px"
            ></Box>
        </Box>

    )
}

export default ContactUs;