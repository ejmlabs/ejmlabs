(() => {
 document.querySelector('button[aria-label="Toggle project panel"]').click();
 const divider=document.querySelector('[role="separator"][aria-controls="editor"]');
 divider.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowLeft',code:'ArrowLeft',bubbles:true}));
 setTimeout(()=>divider.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowLeft',code:'ArrowLeft',bubbles:true})),150);
 setTimeout(()=>{
   const edit=document.querySelector('.chat-tool-call.has-edits');
   const view=document.querySelector('.chat-messages');
   const diff=edit.querySelector('.chat-edit-code');
   diff.scrollTop=0;
   view.scrollTop+=edit.getBoundingClientRect().top-view.getBoundingClientRect().top;
 },400);
 return JSON.stringify({visibility:document.visibilityState,text:document.body.innerText.slice(-1000)});
})()