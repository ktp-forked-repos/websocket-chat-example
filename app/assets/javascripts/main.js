$( document ).ready(function() {
  var scheme   = "ws://";
  var uri      = scheme + window.document.location.host + "/";
  var ws       = new WebSocket(uri);
  console.log(ws);
  ws.onmessage = function(message) {
    console.log("on message");
    var data = JSON.parse(message.data);
    $("#chat-text").append("<div class='panel panel-default'><div class='panel-heading'>" + data.handle + "</div><div class='panel-body'>" + data.text + "</div></div>");
    $("#chat-text").stop().animate({
      scrollTop: $('#chat-text')[0].scrollHeight
    }, 800);
  };

  $("#input-form").on("submit", function(event) {
    event.preventDefault();
    var handle = $("#input-handle")[0].value;
    var text   = $("#input-text")[0].value;
    ws.send(JSON.stringify({ handle: handle, text: text }));
    console.log(text);
    $("#input-text")[0].value = "";
  });
});
