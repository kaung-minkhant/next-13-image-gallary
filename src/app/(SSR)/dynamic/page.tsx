import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "react-bootstrap";

export const metadata = {
  title: 'NextJS 13.4 Dynamic Fetching',
}

// export const revalidate = 0; // dynamic page

export default async function DynamicPage() {
  const response = await fetch('https://api.unsplash.com/photos/random?client_id=' + process.env.UNSPLASH_ASSESS_KEY, {
    // cache: 'no-cache' // dynamic only for this fetch
    next: {
      revalidate: 0 // also dynamic only for this fetch
    }
  })
  const image: UnsplashImage = await response.json();

  const width = Math.min(image.width, 500)
  const height = (width / image.width) * image.height


  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This page is fetched dynamically, fetching at run time. You can use <strong>revalidate</strong> set to seconds for making the entire page dynamic. Or, to make each fetch request dynamic, set <strong>cache: 'no-cache'</strong> or <strong>next: revalidate: 0</strong>
      </Alert>
      <Image
        src={image.urls.raw}
        width={width}
        height={height}
        alt={image.description}
        className="rounded shadowa mw-100 h-100"
      />
      by <Link href={"/users/" + image.user.username}>{image.user.username}</Link>
    </div>
  )
}