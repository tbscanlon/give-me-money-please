import { Injectable } from "@angular/core";
import { Meta } from "@angular/platform-browser";

@Injectable()
export class MetaService {

  private imageUrl = "https://i.imgur.com/N6DpBqv.png";

  constructor(private meta: Meta) { }

  public getMetaTags(): HTMLMetaElement[] {
    return [
      this.twitterMetaTags,
      ...this.openGraphMetaTags
    ];
  }

  private get openGraphMetaTags(): HTMLMetaElement[] {
    return this.meta.addTags([
      { name: "og:url", content: "https://www.please-give-me.money" },
      { name: "og:title", content: "Give me money please" },
      { name: "og:image", content: this.imageUrl },
      { name: "og:description", content: "I would like some of your money." }
    ]);
  }

  private get twitterMetaTags(): HTMLMetaElement {
    return this.meta.addTag(
      { name: "twitter:card", content: "summary" }
    );
  }

}
