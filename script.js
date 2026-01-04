const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalList = document.getElementById('modal-list');
const modalTitle = document.getElementById('modal-title');

// 1. 데이터 그룹화 (예: assets['coffee'] = ['coffee_1.png', 'coffee_2.png'...])
const assets = {};
fileList.forEach(file => {
    const groupName = file.split('_')[0];
    if (!assets[groupName]) assets[groupName] = [];
    assets[groupName].push(file);
});

// 2. 메인 갤러리 생성 (그룹별로 첫 번째 이미지만 보여줌)
Object.keys(assets).forEach(group => {
    const card = document.createElement('div');
    card.className = 'asset-card';
    card.innerHTML = `
        <img src="assets/${assets[group][0]}" alt="${group}">
        <p>${group}</p>
    `;
    card.onclick = () => openModal(group);
    gallery.appendChild(card);
});

// 3. 모달 열기 (관련 에셋 나열 및 다운로드 버튼)
function openModal(group) {
    modalTitle.innerText = group;
    modalList.innerHTML = '';
    
    assets[group].forEach(file => {
        const item = document.createElement('div');
        item.className = 'download-item';
        item.innerHTML = `
            <img src="assets/${file}">
            <a href="assets/${file}" download="${file}" class="btn-download">Download</a>
        `;
        modalList.appendChild(item);
    });
    
    modal.style.display = 'block';
}

// 모달 닫기 로직
document.querySelector('.close-btn').onclick = () => modal.style.display = 'none';
window.onclick = (event) => { if (event.target == modal) modal.style.display = 'none'; };