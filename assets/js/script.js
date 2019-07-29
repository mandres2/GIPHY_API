// ===================================================== Algorithm ==============================================================================//
// 1) The main goal of this assignment is to create a web application where the user, can type something to generate a compilation of GIFS pertaining to the topic the user submitted.
// 2) The Web application will contact the GIPHY API library to pull the request GIFS and lay them out onto the web page.
// 3) The user has the ability to click on a selected GIF and upon the on-click function, the GIF can animate upon the click and stop if the user clicks again.
// 4) How will this work?
  // a) First the user must create an array that can contain example topics the user can use to generate ideas of what particular GIF they want to inquire.
  // b) After making the array, the user will create a function that will contain the logic to call upon the selected API database and to return back the elements (Which in this case are selected GIFs) to be rendered onto the web page.


// ====================================================== Program ===============================================================================//

// Whenever one uses jQuery to manipulate a web page, they must wait until the document ready event has fired. The document ready event signals that the Date Object Model, (DOM), of the page is now ready, so that the user can manipulate it without worrying that parts of the DOM has not yet been created. The document ready event fires before all images etc. are loaded, but after the whole DOM itself is ready.
$(document).ready(function() {

    // A variable called meme is set to contain an array of elements, where the user has the option to choose from, and when clicking these elements, it will load a GIF upon user-click request.
    var meme = [
      "kermit", "harambe", "filthyfrank", "minecraft", "grumpycat", "rick roll",
      "pikachu", "area 51", "comrade elmo", "keanu reeves", "thomas the tank engine", "cory in the house", "the bee movie", "vsauce", "nyan cat", "pewdiepie", "spongebob", "patrick", "snoopdog", "shrek", "bongo cat",
    ];
    //Closing bracket for the array that links to variable: meme.

    // This function is called: populateButtons, where it will contain these elements - arrayToUse, classToAdd, and areaToAddTo to be used in the following for-loop.
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
      // areaToAddTo will go under a method called: .empty(). According to the jQuery documentation, .empty() Removes child nodes and descendants from any elements in matched set. (This method does not accept any arguments) This method removes not only child (and other descendant) elements, but also any text within the set of matched elements. This is because, according to the DOM specification, any string of text within an element is considered a child node of that element.
      $(areaToAddTo).empty();

      // This for-loop will assign the array, (arrayToUse) with the following properties, and will add a button to the areaToAddTo whenever the user types in topic and submits it.
      for (var i = 0; i < arrayToUse.length; i++) {
        // In jQuery syntax, var a is assigned to be a button element. (When using <> you are creating an HTML element). It's important to note that this method does not replace a class. It simply adds the class, appending it to any which may already be assigned to the elements.
        var a = $("<button>");
        // .addClass() is a jQuery method that adds the specified class(es) to each element in the set of matched elements.
        a.addClass(classToAdd);
        // The .attr() method gets the attribute value for only the first element in the matched set, which in this particular case, var a = $("<button>") is getting the attribute value (data-type) from the index of arrayToUse.
        a.attr("data-type", arrayToUse[i]);
        // variable a is using the .text() method to set text contents of the selected elements in which this line of code is using the index of arrayToUse.
        a.text(arrayToUse[i]);
        // areaToAddTo is using the .append() method to attach the stated variables from variable a and it's properties to itself.
        $(areaToAddTo).append(a);
      //This curly-bracket closes out the for-loop function (var i = 0; i < arrayToUse.length)
      }

    }
    //This curly-bracket closes out the function populateButtons(arrayToUse, classToAdd, areaToAddTo)

    // This binds a click event to the document and all child elements within it. This method is referred to as delegated event handling. On line 46, $(document).on is creating an "on-click" function for the button which is declared to (class): (.)meme-button
    $(document).on("click", ".meme-button", function() {
      // The .empty() method on line 48 basically empties the div class -> meme allowing the new elements from line 52 to be loaded if the user clicks a different meme button. So for example, if the user clicks kermit first upon opening the web application, and then proceeds to click Harambe. All the GIFs of kermit that was loaded first will be "emptied" and the GIFS of Harambe will be loaded since it is the currently activated meme button.
      $("#meme").empty();
      // The class meme-button is using a jQuery method called: .removeClass() which basically removes a single class, multiple classes, or all classes from each element in the set of matched elements. Line 49 basically is telling the class to meme-button to remove what is "active" to create room for the new class to be added and set when the user clicks the meme button.
      $(".meme-button").removeClass("active");
      //After the .removeClass() process. Using the concept of this and chaining it together with the .addClass() method will basically create a new class to the active object. Note: the keyword: this, is commonly used inside functions and objects. Where the function is declared alters what this means. It always refers to one object, and usually the object in which the function operates.
      $(this).addClass("active");

      // On line 55, a variable called: type is declared. Using jQuery syntax, "this" has an attribute method() chained to the element called data-type. Remember, the attribute method [.attr()], attributes value for only the first element in the matched set, which in this particular case, variable type is getting the attribute value (data-type).
      var type = $(this).attr("data-type");
      // A variable called: queryURL is declared where it links the API library, which GIPHY was used and using the API syntax, first the link is introduced with and opening and closing quotation mark, followed by a plus (+) sign then using the word: type followed by another (+) sign then the API key that the user has obtained access to with opening and closing quotations. This is a vital portion to the entire application because it is linking the web application to the API Database.
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

      //This is introducing to the AJAX method utilizing jQuery Syntax.
      $.ajax({
        // url is a pre-built parameter, and it passes queryURL to the url parameter.
        url: queryURL,
        // One needs to REQUEST/call AJAX what type of method to hit the targeted API.
        method: "GET"
        // This method, will return a 'promise' using .then() function

      //Closing curly-bracket + parentheses for the jQuery AJAX method
      })
        // Once the method, "GET" is established, the .then() method is set. The .then() is our promise to execute the call-back function once the API call is complete. A call-back function is a function that is nested inside another function it is executed via the successful completion of the parent function (which in this case is: $.ajax())
        .then(function(response) {
          // A variable results is set to equal the function element (response), and is chained with "data" using a period(.) due to using an AJAX methodology.
          var results = response.data;

          // Another for-loop iteration is introduced to create an area where the GIFs requested from the API library is brought in and rendered to the web application.
          for (var i = 0; i < results.length; i++) {
            // this for-loop function will iterate through the GIPHY API library .results **

            // A variable called memeDiv is declared and a div class element named: meme-item is created via jQuery syntax.
            var memeDiv = $("<div class=\"meme-item\">");
            // a variable called rating is declared and it is set to equal to the result indices that is chained to rating via the period using the AJAX methodology. This will pull up the results from the GIPHY API library and give it a rating (i.e. g, pg-13 etc.) by the rendered GIF.
            var rating = results[i].rating;
            // A new variable called: p is declared and using jQuery Syntax, a general paragraph element is formed that contains the following the text -> "Rating" and it is linked to the actual result rating using the + sign and inserting the variable: rating.
            var p = $("<p>").text("Rating: " + rating);

            // These lines of code declare two variables. One is animated, and one is still. it will be linked to the search result indices with a fixed height due to the properties: .fixed_height.url
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
            // a variable called -> memeImage is set to equal to an established image div using jQuery syntax. Whenever a <> is within the jQuery syntax, an HTML element is formed.
            var memeImage = $("<img>");
            // the variable memeImage, has an attribute image to src, and it is related to the variable still. So when the user types in their meme/topic the image of the GIF will appear still frame.
            memeImage.attr("src", still);
            // the variable memeImage, has an attribute image to data-still, and it is related to the variable still. So when the user types in their meme/topic the image of the GIF will appear still frame.
            memeImage.attr("data-still", still);
            // memeImage has an attribute method designated to the variable animated, thus allowing the GIF to become animated.. (The data-* global attributes form a class of attributes called custom data attributes, that allow proprietary information to be exchanged between the HTML and its DOM representation by scripts).
            memeImage.attr("data-animate", animated);
            // For this line of code memeImage is using the same exact method from the previous line but instead it will be applied to the variable still, and the data-type is data-state so that the moving GIF that was clicked once, will remain still if the user clicks it again.
            memeImage.attr("data-state", "still");
            // The variable memeImage is using an .addClass() method so that the element, meme-image will exhibit the still and animate properties upon user-on-click functions for .meme-image
            memeImage.addClass("meme-image");
            // memeDiv which is an HTML element, will be obtain the rating of each GIF via the .append() method.
            memeDiv.append(p);
            // Using the same .append() method, memeDiv will receive the properties of memeImage. This is container that will hold all of the motion properties of the GIF.
            memeDiv.append(memeImage);
            // Lastly, the HTML id = meme will be the place where memeDiv and it's containing properties be rendered to.
            $("#meme").append(memeDiv);
          }
          // This is the closing curly-bracket for the for-loop GIF results
        });
        // This curly-bracket + parentheses and semi-colon closes out the call-back function.
    });
    // This curly-bracket + parentheses and semi-colon closes out the $(document).on("click", ".meme-button", function()

    // This is document.on function will focus on the class .meme-image where it will give the boolean values that allow the GIF itself to animate or to remain still upon user click.
    $(document).on("click", ".meme-image", function() {
      // The variable state will be given a this attribute to "data-state." Note that the syntax is in jQuery format.
      var state = $(this).attr("data-state");
      // An if statement is introduced and stating that: if the variable state is equal to still...
      if (state === "still") {
        // gives the src the data-animate attribute.
        $(this).attr("src", $(this).attr("data-animate"));
        // ... then allow 'this' current data-state to be animated upon click.
        $(this).attr("data-state", "animate");
      }
      //bracket that closes if statement

      //opening of the else statement:
      else {
        // attribute this src to the data-type: still
        $(this).attr("src", $(this).attr("data-still"));
        // upon clicking the animated GIF, 'this' data-state will go to still.
        $(this).attr("data-state", "still");
      }
      // closing of the else bracket.
    });
    // closing of the $(document).on("click", ".meme-image", function().

    
    $("#add-meme").on("click", function(event) {
      // event.preventDefault() can be used to prevent an event's default behavior.
      // Here, it prevents the submit button from trying to submit a form when clicked
      event.preventDefault();
      var newMeme = $("input").eq(0).val();

      if (newMeme.length > 2) {
        meme.push(newMeme);
      }

      populateButtons(meme, "meme-button", "#meme-buttons");

    });

    populateButtons(meme, "meme-button", "#meme-buttons");
  });
