(() => {
 const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));window.__IDE_GRAPH_LAYOUT__={state:'running'};
 (async()=>{
  const chat=document.querySelector('button[aria-label="Toggle chat panel"]');if(chat.getAttribute('aria-pressed')==='true')chat.click();
  document.querySelector('button[aria-label="Search"]').click();await wait(400);
  const input=document.querySelector('input[aria-label="Search workspace"]');
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,'calculate_total');input.dispatchEvent(new Event('input',{bubbles:true}));await wait(800);
  const row=[...document.querySelectorAll('.index-result')].find(x=>x.querySelector('small')?.textContent==='src/money.rs:18');if(!row)throw new Error('Calculation search result missing');
  row.querySelector('button[aria-label="Show graph for calculate_total"]').click();await wait(900);
  const div=document.querySelector('.pane-separator.horizontal'),r=div.getBoundingClientRect(),x=r.x+r.width*.6,y=r.y+.5;
  const opts={bubbles:true,cancelable:true,pointerId:1,pointerType:'mouse',isPrimary:true,button:0,buttons:1,clientX:x,clientY:y};
  div.dispatchEvent(new PointerEvent('pointerdown',opts));await wait(100);document.dispatchEvent(new PointerEvent('pointermove',{...opts,clientY:350}));await wait(150);document.dispatchEvent(new PointerEvent('pointerup',{...opts,clientY:350,buttons:0}));await wait(300);
  document.querySelector('button[aria-label="Fit View"]').click();await wait(400);
  document.querySelector('button[aria-label="Close tool window"]').click();
  [...document.querySelectorAll('.editor-tabs button[role="tab"]')].find(x=>x.textContent.trim()==='orders.rs').click();
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,'');input.dispatchEvent(new Event('input',{bubbles:true}));
  document.querySelector('.monaco-editor .view-lines').dispatchEvent(new WheelEvent('wheel',{deltaY:-10000,bubbles:true,cancelable:true}));
  await wait(300);window.__IDE_GRAPH_LAYOUT__={state:'complete',lineBlame:localStorage.getItem('ejm-ide.lineBlame'),blameCount:document.querySelectorAll('.git-blame-widget').length};
 })().catch(error=>window.__IDE_GRAPH_LAYOUT__={state:'failed',error:String(error)});
 return 'Restore verified native capture layout.';
})()