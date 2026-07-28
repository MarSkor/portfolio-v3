import {createImageUrlBuilder, ImageUrlBuilder } from '@sanity/image-url'
import { client } from "./client";
import {SanityImage} from "../types";

const builder = createImageUrlBuilder(client);

export const urlFor = (
  source: SanityImage | Record<string, unknown> | undefined | null,
): ImageUrlBuilder => {
  return builder.image(source as any);
};