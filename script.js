// --- 1. THEME & CORE LOGIC ---
const themeToggle = document.querySelector('.theme-toggle-btn');
const html = document.documentElement;
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);

themeToggle?.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});

// --- 2. PROJECT DATA (Unified) ---
;

// --- 3. MODAL CONTROL FUNCTIONS ---
const projectData = {
    zarr: {
        title: "Zarr Finance",
        category: "Fintech",
        desc: "A personal finance tracker that manages daily expenses and earnings with integrated visual graphs for better financial insights.",
        features: ["Expense & Earning Tracking", "Visual Data Analytics", "Secure Data Persistence", "Clean UI/UX"],
        github: "https://github.com/yourusername/zarr",
        video: "videos/zarr_demo.mp4"
    },
    agri: {
        title: "Punjab Agri-Guide",
        category: "Agriculture",
        desc: "Farming guidance app for the Punjab region, providing city-specific data on crops like maize, rice, and wheat.",
        features: ["City-specific Crop Advice", "Seasonal Guidance", "Local Language Support", "Flutter-based Performance"],
        github: "https://github.com/yourusername/agri-guide",
        video: "videos/agri_demo.mp4"
    },
    studymesh: {
        title: "StudyMesh",
        category: "Education",
        desc: "A peer-to-peer study group finder for university students to collaborate and share resources effectively.",
        features: ["Group Creation & Search", "Real-time Chat Integration", "Firebase Authentication", "Resource Sharing"],
        github: "https://github.com/yourusername/studymesh",
        video: "videos/studymesh_demo.mp4"
    },
    vemta: {
        title: "Vemta AI",
        category: "AI / Utility",
        desc: "Report analyzer and OCR text scanning tool that converts images into editable digital text using AI.",
        features: ["High-accuracy OCR", "Report Summarization", "Batch Processing", "Export to PDF/Text"],
        github: "https://github.com/yourusername/vemta",
        video: "videos/vemta_demo.mp4"
    }
};

function openProject(id) {
    const project = projectData[id];
    
    // Fill the details
    document.getElementById('ovTitle').innerText = project.title;
    document.getElementById('ovTag').innerText = project.category;
    document.getElementById('ovDesc').innerText = project.desc;
    document.getElementById('ovGithub').href = project.github;
    
    // Features list update karna
    const featuresList = document.getElementById('ovFeatures');
    featuresList.innerHTML = ''; 
    project.features.forEach(f => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.className = 'feature-icon';
        span.innerText = '→';
        li.appendChild(span);
        li.appendChild(document.createTextNode(f));
        featuresList.appendChild(li);
    });

    // Show Overlay with smooth animation
    const overlay = document.getElementById('projectOverlay');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProject() {
    const overlay = document.getElementById('projectOverlay');
    overlay.classList.remove('active');
    setTimeout(() => {
        document.body.style.overflow = 'auto';
    }, 300);
}

// Close overlay on backdrop click and ESC key
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('projectOverlay');
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay || e.target.classList.contains('overlay-backdrop')) {
                closeProject();
            }
        });
    }
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const overlay = document.getElementById('projectOverlay');
            if (overlay && overlay.classList.contains('active')) {
                closeProject();
            }
        }
    });
});