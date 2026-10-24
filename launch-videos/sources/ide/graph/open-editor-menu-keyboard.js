(() => {
 const b=document.querySelector('button[aria-label="Editor group actions"]');
 b.focus();b.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',code:'Enter',bubbles:true,cancelable:true}));
 return JSON.stringify({lineBlame:localStorage.getItem('ejm-ide.lineBlame'),selected:document.querySelector('.symbol-heading')?.innerText});
})()