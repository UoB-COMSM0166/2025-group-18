// 全局音频管理器
class AudioManager {
    constructor() {
        if (AudioManager._instance) {
            return AudioManager._instance;
        }
        AudioManager._instance = this;
        
        this.soundEffects = new SoundEffects();
        this.soundEffects.preload();
        
        this.isEnabled = true;
    }
    
    static getInstance() {
        if (!AudioManager._instance) {
            new AudioManager();
        }
        return AudioManager._instance;
    }
    
    // 播放悬停音效
    playHover() {
        if (this.isEnabled) {
            this.soundEffects.playHover();
        }
    }
    
    // 播放点击音效
    playClick() {
        if (this.isEnabled) {
            this.soundEffects.playClick();
        }
    }

    playEgg() {
        if (this.isEnabled) {
            this.soundEffects.playEgg();
        }
    }
    
    playHorn() {
        if (this.isEnabled) {
            this.soundEffects.playHorn();
        }
    }
    
    playNoise() {
        if (this.isEnabled) {
            this.soundEffects.playNoise();
        }
    }
    
    stopAllSounds() {
        this.soundEffects.stopAllSounds();
    }
    
    isEggSoundPlaying() {
        return this.soundEffects.isEggSoundPlaying();
    }
    
    enableSound() {
        this.isEnabled = true;
    }
    
    disableSound() {
        this.isEnabled = false;
    }
    
    toggleSound() {
        this.isEnabled = !this.isEnabled;
    }
}
AudioManager._instance = null;