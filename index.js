import { GoogleGenAI } from "@google/genai";

const SERVICES = [
    { id: 1, cat: 'Corporate', title: 'Competition & Anti-Trust Laws', desc: 'Navigating restrictive trade practices and merger controls.', img: 'cat1.png' },
    { id: 2, cat: 'Corporate', title: 'Consumer Protection', desc: 'Expertise in consumer care and rights compliance.', img: 'cp.png' },
    { id: 3, cat: 'Corporate', title: 'Governance & Compliance', desc: 'Adherence to ethical management and regulatory standards.', img: 'gcr.png' },
    { id: 4, cat: 'Corporate', title: 'Intellectual Property (IPR)', desc: 'Protection of trademarks, patents, and copyright assets.', img: 'ipr.png' },
    { id: 5, cat: 'Corporate', title: 'Real Estate & Infrastructure', desc: 'Legal frameworks for urban and industrial development.', img: 'rei.png' },
    { id: 6, cat: 'Corporate', title: 'Taxation & Advisory', desc: 'Strategic planning for domestic and international fiscal matters.', img: 'tax.png' },
    { id: 7, cat: 'Corporate', title: 'Labour & Employment Law', desc: 'Workplace compliance and human capital management.', img: 'lel.png' },
    { id: 8, cat: 'Corporate', title: 'Insolvency & Bankruptcy', desc: 'Corporate restructuring and liquidation proceedings.', img: 'ib.png' },
    { id: 9, cat: 'Corporate', title: 'Contract Drafting & Vetting', desc: 'Meticulous engineering of high-stakes commercial agreements.', img: 'cdv.png' },
    { id: 10, cat: 'Corporate', title: 'Regulatory & Licensing', desc: 'Guidance on government permits and operating licenses.', img: 'rl.png' },
    { id: 11, cat: 'Corporate', title: 'Unclaimed Assets Recovery', desc: 'Retrieval of forgotten corporate and individual financial assets.', img: 'uar.png' },
    { id: 12, cat: 'Corporate', title: 'Banking & Finance', desc: 'Counsel on securities, lending, and capital markets.', img: 'bf.png' },

    { id: 13, cat: 'Dispute', title: 'Litigation Services', desc: 'Representation across all levels of civil and commercial courts.', img: 'ls.png' },
    { id: 14, cat: 'Dispute', title: 'Arbitration & ADR', desc: 'Private mediation and international arbitration mechanisms.', img: 'aa.png' },

    { id: 15, cat: 'Personal', title: 'Family & Matrimonial', desc: 'Counsel for settlements, guardianship, and family disputes.', img: 'fm.png' },
    { id: 16, cat: 'Personal', title: 'Recovery Suits & Debt', desc: 'Financial restitution and individual debt recovery matters.', img: 'rsd.png' },
    { id: 17, cat: 'Personal', title: 'Court Marriage & Registration', desc: 'Legal validation and registration of matrimonial unions.', img: 'cmr.png' },
    { id: 18, cat: 'Personal', title: 'Property & Title Issues', desc: 'Resolving land title disputes and succession conflicts.', img: 'pti.png' },
    { id: 19, cat: 'Personal', title: 'Employment & Salary Disputes', desc: 'Advocacy for workplace rights and compensation recovery.', img: 'esd.png' },
    { id: 20, cat: 'Personal', title: 'Divorce & Maintenance', desc: 'Sensitive representation in separation and alimony cases.', img: 'dm.png' },
    { id: 21, cat: 'Personal', title: 'Civil Litigation', desc: 'Defense and prosecution of individual civil claims.', img: 'cl.png' },
    { id: 22, cat: 'Personal', title: 'Criminal Law Services', desc: 'Protecting personal liberties and white-collar defense.', img: 'cls.png' }
];

const grid = document.getElementById('services-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

function render(filter = 'All') {
    grid.innerHTML = '';
    const filtered = filter === 'All' ? SERVICES : SERVICES.filter(s => s.cat === filter);

    filtered.forEach(s => {
        const card = document.createElement('div');
        card.className = 'service-card bg-white border border-slate-100 p-8 reveal shadow-sm hover:shadow-xl transition-all duration-300';

        card.innerHTML = `
            <div class="mb-5 rounded-xl overflow-hidden">
                <img src="${s.img}" alt="${s.title}" class="w-full h-40 object-cover transition-transform duration-500 hover:scale-105">
            </div>

            <p class="text-slate-500 text-xs mb-2 uppercase tracking-widest font-bold">${s.cat}</p>
            <h4 class="text-xl font-bold mb-3">${s.title}</h4>
            <p class="text-slate-600 text-sm font-light leading-relaxed mb-6">${s.desc}</p>
            <a href="booking.html" class="inline-block bg-gold text-midnight px-6 py-3 text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all" style="border: 1px solid var(--legacy-gold);">Book Now</a>
        `;

        grid.appendChild(card);
    });

    setTimeout(observe, 100);
}

function observe() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active', 'border-b-2', 'border-gold', 'text-midnight'));
        btn.classList.add('active', 'border-b-2', 'border-gold', 'text-midnight');
        render(btn.dataset.filter);
    });
});

window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    const brand = document.getElementById('nav-brand');
    const links = document.querySelectorAll('.nav-link');

    if (window.scrollY > 100) {
        nav.classList.add('glass', 'py-4', 'shadow-md');
        brand.classList.replace('text-white', 'text-midnight');
        links.forEach(l => l.classList.replace('text-white', 'text-slate-600'));
    } else {
        nav.classList.remove('glass', 'py-4', 'shadow-md');
        brand.classList.replace('text-midnight', 'text-white');
        links.forEach(l => l.classList.replace('text-slate-600', 'text-white'));
    }
});

// AI CHAT
const aiToggle = document.getElementById('ai-toggle');
const chatWin = document.getElementById('chat-window');
const chatIn = document.getElementById('chat-input');
const chatMsgs = document.getElementById('chat-messages');

aiToggle.onclick = () => {
    chatWin.classList.toggle('hidden');
    setTimeout(() => {
        chatWin.classList.toggle('opacity-0');
        chatWin.classList.toggle('translate-y-0');
    }, 10);
};

async function talk() {
    const txt = chatIn.value.trim();
    if (!txt) return;

    addMsg('user', txt);
    chatIn.value = '';

    const loader = addMsg('assistant', 'Analyzing your request...');

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const res = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: txt,
            config: {
                systemInstruction:
                    "You are Lexi, the legal concierge for LexPrime. Help users find their practice area. Our services include: " +
                    SERVICES.map(s => s.title).join(', ') +
                    ". Be professional and brief.",
                temperature: 0.7
            }
        });

        loader.remove();
        addMsg('assistant', res.text);
    } catch {
        loader.remove();
        addMsg('assistant', "I'm having trouble connecting. Please call us.");
    }
}

function addMsg(role, text) {
    const d = document.createElement('div');
    d.className = `p-3 rounded-lg ${
        role === 'user'
            ? 'bg-midnight text-white self-end'
            : 'bg-slate-100 text-slate-800 self-start'
    } max-w-[90%] mb-2`;
    d.textContent = text;
    chatMsgs.appendChild(d);
    chatMsgs.scrollTop = chatMsgs.scrollHeight;
}

document.getElementById('send-btn').onclick = talk;
chatIn.onkeypress = e => e.key === 'Enter' && talk();
document.getElementById('close-chat').onclick = () => aiToggle.click();

document.addEventListener('DOMContentLoaded', () => render());
