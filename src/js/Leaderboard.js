export class Leaderboard {
  static STORAGE_KEY = '2048_leaderboard';
  
  constructor() {
    this.leaderboard = this.load();
    this.render();
  }
  
  load() {
    try {
      const data = localStorage.getItem(Leaderboard.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error loading leaderboard:', e);
      return [];
    }
  }
  
  save() {
    try {
      localStorage.setItem(Leaderboard.STORAGE_KEY, JSON.stringify(this.leaderboard));
    } catch (e) {
      console.error('Error saving leaderboard:', e);
    }
  }
  
  addScore(score, size = 4) {
    if (score <= 0) return null;
    
    const entry = {
      score,
      size,
      date: new Date().toISOString()
    };
    
    this.leaderboard.push(entry);
    this.leaderboard.sort((a, b) => b.score - a.score);
    this.leaderboard = this.leaderboard.slice(0, 5); // Оставляем топ-5
    
    this.save();
    this.render();
    return entry;
  }
  
  getTopScores() {
    return this.leaderboard;
  }
  
  render() {
    const leaderboardEl = document.getElementById('leaderboard');
    if (!leaderboardEl) {
      console.error('Leaderboard container not found');
      return;
    }
    
    if (this.leaderboard.length === 0) {
      leaderboardEl.innerHTML = '<h3>Топ-5 рекордов:</h3><p>Рекорды отсутствуют</p>';
      return;
    }
    
    let html = '<h3>Топ-5 рекордов:</h3><ol>';
    
    this.leaderboard.forEach((entry, index) => {
      const date = new Date(entry.date).toLocaleDateString();
      html += `<li><strong>${entry.score}</strong> очков (${entry.size}x${entry.size}) - ${date}</li>`;
    });
    
    html += '</ol>';
    leaderboardEl.innerHTML = html;
  }
}