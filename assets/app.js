// 复制按钮 + 当前页导航高亮。无依赖，失败静默降级。
document.querySelectorAll('.copy').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const pre = btn.closest('.code-block')?.querySelector('pre');
    if (!pre) return;
    const label = btn.textContent;
    try {
      await navigator.clipboard.writeText(pre.innerText.trim());
      btn.textContent = '已复制';
    } catch {
      btn.textContent = '复制失败';
    }
    setTimeout(() => {
      btn.textContent = label;
    }, 1400);
  });
});

const here = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach((a) => {
  const href = a.getAttribute('href') || '';
  if (href === here) a.classList.add('active');
});
