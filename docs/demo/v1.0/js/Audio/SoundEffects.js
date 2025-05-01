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

    // Preload sound effects
    preload() {
        this.noiseSound = loadSound('./MusicPack/SoundEffects/RadioNoise.ogg', () => {
            this.isNoiseLoaded = true;
        });

        this.eggSound = loadSound('./MusicPack/SoundEffects/egg.ogg', () => {
            this.isEggLoaded = true;
        });

        this.hornSound = loadSound('./MusicPack/SoundEffects/Horn.ogg', () => {
            this.isHornLoaded = true;
        });
    }

    // Play noise sound effect
    playNoise() {
        this.isNoiseLoaded && this.noiseSound;
        this.noiseSound.play();
    }

    // Play Easter egg sound effects
    playEgg() {
        this.isEggLoaded && this.eggSound && !this.isEggPlaying;
        this.isEggPlaying = true;
        this.eggSound.play();

        // Reset state
        this.eggSound.onended(() => {
            this.isEggPlaying = false;
        });


    }

    //Play whistle
    playHorn() {
        if (this.isHornLoaded && this.hornSound) {
            this.hornSound.play();
        } else {
            //console.log("Horn sound not loaded yet");
        }
    }
    // Pause here!!
    stopAllSounds() {
        if (this.isNoiseLoaded && this.noiseSound && this.noiseSound.isPlaying()) {
            this.noiseSound.stop();
        }
        if (this.isEggLoaded && this.eggSound && this.eggSound.isPlaying()) {
            this.eggSound.stop();
            this.isEggPlaying = false;
        }
    }

    // Determine whether the Easter egg sound effect is playing
    isEggSoundPlaying() {
        return this.isEggPlaying;
    }
}