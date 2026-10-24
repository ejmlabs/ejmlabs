(() => {
 const item=[...document.querySelectorAll('[role="menuitemcheckbox"]')].find(x=>x.textContent.includes('Show line blame'));
 if(!item)throw new Error('Native Show line blame preference is not open');
 const old=item.getAttribute('aria-checked');if(old==='true')item.click();
 return JSON.stringify({previous:old});
})()