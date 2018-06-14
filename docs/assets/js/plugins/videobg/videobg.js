$(document).ready(function() {
    
    "use strict";
    
    
    //Video Background
    $("#top").vide("assets/images/video/ocean", {
		posterType: "jpg"
	});


    //Youtube Background Video
    $(function(){
      $(".player").mb_YTPlayer();
    });


});
