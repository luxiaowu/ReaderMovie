var util = require('../../../../utils/util.js');
class Movie {
  constructor(url) {
    this.url = url;
  }

  getData(callback) {
    this.callback = callback;
    util.http(this.url, this.processData.bind(this));
  }

  processData(data) {
    var detail = {
      title: data.title,
      image: data.images.large,
      country: data.countries.join('、'),
      year: data.year,
      collect_count: data.collect_count,
      reviews_count: data.reviews_count,
      original_title: data.original_title,
      stars: util.convertNumberToArray(data.rating.stars),
      average: data.rating.average,
      directors: util.findName(data.directors).join(' / '),
      casts: util.findName(data.casts).join(' / '),
      genres: data.genres.join('、'),
      summary: data.summary,
      casts_avatars: util.findAvatar(data.casts)
    }
    this.callback(detail);
  }
}

export { Movie };