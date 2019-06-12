var form = document.querySelector("form");
var clear = document.getElementById("clear");
var edit = document.getElementById("modalSubmit");
var title = document.querySelector("#user-todo");
var description = document.querySelector("#user-todo-description");
var optradio = document.getElementsByName("optradio");
var myTitle = title.value;
var myDescription = description.value;

form.addEventListener("submit", function(e) {
  e.preventDefault();

  var form = document.querySelector("form");
  var myTitle = document.querySelector("#user-todo").value;
  var myDescription = document.querySelector("#user-todo-description").value;

  $.ajax({
    type: "POST",
    url: `http://localhost:3000/submit/`,
    data: { title: myTitle, description: myDescription },
    dataType: "text",
    success: function(result) {
      todoArray = JSON.parse(result);
      location.reload();
    }
  });

  title.value = description.value = "";
});

clear.addEventListener("click", function(e) {
  e.preventDefault();

  var clear = document.getElementById("clear");

  $.ajax({
    type: "POST",
    url: `http://localhost:3000/clearAll`,
    data: {},
    dataType: "text",
    success: function(result) {
      location.reload();
    }
  });

  title.value = description.value = "";
});

function editMiddle(id) {
  var optradio = document.getElementsByName("optradio" + id);
  var myNewDescription = document.getElementById(`modal-todo-description` + id)
    .value;
  var status = " ";

  for (var i = 0; i < optradio.length; i++) {
    if (optradio[i].checked) {
      status = optradio[i].value;
    }
  }

  $.ajax({
    type: "POST",
    url: `http://localhost:3000/edit`,
    data: { dataID: id, newStatus: status, newDescription: myNewDescription },
    dataType: "text",
    success: function(result) {
      todoArray = JSON.parse(result);
      location.reload();
    }
  });
}

function deleteOne(id) {
  $.ajax({
    type: "GET",
    url: `http://localhost:3000/delete`,
    data: { delID: id },
    dataType: "text",
    success: function(result) {
      todoArray = JSON.parse(result);
      location.reload();
    }
  });
}

modalSubmit.addEventListener("click", function(e) {
  e.preventDefault();
});
