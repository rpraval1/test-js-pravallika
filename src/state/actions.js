import moment from 'moment'
import movies from './movies'


export function getPopularMovies () {
  //
  // movies contains the results of two API requests
  //

  //
  // 1. combine the results of these requests
  // 2. sort the results FIRST by year THEN by title
  // 3. each movie object in the results needs a releaseYear attribute added
  //    this is used in src/components/movies-list.js line 25
  //

  /***
   * Combine two array into one using concat function
   */
  var combinedResults = movies[0].concat(movies[1])

  /***
   * Sort first by year and then by title
   */
  combinedResults.sort(function(a, b) {

    var compareDate = 0
    var compareTitle = 0
    if((a.releaseDate > b.releaseDate) )
      compareDate = -1
    else {
      if((a.releaseDate < b.releaseDate))
        compareDate = 1
    }

    if((a.title < b.title) )
      compareTitle = -1
    else {
      if((a.title > b.title))
        compareTitle = 1
    }
    return compareDate || compareTitle
  });


  /***
   * Creating resultant array with expected fields and format
   * releaseYear can be extracted from releaseDate using format() method from moment library
   */
  var resultsArray = []
  for(let movie of combinedResults){
    var movieObj = {}
    movieObj["image"] = movie.image
    movieObj["releaseYear"] = moment(movie.releaseDate).format('YYYY')
    movieObj["title"] = movie.title
    movieObj["price"] = movie.price
    resultsArray.push(movieObj)
  }

  //console.log(resultsArray)

  return {
    type: 'GET_MOVIES_SUCCESS',
    movies: resultsArray
  }
}
