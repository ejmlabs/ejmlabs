"""Read the real journal from a fresh worker through the public Python SDK."""
import asyncio
import json
import os
from pathlib import Path

from ejm_harness import AsyncHarness


async def main():
    state = Path(os.environ['EJM_FILM_STATE'])
    evidence = Path(os.environ['EJM_FILM_EVIDENCE'])
    expected = json.loads((evidence / 'session.json').read_text())
    async with AsyncHarness(
        worker_path=os.environ['EJM_HARNESS_WORKER_PATH'],
        config={'state_dir': str(state), 'provider': {'kind': 'echo'}},
    ) as harness:
        sessions = await harness.list_sessions()
        session = next(item for item in sessions if item.id == expected['id'])
        events = []
        after = 0
        while True:
            page = await session.events(after=after)
            if not page:
                break
            events.extend(page)
            after = page[-1]['sequence']
        finished = [event for event in events if event['type'] == 'run_finished']
        summary = finished[-1]['summary']
        assert summary['status'] == 'completed', summary
        assert events == json.loads((evidence / 'journal.json').read_text())
        tool_results = [event for event in events if event['type'] == 'tool_finished']
        saved_start = next(event for event in reversed(events)
                           if event['type'] == 'tool_started'
                           and event['run_id'] == summary['run_id']
                           and event['call']['name'] == 'shell')
        saved_result = next(event for event in reversed(events)
                            if event['type'] == 'tool_finished'
                            and event['run_id'] == summary['run_id']
                            and event['call_id'] == saved_start['call']['id'])
        assert not saved_result['output']['is_error']
        assert saved_result['output']['data']['exit_code'] == 0
        tool_line = next(line for line in saved_result['output']['content'].splitlines()
                         if line.startswith('✔ counts each quantity '))
        readback = {
            'session_id': session.id,
            'title': session.info['title'],
            'run_id': summary['run_id'],
            'summary': summary,
            'tool_start': saved_start,
            'tool_result': saved_result,
            'tool_line': tool_line,
        }
        assert readback == json.loads((evidence / 'js-readback.json').read_text())
        receipt = {
            'session_id': session.id,
            'events': len(events),
            'status': summary['status'],
            'tool_results': len(tool_results),
            'journal_matches_js': True,
            'reader_pid': os.getpid(),
            'readback': readback,
            'readback_matches_js': True,
        }
        (evidence / 'python-restore.json').write_text(json.dumps(receipt, indent=2) + '\n')
        print(f"session  {session.id[:8]} / {session.info['title']}", flush=True)
        print(f"run      {summary['run_id'][:8]}", flush=True)
        print(flush=True)
        print(summary['text'], flush=True)
        print(flush=True)
        print(f"saved tool  {saved_start['call']['name']} / {saved_start['call']['arguments']['command']}", flush=True)
        print(tool_line, flush=True)
        print(f"exit {saved_result['output']['data']['exit_code']}", flush=True)
        print('Same saved result as JavaScript.', flush=True)


asyncio.run(main())
