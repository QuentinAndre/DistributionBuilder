var sectionHeight = function() {
  var total    = $j(window).height(),
      $jsection = $j('section').css('height','auto');

  if ($jsection.outerHeight(true) < total) {
    var margin = $jsection.outerHeight(true) - $jsection.height();
    $jsection.height(total - margin - 20);
  } else {
    $jsection.css('height','auto');
  }
};

$j(window).resize(sectionHeight);

$j(document).ready(function(){
  $j("section h1, section h2").each(function(){
    $j("nav ul").append("<li class='tag-" + this.nodeName.toLowerCase() + "'><a href='#" + $j(this).text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,'') + "'>" + $j(this).text() + "</a></li>");
    $j(this).attr("id",$j(this).text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,''));
    $j("nav ul li:first-child a").parent().addClass("active");
  });

  $j("nav ul li").on("click", "a", function(event) {
    var position = $j($j(this).attr("href")).offset().top - 190;
    $j("html, body").animate({scrollTop: position}, 400);
    $j("nav ul li a").parent().removeClass("active");
    $j(this).parent().addClass("active");
    event.preventDefault();
  });

  sectionHeight();

  $j('img').on('load', sectionHeight);
});

fixScale = function(doc) {

  var addEvent = 'addEventListener',
      type = 'gesturestart',
      qsa = 'querySelectorAll',
      scales = [1, 1],
      meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

  function fix() {
    meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
    doc.removeEventListener(type, fix, true);
  }

  if ((meta = meta[meta.length - 1]) && addEvent in doc) {
    fix();
    scales = [.25, 1.6];
    doc[addEvent](type, fix, true);
  }
};