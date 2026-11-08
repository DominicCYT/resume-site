const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
beforeEach(() => { document.documentElement.innerHTML = html; });

test('has a title and language', () => {
  expect(document.title).toMatch(/Dominic Cheung/);
  expect(html).toMatch(/<html[^>]*lang="en"/);
});
test('shows the name as the single h1', () => {
  expect(document.querySelectorAll('h1')).toHaveLength(1);
  expect(document.getElementById('name').textContent.trim().length).toBeGreaterThan(0);
});
test('contains all resume sections', () => {
  ['experience', 'projects', 'skills', 'education'].forEach(id =>
    expect(document.getElementById(id)).not.toBeNull());
});
test('every nav link points to an existing section', () => {
  document.querySelectorAll('nav a').forEach(a => {
    expect(document.querySelector(a.getAttribute('href'))).not.toBeNull();
  });
});
test('stylesheet exists', () => {
  expect(fs.existsSync(path.join(__dirname, '..', 'style.css'))).toBe(true);
});
