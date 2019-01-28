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
  $(function() {
    $("select").selectric({
      maxHeight: 100,
      openOnHover: true,
      
    });
  });

  $("#me-select-menu").on("change", function() {
    const sectionName = $(this).val();
    $(".ul-info").empty();
    //make function for loader before appending img empty ul then append img
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
    })
      .done(function(data) {
        console.log(data);
        const sliceData = data.results.slice(0, 12);
        //append all things
        //1. Creath a .each to run a function for eah article in response.results
        //2. Check the article has and image
        //3. for each article - Create constants for the image URL, title, and link
        //4. Make an HTLM string for the article, using the constants we just created
        //5. Append string to story section

        $.each(sliceData, function(index, value) {
          console.log(value);

          if (value.multimedia[4] !== undefined) {
            $(".ul-info").append(
              htmlChange(value.url, value.multimedia[4].url, value.abstract)
            );
            console.log(
              htmlChange(value.url, value.multimedia[0].url, value.abstract)
            );
          }

          function htmlChange(url, multimedia, abstract) {
            return (
              /*"<li class='info-list-item'>" +
              "<a class='info-href' target='_blank' href=" +
              url +
              ">" +*/
              "<img class='info-img' src=" +
              multimedia +
              ">" /*+
              "<p class='info-text'>" +
              abstract +
              "</p>" +
              "</a>" +
              "</li>"*/
            );
          }
        });
      })
      .fail(function() {
        $(".info-section").empty();
        $(".info-section").append("Couldn't load. Please try again later");
      })
      .always(function() {
        $(".loading").remove();
      });
  });
});
