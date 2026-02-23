/* =====================================================
   ELECTROTERM — main.js
   Mobile-first interactions
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar: scroll shadow ── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Navbar: hamburger ── */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNav    = document.getElementById('mobileNav');

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      mobileNav.classList.toggle('open', !isOpen);
      hamburgerBtn.classList.toggle('open', !isOpen);
      hamburgerBtn.setAttribute('aria-expanded', String(!isOpen));
      mobileNav.setAttribute('aria-hidden', String(isOpen));
    });

    /* Close mobile nav on link click */
    mobileNav.querySelectorAll('.navbar__mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburgerBtn.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });
  }

  /* ── Accordion (Servicios) ── */
  const accordionItems = document.querySelectorAll('.accordion__item');

  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion__trigger');
    const body    = item.querySelector('.accordion__body');

    if (!trigger || !body) return;

    /* Init: if item has open class, set max-height */
    if (item.classList.contains('accordion__item--open')) {
      body.style.maxHeight = body.scrollHeight + 'px';
    }

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      /* Close all */
      accordionItems.forEach(i => {
        const t = i.querySelector('.accordion__trigger');
        const b = i.querySelector('.accordion__body');
        if (t && b) {
          t.setAttribute('aria-expanded', 'false');
          b.style.maxHeight = null;
          i.classList.remove('accordion__item--open');
        }
      });

      /* Open clicked if it was closed */
      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        body.style.maxHeight = body.scrollHeight + 'px';
        item.classList.add('accordion__item--open');
      }
    });
  });

  /* ── Slider (Obras) ── */
  const slides = [
    { img: 'img/proyectos/usal_cba.webp',                     label: 'Universidad del Salvador - Sede Córdoba' },
    { img: 'img/proyectos/sap.webp',                          label: 'SAP - Munro' },
    { img: 'img/proyectos/aeropuertos_argentina.webp',        label: 'Aeropuertos Argentina 2000 - Ezeiza' },
    { img: 'img/proyectos/central_dock_sud.webp',             label: 'Central Térmica Dock Sud' },
    { img: 'img/proyectos/parque_de_la_costa.webp',           label: 'Parque de la Costa' },
    { img: 'img/proyectos/residencia_armada.webp',            label: 'Residencia Sub Oficiales de la Armada Argentina' },
    { img: 'img/proyectos/poder_judicial.webp',               label: 'Poder Judicial de la Nación Argentina' },
    { img: 'img/proyectos/ifibyne.webp',                      label: 'IFIBYNE - CONICET - Ciudad Universitaria' },
    { img: 'img/proyectos/hospital_materno_teresa.webp',      label: 'Hospital Materno Infantil Teresa Luisa Germani' },
    { img: 'img/proyectos/galicia.webp',                      label: 'Banco Galicia - Casa Matriz' },
    { img: 'img/proyectos/subte_linea_h.webp',                label: 'Subte - Buenos Aires Ciudad - Línea H' },
    { img: 'img/proyectos/oracle_pilar.webp',                 label: 'Oracle - Parque Austral Pilar' },
    { img: 'img/proyectos/johnson_mattey.webp',               label: 'Johnson Mattey - Parque Industrial Pilar' },
    { img: 'img/proyectos/hospital_marie_curie.webp',         label: 'Hospital Oncológico Marie Curie' },
    { img: 'img/proyectos/dock_del_plata2.webp',              label: 'Dock del Plata - Puerto Madero' },
    { img: 'img/proyectos/burgerking_shopping.webp',          label: 'BurgerKing - Shopping Alto Avellaneda' },
    { img: 'img/proyectos/storey.webp',                       label: 'Storey - Beccar' },
    { img: 'img/proyectos/bolsa_de_comercio.webp',            label: 'Bolsa de Comercio de Buenos Aires' },
    { img: 'img/proyectos/centro_monitoreo_movilidad.webp',   label: 'Centro de Monitoreo y Movilidad Urbana' },
    { img: 'img/proyectos/coop_floricultores.webp',           label: 'Cooperativa Argentina de Floricultored LTDA' },
    { img: 'img/proyectos/johnson.webp',                      label: 'Tiendas Johnson' },
    { img: 'img/proyectos/lab_glaxo.webp',                    label: 'Laboratorios Glaxo' },
    { img: 'img/proyectos/aysa.webp',                         label: 'Aguas Argentinas - Centro de Cómputos' },
    { img: 'img/proyectos/macro.webp',                        label: 'Banco Macro' },
    { img: 'img/proyectos/farmacia_iosfa.webp',               label: 'Farmacia Hospital Naval Pedro Mallo' },
    { img: 'img/proyectos/polka.webp',                        label: 'Pol-Ka Producciones' },
    { img: 'img/proyectos/ort.webp',                          label: 'Escuela ORT - Sede Núñez' },
    { img: 'img/proyectos/ypf_alcorta.webp',                  label: 'YPF - Av. Figueroa Alcorta' },
    { img: 'img/proyectos/teatro_ribera.webp',                label: 'Teatro de la Ribera' },
    { img: 'img/proyectos/teba_andreani.webp',                label: 'Terminal de Ómnibus de Retiro - Andreani Bus' },
    { img: 'img/proyectos/burgerking_once.webp',              label: 'BurgerKing - Once' },
    { img: 'img/proyectos/cemic.webp',                        label: 'CEMIC - Barrio Norte' },
    { img: 'img/proyectos/usal_marcelot.webp',                label: 'Universidad del Salvador - Sede Marcelo T.' },
    { img: 'img/proyectos/burgerking_villa_urquiza.webp',     label: 'BurgerKing - Villa Urquiza' },
    { img: 'img/proyectos/italiano.webp',                     label: 'Centro Odontológico Hospital Italiano' },
    { img: 'img/proyectos/puma_cordoba.webp',                 label: 'Puma Energy - Av. Córdoba' },
    { img: 'img/proyectos/ypf_paraguay.webp',                 label: 'YPF - Recoleta' },

  ];

  let currentSlide = 0;
  const sliderEl   = document.getElementById('obrasSlider');
  const prevBtn    = document.getElementById('prevSlide');
  const nextBtn    = document.getElementById('nextSlide');

  const renderSlide = (idx) => {
    if (!sliderEl) return;
    const s = slides[idx];
    sliderEl.innerHTML = `
      <div class="obras__slide">
        <img src="${s.img}" alt="${s.label}" class="obras__img placeholder-img" />
        <span class="obras__img-label label-sm">${s.label}</span>
      </div>`;
  };

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      renderSlide(currentSlide);
    });
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      renderSlide(currentSlide);
    });
  }

  /* ── Counter Animation (Stats) ── */
  const counterElements = document.querySelectorAll('.stats__number');
  
  const animateCounter = (element) => {
    const target = parseInt(element.textContent.replace(/\D/g, '')); // Extract number
    const prefix = element.textContent.match(/[^\d]/g)?.[0] || ''; // Extract +
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = prefix + Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = prefix + target;
      }
    };
    
    updateCounter();
  };
  
  // Intersection Observer to trigger animation when in viewport
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target.querySelector('.stats__number');
        if (counter && !counter.classList.contains('animated')) {
          counter.classList.add('animated');
          animateCounter(counter);
        }
      }
    });
  }, { threshold: 0.5 });
  
  // Observe each stats item
  document.querySelectorAll('.stats__item').forEach(item => {
    statsObserver.observe(item);
  });

  /* ── Smooth-scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Contact form: basic UX feedback ── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Enviado ✓';
      btn.disabled = true;
      btn.style.background = 'var(--teal)';
      setTimeout(() => {
        btn.textContent = 'Enviar Consulta';
        btn.disabled = false;
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }

  /* =============================================
   CLIENTES CAROUSEL - AUTO-SCROLL CONTINUO
   Movimiento constante suave + control por teclado
   ============================================= */

