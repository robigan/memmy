/* eslint-disable class-methods-use-this */
import { MediaProvider } from "./MediaProvider"; // Replace "./MediaProvider" with the path to your MediaProvider TypeScript file if it's defined separately.

export class VideoGenericMediaProvider implements MediaProvider {
  private static readonly supportedVideoFormats: string[] = [
    "mp4",
    "webm",
    "mov",
    "ts",
  ];

  private static readonly localIPTest =
    /(^127\.)|(^192\.168\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^::1$)|(^[fF][cCdD])/;

  providesFor(url: string): boolean {
    if (VideoGenericMediaProvider.localIPTest.test(url)) return false;

    const lowercasedUrl = url.toLowerCase();
    return VideoGenericMediaProvider.supportedVideoFormats.some((format) =>
      lowercasedUrl.endsWith(`.${format}`)
    );
  }

  getMediaUrl(url: string): Promise<string> {
    return new Promise((resolve) => {
      resolve(url);
    });
  }
}
