$(function() {
  console.log("Welcome to Instanews");
  $(function() {
    $("select").selectric({
      maxHeight: 100,
      openOnHover: true
    });
  });

  $("#me-select-menu").on("change", function() {
    const sectionName = $(this).val();

    //clear stories
    $(".ul-info").empty();
    $(".img-header").addClass("after-select");
    //show loader
    $(".image").before(
      "<img class='loading' src='./images/ajax-loader.gif' width='50px' height='50px' />"
    );
    //make our ajax request
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
        const imageOnly = data.results.filter(function(item) {
          console.log(item);
          if (item.multimedia[4] !== undefined) {
            return true;
          } else {
            return false;
          }
        });
        const sliceData = imageOnly.slice(0, 12);
        $.each(sliceData, function(index, value) {
          console.log(value);

          $(".ul-info").append(
            htmlChange(value.url, value.multimedia[4].url, value.abstract)
          );
          console.log(
            htmlChange(value.url, value.multimedia[0].url, value.abstract)
          );

          function htmlChange(url, multimedia, abstract) {
            return (
              "<li class='info-list-item box' style='background-image: url(" +
              multimedia +
              ")'>" +
              "<a class='info-href' target='_blank' href=" +
              url +
              ">" +
              "<p class='info-text'>" +
              abstract +
              "</p>" +
              "</a>" +
              "</li>"
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
