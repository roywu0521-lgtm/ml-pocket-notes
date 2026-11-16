const tools = document.querySelector('[data-tools]');
if (tools) {
  tools.hidden = false;
  const search = document.querySelector('#search');
  const cards = [...document.querySelectorAll('[data-note]')];
  const buttons = [...document.querySelectorAll('[data-filter]')];
  let category = '全部';
  function update() {
    const query = search.value.trim().toLowerCase();
    let count = 0;
    for (const card of cards) {
      card.hidden = !((category === '全部' || card.dataset.category === category) && card.dataset.search.includes(query));
      if (!card.hidden) count++;
    }
    buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter === category)));
    document.querySelector('#result-count').textContent = `顯示 ${count} / ${cards.length} 篇筆記`;
    document.querySelector('#empty').hidden = count !== 0;
  }
  search.addEventListener('input',update);
  buttons.forEach(b=>b.addEventListener('click',()=>{category=b.dataset.filter;update();}));
  document.querySelector('#reset').addEventListener('click',()=>{search.value='';category='全部';update();search.focus();});
}
