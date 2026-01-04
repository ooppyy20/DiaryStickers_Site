// 1. 요소 선택
const gallery = document.getElementById('gallery');
const assetModal = document.getElementById('asset-modal'); // ID 수정 반영
const snsModal = document.getElementById('sns-modal');
const modalList = document.getElementById('modal-list');
const modalTitle = document.getElementById('modal-title');
const artistLink = document.getElementById('artist-link');

// 닫기 버튼들
const closeAssetBtn = document.querySelector('[name="close-asset"]');
const closeSnsBtn = document.querySelector('[name="close-sns"]');

// 2. 데이터 그룹화
const assets = {};
fileList.forEach(file => {
    const groupName = file.split('_')[0];
    if (!assets[groupName]) assets[groupName] = [];
    assets[groupName].push(file);
});

// 3. 메인 갤러리 생성
Object.keys(assets).forEach(group => {
    const card = document.createElement('div');
    card.className = 'asset-card';
    card.innerHTML = `
        <img src="assets/${assets[group][0]}" alt="${group}">
        <p>${group}</p>
    `;
    card.onclick = () => openAssetModal(group);
    gallery.appendChild(card);
});

// 4. 에셋 모달 열기
function openAssetModal(group) {
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
    
    assetModal.style.display = 'block';
}

// 5. 이벤트 리스너 (열기/닫기)

// SNS 모달 열기
artistLink.addEventListener('click', (e) => {
    e.preventDefault();
    snsModal.style.display = 'block';
});

// 각각의 닫기 버튼 클릭
closeAssetBtn.onclick = () => assetModal.style.display = 'none';
closeSnsBtn.onclick = () => snsModal.style.display = 'none';

// 배경 클릭 시 닫기
window.onclick = (event) => {
    if (event.target == assetModal) assetModal.style.display = 'none';
    if (event.target == snsModal) snsModal.style.display = 'none';
};