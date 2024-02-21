import { Metadata } from "next";
import SearchPage from "./SearchPage";

export const metadata:Metadata = {
  title: 'Search - NextJS 13 Image Gallary'
}
export default function Page() {
  return (
    <SearchPage />
  )
}