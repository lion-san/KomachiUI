$(window).load(function(){

  var days = new Array("日","月","火","水","木","金","土");

  var date = new Date();
  var now;

  var yyyy = date.getFullYear();
  var mm = date.getMonth()+1;
  var dd = date.getDate();
  $("#today").html( mm + "/" + dd + "(" + days[date.getDay()] + ")");
  if(mm < 10){
    mm = "0" + mm;
  }
  if(dd < 10){
    dd = "0" + dd;
  }
  var today = yyyy + "" + mm + "" + dd;

  try{
    var h = date.getHours();
    var m = date.getMinutes();
    if( m < 10)
      m = "0" + m;

    now = Number(h.toString() + m.toString());
  }
  catch(e){
    alert("Nuber error:now");
  }

  //Send JSON
  $.ajax({
    type : 'get',
    url : "https://peaceful-tundra-2847.herokuapp.com/channels/"+ today +".json",
    dataType : 'JSON',
    scriptCharset: 'utf-8',
    success : function(data) {


      var i;
      for(i = 0; i < data.iepgs.length; i++){
        try{
          var channel = data.iepgs[i];
          var start = Number(channel.start_time.replace(":", ""));
          var end = Number(channel.end_time.replace(":", ""));

          //日跨ぎ対応
          if(start > end){
            end = end + 2400;
          }

          //Now On Air Channels
          if((start < now) && (now < end)){

            var station;
            switch(channel.station){
              case "DFS00400":
                station = 1;
                break;

              case "DFS00408":
                station = 2;
                break;

              case "DFS00410":
                station = 4;
                break;

              case "DFS00428":
                station = 5;
                break;

              case "DFS00418":
                station = 6;
                break;

              case "DFS00430":
                station = 7;
                break;

              case "DFS00420":
                station = 8;
                break;

              case "DFS05C38":
                station = 9;
                break;

              case "DFS00440":
                station = 12;
                break;

              default:
                station = -1;
            }

            var c = "<button value="+ station +" class=\"col-xs-6 col-sm-4 btn btn-primary btn-lg mybutton\" onClick=\"channelClicked(value)\">" +
              "【"+　convertGenre(channel.genre) + "】<br>" +
              channel.title + 
              "<div id=\"ticker" + station +"\" class=\"detail\">" + tickerText(channel.detail, 13) + "</div>" +
              "</button><br>";

            $("#nowOnAir").append(c);
            $("#ticker" + station).vTicker({
              speed: 1000,
              pause: 1000
            });

            //alert(channel.title);
          }
        }
        catch(e){
          alert("Nuber error:channel");
        }
      }
    },
    error : function(data) {
      alert("error:" + data);
    }
  });

});

/**
 * Android Interface
 */
var channelClicked = function(val){

	Android.pushButton(val);
}

/**
 * genre変換
 */
var convertGenre = function(code, subcode){

  var output = "";

  switch(code){

    case "0":
      output = "ニュース／報道";
      break;

    case "1":
      output = "スポーツ";
      break;

    case "2":
      output = "情報／ワイドショー";
      break;

    case "3":
      output = "ドラマ";
      break;

    case "4":
      output = "音楽";
      break;

    case "5":
      output = "バラエティ";
      break;

    case "6":
      output = "映画";
      break;

    case "7":
      output = "アニメ／特撮";
      break;

    case "8":
      output = "ドキュメンタリー／教養";
      break;

    case "9":
      output = "劇場／公演";
      break;

    case "10":
      output = "趣味／教育";
      break;

    case "B":
      output = "福祉";
      break;

    case "F":
      output = "その他";
      break;

    default:
      output = "不明";
      break;
  }

  return output;
}


/**
 * tickerText  縦スクロール用フォーマット変換
 */
var tickerText = function(text, wordNum){

  var output = "<ul>";

  var i = 0;
  var count = 0;

  for(i = 0; i < text.length; i++){

    if(count == 0){
      output += "<li>";
    }

    output += text[i];
    count += 1;
    
    if((count > wordNum) && (i < text.length -1)){
      output += "</li>";
      count = 0;
    }

  }

  output += "</ul>";

  return output;

}
