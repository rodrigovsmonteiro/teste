document.addEventListener('DOMContentLoaded', async function () {
    function setupDropdown(buttonId, dropdownId, iconId, rotateClass = 'rotate-180') {
        const button = document.getElementById(buttonId);
        const dropdown = document.getElementById(dropdownId);
        const icon = document.getElementById(iconId);

        if (button && dropdown && icon) {
            function showDropdown() {
                dropdown.style.display = 'block';
                icon.classList.add(rotateClass);
            }

            function hideDropdown() {
                dropdown.style.display = 'none';
                icon.classList.remove(rotateClass);
            }

            button.addEventListener('mouseenter', showDropdown);
            button.addEventListener('mouseleave', function () {
                setTimeout(function () {
                    if (!dropdown.matches(':hover')) {
                        hideDropdown();
                    }
                }, 200);
            });

            button.addEventListener('click', function () {
                if (dropdown.style.display === 'block') {
                    hideDropdown();
                } else {
                    showDropdown();
                }
            });

            dropdown.addEventListener('mouseleave', hideDropdown);
            dropdown.addEventListener('mouseenter', showDropdown);
        } else {
            console.log(`Elementos não encontrados: ${buttonId}, ${dropdownId}, ${iconId}`);
        }
    }

    function setupMobileDropdown(buttonId, dropdownId, iconId, rotateClass = 'rotate-180') {
        const button = document.getElementById(buttonId);
        const dropdown = document.getElementById(dropdownId);
        const icon = document.getElementById(iconId);

        if (button && dropdown && icon) {
            function toggleDropdown() {
                if (dropdown.style.display === 'block') {
                    dropdown.style.display = 'none';
                    icon.classList.remove(rotateClass);
                } else {
                    dropdown.style.display = 'block';
                    icon.classList.add(rotateClass);
                }
            }

            button.addEventListener('click', toggleDropdown);
        } else {
            console.log(`Elementos não encontrados: ${buttonId}, ${dropdownId}, ${iconId}`);
        }
    }

    setupDropdown('services-button', 'services-dropdown', 'dropdown-icon-services');
    setupDropdown('consultoria-button', 'consultoria-dropdown', 'dropdown-icon-consultoria', 'rotate-right');
    setupDropdown('blog-button', 'blog-dropdown', 'dropdown-icon-blog');

    setupMobileDropdown('mobile-services-button', 'mobile-services-dropdown', 'mobile-services-icon');
    setupMobileDropdown('mobile-consultoria-button', 'mobile-consultoria-dropdown', 'mobile-consultoria-icon');
    setupMobileDropdown('mobile-blog-button', 'mobile-blog-dropdown', 'mobile-blog-icon');

    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    const menuButton = document.getElementById('menu-button');
    const menu = document.getElementById('menu');
    if (menuButton && menu) {
        menuButton.addEventListener('click', function () {
            menu.classList.toggle('hidden');
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href !== "#") {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                } else {
                    console.log(`Elemento não encontrado para href: ${href}`);
                }
            }
        });
    });

    ScrollReveal().reveal('.reveal', {
        duration: 1000,
        distance: '50px',
        easing: 'ease-out',
        origin: 'bottom',
        reset: true
    });
    ScrollReveal().reveal('.reveal-rotate', {
        duration: 2000,
        rotate: { x: 0, y: 80, z: 0 },
        opacity: 0.5,
        reset: true
    });
    ScrollReveal().reveal('.reveal-scale', {
        duration: 2500,
        scale: 0.8,
        reset: true
    });

    const questions = document.querySelectorAll('.question');
    const answers = document.querySelectorAll('.answer');
    questions.forEach((question, index) => {
        question.addEventListener('click', () => {
            answers.forEach((answer, i) => {
                if (i !== index) {
                    answer.classList.add('hidden');
                    questions[i].classList.remove('text-sky-600');
                    questions[i].classList.add('text-gray-800');
                }
            });
            const answer = question.nextElementSibling;
            answer.classList.toggle('hidden');
            question.classList.toggle('text-sky-600');
            question.classList.toggle('text-gray-800');
        });
    });

    const words = ["sua empresa", "você", "suas demandas", "suas necessidades contábeis"];
    let currentIndex = 0;
    const wordToReplace = document.getElementById("wordToReplace");
    const typingSpan = wordToReplace?.querySelector(".typing");
    function changeWord() {
        const word = words[currentIndex];
        let currentLength = 0;
        const intervalId = setInterval(() => {
            if (currentLength <= word.length) {
                typingSpan.textContent = word.slice(0, currentLength);
                currentLength++;
            } else {
                clearInterval(intervalId);
                setTimeout(() => {
                    currentIndex = (currentIndex + 1) % words.length;
                    changeWord();
                }, 2000);
            }
        }, 100);
    }
    if (typingSpan) changeWord();

    const navbarFooter = document.getElementById('navbarfooter');
    const homeSection = document.getElementById('client');
    const footer = document.getElementById('footer');
    if (navbarFooter && homeSection && footer) {
        const homeSectionHeight = homeSection.offsetTop + homeSection.offsetHeight;
        const footerTop = footer.offsetTop;
        function checkScroll() {
            const scrolled = window.scrollY + window.innerHeight;
            if (scrolled > homeSectionHeight || scrolled > footerTop) {
                navbarFooter.classList.remove('hidden');
            } else {
                navbarFooter.classList.add('hidden');
            }
        }
        window.addEventListener('scroll', checkScroll);
    }

    function setupModal(openLinkClass, closeButtonId, modalId) {
        const openLinks = document.querySelectorAll(`.${openLinkClass}`);
        const closeButton = document.getElementById(closeButtonId);
        const modal = document.getElementById(modalId);

        openLinks.forEach(openLink => {
            openLink.addEventListener('click', function (e) {
                e.preventDefault();
                modal.classList.remove('hidden');
                modal.classList.add('flex');
            });
        });

        if (closeButton) {
            closeButton.addEventListener('click', function () {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            });
        }

        window.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }
        });

        window.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }
        });
    }

    setupModal('open-contact-modal', 'closeContactModal', 'contactModal');
    setupModal('open-call-modal', 'closeCallModal', 'callModal');
    setupModal('open-company-modal', 'closeModalForm', 'modalForm');
    setupModal('open-bpo-modal', 'closeBpoModal', 'bpoModal');
    setupModal('open-consultoria-modal', 'closeConsultoriaModal', 'consultoriaModal');
    setupModal('open-consultoria-contabil-modal', 'closeConsultoriaContabilModal', 'consultoriaContabilModal');
    setupModal('open-consultoria-dp-modal', 'closeConsultoriaDpModal', 'consultoriaDpModal');
    setupModal('open-completa-modal', 'closeCompletaModal', 'completaModal');  // Adicionado
    setupModal('open-trocar-modal', 'closeTrocarModal', 'trocarModal');


    $(document).ready(function () {
        $('#callPhone').inputmask('(99) 99999-9999');
        $('#contactPhone').inputmask('(99) 99999-9999');
        $('#phone').inputmask('(99) 99999-9999');
        $('#bpoPhone').inputmask('(99) 99999-9999');
        $('#consultoriaPhone').inputmask('(99) 99999-9999');
        $('#consultoriaContabilPhone').inputmask('(99) 99999-9999');
        $('#consultoriaDpPhone').inputmask('(99) 99999-9999');
        $('#completaPhone').inputmask('(99) 99999-9999');  // Adicionado
        $('#trocarPhone').inputmask('(99) 99999-9999');
    });

    // Função para redirecionar para o WhatsApp
    function redirectToWhatsApp(name) {
        const message = `Olá, meu nome é ${name} e estou interessado nos serviços da AOB Contábil.`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://api.whatsapp.com/send?phone=551123394043&text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
    }

    // Função para formatar o número de telefone
    function formatPhoneNumber(number) {
        // Remover o prefixo do código do país
        const countryPrefix = number.slice(0, 3); // Exemplo: +55
        const localNumber = number.slice(3); // O restante do número
        // Formatar o número local
        const formattedNumber = localNumber.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        return `${countryPrefix} ${formattedNumber}`;
    }

    // Função para obter o número de telefone formatado com intl-tel-input
    function getFormattedPhoneNumber(inputId) {
        const input = document.getElementById(inputId);
        const iti = window.intlTelInputGlobals.getInstance(input);
        const number = iti.getNumber(intlTelInputUtils.numberFormat.E164); // Formato E.164
        return formatPhoneNumber(number);
    }

    function sendFormData(formId, modalId, serviceType) {
        const form = document.getElementById(formId);
        const modal = document.getElementById(modalId);
        if (form) {
            // Inicializar intl-tel-input
            const phoneInput = form.querySelector("input[type='tel']");
            const iti = window.intlTelInput(phoneInput, {
                initialCountry: "br",
                separateDialCode: true,
                utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
            });

            form.addEventListener('submit', function (e) {
                e.preventDefault();
                const comunicacoesValue = form.querySelector("input[type='checkbox']").value;
                const formattedComunicacoes = comunicacoesValue === 'on' ? 'aceito' : comunicacoesValue;
                const name = form.querySelector("input[name='name']").value;
                const company = form.querySelector("input[name='company']").value || 'Não informado';
                const phone = getFormattedPhoneNumber(phoneInput.id);
                const whats = iti.getNumber().replace('+', '');
                const email = form.querySelector("input[name='email']").value;
                const atividade = form.querySelector("textarea[name='atividade']") ? form.querySelector("textarea[name='atividade']").value : 'Não informado';
                const message = `Entrou em contato pelo formulário de Solicitação de ${serviceType}` + '\n'
                    + 'Eu concordo em receber comunicações: ' + formattedComunicacoes + '\n'
                    + 'Atividade da Empresa: ' + atividade + '\n';
                sendEmailJS(name, company, phone, email, message, whats);
                modal.classList.add('hidden');
            });
        }
    }

    sendFormData('contactForm', 'contactModal', 'Contato');
    sendFormData('callForm', 'callModal', 'Ligamos para Você');
    sendFormData('aberturaForm', 'modalForm', 'Abertura de Empresa');
    sendFormData('bpoForm', 'bpoModal', 'BPO Financeiro');
    sendFormData('consultoriaForm', 'consultoriaModal', 'Consultoria Tributária');
    sendFormData('consultoriaContabilForm', 'consultoriaContabilModal', 'Consultoria Contábil');
    sendFormData('consultoriaDpForm', 'consultoriaDpModal', 'Consultoria Departamento Pessoal');
    sendFormData('completaForm', 'completaModal', 'Contabilidade Completa');  // Adicionado
    sendFormData('trocarForm', 'trocarModal', 'Troca de Contador');


    // Função para enviar email com EmailJS
    function sendEmailJS(name, company, phone, email, message, whats) {
        emailjs.send('service_wd3r7wa', 'template_ok23xoe', {
            nome: name || 'Não informado',
            empresa: company || 'Não informado',
            celular: phone || 'Não informado',
            mensagem: message || 'Mensagem do formulário de contato.',
            email: email || 'Não informado',
            whats: whats || 'Não informado'
        }, 'd8ZO2TKpYA3JYEHHP')
            .then((response) => {
                console.log('Email enviado com sucesso!', response.status, response.text);
            }, (error) => {
                console.error('Falha ao enviar email:', error);
            });
    }
});
