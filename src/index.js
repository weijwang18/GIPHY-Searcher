import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import GifService from "./gif-service.js";

$(document).ready(function () {
  $("form#gif").submit(function (event) {
    event.preventDefault();
    const userSearch = $("#search").val();
    $("#search").val();

function clearFields(){
  $("#search").val("");
  $("#output-image1").text("");
  $("#output-image2").text("");
  $("#output-image3").text("");
  $(".showErrors").text("");
}
    clearFields();
    let promise = GifService.getKeywords (userSearch);
    promise.then(function(response){
      const body = JSON.parse(response);
      $("#output-image1").html(
        `<img src="${body.data[0].images.original.url}"></img>`
      );
      $("#output-image2").html(
        `<img src="${body.data[1].images.original.url}"></img>`
      );
      $("#output-image3").html(
        `<img src="${body.data[2].images.original.url}"></img>`
      );
    }, function(error){
      $(".showErrors").text( `There was an error processing your request: ${error}`);
    });
  });

  $("button#trending").click(function (event) {
    event.preventDefault();
    clearFields();
    let promise = GifService.getTrending();

    promise.then(function(response){
      const body = JSON.parse(response);
      $("#output-image1").html(
        `<img src="${body.data[0].images.original.url}"></img>`
      );
      $("#output-image2").html(
        `<img src="${body.data[1].images.original.url}"></img>`
      );
      $("#output-image3").html(
        `<img src="${body.data[2].images.original.url}"></img>`
      );
    }, function(error){
      $(".showErrors").text(`There was an error processing your request: ${error}`);
    });
  });
  
  $("button#random").click(function (event) {
    event.preventDefault();
    clearFields();
    let promise = GifService.getRandom();
    promise.then(
      function (response) {
        const body = JSON.parse(response);
        $("#output-image1").html(
          `<img src="${body.data.images.original.url}"></img>`
        );
        $("#output-image2").empty();
        $("#output-image3").empty();
      },
      function (error) {
        $(".showErrors").text(
          `There was an error processing your request: ${error}`
        );
      }
    );
  });
});
