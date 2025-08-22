export class Sound {
  constructor() {
    this.sounds = {
      move: this.createSound('https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3'),
      merge: this.createSound('https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-complete-level-2049.mp3'),
      win: this.createSound('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3'),
      lose: this.createSound('https://assets.mixkit.co/sfx/preview/mixkit-arcade-retro-game-over-213.mp3')
    };
    
    this.enabled = true;
    this.setupMuteToggle();
  }
  
  createSound(url) {
    const audio = new Audio();
    audio.src = url;
    audio.volume = 0.3;
    return audio;
  }
  
  setupMuteToggle() {
    const muteButton = document.createElement('button');
    muteButton.id = 'sound-toggle';
    muteButton.innerHTML = '🔊';
    muteButton.style.position = 'absolute';
    muteButton.style.bottom = '20px';
    muteButton.style.right = '20px';
    muteButton.style.width = '40px';
    muteButton.style.height = '40px';
    muteButton.style.borderRadius = '50%';
    muteButton.style.background = 'var(--bg-secondary)';
    muteButton.style.border = 'none';
    muteButton.style.cursor = 'pointer';
    muteButton.style.fontSize = '18px';
    muteButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    
    document.body.appendChild(muteButton);
    
    muteButton.addEventListener('click', () => {
      this.enabled = !this.enabled;
      muteButton.innerHTML = this.enabled ? '🔊' : '🔇';
    });
  }
  
  play(name) {
    if (!this.enabled || !this.sounds[name]) return;
    
    const sound = this.sounds[name].cloneNode();
    sound.volume = this.sounds[name].volume;
    sound.play().catch(e => console.log("Звук заблокирован браузером:", e));
  }
}