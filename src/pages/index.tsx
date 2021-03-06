import { FormEvent, useEffect, useState } from 'react';
import {
  Flex,
  useBreakpointValue,
  Input,
  FormControl,
  FormLabel,
  Stack,
  Button,
  Heading,
  SlideFade
} from '@chakra-ui/react';
import Head from 'next/head';

import { createSlide } from '../services/create-slide';
import api from '../services/api';

export default function Home() {
  const [maxSlides, setMaxSlides] = useState('');
  const [subject, setSubject] = useState('');

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  useEffect(() => {
    // async function fetchApi() {
    //   const response = await fetch('/api/create-slide', {
    //     method: 'POST'
    //   });
    //   const responsefinal = await response.json();
    //   console.log(responsefinal);
    // }
    // fetchApi();
  }, []);

  async function handleDownloadSlide(e: FormEvent<HTMLDivElement>) {
    e.preventDefault();
    const response = await api.post('/slide/', {
      max_slides: maxSlides,
      subject,
      language: 'pt'
    });

    const slideData = {
      ...response.data,
      subject
    };
    createSlide(slideData);
  }

  return (
    <>
      <Head>Slide Generator</Head>
      <Flex h="100%" backgroundColor="cyan.700">
        <Flex
          w="100%"
          align="center"
          justify="center"
          p="8"
          backgroundColor="white"
          maxWidth={{ base: '100%', lg: '500px', xl: '600px' }}
        >
          <Flex
            as="form"
            direction="column"
            w="100%"
            maxWidth={360}
            onSubmit={handleDownloadSlide}
          >
            <Stack spacing="8">
              <FormControl>
                <FormLabel htmlFor="max-slide">Quantidade máxima</FormLabel>

                <Input
                  type="text"
                  id="max-slide"
                  focusBorderColor="cyan.500"
                  variant="outline"
                  size="lg"
                  value={maxSlides}
                  onChange={e => setMaxSlides(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="subject"> Assunto</FormLabel>
                <Input
                  type="text"
                  id="subject"
                  focusBorderColor="cyan.500"
                  variant="outline"
                  size="lg"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                />
              </FormControl>
            </Stack>
            <Button
              type="submit"
              size="lg"
              mt="8"
              bg="cyan.700"
              color="white"
              colorScheme="cyan"
            >
              Baixar Slide
            </Button>
          </Flex>
        </Flex>
        {isWideVersion && (
          <Flex
            backgroundColor="cyan.700"
            h="100%"
            flex="1"
            align="center"
            justify="center"
            display={{ base: 'none', lg: 'flex' }}
          >
            <SlideFade in offsetY="20px">
              <Heading color="white" size="3xl">
                Slide
              </Heading>
            </SlideFade>
          </Flex>
        )}
      </Flex>
    </>
  );
}
