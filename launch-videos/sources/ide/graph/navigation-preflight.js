(() => {
 const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 const log=[];window.__IDE_GRAPH_PREFLIGHT__={state:'running',log};
 const snap=label=>log.push({label,at:new Date().toISOString(),breadcrumbs:document.querySelector('.editor-breadcrumbs')?.innerText||'',heading:document.querySelector('.symbol-heading')?.innerText||'',graph:document.querySelector('.hierarchy-pane')?.innerText||'',editor:document.querySelector('.monaco-editor .view-lines')?.innerText||'',tabs:[...document.querySelectorAll('.editor-tabs button[aria-selected="true"]')].map(x=>x.innerText)});
 const graph=async()=>{
  const row=[...document.querySelectorAll('.index-result')].find(x=>x.querySelector('small')?.textContent==='src/money.rs:18' && x.textContent.includes('calculate_total'));
  if(!row) throw new Error('Rust calculation search result missing');
  row.querySelector('button[aria-label="Show graph for calculate_total"]').click();
  await wait(900);document.querySelector('button[aria-label="Fit View"]').click();await wait(400);
 };
 const open=async(name)=>{
  const button=[...document.querySelectorAll('.function-open')].find(x=>x.querySelector('strong')?.textContent===name);
  if(!button) throw new Error('Native graph node missing: '+name);
  button.click();await wait(1000);snap('opened '+name);
 };
 (async()=>{
  await open('quote_order');await graph();await open('settle_order');await graph();await open('apply_discount');
  const hits=await window.__EJM_IDE_INVOKE__('index_search',{query:'calculate_total',limit:40});
  const root=hits.find(x=>x.name==='calculate_total'&&x.path.endsWith('/src/money.rs'));
  if(!root) throw new Error('Native index root missing');
  const page=await window.__EJM_IDE_INVOKE__('index_traverse',{symbolId:root.id,direction:'both',limit:40,direct:true});
  const sources={};for(const node of page.nodes) if(!sources[node.path])sources[node.path]=await window.__EJM_IDE_INVOKE__('workspace_read',{path:node.path});
  window.__IDE_GRAPH_PREFLIGHT__={state:'complete',log,hits,root,page,sources};
 })().catch(error=>{window.__IDE_GRAPH_PREFLIGHT__={state:'failed',error:String(error),log}});
 return 'Native graph navigation preflight started.';
})()