tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                },
                accent: {
                    400: '#34d399',
                    500: '#10b981',
                    600: '#059669',
                },
                dark: {
                    900: '#0f172a',
                    800: '#1e293b',
                    700: '#334155',
                    600: '#475569',
                }
            },
            fontFamily: {
                'mono': ['JetBrains Mono', 'monospace'],
                'sans': ['Inter', 'sans-serif'],
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'type': 'type 4s steps(40) infinite',
            }
        }
    }
};

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    html.classList.add('dark');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        const theme = html.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Toast Notification Utility
function showToast(message, icon = 'fas fa-check-circle', iconColor = 'text-emerald-400') {
    const toast = document.getElementById('toast-notification');
    const toastIcon = document.getElementById('toast-icon');
    const toastMsg = document.getElementById('toast-message');
    if (!toast) return;

    if (toastIcon) {
        toastIcon.className = `${icon} ${iconColor} text-lg`;
    }
    if (toastMsg) {
        toastMsg.textContent = message;
    }

    toast.classList.remove('toast-hidden');
    toast.classList.add('toast-visible');

    setTimeout(() => {
        toast.classList.remove('toast-visible');
        toast.classList.add('toast-hidden');
    }, 3200);
}

// One-Click Copy Email Functionality
function copyEmailToClipboard(email = 'ashesh.bytes@gmail.com') {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(() => {
            showToast(`Copied ${email} to clipboard!`);
        }).catch(() => fallbackCopyTextToClipboard(email));
    } else {
        fallbackCopyTextToClipboard(email);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        showToast(`Copied ${text} to clipboard!`);
    } catch (err) {
        showToast('Press Ctrl+C to copy email', 'fas fa-info-circle', 'text-blue-400');
    }
    document.body.removeChild(textArea);
}

// Attach copy handlers
document.querySelectorAll('.copy-email-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        copyEmailToClipboard();
    });
});

// Resume Modal Functionality
const resumeModal = document.getElementById('resume-modal');
const resumeIframe = document.getElementById('resume-iframe');
const resumeTitle = document.getElementById('resume-modal-title');
const resumeDownloadBtn = document.getElementById('resume-modal-download');
const resumeGithubBtn = document.getElementById('resume-modal-github');
const resumeTabSoftware = document.getElementById('resume-tab-software');
const resumeTabAi = document.getElementById('resume-tab-ai');

const resumeData = {
    software: {
        title: 'Software & Full-Stack Engineer Resume',
        pdfUrl: 'https://raw.githubusercontent.com/Ashesh88/Personal-Stuff/main/resume/Software_Ashesh.pdf',
        githubUrl: 'https://github.com/Ashesh88/Personal-Stuff/blob/main/resume/Software_Ashesh.pdf'
    },
    ai: {
        title: 'AI Automation & Cloud Engineer Resume',
        pdfUrl: 'https://raw.githubusercontent.com/Ashesh88/Personal-Stuff/main/resume/Automation_Ashesh.pdf',
        githubUrl: 'https://github.com/Ashesh88/Personal-Stuff/blob/main/resume/Automation_Ashesh.pdf'
    }
};

let activeResumeType = 'software';

function openResumeModal(type = 'software') {
    activeResumeType = type;
    switchResumeType(type);
    if (resumeModal) {
        resumeModal.classList.remove('modal-closed');
        resumeModal.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
    }
}

function closeResumeModal() {
    if (resumeModal) {
        resumeModal.classList.remove('modal-open');
        resumeModal.classList.add('modal-closed');
        document.body.style.overflow = '';
        if (resumeIframe) resumeIframe.src = 'about:blank';
    }
}

function switchResumeType(type) {
    activeResumeType = type;
    const config = resumeData[type];
    if (!config) return;

    if (resumeTitle) resumeTitle.textContent = config.title;
    if (resumeDownloadBtn) resumeDownloadBtn.href = config.pdfUrl;
    if (resumeGithubBtn) resumeGithubBtn.href = config.githubUrl;

    if (resumeIframe) {
        resumeIframe.src = `https://docs.google.com/viewer?url=${encodeURIComponent(config.pdfUrl)}&embedded=true`;
    }

    if (resumeTabSoftware && resumeTabAi) {
        if (type === 'software') {
            resumeTabSoftware.classList.add('bg-primary-600', 'text-white', 'shadow');
            resumeTabSoftware.classList.remove('text-gray-600', 'dark:text-gray-300');
            resumeTabAi.classList.remove('bg-purple-600', 'text-white', 'shadow');
            resumeTabAi.classList.add('text-gray-600', 'dark:text-gray-300');
        } else {
            resumeTabAi.classList.add('bg-purple-600', 'text-white', 'shadow');
            resumeTabAi.classList.remove('text-gray-600', 'dark:text-gray-300');
            resumeTabSoftware.classList.remove('bg-primary-600', 'text-white', 'shadow');
            resumeTabSoftware.classList.add('text-gray-600', 'dark:text-gray-300');
        }
    }
}