// Agregar esto dentro del DOMContentLoaded en main.js

const clientesCarousel = () => {
  const track = document.getElementById('clientesTrack');
  if (!track) return;
  
  // Obtener logos originales
  const originalLogos = Array.from(track.children);
  if (originalLogos.length === 0) return;
  
  // Duplicar logos para crear loop infinito
  // Duplicamos 3 veces para asegurar que siempre haya contenido visible
  const duplicateLogos = () => {
    // Limpiar clones previos si existen
    track.querySelectorAll('.cloned').forEach(el => el.remove());
    
    // Clonar y agregar 3 veces
    for (let i = 0; i < 3; i++) {
      originalLogos.forEach(logo => {
        const clone = logo.cloneNode(true);
        clone.classList.add('cloned');
        track.appendChild(clone);
      });
    }
  };
  
  duplicateLogos();
  
  // Variables de control
  let position = 0;
  let speed = 0.3; // Velocidad base (píxeles por frame) - LENTO para ver logos
  let animationFrame;
  let isPaused = false;
  
  // Función de animación
  const animate = () => {
    if (!isPaused) {
      position -= speed;
      
      // Calcular ancho de un set completo de logos
      const trackWidth = track.scrollWidth / 4; // Dividido por 4 porque duplicamos 3 veces
      
      // Cuando llegamos al final del primer set, reseteamos sin que se note
      if (Math.abs(position) >= trackWidth) {
        position = 0;
      }
      
      track.style.transform = `translateX(${position}px)`;
    }
    
    animationFrame = requestAnimationFrame(animate);
  };
  
  // Iniciar animación
  animate();
  
  // Pausar/reanudar con hover
  track.addEventListener('mouseenter', () => {
    isPaused = true;
  });
  
  track.addEventListener('mouseleave', () => {
    isPaused = false;
  });
  
  // Control por teclado
  let keyPressTimeout;
  let tempSpeedBoost = 0;
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      // Adelantar: aumentar velocidad temporalmente
      tempSpeedBoost = 3; // Boost de velocidad
      speed = 2 + tempSpeedBoost;
      
      clearTimeout(keyPressTimeout);
      keyPressTimeout = setTimeout(() => {
        tempSpeedBoost = 0;
        speed = 2; // Volver a velocidad normal
      }, 300);
    } 
    else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      // Retroceder: saltar hacia atrás
      position += 200; // Saltar 200px hacia atrás
    }
  });
  
  // Regenerar clones en resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      duplicateLogos();
    }, 250);
  });
  
  // Cleanup
  return () => {
    cancelAnimationFrame(animationFrame);
  };
};

// Llamar la función
clientesCarousel();

});