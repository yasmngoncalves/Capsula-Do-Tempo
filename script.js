const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const nextButton = document.getElementById('next-button');
const sendButton = document.getElementById('send-button');
const formContainer = document.querySelector('.form-container');
const successMessage = document.getElementById('success-message');
const textarea = document.getElementById('message');
const charCount = document.getElementById('char-count');
const yearSpan = document.getElementById('current-year');

// Botão "Próximo"
nextButton.addEventListener('click', () => {
    const message = textarea.value;

    // Verifica se a mensagem foi preenchida
    if (message.trim() === '') {
        alert('Por favor, escreva sua mensagem para continuar.');
        return;
    }

    // Oculta etapa 1 e exibe etapa 2
    step1.style.display = 'none';
    step2.style.display = 'block';
});

// Botão "Enviar"
sendButton.addEventListener('click', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = textarea.value;

    // Verifica se os campos estão preenchidos
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        alert('Por favor, preencha todos os campos para enviar sua mensagem.');
        return;
    }

    // Captura a data de envio e formata
    const sendDate = new Date();
    const sendDateFormatted = sendDate.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    // Parâmetros para o template do EmailJS
    const templateParams = {
        to_name: name,
        to_email: email,
        message: message,
        send_date: sendDateFormatted
    };

    // Envia o email com EmailJS
    emailjs.send('service_r7xdpzp', 'template_vm8i3kf', templateParams)
        .then((response) => {
            console.log('Email enviado com sucesso!', response.status, response.text);
            showSuccessMessage(name, sendDateFormatted);   
        }, (error) => {
            console.error('Erro ao enviar email:', error);
            alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
        });
});

// Função para exibir a mensagem de sucesso
function showSuccessMessage(name, sendDateFormatted) { 
    const currentDate = new Date(); 
    const deliveryDate = new Date(); 
    deliveryDate.setFullYear(currentDate.getFullYear() + 1); 
    
    const deliveryDateFormatted = deliveryDate.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
    });

    const finalMessageTitle = document.getElementById('final-message-title'); 
    const finalMessageDetails = document.getElementById('final-message-details'); 

    finalMessageTitle.textContent = `Mensagem enviada com sucesso, ${name}! 🎉`;
    finalMessageDetails.textContent = `Sua Cápsula do Tempo está oficialmente guardada! No dia ${deliveryDateFormatted}, seu eu do futuro terá o privilégio de revisitar essas palavras especiais. A mensagem foi enviada em ${sendDateFormatted}. Nos vemos no futuro!`; 
    
    // Esconde o formulário e exibe a mensagem de sucesso
    formContainer.style.display = 'none'; 
    successMessage.style.display = 'block';
}

// Contador de caracteres
textarea.addEventListener('input', () => {
    const remaining = 3500 - textarea.value.length;
    charCount.textContent = `${remaining} caracteres restantes`;
});

// Atualiza o ano automaticamente no footer
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;
