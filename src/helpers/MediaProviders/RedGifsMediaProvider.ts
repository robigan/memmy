/* eslint-disable class-methods-use-this */
import { MediaProvider } from "./MediaProvider";

export class RedgifProvider implements MediaProvider {
  private static authToken: string | null = null;

  private static urlExpression: RegExp = /(www\.)?redgifs\.com/;

  private async getRedgifUrl(
    url: string,
    allowRetries: boolean = false
  ): Promise<string> {
    const token = await this.getAuthToken();
    const id = this.getBaseName(url);

    const headers: { [key: string]: string } = {
      Authorization: `Bearer ${token}`,
      "User-Agent": "Memmy/1.0",
    };

    const requestUrl = `https://api.redgifs.com/v2/gifs/${id}`;

    const response = await fetch(requestUrl, { headers });
    const statusCode = response.status;

    if (statusCode === 200) {
      const json = await response.json();
      return json.gif.urls.hd;
    } else if (allowRetries && (statusCode === 401 || statusCode === 403)) {
      RedgifProvider.authToken = null;
      return this.getRedgifUrl(url, false);
    }
    throw new Error("Unable to query redgifs for url");
  }

  private getBaseName(url: string): string {
    const segments = url.split("/");
    return segments[segments.length - 1];
  }

  public async getMediaUrl(url: string): Promise<string> {
    return this.getRedgifUrl(url);
  }

  public providesFor(url: string): boolean {
    return RedgifProvider.urlExpression.test(url);
  }

  private async getAuthToken(): Promise<string> {
    if (RedgifProvider.authToken !== null) {
      return RedgifProvider.authToken;
    }

    const response = await fetch("https://api.redgifs.com/v2/auth/temporary");
    if (response.status === 200) {
      const json = await response.json();
      const { token } = json;
      RedgifProvider.authToken = token;
      return token;
    }
    throw new Error("Unable to request a redgif token");
  }
}
