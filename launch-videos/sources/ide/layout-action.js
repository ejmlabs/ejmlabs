(() => {
 document.querySelector('button[aria-label="Toggle project panel"]').click();
 const divider=document.querySelector('[role="separator"][aria-controls="editor"]');
 divider.focus();
 divider.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowLeft',code:'ArrowLeft',bubbles:true}));
 setTimeout(()=>divider.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowLeft',code:'ArrowLeft',bubbles:true})),250);
 return 'Native project panel collapsed; Edi divider expanded through its keyboard handler.';
})()