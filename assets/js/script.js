// ======================================================Algorithm===============================================================================//
// 1) The main objective of this assignment is to create, a web application where the user, can type something to generate a compilation of GIFS pertaining to the topic the user submitted.
// 2) The Web application will contact the GIPHY API library to pull the request GIFS and lay them out onto the web page.
// 3) The user has the ability to click on a selected GIF and upon the on-click function, the GIF can animate upon the click and stop if the user clicks again.
// 4) How will this work?
  // a) First the user must create an array that can contain example topics the user can use to generate ideas of what particular GIF they want to inquire.
  // b) After making the array, the user will create a function that will contain the logic to call upon the selected API database and to return back the elements (Which in this case are selected GIFs) to be rendered onto the web page.


// ====================================================== Program ===============================================================================//
$(document).ready(function() {

    var meme = [
      "kermit", "harambe", "filthyfrank", "minecraft", "grumpycat", "rick roll",
      "pikachu", "area 51", "comrade elmo", "keanu reeves", "thomas the tank engine", "cory in the house", "the bee movie", "vsauce", "nyan cat", "pewdiepie", "spongebob", "patrick", "snoopdog", "shrek", "bongo cat",
    ];

    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
      $(areaToAddTo).empty();

      for (var i = 0; i < arrayToUse.length; i++) {
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type", arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);
      }

    }

    $(document).on("click", ".meme-button", function() {
      $("#meme").empty();
      $(".meme-button").removeClass("active");
      $(this).addClass("active");

      var type = $(this).attr("data-type");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var memeDiv = $("<div class=\"meme-item\">");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;

            var memeImage = $("<img>");
            memeImage.attr("src", still);
            memeImage.attr("data-still", still);
            memeImage.attr("data-animate", animated);
            memeImage.attr("data-state", "still");
            memeImage.addClass("meme-image");

            memeDiv.append(p);
            memeDiv.append(memeImage);

            $("#meme").append(memeDiv);
          }
        });
    });

    $(document).on("click", ".meme-image", function() {

      var state = $(this).attr("data-state");

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

    $("#add-meme").on("click", function(event) {
      event.preventDefault();
      var newMeme = $("input").eq(0).val();

      if (newMeme.length > 2) {
        meme.push(newMeme);
      }

      populateButtons(meme, "meme-button", "#meme-buttons");

    });

    populateButtons(meme, "meme-button", "#meme-buttons");
  });
