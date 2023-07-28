/* eslint-disable class-methods-use-this */
import { MediaProvider } from "./MediaProvider"; // Replace "./MediaProvider" with the path to your MediaProvider TypeScript file if it's defined separately.

export class ImageGenericMediaProvider implements MediaProvider {
  private static readonly supportedImageFormats: string[] = [
    "webp",
    "png",
    "avif",
    "heic",
    "jpeg",
    "jpg",
    "gif",
    "svg",
    "ico",
    "icns",
    "gifv",
  ];

  private static readonly localIPTest =
    /(^127\.)|(^192\.168\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^::1$)|(^[fF][cCdD])/;

  providesFor(url: string): boolean {
    if (ImageGenericMediaProvider.localIPTest.test(url)) return false;

    const lowercasedUrl = url.toLowerCase();
    return ImageGenericMediaProvider.supportedImageFormats.some((format) =>
      lowercasedUrl.endsWith(`.${format}`)
    );
  }

  getMediaUrl(url: string): Promise<string> {
    return new Promise((resolve) => {
      resolve(url);
    });
  }
}
