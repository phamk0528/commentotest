import React, { useState, useEffect } from 'react';
import { useGetContentSubscribe } from '../../../helpers/subscribers';
import {
    chakra,
    Box,
    useColorModeValue,
    Spacer,
    Center,
    FormControl,
    FormLabel,
    Input,
    CheckboxGroup,
    SimpleGrid,
    Checkbox,
    Button
} from "@chakra-ui/react";
import { useFormik } from 'formik';
import { useSubscriber } from '../../../helpers/subscribers';
import { getInterested } from '../../../helpers/commonFuction';
import { useRouter } from 'next/router';

const FormSubscribe = () => {
    const [contentSubscribe, setContentSubscribe] = useState({
        title: "Subscribe To PlayitRight TV", greeting_content: "Want to know more? Be the first to get notified about your favorite sports stories by signing up!",
        interested_in_knowing: `Athletes Interviews, Expert Discussions, Sports Analysis, Sports Lifestyle, Volleyball, Basketball,
         Running, Boxing/MMA, Racket Sports, Other Sports `
    });

    const [interested, setInterested] = useState([])

    useEffect(() => {
        useGetContentSubscribe().then(res => setContentSubscribe(res))
    }, [])

    const formik = useFormik({
        initialValues: {
            email: "",
            firstName: "",
            lastName: "",
            interested_in_knowing: ""
        },
        onSubmit: async values => {
            values.interested_in_knowing = interested.join(', ')
           const result = await useSubscriber(values);
           result === 200 ? onClick() : null;
        },
    });
    const interestes = getInterested(contentSubscribe.interested_in_knowing)

    const router = useRouter();
    const onClick = () => {
      router.push(`/subscribe/success`);
    };
  

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
                <Box mt={[0, 0, 15]}
                >
                    <Box bgColor="red" w="100%"
                        h="5px"
                    ></Box>

                    <chakra.form
                        method="POST"
                        shadow="base"
                        rounded={[null, "md"]}
                        overflow={{ sm: "hidden" }}
                        h={{ base: "auto", md: "auto", lg: "auto" }}
                        onSubmit={formik.handleSubmit}
                    >
                        <Box>
                            <chakra.h1
                                fontSize={{ base: "2xl", md: "3xl" }}
                                color="black"
                                fontWeight="900"
                                pt={10}
                                pl={10}
                            >
                                {contentSubscribe.title}
                            </chakra.h1>
                            <chakra.h1
                                fontSize={{ base: "md", md: "md" }}
                                color="black"
                                p={{ base: 5, lg: 10 }}
                                pt={5}
                            >
                                {contentSubscribe.greeting_content}
                            </chakra.h1>
                        </Box>
                        <Box
                            pl={{ base: 5, md: 5, lg: 10 }}
                            pr={{ base: 5, md: 5, lg: 10 }}>
                            <SimpleGrid pt={3} columns={[1, null, 2]} spacing="5px" >
                                <FormControl pr={5}>
                                    <FormLabel
                                        fontSize="sm"
                                        fontWeight="md"
                                        color={useColorModeValue("gray.700", "gray.50")}
                                    >
                                        First Name
                                         </FormLabel>
                                    <Input
                                        type="text"
                                        name="firstName"
                                        onChange={formik.handleChange}
                                        value={formik.values.firstName}
                                        placeholder="John"
                                        id="firstName"
                                        mt={1}
                                        focusBorderColor="brand.400"
                                        shadow="sm"
                                        size="sm"
                                        w="full"
                                        rounded="md"
                                    />
                                </FormControl>

                                <FormControl pr={5}>
                                    <FormLabel

                                        fontSize="sm"
                                        fontWeight="md"
                                        color={useColorModeValue("gray.700", "gray.50")}
                                    >
                                        Last Name
                                     </FormLabel>
                                    <Input
                                        type="text"
                                        name="lastName"
                                        placeholder="Doe"
                                        onChange={formik.handleChange}
                                        value={formik.values.lastName}
                                        id="lastName"
                                        mt={1}
                                        focusBorderColor="brand.400"
                                        shadow="sm"
                                        size="sm"
                                        w="full"
                                        rounded="md"
                                    />
                                </FormControl>
                            </SimpleGrid>


                            <SimpleGrid pt={3} columns={1} spacing="5px" >
                                <FormControl pr={5}>
                                    <FormLabel

                                        fontSize="sm"
                                        fontWeight="md"
                                        color={useColorModeValue("gray.700", "gray.50")}
                                    >
                                        Email Address
                                          </FormLabel>
                                    <Input
                                        type="text"
                                        name="email"
                                        id="email"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        placeholder="john@doe.com"
                                        mt={1}
                                        focusBorderColor="brand.400"
                                        shadow="sm"
                                        size="sm"
                                        w="full"
                                        rounded="md"
                                    />
                                </FormControl>
                            </SimpleGrid>
                        </Box>
                        <Spacer />
                        <chakra.h1
                            fontSize={{ base: "md", md: "md" }}
                            color="black"
                            pl={{ base: 5, lg: 10 }}
                            pt={{ base: 5, lg: 5 }}
                            pb={5}
                        >
                            Interested in knowing:
                        </chakra.h1>

                        <CheckboxGroup colorScheme="gray" onChange={(value:any)=>setInterested(value)} defaultValue={[]}>
                            <Box
                                pl={{ base: 5, md: 5, lg: 10 }}
                                pr={{ base: 5, md: 5, lg: 10 }}>

                                <SimpleGrid columns={[1, null, 2]} spacing="5px" >
                                    {interestes.map(interested =>
                                        <Checkbox key={interested} value={interested}>{interested}</Checkbox>
                                    )}
                                </SimpleGrid>
                            </Box>
                        </CheckboxGroup>
                        <Center
                            px={{ base: 4, sm: 6 }}
                            py={3}
                            pt={7}
                            textAlign="right"
                            alignItems="center"
                        >
                            <Button type="submit" borderRadius={30} colorScheme="red" variant="solid">
                                SUBSCRIBE
                            </Button>
                        </Center>

                    </chakra.form>
                    <Box bgColor="red" w="100%"
                        h="5px"
                    ></Box>
                </Box>
            </Box>
        </Box>
    )
}

export default FormSubscribe;