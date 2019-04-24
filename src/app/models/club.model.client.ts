export class Club {
  _id: String;
  name: String;
  description: String;
  title: String;
  rating: Number;
  sumRating: Number;
  numRating: Number;


  constructor(id: String, name: String, description: String, title: String, rating: Number, sumRating: Number, numRating: Number) {
    this._id = id;
    this.name = name;
    this.description = description;
    this.title = title;
    this.rating = rating;
    this.sumRating = sumRating;
    this.numRating = numRating;
  }
}
