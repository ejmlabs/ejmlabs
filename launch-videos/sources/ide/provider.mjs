// Task-only model replay. The native IDE executes every tool and review.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = process.env.EJM_IDE_CAPTURE_ROOT ?? '/private/tmp/ejm-ide-launch-film-20261019';
const log = path.join(root, 'evidence/provider-requests.jsonl');
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const sse = (value) => `data: ${JSON.stringify(value)}\n\n`;
const test = `
#[cfg(test)]
mod tests {
    use super::*;
    use crate::money::LineItem;

    #[test]
    fn quote_includes_quantity_and_discount() {
        let order = Order {
            key: "quote-1".into(),
            items: vec![LineItem {
                unit_price: 1200,
                quantity: 2,
                discount_percent: 10,
            }],
        };
        assert_eq!(quote_order(&order), 2160);
    }
}
`;

async function reply(res, text, tool, delay = 1800) {
  await wait(delay);
  res.writeHead(200, { 'content-type': 'text/event-stream', 'cache-control': 'no-cache' });
  res.write(sse({ choices: [{ index: 0, delta: { role: 'assistant' }, finish_reason: null }] }));
  for (const token of text.match(/\S+\s*/g) ?? []) {
    res.write(sse({ choices: [{ index: 0, delta: { content: token }, finish_reason: null }] }));
    await wait(55);
  }
  if (tool) res.write(sse({ choices: [{ index: 0, delta: { tool_calls: [{ index: 0, id: tool.id, type: 'function', function: { name: tool.name, arguments: JSON.stringify(tool.args) } }] }, finish_reason: null }] }));
  res.write(sse({ choices: [{ index: 0, delta: {}, finish_reason: tool ? 'tool_calls' : 'stop' }] }));
  res.end('data: [DONE]\n\n');
}

http.createServer((req, res) => {
  let raw = '';
  req.on('data', (chunk) => {
    raw += chunk;
    if (raw.length > 2 * 1024 * 1024) req.destroy();
  });
  req.on('end', async () => {
    try {
      const body = raw ? JSON.parse(raw) : null;
      fs.appendFileSync(log, JSON.stringify({ at: new Date().toISOString(), url: req.url, method: req.method, body }) + '\n');
      if (req.method === 'GET' && req.url === '/v1/models') {
        res.writeHead(200, { 'content-type': 'application/json' });
        return res.end(JSON.stringify({ data: [{ id: 'capture-replay', object: 'model' }] }));
      }
      if (req.method !== 'POST' || req.url !== '/v1/chat/completions') {
        res.writeHead(404);
        return res.end();
      }
      if (!body.tools?.length) {
        const approved = raw.includes('quote_includes_quantity_and_discount') && raw.includes('src/orders.rs');
        return await reply(res, JSON.stringify({ approved, reason: approved ? 'This adds the requested focused regression test in src/orders.rs.' : 'This replay reviews only its requested regression test.' }), null, 1400);
      }
      const tools = body.messages.filter((message) => message.role === 'tool');
      for (const message of tools) {
        const result = JSON.parse(message.content);
        if (result.error) throw new Error(`Native tool failed: ${JSON.stringify(result.error)}`);
      }
      const done = new Set(body.messages.flatMap((message) => message.tool_calls?.map((tool) => tool.function.name) ?? []));
      if (tools.length === 0) return await reply(res, 'I’ll read the order code first.', { id: 'film_read_orders', name: 'read_file', args: { path: 'src/orders.rs' } });
      const orders = JSON.parse(tools[0].content);
      if (!orders.content?.includes('pub fn quote_order') || !orders.version) throw new Error('Expected the real source and version from read_file');
      if (!done.has('open_file')) return await reply(res, 'The quote delegates to the shared total calculation.', { id: 'film_open_orders', name: 'open_file', args: { path: 'src/orders.rs', line: 20, column: 1 } });
      if (!done.has('highlight_code')) return await reply(res, '', { id: 'film_highlight_quote', name: 'highlight_code', args: { id: 'quote-total', path: 'src/orders.rs', range: { startLine: 21, startColumn: 5, endLine: 21, endColumn: 34 }, label: 'The quote uses the shared total.' } });
      if (tools.filter((message) => JSON.parse(message.content).content?.includes('discount_percent')).length === 0) return await reply(res, 'I’ll check quantity and discount together.', { id: 'film_read_money', name: 'read_file', args: { path: 'src/money.rs' } });
      if (!done.has('write_file')) return await reply(res, 'Two items at 1,200 cents with 10% off should quote 2,160 cents. I’ll add that regression case.', { id: 'film_write_orders', name: 'write_file', args: { path: 'src/orders.rs', content: orders.content.trimEnd() + '\n' + test, expectedVersion: orders.version } });
      return await reply(res, 'Added `quote_includes_quantity_and_discount`. The change is ready to review in `src/orders.rs`. I haven’t run the tests.', null, 1300);
    } catch (error) {
      fs.appendFileSync(path.join(root, 'evidence/provider-errors.log'), String(error) + '\n');
      if (!res.headersSent) res.writeHead(500, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ error: { message: String(error) } }));
    }
  });
}).listen(18787, '127.0.0.1', () => console.log('IDE film replay listening on 127.0.0.1:18787'));
