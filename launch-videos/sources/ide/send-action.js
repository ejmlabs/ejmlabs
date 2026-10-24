(() => {
 const field=document.querySelector('#agent-composer');
 const prompt='Cover quantity and discounts in quote_order. Read the code, then add a focused regression test in src/orders.rs.';
 const setter=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set;
 const start=Date.now()+1200;
 const id=setInterval(()=>{
   const count=Math.max(0,Math.min(prompt.length,Math.floor((Date.now()-start)/25)));
   setter.call(field,prompt.slice(0,count));
   field.dispatchEvent(new Event('input',{bubbles:true}));
   if (count===prompt.length) { clearInterval(id); setTimeout(()=>field.form.requestSubmit(),800); }
 },100);
 field.focus();
 return 'Native composer input scheduled with elapsed-time pacing.';
})()