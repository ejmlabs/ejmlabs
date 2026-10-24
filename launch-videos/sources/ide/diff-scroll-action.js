(() => {
 const diff=document.querySelector('.chat-tool-call.has-edits .chat-edit-code');
 setTimeout(()=>diff.scrollTo({top:diff.scrollHeight,behavior:'smooth'}),2500);
 return JSON.stringify({visibility:document.visibilityState,scrollFrom:diff.scrollTop,scrollTo:diff.scrollHeight});
})()