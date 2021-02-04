$(document).ready(function(){ //ready like DidMount in REACT

getAllItem()

  $("AddTaskBtn").on("click", function(e) {

  })

$("#AddTask , #AddTaskBtn").on("keypress click",function(e){
if(((e.type=="keypress" && e.keyCode == "13") || ($(this).attr("id")=="AddTaskBtn" && e.type=="click")) && $("#AddTask").val().length > 0)
        {
          addItemToDB($("#AddTask").val())
        }
});
});

function addItemToDB(txt) {
    let pars = {}

    pars= {
      "TEXT": txt,
      "IsArchived": 'false'
    }

    axios.post("http://localhost:4000/toDoItem", pars)
    .then((res) => {
      console.log(res);
      addItemDiv(txt, res.data._id, res.data.isArchived) // txt or res.data.text
      items.map(item => AddItemDiv(item.text))
    })
    .catch((err) => {
      console.log(err);
    })
}

function getAllItem() {
  let items = []
  axios.get("http://localhost:4000/toDoItem")
  .then((res) => {
    items = res.data
    items.map(item => addItemDiv(item.text, item._id,item.isArchived))
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })
}

function addItemDiv(txt, id, isArchived) {
  let div = $("<div class='d-flex bg-dark text-light p-3 rounded m-2 ToDoItem'></div>");
  let textSpan = $("<span class='w-100'></span>");
  let iconDelete = $("<i class='material-icons'>delete</i>");
  let iconDone = $("<i class='material-icons IconDone'>done</i>");


  iconDelete.click(function(){

    axios.delete('http://localhost:4000/toDoItem/'+id)
    .then((res) => {
      $(this).parent().fadeOut(function(){
          $(this).remove();
      });
    })
    .catch((err) => {
      console.log(err);
    })
  });


  iconDone.click(function(){

    pars ={}
    pars = {
      "TEXT": txt,
      IsArchived: 'true'
    }

    axios.put('http://localhost:4000/toDoItem/'+ id,pars)
    .then((res) => {
        console.log(res);
            $(this).parent().fadeOut(function(){
                $(this).find(".IconDone").remove();
                $("#CompletedDiv").append($(this));
              });
    })
    .catch((err) => {
      console.log(err);
    })
  });

  textSpan.text(txt);
  $("#AddTask").val("");

  div.append(textSpan);
  div.append(iconDone);
  div.append(iconDelete);

if(isArchived) {
  div.find(".IconDone").remove();
  $("#CompletedDiv").append(div);
}
else {
  $("#ToDoDiv").append(div);

  }
}
