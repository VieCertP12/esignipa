import { initializeApp } from "[https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js](https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js)";
import { getFirestore, doc, getDoc, updateDoc, increment, setDoc } from "[https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js](https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js)";

const firebaseConfig = {
    apiKey: "AIzaSyCBYy6EFilwx2ZTzHWMjtL3g59uQb3q7vk",
    authDomain: "ioscert.firebaseapp.com",
    projectId: "ioscert",
    storageBucket: "ioscert.firebasestorage.app",
    messagingSenderId: "564732555427",
    appId: "1:564732555427:web:331de00a9db74007250f16",
    measurementId: "G-327870BB4V"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Translations Logic
const translations = {
    vi: {
        title: "SHARE CERTIFICATE",
        subtitle: "Chia sẻ chứng chỉ ESign iPhone/iPad và các file iPAs mod. Tải xuống tốc độ cao, cập nhật liên tục.",
        support: "Hỗ Trợ 24/7",
        website: "Mua Cert Giá Rẻ",
        no_results: "Không tìm thấy ứng dụng",
        copyright: "Bản quyền © 2025 THAISONCERT. Bảo lưu mọi quyền."
    },
    en: {
        title: "SHARE CERTIFICATE",
        subtitle: "Share ESign Certificates for iPhone/iPad and Modded iPAs. High-speed download, constantly updated.",
        support: "Support 24/7",
        website: "Buy VIP Cert",
        no_results: "No apps found",
        copyright: "Copyright © 2025 VIETNAMCERT. All rights reserved."
    }
};

function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key === 'support') {
            el.innerHTML = `<i class="fas fa-headset"></i> ${translations[lang][key]}`;
        } else if (key === 'website') {
            el.innerHTML = `<i class="fas fa-shopping-cart text-indigo-500 group-hover:scale-110 transition-transform"></i> ${translations[lang][key]}`;
        } else if(translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        if(btn.dataset.lang === lang) {
            btn.classList.add('text-slate-900');
            btn.classList.remove('text-slate-500');
        } else {
            btn.classList.remove('text-slate-900');
            btn.classList.add('text-slate-500');
        }
    });
    localStorage.setItem('language', lang);
}

async function updateCounter(linkId, elementId) {
    try {
        const docRef = doc(db, "downloads", linkId);
        const docSnap = await getDoc(docRef);
        let count = 0;
        if (docSnap.exists()) {
            count = docSnap.data().count;
        } else {
            await setDoc(docRef, { count: 3007 });
            count = 3007;
        }
        const el = document.getElementById(elementId);
        if (el) el.innerHTML = `${count} <span class="text-[9px] opacity-60">downloads</span>`;
    } catch (error) {
        console.error("Counter Error", error);
    }
}

function setupDownloadButton(btnId, linkId, url) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const counterElementId = `counter-${linkId}`;
    
    btn.href = url;
    btn.setAttribute('target', '_blank');
    btn.addEventListener("click", async () => {
        try {
            const docRef = doc(db, "downloads", linkId);
            await updateDoc(docRef, { count: increment(1) });
            updateCounter(linkId, counterElementId);
        } catch (e) { console.error(e); }
    });
    updateCounter(linkId, counterElementId);
}

