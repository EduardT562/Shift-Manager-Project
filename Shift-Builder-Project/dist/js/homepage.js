const greetings = document.querySelector('#greetings');

function glowUsername() {
  setInterval(() => greetings.toggleClass('glow'), 1000);
}

// $(window)
//   .on('load resize ', function () {
//     var scrollWidth =
//       $('.tbl-content').width() - $('.tbl-content table').width();
//     $('.tbl-header').css({ 'padding-right': scrollWidth });
//   })
//   .resize();
