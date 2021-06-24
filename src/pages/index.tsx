import { useEffect } from 'react';
import Head from 'next/head';

import { createSlide } from '../services/slide';

export default function Home() {
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

  async function handleDownloadSlide() {
    createSlide();
    // const response = await fetch('/api/teste');
    // const data = await response.json();
    // console.log(data);
  }
  return (
    <>
      <Head>Homepage</Head>
      <h1>Hello World</h1>
      <button onClick={handleDownloadSlide}>Baixar Slide</button>
    </>
  );
}
