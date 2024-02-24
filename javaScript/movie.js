$(function () {
  GetResult("popular");

  $(".tablinks").on("click", function () {
    let result = $(this).val();
    //console.log(result);
    GetResult(result);
  });
  $("#btnpopular").click(function () {
    $("#button-click").text("Popular");
  });

  $("#btnnowplaying").click(function () {
    $("#button-click").text("Now Playing");
  });

  $("#btnupcoming").click(function () {
    $("#button-click").text("Upcomming");
  });
  $("#btntoprated").click(function () {
    $("#button-click").text("Top Rated");
  });
});

function GetResult(type) {
  $.ajax({
    url: `https://api.themoviedb.org/3/movie/${type}?api_key=36f3b916d08a432fe8cca855703b78da`,
    type: "GET",

    success: function (response) {
      var movieArray = response.results;

      var html = "";

      $.each(movieArray, function (index, item) {
        var votpercentage = (item.vote_average / 10.0) * 100;
        var summary = item.overview.substr(0, 50) + "...";

        let movieItemHtml = `<a href="about.html?id=${
          item.id
        }"> <div class="movieItem">
                                                        <div class="image" >
                                                        
                                                          <img src="https://image.tmdb.org/t/p/w500${
                                                            item.poster_path
                                                          }">
                                                              <div class="txt">
                                                                ${votpercentage.toFixed(
                                                                  0
                                                                )}
                                                                <span>%<span>
                                                              </div>
                                                          </div>
                                                        ${item.original_title}
                                                        <p>${
                                                          item.release_date
                                                        }</p>
                                                        
          
                                            </div></a>`;

        html += movieItemHtml;
      });

      $(".movie-wrapper").html(html);
    },
    error: function (jqXHR, txtStatus, error) {
      console.log(error);
    },
  });
}
