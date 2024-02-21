import { UnsplashUser } from "@/models/unsplash-user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { Alert } from "react-bootstrap";

interface PageProps {
  params: {
    username: string,
  }
}

async function getUser(username: string): Promise<UnsplashUser> {
  const response = await fetch(`https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ASSESS_KEY}`)

  if (response.status === 404) {
    notFound();
  }
  return await response.json()
}
const getUserCached = cache(getUser)

export async function generateMetadata({params: {username}}: PageProps): Promise<Metadata> {
  const user = await getUserCached(username);
  return {
    title: `${user.name} - NextJS 13 Image Gallary`,
  }
}


export default async function Page({params: {username}} : PageProps) {
  const user = await getUserCached(username);

  return (
    <div>
      <Alert>
        This page uses fetch in <strong>generateMetadata()</strong>. It seems the api call is dupliccated, but just for fetch API NextJS automatically cache the call and deduplicate the api call. If other api packages like axios is used, use <strong>cache</strong> from react library.
      </Alert>
      <h1>{user.username}</h1>
      <p>Name: {user.name}</p>
      <a href={'https://unsplash.com/'+ user.username}>Go to unsplash profile</a>
    </div>
  )
}