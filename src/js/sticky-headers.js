//stick header fun

var stickyHeaders = (function() {

    var $window = $(window),
        $stickies;
  
    var load = function(stickies) {
      console.log("BOOM!");
      if (typeof stickies === "object" && stickies instanceof jQuery && stickies.length > 0) {
  
        $stickies = stickies.each(function() {
  
          var $thisSticky = $(this).wrap('<h1 class="sticky-wrap" />');
          
    
          $thisSticky
              .data('originalPosition', $thisSticky.offset().top)
              .data('originalHeight', $thisSticky.outerHeight())
                .parent()
                .height($thisSticky.outerHeight()); 			  
        });
  
        $window.off("scroll.stickies").on("scroll.stickies", function() {
            _whenScrolling();		
        });
      }
    };
  
    var _whenScrolling = function() {      
      $stickies.each(function(i) {			
        
        var $thisSticky = $(this),
            $stickyPosition = $thisSticky.data('originalPosition');
  
        if ($stickyPosition <= $window.scrollTop()) {        
          
          var $nextSticky = $stickies.eq(i + 1),
              $nextStickyPosition = $nextSticky.data('originalPosition') - $thisSticky.data('originalHeight');
  
          $thisSticky.addClass("fixed");
  
          if ($nextSticky.length > 0 && $thisSticky.offset().top >= $nextStickyPosition) {
  
            $thisSticky.addClass("absolute").css("top", $nextStickyPosition);
          }
  
        } else {
          
          var $prevSticky = $stickies.eq(i - 1);
  
          $thisSticky.removeClass("fixed");
  
          if ($prevSticky.length > 0 && $window.scrollTop() <= $thisSticky.data('originalPosition') - $thisSticky.data('originalHeight')) {
  
            $prevSticky.removeClass("absolute").removeAttr("style");
          }
        }
      });
    };
  
    return {
      load: load
    };
  })();
  
  $(function() {
    stickyHeaders.load($(".sticky-title"));
  });