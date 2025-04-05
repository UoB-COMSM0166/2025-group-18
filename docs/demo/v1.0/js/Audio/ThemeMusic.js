class ThemeMusic {
    constructor() {
        this.music = null;   
        this.isLoaded = false; 
        this.isPlaying = false;
    }

    // 预加载
    preload() {
        this.music = loadSound('./MusicPack/InGameMusic/TidesofAshes.ogg', () => {
            this.isLoaded = true;
        });
    }

    // 循环播放主题曲
    playTheme() {
        if (this.isLoaded && this.music && !this.isPlaying) {
            this.music.loop();
            this.isPlaying = true;
        }
    }

    // 停止音乐
    stopTheme() {
        if (this.isLoaded && this.music && this.isPlaying) {
            this.music.stop();
            this.isPlaying = false;
        }
    }
}