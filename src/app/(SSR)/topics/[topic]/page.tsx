import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import styles from './TopicPage.module.css'
import { Alert } from "react-bootstrap";
import { Metadata } from "next";

interface PageProps {
  params: {
    topic: string
  };
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export function generateMetadata({params: {topic}}: PageProps): Metadata {
  return {
    title: `${topic} - NextJS 13.4 Image Gallery`
  }
}

export function generateStaticParams() { // pre-generate the websites with these path params in advance in build time
  return ['health', 'fitness', 'coding'].map(topic => ({topic}))
}

export const dynamicParams = false; // only all the pre-generated paths, not others, thus turning off dynamic paths, though it will seems like dynamic path within the set

export default async function Page({params: {topic}}: PageProps) {
  const response = await fetch(`https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPLASH_ASSESS_KEY}`)

  const images: UnsplashImage[] = await response.json();
  return (
    <div>
      <Alert>
        This page is using path params. We can pre-generate pages with specific path params using <strong>generateStaticParams()</strong>. We can only generate the one specified, and make others 404 using <strong>dynamicParams</strong> set to false. This page also generate dynamic metadata using <strong>generateMetadata()</strong>.
      </Alert>
      <h1>{topic}</h1>
      {
        images.map(image => (
          <Image 
            src={image.urls.raw}
            width={250}
            height={250}
            alt={image.description}
            key={image.urls.raw}
            className={styles.image}
          />
        ))
      }
    </div>
  )
}