if (resumeTabSoftware) {
    resumeTabSoftware.addEventListener('click', () => switchResumeType('software'));
}
if (resumeTabAi) {
    resumeTabAi.addEventListener('click', () => switchResumeType('ai'));
}

// Resume Dropdown in Navbar (Click + Hover with zero disappearance bug)
const resumeDropdownBtn = document.getElementById('resume-dropdown-btn');
const resumeDropdownMenu = document.getElementById('resume-dropdown-menu');
const resumeDropdownWrapper = document.getElementById('resume-dropdown-wrapper');
const resumeDropdownArrow = document.getElementById('resume-dropdown-arrow');

if (resumeDropdownBtn && resumeDropdownMenu) {
    // Toggle on button click
    resumeDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = resumeDropdownMenu.classList.contains('hidden');
        if (isHidden) {
            resumeDropdownMenu.classList.remove('hidden');
            if (resumeDropdownArrow) resumeDropdownArrow.style.transform = 'rotate(180deg)';
        } else {
            resumeDropdownMenu.classList.add('hidden');
            if (resumeDropdownArrow) resumeDropdownArrow.style.transform = 'rotate(0deg)';
        }
    });

    // Smooth hover behavior without gap flicker
    if (resumeDropdownWrapper) {
        resumeDropdownWrapper.addEventListener('mouseenter', () => {
            resumeDropdownMenu.classList.remove('hidden');
            if (resumeDropdownArrow) resumeDropdownArrow.style.transform = 'rotate(180deg)';
        });
        resumeDropdownWrapper.addEventListener('mouseleave', () => {
            resumeDropdownMenu.classList.add('hidden');
            if (resumeDropdownArrow) resumeDropdownArrow.style.transform = 'rotate(0deg)';
        });
    }

    // Close when clicking anywhere outside
    document.addEventListener('click', (e) => {
        if (resumeDropdownWrapper && !resumeDropdownWrapper.contains(e.target)) {
            resumeDropdownMenu.classList.add('hidden');
            if (resumeDropdownArrow) resumeDropdownArrow.style.transform = 'rotate(0deg)';
        }
    });
}

document.querySelectorAll('.open-resume-preview').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (resumeDropdownMenu) {
            resumeDropdownMenu.classList.add('hidden');
            if (resumeDropdownArrow) resumeDropdownArrow.style.transform = 'rotate(0deg)';
        }
        const type = btn.getAttribute('data-resume-type') || 'software';
        openResumeModal(type);
    });
});

const closeResumeModalBtn = document.getElementById('close-resume-modal');
if (closeResumeModalBtn) {
    closeResumeModalBtn.addEventListener('click', closeResumeModal);
}
if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
        if (e.target === resumeModal) closeResumeModal();
    });
}

// Project Category Filter Tabs (Topic-Wise, Discrete, No "All")
const categoryButtons = document.querySelectorAll('.category-btn');
const projectCards = document.querySelectorAll('.project-card-item');

function filterProjectsByCategory(category) {
    categoryButtons.forEach(btn => {
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('bg-primary-600', 'text-white', 'shadow-md');
            btn.classList.remove('bg-white', 'dark:bg-dark-700', 'text-gray-700', 'dark:text-gray-300');
        } else {
            btn.classList.remove('bg-primary-600', 'text-white', 'shadow-md');
            btn.classList.add('bg-white', 'dark:bg-dark-700', 'text-gray-700', 'dark:text-gray-300');
        }
    });

    projectCards.forEach(card => {
        if (card.getAttribute('data-category') === category) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

if (categoryButtons.length) {
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            filterProjectsByCategory(category);
        });
    });

    // Default to 'ai' or first category
    const activeBtn = document.querySelector('.category-btn.bg-primary-600') || categoryButtons[0];
    if (activeBtn) {
        filterProjectsByCategory(activeBtn.getAttribute('data-category'));
    }
}

// Keyboard shortcuts (Escape closes modal)
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeResumeModal();
    }
});

// Back to top button
const backToTopButton = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Typing effect for hero title
const typingText = document.querySelector('.typing-cursor');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 90);
        }
    };
    setTimeout(typeWriter, 500);
}

// Form submission feedback
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    contactForm.addEventListener('submit', function() {
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn) {
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            submitBtn.disabled = true;
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}
