(() => {
 const edit=document.querySelector('.chat-tool-call.has-edits');
 const view=document.querySelector('.chat-messages');
 const diff=edit.querySelector('.chat-edit-code');
 diff.scrollTop=0;
 view.scrollTop+=edit.getBoundingClientRect().top-view.getBoundingClientRect().top;
 return JSON.stringify({tool:edit.innerText,scroll:view.scrollTop});
})()