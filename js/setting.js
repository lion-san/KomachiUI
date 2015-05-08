//設定モード(1)、テストモード(2)
var Mode = "";


$(window).load(function(){
  //起動時に、リモコンのセッティング有無を確認する
  //リモコンの設定を今するかどうか、レコメンド
  

  //”リモコンを設定します”
  Android.settingStart();

});

/**
 * リモコン設定モード 
 */
var setting = function(){

  //Modeの変更
  Mode = 1;

  //ボタンの状態変更
  $("#setting").html("設定完了");
  $("#setting").attr("onClick", "confirm()");
  $("#test").attr("disabled","disabled");
  setButtons(true);


  //リモコンの、XXボタンを押してください
  settingBtn();

  //以下、繰り返し
  

  //これにて、リモコンの設定を終了します
}


//ボタンが押されたか、音声アナウンス
var settingBtn = function(){
  //XXボタンを押してください
  //赤外線受光待
  //OK
  //タイムアウト

}

/**
 * リモコン設定完了
 */
var confirm = function(){

  //ボタンの状態変更
  $("#setting").html("設定");
  $("#setting").attr("onClick", "setting()");
  $("#test").removeAttr("disabled");
  setButtons(false);

  //赤外線コードを保存
  Android.settingSave();
}

/**
 * リモコン設定
 */
var buttonClicked = function(val){

  switch(Mode){

    case 1:
      Android.pushButtonInSettingMode(val);
      break;

    case 2:
      Android.pushButtonInTestMode(val);
      break;

    default:
      alert("Error occured!");
      break;
  }

}

/**
 * リモコンテスト
 */
var test = function(){

  //Modeの変更
  Mode = 2;

  //ボタンの状態変更
  $("#test").attr("onClick", "testEnd()");
  $("#test").html("テスト終了");
  $("#setting").attr("disabled", "disabled");
  setButtons(true);
}
var testEnd = function(){
  
  //ボタンの状態変更
  $("#test").attr("onClick", "test()");
  $("#test").html("ボタンテスト");
  $("#setting").removeAttr("disabled");
  setButtons(false);
}

/**
 * ボタンの状態変更（Enable)
 */
var setButtons = function(flg){

  if(flg){

    $("#btnVU").removeAttr("disabled");
    $("#btnVD").removeAttr("disabled");
    $("#btnPW").removeAttr("disabled");
    $("#btn1").removeAttr("disabled");
    $("#btn2").removeAttr("disabled");
    $("#btn3").removeAttr("disabled");
    $("#btn4").removeAttr("disabled");
    $("#btn5").removeAttr("disabled");
    $("#btn6").removeAttr("disabled");
    $("#btn7").removeAttr("disabled");
    $("#btn8").removeAttr("disabled");
    $("#btn9").removeAttr("disabled");
    $("#btn10").removeAttr("disabled");
    $("#btn11").removeAttr("disabled");
    $("#btn12").removeAttr("disabled");
    //=========
    $("#btnLight").removeAttr("disabled");
    $("#btnAir").removeAttr("disabled");
    $("#btnAirMode").removeAttr("disabled");
    $("#btnAirUp").removeAttr("disabled");
    $("#btnAirDw").removeAttr("disabled");
  }
  else{
    $("#btnVU").attr("disabled", "disabled");
    $("#btnVD").attr("disabled","disabled");
    $("#btnPW").attr("disabled","disabled");
    $("#btn1").attr("disabled","disabled");
    $("#btn2").attr("disabled","disabled");
    $("#btn3").attr("disabled","disabled");
    $("#btn4").attr("disabled","disabled");
    $("#btn5").attr("disabled","disabled");
    $("#btn6").attr("disabled","disabled");
    $("#btn7").attr("disabled","disabled");
    $("#btn8").attr("disabled","disabled");
    $("#btn9").attr("disabled","disabled");
    $("#btn10").attr("disabled","disabled");
    $("#btn11").attr("disabled","disabled");
    $("#btn12").attr("disabled","disabled");
    //=========
    $("#btnLight").attr("disabled", "disabled");
    $("#btnAir").attr("disabled", "disabled");
    $("#btnAirMode").attr("disabled", "disabled");
    $("#btnAirUp").attr("disabled", "disabled");
    $("#btnAirDw").attr("disabled", "disabled");
  }
 
}
