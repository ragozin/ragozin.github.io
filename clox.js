// clox.js
// Vyacheslav Ragozin, (c) 2015
// https://www.facebook.com/vyacheslav.ragozin.3
window.onload = function() {
  document.documentElement.style.overflow = 'hidden'; //'hidden'|'auto';  // firefox, chrome
  document.body.scroll = 'no'; // 'yes'|'no'; // ie only
  var canvasBuffer = document.createElement('canvas');
  var ctxBuffer = canvasBuffer.getContext('2d');
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');

  var w = window.innerWidth;
  var h = window.innerHeight;
  var xc = (w / 2) | 0;
  var yc = (h / 2) | 0;
  canvas.width = w;
  canvas.height = h;
  canvasBuffer.width = w;
  canvasBuffer.height = h;
  document.body.appendChild(canvas);

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  var PI = Math.PI;
  var radius = Math.min(xc, yc) * 0.8;
  var secondsRadius = radius * 0.8;
  var minutesRadius = radius * 0.7;
  var hoursRadius = radius * 0.6;
  var startDate = new Date();
  var active = true;
  var style = 'dig12';
  var color0 = 'black'; //'#99cc00'; // back
  var color1 = 'white'; // digits
  var color2 = '#FFFFFF'; // hours, minutes
  var color3 = '#F00'; // seconds

  var requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
      window.setTimeout(callback, 1000);
    };
  })();

  window.onresize = function() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    //ctx = canvas.getContext('2d');
    canvasBuffer.width = w;
    canvasBuffer.height = h;
    //ctxBuffer = canvasBuffer.getContext('2d');
    face();
  };

  window.addEventListener("mousedown", function(e) {
    //document.getElementById('settings').focus();
    document.getElementById('info').style.display = "none";
    document.getElementById('settings').style.display = "block";

  });
  window.addEventListener('touchstart', function(e) {
    document.getElementById('info').style.display = "none";
    document.getElementById('settings').style.display = "block";
  });
  /*window.addEventListener("mousemove", function(e) {
    // to correct mouse position
    game.mouseX = (e.pageX - canvas.offsetLeft) * game.scaleX; // - root.scrollTop;/// - game.rect.left;
    game.mouseY = (e.pageY - canvas.offsetLeft) * game.scaleY; // - root.scrollLeft;/// - game.rect.top;
    
  });*/
  document.getElementById('color0').addEventListener('change', function() {
    color0 = this.value;
    face();
  });

document.getElementById('color1').addEventListener('change', function() {
    color1 = this.value;
    face();
  });
  /*document.getElementById('color2').addEventListener('change', function() {
    color2 = this.value;
    face();
  });*/
  //document.getElementsByName('digits').addEventListener('change',set);

  // get list of radio buttons with name 'digits'
  var sz = document.forms.settings.elements.digits;

  // make click handler function for correct events handlers behavior
  function makeClickHandler(i) {
    "use strict";
    return function () {
        //this.innerHTML = i;
      style = this.value;
      face();
    };
}

  // loop through list
  for (var i = 0; i < sz.length; i++) {
    sz[i].addEventListener("click", makeClickHandler(i));
}
  
 /* 
  for (var i = 0; i < sz.length; i++) {
    sz[i].onclick = function() { // assign onclick handler function to each
      
    };
  } //*/

  document.getElementById('button').addEventListener('click', function() {
    
    face();
  });
  
  function close() {
    document.getElementById('settings').style.display = "none";
  }

  function set() {
    //style = "dig0";
    face();
  }

  function main() {
    ctx.drawImage(canvasBuffer, 0, 0);
    var currentDate = new Date();

    if (currentDate < startDate) {
      currentDate = startDate;
    }

    var seconds = currentDate.getSeconds(); // + currentDate.getMilliseconds() / 1000.0;
    var minutes = currentDate.getMinutes() + seconds / 60.0;
    var hours = currentDate.getHours() + minutes / 60.0;
    var secondsAngle = PI * 3 / 2 + 2 * PI * seconds / 60.0;
    var minutesAngle = PI * 3 / 2 + 2 * PI * minutes / 60.0;
    var hoursAngle = PI * 3 / 2 + 2 * PI * hours / 12.0;

    // ctx.moveTo(point.x, point.y);
    // MoveTo(ctx, addPoints(center, point_a, point_b));
    // ctx.moveTo(point.x, point.y);
    //ctx.fillStyle = 'rgba(240, 40, 40, 0.5)';
    ctx.beginPath();
    ctx.moveTo(xc, yc);
    ctx.strokeStyle = color3;
    ctx.lineWidth = 2;
    ctx.lineTo(xc + Math.cos(secondsAngle) * secondsRadius,
      yc + Math.sin(secondsAngle) * secondsRadius);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xc, yc);
    ctx.strokeStyle = color2;
    ctx.lineWidth = 1;
    ctx.lineTo(xc + Math.cos(minutesAngle) * minutesRadius,
      yc + Math.sin(minutesAngle) * minutesRadius);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xc, yc);
    ctx.strokeStyle = color2;
    ctx.lineWidth = 3;
    ctx.lineTo(xc + Math.cos(hoursAngle) * hoursRadius,
      yc + Math.sin(hoursAngle) * hoursRadius);
    ctx.stroke();
    requestAnimFrame(main);
  }

  function face() {
    //ctx.fillStyle = 'rgba(128, 128, 128, 0.8)';
    ctxBuffer.fillStyle = color0;
    ctxBuffer.fillRect(0, 0, w, h);

    ctxBuffer.fillStyle = color1;
    ctxBuffer.strokeStyle = color1;
    for (var i = 1; i <= 60; i++) {
      ctxBuffer.beginPath();
      if (i % 5 === 0) {
        ctxBuffer.lineWidth = 4;
      } else {
        ctxBuffer.lineWidth = 2;
      }
      ctxBuffer.moveTo(xc + Math.cos(PI * i / 30) * (radius - 3), yc + Math.sin(PI * i / 30) * (radius - 3));
      ctxBuffer.lineTo(xc + Math.cos(PI * i / 30) * radius, yc + Math.sin(PI * i / 30) * radius);
      ctxBuffer.stroke();
    }
    ctxBuffer.fillStyle = color1;
    ctxBuffer.textAlign = 'center';
    ctxBuffer.textBaseline = 'middle';
    //style = 'dig12'; /// TODO: remove
    switch (style) {
      //case 0:
      //    style = 0;
      //break;
      case 'dig4':
        ctxBuffer.font = '3em sans-serif';
        for (i = 1; i <= 4; i++) {
          ctxBuffer.fillText(i * 3, xc + Math.cos((i - 1) * PI / 2) * (radius - 30), yc + Math.sin((i - 1) * PI / 2) * (radius - 30));
        }
        break;
      case 'dig12':
        ctxBuffer.font = '2em sans-serif';
        for (i = 1; i <= 12; i++) {
          ctxBuffer.fillText(i, xc + Math.cos((i - 3) * PI / 6) * (radius - 30),
            yc + Math.sin((i - 3) * PI / 6) * (radius - 30));
        }
        break;
      default:
    }
  } // face()

  face();
  main(); // ПУСК
  //setInterval(main, 1000);
};