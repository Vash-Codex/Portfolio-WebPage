// script.js – loads projects and creates cards with staggered fade‑in
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('projects-container');
  if (!container) return;
  fetch('projects.json')
    .then(res => res.json())
    .then(projects => {
      projects.forEach((proj, i) => {
        const card = document.createElement('div');
        card.className = 'card fade-in';
        // stagger animation delay
        card.style.animationDelay = `${0.1 * i}s`;
        const title = document.createElement('h3');
        title.textContent = proj.name;
        const desc = document.createElement('p');
        desc.textContent = proj.description || 'No description provided.';
        const link = document.createElement('a');
        link.href = proj.html_url;
        link.target = '_blank';
        link.rel = 'noopener';
        link.textContent = 'View on GitHub';
        card.appendChild(title);
        card.appendChild(desc);
        card.appendChild(link);
        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error('Failed to load projects:', err);
      container.textContent = 'Unable to load projects.';
    });
});
