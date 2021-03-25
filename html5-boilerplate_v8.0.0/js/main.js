
//************SLIDESHOWS**************//

var slideIndex = [1,1,1,1,1];
var slideId = ["slide", "slideb", "slidec", "slided", "slidef"]
showSlides(1, 0);
showSlides(1, 1);
showSlides(1,2);
showSlides(1, 3);
showSlides(1,4);

// Next/previous controls
function plusSlides(n, no) {
  showSlides(slideIndex[no] += n, no);
}

function showSlides(n, no) {
  var i;
  var x = document.getElementsByClassName(slideId[no]);
  if (n > x.length) {slideIndex[no] = 1}
  if (n < 1) {slideIndex[no] = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex[no]-1].style.display = "block";
}

//**********contact form***************//
var frmvalidator  = new Validator("contactform");
frmvalidator.addValidation("name","req","Please provide your name");
frmvalidator.addValidation("email","req","Please provide your email");
frmvalidator.addValidation("email","email", "Please enter a valid email address");
