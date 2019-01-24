$(function() {
  console.log("Welcome to Instanews");
});

let sectionName = request(".selection".val());

$("select").on("click", function() {
  $(".info-section").before(".loading");
  $.ajax({
    method: "GET",
    url:
      "https://api.nytimes.com/svc/topstories/v2/" +
      sectionName +
      ".json?api-key=noZerIXUAIZvYVXkARxs4Jc06FKYpAsE"
  })
    .done(function(data) {
      console.log(data);
      $.each(data, function(key, value) {
        $(".drop-down").append(value.results);
        console.log(value);
        /* Append your list items here */
      });
    })
    .fail(function() {
      $(".first-select").append("Couldn't load");
    })
    .always(function() {
      $(".loading").remove();
    });
});
