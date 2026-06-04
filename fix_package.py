import json

with open('package.json', 'r') as f:
    content = f.read()

# Fix any malformed JSON from previous edits
content = content.replace('\\n', '\n')
content = content.replace('\\t', '\t')

try:
    data = json.loads(content)
    
    # Ensure start script exists
    if 'scripts' not in data:
        data['scripts'] = {}
    
    # Add start script if missing
    if 'start' not in data['scripts']:
        data['scripts']['start'] = 'vite'
        print('Added start script')
    
    with open('package.json', 'w') as f:
        json.dump(data, f, indent=2)
    print('package.json fixed successfully')
    
except json.JSONDecodeError as e:
    print(f'JSON error: {e}')
    # Try to recover by finding the scripts section
    import re
    # Find and fix double-quoted newlines
    content = re.sub(r'"(start|dev)":\s*"vite",?\\n', r'"\1": "vite",\n', content)
    content = content.replace('\\n', '\n')
    
    try:
        data = json.loads(content)
        with open('package.json', 'w') as f:
            json.dump(data, f, indent=2)
        print('Recovered and fixed package.json')
    except Exception as e2:
        print(f'Could not recover: {e2}')
