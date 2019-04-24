export class Widget {
  _id: string;
  type: string;
  clubId: string;
  size: number;
  text: string;
  url: string;

  constructor(id: string, type: string, clubId: string, size: number, text: string, url: string) {
    this._id = id;
    this.type = type;
    this.clubId = clubId;
    this.size = size;
    this.text = text;
    this.url = url;
  }
}
