import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

$(document).ready(function () {
  $("form#gif").submit(function (event) {
    event.preventDefault();
    const userSearch = $("#search").val();
    $("#search").val();

    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${userSearch}&limit=3&offset=0&rating=g&lang=en`;

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $("#output-image1").html(
        `<img src="${response.data[0].images.original.url}"></img>`
      );
      $("#output-image2").html(
        `<img src="${response.data[1].images.original.url}"></img>`
      );
      $("#output-image3").html(
        `<img src="${response.data[2].images.original.url}"></img>`
      );
    }
  });

  $("button#trending").click(function (event) {
    event.preventDefault();

    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=3&rating=g`;

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        outputTrending(response);
      }
    };
    request.open("GET", url, true);
    request.send();

    function outputTrending(response) {
      $("#output-image1").html(
        `<img src="${response.data[0].images.original.url}"></img>`
      );
      $("#output-image2").html(
        `<img src="${response.data[1].images.original.url}"></img>`
      );
      $("#output-image3").html(
        `<img src="${response.data[2].images.original.url}"></img>`
      );
    }
  });
  $("button#random").click(function (event) {
    event.preventDefault();

    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=&rating=g`;

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        console.log(response);
        outputRandom(response);
      }
    };
    request.open("GET", url, true);
    request.send();

    function outputRandom(response) {
      $("#output-image1").html(
        `<img src="${response.data.images.original.url}"></img>`);
      $("#output-image2").empty();
      $("#output-image3").empty();
    }
  });
});
