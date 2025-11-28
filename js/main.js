// Navegação responsiva
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do menu
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle do menu mobile
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            document.body.classList.toggle('overflow-hidden');
        });
    }

    const progressBar = document.getElementById('progress-bar');
    const progressPercentage = document.getElementById('progress-percentage');

    // start at 0% on ago, 2024-08-01
    const startDate = new Date('2024-07-01');
    const endDate = new Date('2027-06-30');
    const now = new Date();

    const totalDuration = endDate - startDate;
    const elapsedDuration = now - startDate;

    let progress = Math.max(0, Math.min(100, (elapsedDuration / totalDuration) * 100));

    if (progressBar) {
        progressBar.style.width = progress + '%';
    }

    if (progressPercentage) {
        progressPercentage.textContent = Math.floor(progress);
    }

    const currentSemester = document.getElementById('current-semester');
    if (currentSemester) {
        const startYear = startDate.getFullYear();
        const nowYear = now.getFullYear();
        const yearDiff = nowYear - startYear;
        const month = now.getMonth(); // 0-11

        let semester = yearDiff * 2; // 2 semesters per year
        if (month >= 6) { // after June
            semester += 1;
        } else {
            semester += 0;
        }

        semester++; // semesters start at 1

        semester = Math.min(semester + 1, 10); // max 10 semesters

        currentSemester.textContent = semester + 'º';
    }

    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    const ageElements = document.querySelectorAll('.age');
    if (ageElements.length > 0) {
        const birthDate = new Date('2003-03-18');
        let age = now.getFullYear() - birthDate.getFullYear();
        const monthDiff = now.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
            age--;
        }

        ageElements.forEach(el => {
            el.textContent = age;
        });
    }

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }
            
            // Remover classe active de todos os links
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // Adicionar classe active ao link clicado
            this.classList.add('active');
        });
    });
    
    // Destacar link ativo com base na seção visível
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        let scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.add('active');
            } else {
                document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.remove('active');
            }
        });
    });
    
    // Animação de entrada para elementos
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
});

