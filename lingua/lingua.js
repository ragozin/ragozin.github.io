/*jshint globals: true, plusplus: false, strict: true, browser: true*/
// langua.js
// Vyacheslav Ragozin, (c) 2017
// https://www.facebook.com/vyacheslav.ragozin.3

/*var img1 = new Image();
var img2 = new Image();
var img3 = new Image();*/
//var snd1 = new Sound();
var txt = "no description";
var audio = new Audio('audio/eye.mp3');
var audioRepeat = false;
var audioDelay = 200; // ms
var autoplay = false;
var autorepeat = false;
var delay = 2000; // 4 sec.
var timer; // = setTimeout(next, delay);

var slides = ["start"];//[];

var index = 0;///getCookie("index") || 0;
var slide = document.getElementById("slide");
var image = document.getElementById("image");
var prev = document.getElementById("prev");
var play = document.getElementById("play");

function init() {
    //TODO: get index from cookie
    slides = ["start", "eye", "sea"];
    /*var fs = require("fs");
    var list = fs.readFileSync("list.txt", "utf-8"); // or fs.readFileSync("list.txt").toString('utf-8');
    slides = list.split("\n");
    console.log(slides);*/
    slides = readTextFile("list.txt");
    
    // TODO: autorepeat
    if (autorepeat) {
        audio.loop = true;
    }
    play.src = autoplay ? "images/pause.png" : "images/play.png";
    //play.src = "images/play.png";
    image.src = slides[0]; //"images/start.png";// load(0);
}

function next(e) {
    e.preventDefault();
    /*img1 = img2;
    img2 = img3;
    load(++index);*/
    if (++index > slides.length) index = slides.length;
    show(index);

}

function previous(e) {
    e.preventDefault();
    if (--index < 0) index = 0;
    show(index);
}

function load(index) {
    //img3.src = "images/" + slides[index] + ".png";
    
    try {
        image.src = "images/" + slides[index] + ".png";
    } catch (e) {
        //Catch Statement
        try {
            image.src = "images/" + slides[index] + ".jpg";
        } catch (e) {
            //Catch Statement
            image.src = "images/" + slides[index] + ".gif";
        } finally {
            image.src = "images/undefined.jpg";
        }
    }
}

function show(n) {
    //image.src = "images/undefined.png";
    /*img3.onload = {
        image.src = slides[index];
    }*/
    image.src = "images/" + slides[n] + ".jpg";
    //image.src = "images/1.png";
    audio.src = "audio/" + slides[n] + ".mp3";
    audio.play();
    setCookie ("index", n);
}

function toggleAutoplay() {
    autoplay = !autoplay;
    if (autoplay) {
        play.src = "images/pause.png";
        //timer = setInterval(function() {next(e);}, delay);
        timer = setInterval(function() {if (++index > slides.length) index = slides.length;show(index);}, delay);
    } else {
        play.src = "images/play.png";
        clearInterval(timer);
    }
    
                           
    //image.src = "images/undefined.png";
    /*img3.onload = {
        image.src = slides[index];
    }*/
    /*image.src = "images/" + slides[n] + ".jpg";
    //image.src = "images/1.png";
    audio.src = "audio/" + slides[n] + ".mp3";
    audio.play();
    setCookie ("index", n);*/
}

function setIndex(n) {
    index = n;
}

function getIndex() {
    return index;
}

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    var result = [];
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                //alert(allText);
                result = allText.split("\r\n");
                console.log(result);
            }
        }
    }
    rawFile.send(null);
    return result;
}

function setCookie (name, value, expires, path, domain, secure) {
    document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}

function getCookie(name) {
    var cookie = "" + document.cookie;
    var search = "" + name + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;
    if (cookie.length > 0) {
        offset = cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = cookie.indexOf(";", offset)
            if (end == -1) {
                end = cookie.length;
            }
            setStr = unescape(cookie.substring(offset, end));
        }
    }
    return(setStr);
}

prev.addEventListener("touchstart", previous);
prev.addEventListener("click", previous);
slide.addEventListener("touchstart", next);
slide.addEventListener("mousedown", next);
play.addEventListener("touchstart", toggleAutoplay);
play.addEventListener("mousedown", toggleAutoplay);
//window.addEventListener("mouseup", prev);

init();
