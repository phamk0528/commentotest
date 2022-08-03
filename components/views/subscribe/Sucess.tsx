import { Text, Icon, Box, Center, Button } from '@chakra-ui/react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';

type Props = {
    content: any;
};

const Success = ({ content }: Props) => {
    const router = useRouter();
    const onClick = () => {
        router.push(`/`);
    };

    return (
        <Box
            bg="white"
            py={{ base: '0px', md: '0px', lg: '10px' }}
            px={{ base: '0px', md: '0px', lg: '15px' }}
            pl={{ base: '0px', md: '0px', lg: '100px' }}
            pr={{ base: '0px', md: '0px', lg: '100px' }}
            textAlign="left"
            w={{ base: '100%', lg: '100%' }}
        >
            <Box flexDirection={{ base: 'column', md: 'row' }}>
                <Box mt={[0, 0, 20]}>
                    <Box bgColor="red" w="100%" h="5px"></Box>
                    <Center pt={10}>
                        <Icon as={FaRegCheckCircle} color="red" boxSize="3rem" mt={1} />
                    </Center>

                    <Center pl={{ base: '0px', lg: '80px' }} pr={{ base: '0px', lg: '80px' }} as="section">
                        <Box
                            w={{ base: '100%', md: '100%', lg: '50%' }}
                            textAlign="center"
                            color="red"
                            as="article"
                            margin=".5rem"
                        >
                            <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" pt={5}>
                                Thank you for subscribing to PlayitRight TV!
                            </Text>
                        </Box>
                    </Center>

                    <Center pl={{ base: '0px', lg: '80px' }} pr={{ base: '0px', lg: '80px' }} as="section">
                        <Box
                            w={{ base: '100%', md: '100%', lg: '65%' }}
                            textAlign="center"
                            color="black"
                            as="article"
                            margin=".5rem"
                        >
                            <Text fontSize={{ base: 'md', md: 'xl' }} pt={5}>
                                You have been added to our list and we're delighted to be sharing more and great content
                                with you
                            </Text>
                        </Box>
                    </Center>

                    <Center px={{ base: 4, sm: 6 }} py={3} pt={7} textAlign="right" alignItems="center" pb={10}>
                        <Button onClick={() => onClick()} colorScheme="red" variant="solid">
                            BACK HOME
                        </Button>
                    </Center>
                    <Box bgColor="red" w="100%" h="5px"></Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Success;
