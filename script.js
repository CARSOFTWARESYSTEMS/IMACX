// Configuration - Update these if necessary
const REPO_OWNER = 'ananth'; // Replace with your GitHub username
const REPO_NAME = 'IMACX';   // Replace with your repository name
const GALLERY_PATH = 'public/gallery';

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initMobileMenu();
    initGallery();
    initLightbox();
    initActiveLinks();
});

// 1. Scroll Reveal Animation
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, {
        threshold: 0.1
    });

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });

    // Fallback if IntersectionObserver doesn't fire (e.g., some older mobile browsers)
    setTimeout(() => {
        reveals.forEach(reveal => {
            if (!reveal.classList.contains('active')) {
                reveal.classList.add('active');
            }
        });
    }, 2000);
}

// 2. Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });
}

// 3. Static Gallery Logic
function initGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;

    const items = [
        { type: 'image', file: 'Imax-image.png', folder: 'public/images/' }, // Master Logo
        { type: 'video', file: 'Video_0.mp4', folder: 'public/images/' },
        { type: 'video', file: '104.MP4', folder: 'public/gallery/', poster: '104.jpg' },
        { type: 'image', file: '100.avif', folder: 'public/gallery/' },
        { type: 'image', file: '101.avif', folder: 'public/gallery/' },
        { type: 'image', file: '101.jpg', folder: 'public/gallery/' },
        { type: 'image', file: '102.avif', folder: 'public/gallery/' },
        { type: 'image', file: '102.jpg', folder: 'public/gallery/' },
        { type: 'image', file: '103.avif', folder: 'public/gallery/' },
        { type: 'image', file: '103.jpg', folder: 'public/gallery/' },
        { type: 'image', file: '104.avif', folder: 'public/gallery/' },
        { type: 'image', file: '104.jpg', folder: 'public/gallery/' },
        { type: 'image', file: '105.avif', folder: 'public/gallery/' },
        { type: 'image', file: '106.jpg', folder: 'public/gallery/' },
        { type: 'image', file: '107.jpg', folder: 'public/gallery/' },
        { type: 'image', file: '108.avif', folder: 'public/gallery/' },
        { type: 'image', file: '109.avif', folder: 'public/gallery/' },
        { type: 'image', file: '1011.avif', folder: 'public/gallery/' },
        { type: 'image', file: '1012.avif', folder: 'public/gallery/' },
        { type: 'image', file: '1013.avif', folder: 'public/gallery/' },
        { type: 'image', file: '1014.avif', folder: 'public/gallery/' },
        { type: 'image', file: '1015.avif', folder: 'public/gallery/' },
        { type: 'image', file: '1016.avif', folder: 'public/gallery/' },
        { type: 'image', file: '1017.avif', folder: 'public/gallery/' },
        { type: 'image', file: '1018.avif', folder: 'public/gallery/' },
        { type: 'image', file: '1019.avif', folder: 'public/gallery/' },
        { type: 'image', file: '1020.avif', folder: 'public/gallery/' },
        { type: 'image', file: '1021.jpg', folder: 'public/gallery/' },
        { type: 'image', file: '1022.avif', folder: 'public/gallery/' },
        { type: 'image', file: '1023.avif', folder: 'public/gallery/' },
        { type: 'image', file: '1024.avif', folder: 'public/gallery/' },
        { type: 'image', file: 'imacx_shop2.png', folder: 'public/images/' },
        { type: 'image', file: 'Rakshith-0.jpeg', folder: 'public/images/' }
    ];

    galleryGrid.innerHTML = ''; // Clear loader

    items.forEach(item => {
        const div = document.createElement('div');
        div.className = `gallery-item reveal ${item.type === 'video' ? 'video-item' : ''}`;
        const path = `./${item.folder}${item.file}`;

        if (item.type === 'video') {
            const posterPath = item.poster ? `./${item.folder}${item.poster}` : '';
            div.innerHTML = `
                <video muted loop playsinline preload="metadata" ${posterPath ? `poster="${posterPath}"` : ''}>
                    <source src="${path}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <div class="gallery-overlay">
                    <i class="fas fa-play-circle"></i>
                </div>
            `;
            // Hover/Touch to play preview
            div.addEventListener('mouseenter', () => {
                const v = div.querySelector('video');
                if (v) v.play().catch(() => { });
            });
            div.addEventListener('mouseleave', () => {
                const v = div.querySelector('video');
                if (v) {
                    v.pause();
                    v.currentTime = 0;
                }
            });
        } else {
            div.innerHTML = `
                <img src="${path}" alt="Gallery Image ${item.file}">
                <div class="gallery-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            `;
        }

        div.addEventListener('click', () => openLightbox(path, item.file, item.type, item.poster));
        galleryGrid.appendChild(div);
    });

    // Re-run reveal for new items
    initScrollReveal();
}

// 4. Lightbox Logic
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.close-lightbox');

    if (!lightbox) return;

    closeBtn.addEventListener('click', closeLightbox);

    window.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
}

function openLightbox(src, caption, type = 'image', poster = '') {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVid = document.getElementById('lightbox-video');
    const captionText = document.getElementById('caption');

    lightbox.style.display = 'flex';
    captionText.innerHTML = caption;
    document.body.style.overflow = 'hidden'; // Block scroll

    if (type === 'video') {
        lightboxImg.style.display = 'none';
        lightboxVid.style.display = 'block';
        if (poster) {
            lightboxVid.setAttribute('poster', `./public/gallery/${poster}`);
        } else {
            lightboxVid.removeAttribute('poster');
        }
        lightboxVid.src = src;
        lightboxVid.load(); // Force load on mobile
        lightboxVid.play().catch(e => console.log("Autoplay blocked or load failed", e));
    } else {
        lightboxVid.style.display = 'none';
        lightboxVid.pause();
        lightboxImg.style.display = 'block';
        lightboxImg.src = src;
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxVid = document.getElementById('lightbox-video');
    if (!lightbox) return;

    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
    if (lightboxVid) {
        lightboxVid.pause();
        lightboxVid.src = "";
    }
}

// 5. Active Link Highlighting
function initActiveLinks() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}
