/**
 * wrapText  テキストをはみ出しを検知し、自動改行
 */
var wrapText = function(text, wordNum){

  var output = "";
  var i = 0;
  var count = 0;
  for(i = 0; i < text.length; i++){

    output += text[i];

    if((count > wordNum) && (i < text.length -1)){
      output += "<br>";
      count = 0;
    }
    count += 1;

  }

  //return output;
  return text;

}
