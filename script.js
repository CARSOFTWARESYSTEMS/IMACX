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
        { type: 'video', file: '104.MP4', folder: 'public/gallery/' },
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
        { type: 'image', file: '1021.avif', folder: 'public/gallery/' },
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
        const path = `${item.folder}${item.file}`;

        if (item.type === 'video') {
            div.innerHTML = `
                <video src="${path}" muted loop playsinline></video>
                <div class="gallery-overlay">
                    <i class="fas fa-play-circle"></i>
                </div>
            `;
            // Hover to play preview
            div.addEventListener('mouseenter', () => div.querySelector('video').play());
            div.addEventListener('mouseleave', () => {
                const v = div.querySelector('video');
                v.pause();
                v.currentTime = 0;
            });
        } else {
            div.innerHTML = `
                <img src="${path}" alt="Gallery Image ${item.file}" loading="lazy">
                <div class="gallery-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            `;
        }

        div.addEventListener('click', () => openLightbox(path, item.file, item.type));
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

function openLightbox(src, caption, type = 'image') {
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
        lightboxVid.src = src;
        lightboxVid.play();
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
