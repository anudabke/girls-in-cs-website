#!/usr/bin/env python3
"""Refresh the file preview data and optionally remove expired dated entries."""
import argparse
from datetime import datetime, timedelta, timezone
import json
from pathlib import Path

DATA = Path(__file__).resolve().parents[1] / 'docs' / 'assets' / 'data'
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--prune', action='store_true')
args = parser.parse_args()
# Keep a deadline through the end of that day even in UTC−12.
today = datetime.now(timezone(timedelta(hours=-12))).date().isoformat()
data = {p.stem: json.loads(p.read_text(encoding='utf-8')) for p in sorted(DATA.glob('*.json'))}
if args.prune:
    opportunities = data['opportunities']
    active = [entry for entry in opportunities
              if not entry['deadline'] or entry['deadline'] == 'rolling' or entry['deadline'] >= today]
    if len(active) != len(opportunities):
        data['opportunities'] = active
        (DATA / 'opportunities.json').write_text(
            json.dumps(active, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
(DATA / 'preview-data.js').write_text(
    '// Generated for local file previews. Edit the JSON files and rerun the refresh script.\n'
    'window.GirlsInCSData = ' + json.dumps(data, ensure_ascii=True, separators=(',', ':')) + ';\n',
    encoding='utf-8')
