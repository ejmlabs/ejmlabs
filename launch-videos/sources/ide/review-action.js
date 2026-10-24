(() => {
 const diff=document.querySelector('.chat-edit-code');
 diff.scrollTop=diff.scrollHeight;
 const editor=document.querySelector('.monaco-editor textarea');
 editor.focus();
 editor.dispatchEvent(new KeyboardEvent('keydown',{key:'End',code:'End',keyCode:35,which:35,metaKey:true,bubbles:true}));
 return JSON.stringify({diffScroll:diff.scrollTop,diffHeight:diff.scrollHeight,chatText:document.querySelector('.chat-messages').innerText});
})()