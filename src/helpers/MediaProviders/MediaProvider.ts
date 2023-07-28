import { ImageGenericMediaProvider } from "./ImageGenericMediaProvider";
import { RedgifProvider } from "./RedGifsMediaProvider";
import { VideoGenericMediaProvider } from "./VideoGenericMediaProvider";

export abstract class MediaProvider {
  abstract providesFor(url: string): boolean;
  abstract getMediaUrl(url: string): Promise<string>;
}

export const VideoMediaProviders: MediaProvider[] = [
  new VideoGenericMediaProvider(),
  new RedgifProvider(),
];

export const getVideoMediaProvider = (url: string): MediaProvider | null => {
  for (const provider of VideoMediaProviders) {
    if (provider.providesFor(url)) {
      return provider;
    }
  }

  return null;
};

export const ImageMediaProviders: MediaProvider[] = [
  new ImageGenericMediaProvider(),
];

export const getImageMediaProvider = (url: string): MediaProvider | null => {
  for (const provider of ImageMediaProviders) {
    if (provider.providesFor(url)) {
      return provider;
    }
  }

  return null;
};
