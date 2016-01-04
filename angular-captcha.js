/**
 * Created by RAJAN GUNASEKARAN on 1/2/2016.
 */
(function () {
  return angular.module('captcha', [])
          .directive('captcha', function () {
            return{
              'restrict': 'AE',
              'template': '<div class="captcha-container"><img /></div><div class="captcha-until-wrap"><div class="speakar" ng-click="speech()"></div><div class="refresh" ng-click="change()"></div></div>',
              scope: {
                captcha: '=',
                captchamatcher: '=',
                captcha3d: '=',
                expected: '='
              },
              link: function (scope, element, attrs, ctrls) {
                var captchaTextProvider = function (condition) {
                  var text = "";
                  var possible = "";
                  switch (condition) {
                    case 'N':
                      possible = "0123456789";
                      break;
                    case 'A':
                      possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                      break;
                    case 'NAU':
                      possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                      break;
                    case 'NAL':
                      possible = "abcdefghijklmnopqrstuvwxyz0123456789";
                      break;
                    default:
                      possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                      break;
                  }

                  for (var i = 0; i < 5; i++)
                    text += possible.charAt(Math.floor(Math.random() * possible.length));

                  return text;
                };

                var textToImg = function (text) {
                  var formatedText = "";
                  for (var i = 0; i < text.length; i++) {
                    formatedText += text[i];
                    var randomSpace = Math.floor(Math.random() * text.length / 2);
                    for (var j = 0; j < randomSpace; j++) {
                      formatedText += ' ';
                    }
                  }
                  var canvas = document.createElement('canvas');
                  canvas.height = "40";
                  canvas.width = "130";
                  var ctx = canvas.getContext("2d");
                  ctx.font = "20px Comic Sans MS";
                  ctx.fillStyle = "#FFF";
                  if (attrs['captcha3d']) {
                    //drawTextIn3D(ctx, formatedText,canvas.width/2, canvas.height/2,4);
                    ctx.fillText(formatedText, 0, 25);
                  } else {
                    ctx.fillText(formatedText, 0, 25);
                  }

                  ctx.font = "30px Verdana";
                  var image = new Image();
                  return canvas.toDataURL("image/png");
                };

                var speechText = function (text) {
                  if ("speechSynthesis" in window) {
                    console.log("browser supports speech synthesis.");
                  } else {
                    console.log("browser does NOT support speech sythesis")
                    return;
                  }

                  var fallbackSpeechSynthesis = window.speechSynthesis || window.speechSynthesisPolyfill;
                  var fallbackSpeechSynthesisUtterance = window.SpeechSynthesisUtterance || window.SpeechSynthesisUtterancePolyfill;
                  //var u1 = new SpeechSynthesisUtterance(text);
                  var u1 = new fallbackSpeechSynthesisUtterance(text);
                  u1.lang = 'en-US';
                  u1.pitch = 1;
//                  u1.rate = 1;
                  u1.rate = 0.5;
                  //u1.voice = voices[10];
                  u1.voiceURI = 'native';
                  u1.volume = 3;
                  //speechSynthesis.speak(u1);
                  fallbackSpeechSynthesis.speak(u1);
                };
				
				var speech = function(src) {
					var index = 1;
					var audio = new Audio(src[0]);
					audio.play();
					audio.onended = function() {
						if(index <src.length) {
							audio.src = src[index];
							audio.play();
							index++
							}
					}
				}
                scope.speech = function () {
				  var srcArray = [];
                  for (var i = 0; i < scope.captchaText.length; i++) {
					  srcArray.push('sound/en-us/'+scope.captchaText[i].toLowerCase()+'.mp3');                    				
                  }
				  speech(srcArray);
                };

                scope.change = function () {
                  initCaptcha();
                };

                var initCaptcha = function () {
                  var expected = attrs['expected'];
                  var captchaText = captchaTextProvider(expected);
                  element[0].childNodes[0].childNodes[0].src = textToImg(captchaText);
                  element[0].childNodes[0].className  = 'captcha-container bg'+Math.floor(Math.random()*9);
                  var matcher = attrs['captchamatcher'];
                  scope.$parent[matcher] = captchaText;
                  scope.captchaText = captchaText;
                };
                initCaptcha();



              }

            };

          });

}());

//http://lea.verou.me/css3patterns/