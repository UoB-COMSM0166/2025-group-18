class ThemeMusic {
    constructor() {
        this.music = null;   
        this.isLoaded = false; 
        this.isPlaying = false;
    }

    // Preloading
    preload() {
        this.music = loadSound('./MusicPack/InGameMusic/TidesofAshes.ogg', () => {
            this.isLoaded = true;
        });
    }

    // Play theme song on loop
    playTheme() {
        if (this.isLoaded && this.music && !this.isPlaying) {
            this.music.loop();
            this.isPlaying = true;
        }
    }

    // Stop the music
    stopTheme() {
        if (this.isLoaded && this.music && this.isPlaying) {
            this.music.stop();
            this.isPlaying = false;
        }
    }
}