export class Sound {
  constructor() {
    this.sounds = {
      move: this.createSound(new URL('../assets/sounds/move.mp3', import.meta.url).href),
      merge: this.createSound(new URL('../assets/sounds/merge.mp3', import.meta.url).href),
      win: this.createSound(new URL('../assets/sounds/win.mp3', import.meta.url).href),
      lose: this.createSound(new URL('../assets/sounds/gameover.mp3', import.meta.url).href)
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
    muteButton.textContent = '🔊';
    muteButton.type = 'button';
    muteButton.setAttribute('aria-label', 'Выключить звук');
    muteButton.setAttribute('aria-pressed', 'false');
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
      muteButton.textContent = this.enabled ? '🔊' : '🔇';
      muteButton.setAttribute('aria-label', this.enabled ? 'Выключить звук' : 'Включить звук');
      muteButton.setAttribute('aria-pressed', String(!this.enabled));
    });
  }
  
  play(name) {
    if (!this.enabled || !this.sounds[name]) return;
    
    const sound = this.sounds[name].cloneNode();
    sound.volume = this.sounds[name].volume;
    sound.play().catch(() => {});
  }
}
