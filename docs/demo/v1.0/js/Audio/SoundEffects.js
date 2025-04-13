class SoundEffects {
    constructor() {
        this.noiseSound = null;
        this.eggSound = null;
        this.isNoiseLoaded = false;
        this.isEggLoaded = false;
        this.isEggPlaying = false;
        this.hornSound = null;
        this.isHornLoaded = false;
    }

    // 预加载音效
    preload() {
        this.noiseSound = loadSound('./MusicPack/SoundEffects/RadioNoise.ogg', () => {
            this.isNoiseLoaded = true;
        });

        this.eggSound = loadSound('./MusicPack/SoundEffects/Egg.ogg', () => {
            this.isEggLoaded = true;
        });

        this.hornSound = loadSound('./MusicPack/SoundEffects/Horn.ogg', () => {
            this.isHornLoaded = true;
        });
    }

    // 播放噪声音效
    playNoise() {
        this.isNoiseLoaded && this.noiseSound;
        this.noiseSound.play();
    }

    // 播放彩蛋音效
    playEgg() {
        this.isEggLoaded && this.eggSound && !this.isEggPlaying;
        this.isEggPlaying = true;
        this.eggSound.play();

        // 重置状态
        this.eggSound.onended(() => {
            this.isEggPlaying = false;
        });


    }

    //播放鸣笛声
    playHorn() {
        if (this.isHornLoaded && this.hornSound) {
            this.hornSound.play();
        } else {
            //console.log("Horn sound not loaded yet");
        }
    }
    // 在这停顿！！
    stopAllSounds() {
        if (this.isNoiseLoaded && this.noiseSound && this.noiseSound.isPlaying()) {
            this.noiseSound.stop();
        }
        if (this.isEggLoaded && this.eggSound && this.eggSound.isPlaying()) {
            this.eggSound.stop();
            this.isEggPlaying = false;
        }
    }

    // 判断彩蛋音效是否正在播放
    isEggSoundPlaying() {
        return this.isEggPlaying;
    }
}