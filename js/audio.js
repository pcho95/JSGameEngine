//audio.js
//library of audio functions

mapAudio = new Map();

//Sound Object
function Sound(src) {
    this.sound = new Audio("audio/" + src + ".ogg");
    this.sound.volume = 1.0;
    //this.sound.setAttribute("preload", "true");
    //this.sound.setAttribute("controls", "none");
    //this.sound.style.display = "none";
} 

Sound.prototype.play = function(){
        this.sound.play();
    }

Sound.prototype.pause = function(){
    this.sound.pause();
}

Sound.prototype.stop = function(){
    this.sound.pause();
    delete this;
}

Sound.prototype.loop = function(val){
    this.sound.loop = val;
}

Sound.prototype.volume = function(val){
    this.sound.volume = val;
}


//Sound Functions
function audio_play( src, volume, loop ) {
    var _s = new Sound(src);
    _s.loop( loop );
    _s.volume( volume )
}

//Sound Loading (To prevent duplicates in memory)
function loadSound( name ) {
    var _s;
    if (mapAudio.get(name) === undefined) {
        _s = new sound(name);
        mapAudio.set(name,_s);
    } else {
        _s = mapAudio.get(name);
    }
    return _s;
}