import json, urllib.request, sys, os
url = 'https://api.github.com/users/Vash-Codex/repos?per_page=100'
headers = {'User-Agent': 'Mozilla/5.0'}
req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as resp:
        data = resp.read().decode('utf-8')
        repos = json.loads(data)
except Exception as e:
    print('Error fetching repos:', e, file=sys.stderr)
    sys.exit(1)
# Extract needed fields
projects = []
for r in repos:
    projects.append({
        'name': r.get('name'),
        'description': r.get('description') or '',
        'html_url': r.get('html_url'),
        'homepage': r.get('homepage') or ''
    })
# Write to projects.json
with open('projects.json', 'w', encoding='utf-8') as f:
    json.dump(projects, f, indent=2)
print('Fetched', len(projects), 'projects')
