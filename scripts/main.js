$("#decker").decker();

function crossoutList(slide) {
  var item1 = $(slide).find("li:first-child");
  var item2 = $(slide).find("li:nth-child(2)");
  var item3 = $(slide).find("li:nth-child(3)");
  var item4 = $(slide).find("li:nth-child(4)");

  setTimeout(function() { item1.addClass('strike'); }, 1000);
  setTimeout(function() { item1.addClass('hide'); },   1500);

  setTimeout(function() { item2.addClass('show'); },   1500);
  setTimeout(function() { item2.addClass('strike'); }, 2000);
  setTimeout(function() { item2.addClass('hide'); },   2500);

  setTimeout(function() { item3.addClass('show'); },   2500);
  setTimeout(function() { item3.addClass('strike'); }, 3000);
  setTimeout(function() { item3.addClass('hide'); },   3500);

  setTimeout(function() { item4.addClass('show'); },   3500);

}

function colorWave(slide) {
  $('body').addClass('colorWave');
  setTimeout(function() {
    $('body').removeClass('colorWave');
  }, 16000);
}