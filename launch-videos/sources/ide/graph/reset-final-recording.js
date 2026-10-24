(() => {
 document.querySelector('button[aria-label="Close tool window"]')?.click();
 const tab=[...document.querySelectorAll('.editor-tabs button[role="tab"]')].find(x=>x.textContent.trim()==='orders.rs');tab?.click();
 const input=document.querySelector('input[aria-label="Search workspace"]');
 Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,'');input.dispatchEvent(new Event('input',{bubbles:true}));
 document.querySelector('.monaco-editor .view-lines')?.dispatchEvent(new WheelEvent('wheel',{deltaY:-10000,bubbles:true,cancelable:true}));
 return JSON.stringify({lineBlame:localStorage.getItem('ejm-ide.lineBlame'),hasBlame:!!document.querySelector('.git-blame-widget'),ready:localStorage.getItem('ejm-ide.lineBlame')==='false'});
})()