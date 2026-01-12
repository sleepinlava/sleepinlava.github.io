document.addEventListener("DOMContentLoaded", function () {
  // 示例数据：请将此处数据替换为你的实际发表文章信息
  const publications = [
    {
      id: 1,
      title: "Efficient Training with Limited Data: A Practical Framework",
      authors: "张三, Li Wei",
      venue: "IEEE Transactions on Pattern Analysis",
      year: 2023,
      link: "https://example.org/1",
      abstract: "在数据受限场景下提出一种高效训练框架，提升模型泛化能力。",
    },
    {
      id: 2,
      title: "A Novel Graph Neural Network for Link Prediction",
      authors: "赵倩, 王强",
      venue: "NeuroComputing Letters",
      year: 2024,
      link: "https://example.org/2",
      abstract: "提出一种新型图神经网络用于链接预测，提升准确率与可解释性。",
    },
    {
      id: 3,
      title: "Diffusion Models in Biomedical Imaging",
      authors: "Liu X., Chen Y.",
      venue: "BioMed Open Journal",
      year: 2022,
      link: "https://example.org/3",
      abstract: "将扩散模型应用于生物医学成像，改善重建质量与鲁棒性。",
    },
  ];

  // 初始化年份选择框
  const yearSel = document.getElementById("pub-year");
  const years = Array.from(new Set(publications.map((p) => p.year))).sort(
    (a, b) => b - a
  );
  years.forEach((y) => {
    const opt = document.createElement("option");
    opt.value = String(y);
    opt.textContent = String(y);
    yearSel.appendChild(opt);
  });

  function renderList(items) {
    const container = document.getElementById("pub-list");
    container.innerHTML = "";
    if (items.length === 0) {
      container.innerHTML =
        '<div class="pub-item">未检索到符合条件的结果。</div>';
      return;
    }
    items.forEach((p) => {
      const el = document.createElement("div");
      el.className = "pub-item";
      el.innerHTML = `
        <h3><a href="${p.link}" target="_blank" rel="noopener">${p.title}</a></h3>
        <div class="pub-meta">${p.authors} — ${p.venue} (${p.year})</div>
        <p class="pub-abstract" style="font-size:0.92rem;margin-top:6px;color:#374151;">${p.abstract}</p>
      `;
      container.appendChild(el);
    });
  }

  function applyFilters() {
    const q = (document.getElementById("pub-search").value || "").toLowerCase();
    const year = document.getElementById("pub-year").value;
    const filtered = publications.filter((p) => {
      const byYear = year === "all" || p.year === parseInt(year);
      const byText =
        p.title.toLowerCase().includes(q) ||
        p.authors.toLowerCase().includes(q) ||
        p.venue.toLowerCase().includes(q);
      return byYear && byText;
    });
    renderList(filtered);
  }

  document.getElementById("pub-search").addEventListener("input", applyFilters);
  document.getElementById("pub-year").addEventListener("change", applyFilters);

  renderList(publications);
});
