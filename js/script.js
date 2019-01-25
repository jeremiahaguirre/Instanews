$(function() {
  console.log("Welcome to Instanews");

  //Problem: Retrieve content from the NYT Top Stroies API and add it to our site.
  // If we don't get a successful response ,let the user know

  //Approach:
  //1a. Listen for the select menu to change (watching value)
  //1b. If the select value is "" don nothing and return from the function immediately
  //1c. Show a loader img and clear old stories
  //2. Send a request to the NYT API for data based on the value of the select menu
  //3. If successful, parse the data we get back and decide what parts we want to append to our DOM
  //4. Append that stuff to the DOM
  //5. If unsuccessful, show a helpful to the user in the UI
  //6. Hide the loader again

  $("#me-select-menu").on("change", function() {
    const sectionName = $(this).val();

    //if section is empty, return
    //show loader
    $(".image").before(
      "<img class='loading' src='./images/ajax-loader.gif' width='50px' height='50px' />"
    );
    //clear stories

    //make our ajax reques
    $.ajax({
      method: "GET",
      url:
        "https://api.nytimes.com/svc/topstories/v2/" +
        sectionName +
        ".json?api-key=noZerIXUAIZvYVXkARxs4Jc06FKYpAsE",
      dataType: "json"
    }).done(function(data) {
      console.log(data);
      //append all things
      $.each(data.resutls, function(index, value) {
        $(".drop-down").append(value[0]);
        console.log(data);
      })
        .fail(function() {
          // $('.into-section').empty();
          // $(".info-section").append("Couldn' load. Please try again later");
          $(".loading").remove();
        })
        .always(function() {
          $(".loading").remove();
        });
    });
  });
});
