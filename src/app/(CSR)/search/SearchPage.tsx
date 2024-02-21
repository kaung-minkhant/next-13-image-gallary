'use client'

import { UnsplashImage } from "@/models/unsplash-image"
import Image from "next/image"
import { FormEvent, useState } from "react"
import { Alert, Button, Form, Spinner } from "react-bootstrap"
import styles from './SearchPage.module.css'

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<UnsplashImage[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingError, setLoadingError] = useState<boolean>(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement)
    const query = formData.get('query')?.toString().trim();

    if (query) {
      try {
        setSearchResults(null);
        setLoadingError(false);
        setLoading(true);
        const response = await fetch(`/api/search?query=${query}`)
        const images: UnsplashImage[] = await response.json();
        setSearchResults(images)
      } catch (err) {
        console.error(err);
        setLoadingError(true)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div>
      <Alert>
        This page fetches data <strong>client-side</strong>. In order to not leak API credentials, the request is sent to a NextJS <strong>route handler</strong> that runs on the server. This route handler then fetches the data from the Unsplash API and returns it to the client.
      </Alert>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="search-input">
          <Form.Label>Search query</Form.Label>
          <Form.Control name="query" placeholder="E.g Cats, dogs, ..." />
        </Form.Group>
        <Button className="mb-3" type="submit" disabled={loading}>Search</Button>
      </Form>
      <div className="d-flex flex-column align-items-center">
        {
          loading && (<Spinner />)
        }
        {
          loadingError && (
            <p>Something went wrong, please try it again</p>
          )
        }
        {
          searchResults?.length === 0 && (
            <p>Nothing found. Try different query</p>
          )
        }
      </div>
      {
        searchResults && (
          <>
            {
              searchResults.map(searchResult => (
                <Image 
                  src={searchResult.urls.raw} 
                  width={250}
                  height={250}
                  alt={searchResult.description}
                  key={searchResult.urls.raw}
                  className={styles.image}
                />
              ))
            } 
          </>
        )
      }
    </div>
  )
}