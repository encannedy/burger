//client side
$(document).ready(function() {

    $.ajax("/burgers", {
      type: "GET"
    }).then(function(data) {
       
      var burgers = data.burgers;
      var len = burgers.length;
  
      for (var i = 0; i < len; i++) {
        
      var text = "Devour"
      var elem = $("#not_devoured");
      var button = "btn-primary devour"

      if (burgers[i].devoured) {
        text = "Delete";
        elem = $("#devoured");
        button = "btn-danger delete-burger"
      }

      var new_elem = 
      "<div class='row burger-row'><div class='col-md-9 text-center'>" +
        burgers[i].id + 
        ". " + burgers[i].burger_name + 
        "</div><div class='col-md-3 text-center'><button type='button' class='btn " +
        button + 
        "' data-id='" + 
        burgers[i].id + 
        "'>" + text + "</button></div></div>"

      elem.append(new_elem)

    }
  })
  
   //DEVOUR
  $(document).on("click", ".devour", function (event) {
    event.preventDefault();
    var id = $(this).data("id");

    var newBurgerState = {
      devoured: 1
    };
  
      // Send the PUT request.
      $.ajax("/burgers/" + id, {
        type: "PUT",
        data: JSON.stringify(newBurgerState),
        dataType:'json',
        contentType: 'application/json'
      }).then(function() {
        console.log("changed sleep to", newBurger);
        // Reload the page to get the updated list
        location.reload();
      });
    });
  
    //submit
    $(".add-burger").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  

    var newBurger = {
      burger_name: $(".add-burger [name=burger_name]")
        .val()
        .trim()
    };
  
      // Send the POST request.
      $.ajax("/burgers", {
        type: "POST",
        data: JSON.stringify(newBurger),
        dataType:'json',
        contentType: 'application/json'
      }).then(function() {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      });
    });

    //delete
  
    $(document).on("click", ".delete-burger", function(event) {
      var id = $(this).data("id");
  
      // Send the DELETE request.
      $.ajax("/burgers/" + id, {
        type: "DELETE"
      }).then(function() {
        console.log("deleted burger", id);
        // Reload the page to get the updated list
        location.reload();
    });
    });
    });

