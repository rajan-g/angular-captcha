1.You should add angular-captcha.js and css/style.css file in your project
2.You have to place angular directive in your need place 
Example:  <captcha  captchamatcher="macherModel" expected="NAU"></captcha>
                    or
          <div captcha captchamatcher="macherModelObeject" expected="NAU"></div>

properties: 
1.captchamatcher : 
               you can get current captcha value form this object
2.expected  : It is have following values. based on the param you will get captcha
default values are Numbers and Alphabet in lowercase and uppercase
  N: Numbers only
  A: Alphabets only
  NAU : Numbers and Alphabet in uppercase
  NAL : Numbers and Alphabet in lowercase
3.bgclass: you can pply your custom css class,
Ex: bgclass="myClass"
4.bgcolor: you can apply custom bg color
Ex: bgcolor="#FFF",,
5.fontcolor: you can apply custom text color
Ex: fontcolor="#000",
6.fontStyle: you can apply custom css text style
Ex: fontStyle="22px oblique"

Bower install: 
 bower install angular-captcha --save
               
   
