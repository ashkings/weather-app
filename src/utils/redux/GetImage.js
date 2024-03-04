import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UNPLASH_API_BASE_URL, UNPLASH_KEY } from "../constants";

// Define a service using a base URL and expected endpoints
export const imageInfo = createApi({
  reducerPath: "imageInfo",
  baseQuery: fetchBaseQuery({ baseUrl: UNPLASH_API_BASE_URL }),
  endpoints: (builder) => ({
    getPhotos: builder.query({
      query: (request) =>
        `page=1&per_page=1&query=${request.search}&client_id=${UNPLASH_KEY}`,
    }),
  }),
});

export const { useGetPhotosQuery } = imageInfo;
