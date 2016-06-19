$('document').ready(function(){ 


  $(".dropdown-button").dropdown({
      belowOrigin: true // Displays dropdown below the button
    });

  $('.slider').slider({
    full_width: true,
    height:400,
  });  

  $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 240
      edge: 'right', // Choose the horizontal origin
    });

  $('.carousel-position-left').on('click',function(){    
      $('.slider').slider('next');             
  });

  $('.carousel-position-right').on('click',function(){
      $('.slider').slider('prev');
  }); 
  

  $(function() {
    $('.slider').swipe( {
    //Generic swipe handler for all directions
      swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        if(direction=='left')
          $('.slider').slider('next'); 
        else if(direction=='right')
          $('.slider').slider('prev'); 
      },
    //Default is 75px, set to 0 for demo so any distance triggers swipe
     threshold:0
    });
  });
});  

function estado(){
  var href = window.location.href;
  return href.substr(href.lastIndexOf('/') + 1);
}

function screen(size){
    if(size<1000){  
      return 'col s12';    
      }
      else{
        return 'col s8 offset-s2';
      }
  } 

  $(window).resize(function() {
      var size=screen($(window).width());
      $('#screenf').removeAttr('class').attr('class',size);
  });

// Show sideNav
  
