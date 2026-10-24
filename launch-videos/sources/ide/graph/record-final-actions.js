(() => {
 const started=performance.now();
 const log=[];
 window.__IDE_GRAPH_TAKE__={state:'running',startedAt:new Date().toISOString(),lineBlame:localStorage.getItem('ejm-ide.lineBlame'),log};
 if(localStorage.getItem('ejm-ide.lineBlame')!=='false')throw new Error('Normal line blame preference must be off for the final take');
 const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 const snap=label=>log.push({label,seconds:(performance.now()-started)/1000,at:new Date().toISOString(),breadcrumbs:document.querySelector('.breadcrumbs')?.innerText||'',heading:document.querySelector('.symbol-heading')?.innerText||'',graph:document.querySelector('.hierarchy-pane')?.innerText||'',editor:document.querySelector('.monaco-editor .view-lines')?.innerText||'',tabs:[...document.querySelectorAll('.editor-tabs button[aria-selected="true"]')].map(x=>x.innerText),nodes:[...document.querySelectorAll('.function-open')].map(x=>({text:x.innerText,rect:x.getBoundingClientRect().toJSON()})),graphRect:document.querySelector('.graph-canvas')?.getBoundingClientRect().toJSON()});
 const until=async(check,message)=>{const start=performance.now();while(!check()){if(performance.now()-start>6000)throw new Error(message);await wait(80)}};
 const fit=async()=>{document.querySelector('button[aria-label="Fit View"]').click();await wait(450)};
 const graph=async()=>{
  const row=[...document.querySelectorAll('.index-result')].find(x=>x.querySelector('small')?.textContent==='src/money.rs:18');
  if(!row)throw new Error('Native Rust calculation search result missing');
  row.querySelector('button[aria-label="Show graph for calculate_total"]').click();
  await until(()=>document.querySelector('.symbol-heading strong')?.textContent==='calculate_total' && [...document.querySelectorAll('.function-open')].length===5 && document.querySelector('.graph-status')?.innerText.includes('4 links'),'Real pricing graph did not finish');
  await wait(450);await fit();
 };
 const open=async(name)=>{
  const button=[...document.querySelectorAll('.function-open')].find(x=>x.querySelector('strong')?.textContent===name);
  if(!button)throw new Error('Actual native graph node missing: '+name);
  snap('click '+name);button.click();
  await until(()=>document.querySelector('.symbol-heading strong')?.textContent===name && !document.querySelector('.hierarchy-pane')?.innerText.includes('Crawling'),'Native source navigation did not finish for '+name);
  await wait(350);document.querySelector('button[aria-label="Close tool window"]').click();await wait(500);snap('source '+name);
 };
 (async()=>{
  snap('establish orders');await wait(1600);
  const input=document.querySelector('input[aria-label="Search workspace"]');
  input.focus();
  const value='calculate_total', start=performance.now();let n=-1;
  while(n<value.length){
   const next=Math.min(value.length,Math.floor((performance.now()-start)/55)+1);
   if(next!==n){n=next;Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,value.slice(0,n));input.dispatchEvent(new Event('input',{bubbles:true}));}
   await wait(25);
  }
  await until(()=>[...document.querySelectorAll('.index-result')].some(x=>x.querySelector('small')?.textContent==='src/money.rs:18'),'Actual Rust calculation search result missing');
  await wait(700);snap('search result');
  const row=[...document.querySelectorAll('.index-result')].find(x=>x.querySelector('small')?.textContent==='src/money.rs:18');
  row.querySelector('button[aria-label="Show graph for calculate_total"]').click();
  await until(()=>document.querySelector('.symbol-heading strong')?.textContent==='calculate_total' && [...document.querySelectorAll('.function-open')].length===5 && document.querySelector('.graph-status')?.innerText.includes('4 links'),'Real pricing graph did not finish');
  await wait(450);await fit();snap('shared pricing graph');await wait(6000);
  await open('quote_order');await wait(4400);
  await graph();snap('restore pricing graph before payment');await wait(650);
  await open('settle_order');await wait(4400);
  await graph();snap('restore pricing graph before discount');await wait(650);
  await open('apply_discount');await wait(7000);
  snap('complete');window.__IDE_GRAPH_TAKE__.state='complete';
 })().catch(error=>{window.__IDE_GRAPH_TAKE__.state='failed';window.__IDE_GRAPH_TAKE__.error=String(error);snap('failed')});
 return 'Native pricing graph take started.';
})()