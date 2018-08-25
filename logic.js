require('dotenv').config();

var keys  = require("./keys");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

// var client = new Twitter(keys.twitter);

var selector = process.argv[2];
var operation = process.argv[3];

if (selector === "my-tumblr"){

    var tumblr = require('tumblr');
 
    var oauth = {
        consumer_key: 'z4bRVqRpuXhwTOjatA5mst28u8WJVdzav8tCdOvAaNlLF4Wgby',
        consumer_secret: 'f9b4kcUL8VR9suDyFh1VVYQ4laaqjlGFW7yKd23VTiQbNqoEid',
        token: 'q9hXNtoTsF9RSD6jxfjAHpvo1tjnFYG2r3wvJU23A5amDSETAM',
        token_secret: 'SWTNFdFRoKMM42xIU7UUiB5SEGlngsOcTyj48DIwKWwwqkba3q'
    };
     
    var blog = new tumblr.Blog('omg-autorestoration', oauth);
  
    blog.text({limit: 20}, function(error, response) {
      if (error) {
        return console.log('Error occurred: ' + error);
        throw new Error(error);
      }
      var postsNum = response.posts;

     for (var i = 0; i< postsNum.length; i++){
         var post = response.posts[i].slug
         var num = i+1;
        console.log(" --------------------------------------------------------------------- ");
        console.log("Post " + num + ": " + post);
        console.log(" --------------------------------------------------------------------- ");
     }
      
    });

}else if (selector === "spotify-this-song"){

    // var Spotify = require('node-spotify-api');
     
    spotify.search({ type: 'track', query: operation, limit: 1 }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
    
      var artists = data.tracks.items[0].album.artists[0].name;
      var song = data.tracks.items[0].name;
      var album = data.tracks.items[0].album.name;
      var link = data.tracks.items[0].preview_url;
    
    // console.log(data.tracks.items[0]); 
    console.log(" --------------------------------------------------------------------- ");
    console.log("Spotify Information: ")
    console.log("Song: " + song);
    console.log("Artist: " + artists);
    console.log("Album: " + album);
    console.log("Link: " + link);
    console.log(" --------------------------------------------------------------------- ");
    });

}else if (selector === "movie-this"){

var movieName = operation;

    if (movieName == null){
        movieName = "Mr. Nobody";
    }

    var request = require("request");

    // Then run a request to the OMDB API with the movie specified
    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
        var data = JSON.parse(body);
    // console.log(data); 
      // If the request is successful (i.e. if the response status code is 200)
      if (!error && response.statusCode === 200) {
    
        var title = data.Title;
        var year = data.Released;
        var IMDB = data.imdbRating;
        var Rotten = data.Ratings[1].Value;
        var country = data.Country;
        var language = data.Language;
        var plot = data.Plot;
        var actors = data.Actors;

        console.log(" --------------------------------------------------------------------- ");
        console.log("Title: " + title);
        console.log("Released in: " + year);
        console.log("IMBD Rating: " + IMDB);
        console.log("Rotten Tomato Rating: " + Rotten);
        console.log("Country: " + country);
        console.log("Language: " + language);
        console.log("Plot: " + plot);
        console.log("Actors: " + actors);
        console.log(" --------------------------------------------------------------------- ");

        // console.log(operation + " was released on: " + JSON.parse(body).Released);
      }
    });

}else if (selector === "do-what-it-says"){

    var fs = require("fs");

    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
        return console.log(err);
        }

        // Break down all the numbers inside
        data = data.split(",");
        var song = data[1];

        // var Spotify = require('node-spotify-api');
     
        spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          }
        
          var artists = data.tracks.items[0].album.artists[0].name;
          var song = data.tracks.items[0].name;
          var album = data.tracks.items[0].album.name;
          var link = data.tracks.items[0].preview_url;
        
        // console.log(data.tracks.items[0]); 
        console.log(" --------------------------------------------------------------------- ");
        console.log("Spotify Information: ")
        console.log("Song: " + song);
        console.log("Artist: " + artists);
        console.log("Album: " + album);
        console.log("Link: " + link);
        console.log(" --------------------------------------------------------------------- ");
        });
    
    });


}
