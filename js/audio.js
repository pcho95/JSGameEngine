//audio.js
//library of audio functions

mapAudio = new Map();

//Sound Object
function sound(src) {
    this.sound = new Audio("audio/" + src + ".ogg");
    this.sound.volume = 1.0;
    //this.sound.setAttribute("preload", "true");
    //this.sound.setAttribute("controls", "none");
    //this.sound.style.display = "none";
} 

sound.prototype.play = function(){
        this.sound.play();
    }

sound.prototype.pause = function(){
    this.sound.pause();
}

sound.prototype.stop = function(){
    this.sound.pause();
    delete this;
}

sound.prototype.loop = function(val){
    this.sound.loop = val;
}

sound.prototype.volume = function(val){
    this.sound.volume = val;
}


//Sound Functions
function audio_play( src, volume, loop ) {
    var _s = new sound(src);
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