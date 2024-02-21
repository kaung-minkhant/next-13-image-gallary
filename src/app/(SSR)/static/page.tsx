import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "react-bootstrap";

export const metadata = {
  title: 'NextJS 13.4 Static Fetching',
}

export default async function StaticPage() {
  const response = await fetch('https://api.unsplash.com/photos/random?client_id='+process.env.UNSPLASH_ASSESS_KEY)

  const image: UnsplashImage = await response.json();

  const width = Math.min(image.width, 500)
  const height = (width / image.width) * image.height

  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This page is fetched static, only fetching at compile time
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