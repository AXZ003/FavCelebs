

$(document).ready(function(){

    var topics = ["G-Eazy", "Post Malone","Jennifer Lawrence","Emma Stone","Lin-Manuel Miranda","Beyoncé","Benedict Cumberbatch","Eddie Redmayne", "Jimmy Fallon","James Corden","Harry Styles","Chadwick Boseman"]



      renderButtons ();


        function renderButtons() {

            $('#celebrity-view').empty();

    
            for (i = 0; i < topics.length; i++) { 
               
                var gifButtons = $('<button>').text(topics[i]);
                    
              gifButtons.addClass("gif-btn");
              
                var makeString = JSON.stringify(topics[i]);
                var replacement = makeString.replace(/\"/g, "");


                gifButtons.attr("celeb-data", replacement);


                $("#celebrity-view").append(gifButtons);
                

            }

        }
  

    
        $("#addGif").on("click", function(event) {
               
            // Preventing the buttons default behavior when clicked (which is submitting a form)
           event.preventDefault();
           // This line grabs the input from the textbox
           var celebName = $("#gif-input").val().trim();

           topics.push(celebName);

           gifButtons = $("<button>").text(celebName);

           var makeString= JSON.stringify(celebName);
           gifButtons.attr("celeb-data", makeString);

           $("#celebrity-view").append(gifButtons);

           renderButtons(celebName);

        })

      

    $(document).on("click", '.gif-btn', function() { 
        // clear();

        var celeb = $(this).attr("celeb-data"); // need to create an attribute for the button. 
        
       

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + celeb + "&api_key=FCMyJzE9U2uIWIPLmspHmczH9llNPbCl&limit=10";
        
        
        $.ajax({
          url: queryURL,
          method: "GET"

        }).then(function(response) { // runs this callback when response is complete with response payload
          renderButtons();
                var results = response.data;
      
                for (var i = 0; i < results.length; i++) { // iterates over results 
                 
                    // Creating and storing a div tag
                  var gifDiv = $("<div class='chosenGif'>");

                  var rating = results[i].rating;
                  
                  // Creating a paragraph tag with the result item's rating
                  var p = $("<p>").text("Rating: " + results[i].rating);

                  // Creating and storing an image tag 
                  var gifs = $("<img>");
                  gifs.addClass('gif');
                  // add the attributes from activity 14 aka data-still, data-state or pausing won't work!!

                  gifs.attr({"src": results[i].images.fixed_height_still.url, "data-still": results[i].images.fixed_height_still.url, "data-animate": results[i].images.fixed_height.url,
                  "data-state": "still"});
      


                  // append so they appear. Not prepend because they're not supposed to go to the top. 
                  gifDiv.append(p);
                  gifDiv.append(gifs);

                  $("#celebrity-view").append(gifDiv);
                }

              })  
              
          })

        

          $(document).on('click','.gif', function() {
          
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            console.log(this);
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }

          });


          function clear() {
            $("#celebrity-view").empty();
          }

























})