window.addEventListener("load", () => {
        const esignButtons = [
        { btnId: 'download-esign-Etisalat', linkId: 'esign-Etisalat', url: '[https://link4sub.com/dmS5](https://link4sub.com/dmS5)' },
        { btnId: 'download-esign-ola', linkId: 'esign-ola', url: '[https://link4sub.com/oXbA](https://link4sub.com/oXbA)' },
        { btnId: 'download-esign-global', linkId: 'esign-global', url: '[https://link4sub.com/JjFO](https://link4sub.com/JjFO)' },
        { btnId: 'download-esign-zheshang', linkId: 'esign-zheshang', url: '[https://link4sub.com/JjFO](https://link4sub.com/JjFO)' },
        { btnId: 'download-esign-bmw', linkId: 'esign-bmw', url: '[https://link4sub.com/jh5D](https://link4sub.com/jh5D)' },
        { btnId: 'download-esign-beijing', linkId: 'esign-beijing', url: '[https://link4sub.com/K8V9](https://link4sub.com/K8V9)' },
        { btnId: 'download-esign-railway', linkId: 'esign-railway', url: '[https://link4sub.com/9WWn](https://link4sub.com/9WWn)' },
        { btnId: 'download-esign-dtt', linkId: 'esign-dtt', url: '[https://link4sub.com/y6nn](https://link4sub.com/y6nn)' },
        { btnId: 'download-esign-tcl', linkId: 'esign-tcl', url: '[https://link4sub.com/Xnjk](https://link4sub.com/Xnjk)' },
        { btnId: 'download-esign-wuling', linkId: 'esign-wuling', url: '[https://link4sub.com/OKaz](https://link4sub.com/OKaz)' },
        { btnId: 'download-esign-vietnamcert', linkId: 'esign-vietnamcert', url: '[https://link4sub.com/bsZQ](https://link4sub.com/bsZQ)' },
        { btnId: 'download-esign-nsl', linkId: 'esign-nsl', url: '[https://link4sub.com/2k3j](https://link4sub.com/2k3j)' }
    ];
    
    const certButtons = [
        { btnId: 'download-cert-Etisalat', linkId: 'cert-Etisalat', url: '[https://link4m.com/92x5t](https://link4m.com/92x5t)' },
        { btnId: 'download-cert-ola', linkId: 'cert-ola', url: '#' }, 
        { btnId: 'download-cert-global', linkId: 'cert-global', url: '[https://link4m.com/4bQLgsj](https://link4m.com/4bQLgsj)' },
        { btnId: 'download-cert-zheshang', linkId: 'cert-zheshang', url: '[https://link4m.com/epZLK](https://link4m.com/epZLK)' },
        { btnId: 'download-cert-bmw', linkId: 'cert-bmw', url: '[https://www.mediafire.com/file/bleytnn30nu8pby/China+Zheshang+Bank+Co.,+Ltd.zip/file](https://www.mediafire.com/file/bleytnn30nu8pby/China+Zheshang+Bank+Co.,+Ltd.zip/file)' },
        { btnId: 'download-cert-beijing', linkId: 'cert-beijing', url: '[https://link4m.com/phPY35Qe](https://link4m.com/phPY35Qe)' },
        { btnId: 'download-cert-railway', linkId: 'cert-railway', url: '[https://link4m.com/tB8urR](https://link4m.com/tB8urR)' },
        { btnId: 'download-cert-dtt', linkId: 'cert-dtt', url: '[https://www.mediafire.com/file/sxjfhmdlax9tdfy/Dtt+Technology+Co.zip/file](https://www.mediafire.com/file/sxjfhmdlax9tdfy/Dtt+Technology+Co.zip/file)' },
        { btnId: 'download-cert-tcl', linkId: 'cert-tcl', url: '[https://link4m.com/kZuQ2sb](https://link4m.com/kZuQ2sb)' },
        { btnId: 'download-cert-wuling', linkId: 'cert-wuling', url: '[https://www.mediafire.com/file/gt97g58vxmuqpcm/Wuling+Power+Corporation.zip/file](https://www.mediafire.com/file/gt97g58vxmuqpcm/Wuling+Power+Corporation.zip/file)' },
        { btnId: 'download-cert-vietnamcert', linkId: 'cert-vietnamcert', url: '[https://yeumoney.com/3GTBHW](https://yeumoney.com/3GTBHW)' },
        { btnId: 'download-cert-nsl', linkId: 'cert-nsl', url: '[https://www.mediafire.com/file/mi9yi0okxf4slvl/National+Science+Library,Chinese+Academy+of+Sciences.zip/file](https://www.mediafire.com/file/mi9yi0okxf4slvl/National+Science+Library,Chinese+Academy+of+Sciences.zip/file)' }
    ];
    
    const modsButtons = [
        { btnId: 'download-mods-coin2', linkId: 'mods-coin2', url: '[https://link4m.com/TE058](https://link4m.com/TE058)' },
        { btnId: 'download-mods-capcutpro', linkId: 'mods-capcutpro', url: '[https://link4m.com/d2Yq2hs9](https://link4m.com/d2Yq2hs9)' },
        { btnId: 'download-mods-locket', linkId: 'mods-locket', url: '[https://link4m.com/Beevd](https://link4m.com/Beevd)' },
        { btnId: 'download-mods-coin', linkId: 'mods-coin', url: '[https://link4m.com/UKWKXe](https://link4m.com/UKWKXe)' },
        { btnId: 'download-mods-lqm-v2', linkId: 'mods-lqm-v2', url: '[https://link4m.com/UKWKXe](https://link4m.com/UKWKXe)' },
        { btnId: 'download-mods-lqm-v1', linkId: 'mods-lqm-v1', url: '[https://is.gd/NNLH2v](https://is.gd/NNLH2v)' },
        { btnId: 'download-mods-key', linkId: 'mods-key', url: '[https://link4m.com/zvHS2](https://link4m.com/zvHS2)' },
        { btnId: 'download-mods-fb', linkId: 'mods-fb', url: '[https://link4m.com/56CAI48p](https://link4m.com/56CAI48p)' },
        { btnId: 'download-mods-mess', linkId: 'mods-mess', url: '[https://link4m.com/hRIjYxr](https://link4m.com/hRIjYxr)' },
        { btnId: 'download-mods-yt', linkId: 'mods-yt', url: '[https://link4m.com/zDZwh7](https://link4m.com/zDZwh7)' }
    ];

    [...esignButtons, ...certButtons, ...modsButtons].forEach(({btnId, linkId, url}) => {
        setupDownloadButton(btnId, linkId, url);
    });

    setLanguage(localStorage.getItem('language') || 'vi');
});

const tabIndicator = document.getElementById('tab-indicator');
const searchContainer = document.getElementById('search-container');

document.querySelectorAll('.tab-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => {
            b.classList.remove('active', 'text-white');
            b.classList.add('text-slate-400');
        });
        btn.classList.add('active');
        btn.classList.remove('text-slate-400');
        
        if(window.innerWidth >= 768) {
                tabIndicator.style.left = `${(index * 132) + 6}px`;
        } else {
                tabIndicator.style.left = `${(index * 33.33)}%`;
                if(index===0) tabIndicator.style.left = '6px'; 
        }
        
        const tab = btn.dataset.tab;
        document.getElementById('esign-list').classList.add('hidden');
        document.getElementById('cert-list').classList.add('hidden');
        document.getElementById('mods-list').classList.add('hidden');
        document.getElementById(`${tab}-list`).classList.remove('hidden');

        if (tab === 'mods') {
            searchContainer.classList.remove('hidden');
        } else {
            searchContainer.classList.add('hidden');
        }
    });
});

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

document.getElementById('mods-search').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const items = document.querySelectorAll('#mods-list .app-card-mod');
    let hasResult = false;
    
    items.forEach(item => {
        const title = item.querySelector('.app-title').innerText.toLowerCase();
        if(title.includes(term)) {
            item.style.display = 'flex';
            hasResult = true;
        } else {
            item.style.display = 'none';
        }
    });

    const noRes = document.getElementById('no-results');
    if(!hasResult) noRes.classList.remove('hidden');
    else noRes.classList.add('hidden');
});
