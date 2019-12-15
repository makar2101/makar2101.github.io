$(document).ready(function(){
	// плавное перемещение страницы к нужному блоку
	$("ul li a, a").click(function () {
		elementClick = $(this).attr("href");
		destination = $(elementClick).offset().top;
		$("body,html").animate({scrollTop: destination }, 1400);
	});

    // $(window).scroll(function() {
    // 	$('.animated').each(function(){
    //     	var imagePos = $(this).offset().top;
 
    //     	var topOfWindow = $(window).scrollTop();
    //     	if (imagePos < topOfWindow+650) {
    //         	$(this).addClass("fadeInDown");
    //    	 }
    // 	});
    // });
    
    $(window).scroll(function() {
    	$('.macro_text').each(function(){
        	var imagePos = $(this).offset().top;
 
        	var topOfWindow = $(window).scrollTop();
        	if (imagePos < topOfWindow+650) {
            	$(this).addClass("fadeInDown");
       	 }
    	});
    });

   	$('.sl').slick({
   		dots: true,
   		 //arrows: false
   	});

});

