function toggleChat() {
    const chatbot = document.querySelector('.chatbot');
    chatbot.classList.toggle('hidden');
}

function normalizeInput(input) {
    return input
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")  
        .replace(/[!?.]/g, "")            
        .trim();
}

function sendMessage() {
    const inputField = document.getElementById('user-input');
    const rawInput = inputField.value.trim();
    if (rawInput === '') return;

    const input = normalizeInput(rawInput);
    const chatBody = document.getElementById('chat-body');

    
    const userMessage = document.createElement('div');
    userMessage.className = 'user-message';
    userMessage.innerText = rawInput;

    const time = document.createElement('small');
    time.style.display = 'block';
    time.style.fontSize = '0.7rem';
    time.style.opacity = '0.6';
    time.style.marginTop = '2px';
    time.innerText = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    userMessage.appendChild(time);

    chatBody.appendChild(userMessage);

    const typing = document.createElement('div');
    typing.className = 'bot-message';
    typing.innerText = 'Digitando...';
    chatBody.appendChild(typing);
    chatBody.scrollTop = chatBody.scrollHeight;

    const botResponse = getBotResponse(input);

    const delay = 500 + Math.min(rawInput.length * 20, 2000);
    setTimeout(() => {
        typing.remove();

        
        const botMessage = document.createElement('div');
        botMessage.className = 'bot-message';
        botMessage.innerHTML = botResponse;

        const timeBot = document.createElement('small');
        timeBot.style.display = 'block';
        timeBot.style.fontSize = '0.7rem';
        timeBot.style.opacity = '0.6';
        timeBot.style.marginTop = '2px';
        timeBot.innerText = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        botMessage.appendChild(timeBot);

        chatBody.appendChild(botMessage);
        chatBody.scrollTop = chatBody.scrollHeight;

        
        const cadastroKeywords = ['cadastro', 'cadastrar', 'quero me cadastrar'];
        if (cadastroKeywords.some(keyword => input.includes(keyword))) {
            abrirModalCadastro();
        }

    }, delay);

    inputField.value = '';
    verificarFimDeConversa(input);
}



document.getElementById('user-input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function getBotResponse(input) {
    const categorias = [
        {
            palavras: ['ola', 'oi', 'bom dia', 'boa tarde', 'boa noite'],
            respostas: [
                'Olá! Como posso te ajudar?',
                'Oi! Em que posso ajudar hoje?',
                'Seja bem-vindo ao nosso site!'
            ],
        },
        {
            palavras: ['servico', 'servicos', 'o que voces fazem', 'oferecem'],
            respostas: [
                'Oferecemos soluções em TI, cloud, suporte, ERP, e muito mais.',
                'Temos serviços de implantação de sistemas, suporte técnico, análise de dados e nuvem.',
            ],
        },
        {
            palavras: ['contato', 'telefone', 'email', 'whatsapp'],
            respostas: [
                'Você pode falar com a gente por e-mail: <a href="mailto:contato@unitech.com.br">contato@unitech.com.br</a><br>Ou no WhatsApp: <a href="https://wa.me/5511989399904" target="_blank">(11) 93759-5792</a>'
            ],
        },
        {
            palavras: ['suporte', 'ajuda', 'problema', 'erro'],
            respostas: [
                'Nosso suporte funciona 24h. Por favor, descreva seu problema.',
                'Conte com a gente! Estamos disponíveis para suporte o tempo todo.'
            ],
        },
        {
            palavras: ['obrigado', 'valeu', 'agradecido'],
            respostas: [
                'De nada! 😊',
                'Estamos à disposição!',
                'Fico feliz em ajudar!'
            ],
        },
        {
            palavras: ['cadastro', 'cadastrar', 'quero me cadastrar'],
            respostas: [
                'Claro! Vou abrir o formulário de cadastro para você.'
            ],
        },
        {
            palavras: ['agro', 'sobre', 'startups', 'setor agro'],
            respostas: [
                'Somos especialistas em soluções de TI voltadas para o setor agro e startups! 🌱<br>Oferecemos: ERPs agrícolas, automação de processos e integração com IoT.'
            ],
        }
    ];

    let respostas = [];

    for (let categoria of categorias) {
        for (let palavra of categoria.palavras) {
            if (new RegExp(`\\b${palavra}\\b`).test(input)) {
                const respostaAleatoria = categoria.respostas[Math.floor(Math.random() * categoria.respostas.length)];
                respostas.push(respostaAleatoria);
                break; 
            }
        }
    }

    if (respostas.length > 0) {
        return respostas.join('<br>');
    }

    return 'Desculpe, não entendi. Tente perguntar sobre <strong>"serviços"</strong>, <strong>"contato"</strong> ou <strong>"suporte"</strong>.';
}


    function verificarFimDeConversa(input) {
        const fimDeConversa = ['obrigado', 'valeu', 'agradecido', 'até mais', 'tchau'];
        for (let fim of fimDeConversa) {
            if (input.includes(fim)) {
                exibirResumoConversa();
                break;
            }
        }
    }

    function exibirResumoConversa() {
        const mensagens = document.querySelectorAll('#chat-body .user-message, #chat-body .bot-message');
        let resumo = '';
        mensagens.forEach(msg => {
            resumo += '• ' + msg.innerText.trim() + '\n';
        });

        abrirModalResumo(resumo);
    }


function abrirModal() {
    document.getElementById('cadastroModal').classList.remove('hidden');
}

function fecharModal() {
    document.getElementById('cadastroModal').classList.add('hidden');
}

window.onload = () => {
    const chatBody = document.getElementById('chat-body');
    const botMessage = document.createElement('div');
    botMessage.className = 'bot-message';
    botMessage.innerHTML = 'Olá! 👋 Sou a assistente virtual da UNITECH. Como posso ajudar?';
    chatBody.appendChild(botMessage);
};

 function abrirModalCadastro() {
            document.getElementById('cadastroModal').classList.remove('hidden');
       }

        function abrirModalResumo(mensagem) {
            document.getElementById('resumoModal').classList.remove('hidden');
            document.getElementById('resumoTexto').innerText = mensagem;
        }

        function fecharModal() {
            document.getElementById('cadastroModal').classList.add('hidden');
            document.getElementById('resumoModal').classList.add('hidden');
        }

function abrirCadastro() {
  document.getElementById("cadastroModal").style.display = "block";
  document.getElementById("formularioEmpresa").style.display = "block";
  document.getElementById("resumoEmpresa").style.display = "none";
  document.getElementById("mensagemFinal").style.display = "none";
  document.getElementById("btnProximo").style.display = "inline-block";
  document.getElementById("btnConfirmar").style.display = "none";
  document.getElementById("btnEditar").style.display = "none";
}

function fecharCadastro() {
  document.getElementById("cadastroModal").style.display = "none";
}

function validarFormulario() {
  const cnpj = document.getElementById("cnpj").value.trim();
  const nome = document.getElementById("nomeEmpresa").value.trim();
  const ramo = document.getElementById("ramo").value.trim();
  const localidade = document.getElementById("localidade").value.trim();

  if (!cnpj || !nome || !ramo || !localidade) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  document.getElementById("formularioEmpresa").style.display = "none";
  document.getElementById("resumoEmpresa").style.display = "block";

  document.getElementById("resumoCnpj").textContent = cnpj;
  document.getElementById("resumoNome").textContent = nome;
  document.getElementById("resumoRamo").textContent = ramo;
  document.getElementById("resumoLocalidade").textContent = localidade;

  document.getElementById("btnProximo").style.display = "none";
  document.getElementById("btnConfirmar").style.display = "inline-block";
  document.getElementById("btnEditar").style.display = "inline-block";
}

function editarCadastro() {
  document.getElementById("formularioEmpresa").style.display = "block";
  document.getElementById("resumoEmpresa").style.display = "none";
  document.getElementById("btnProximo").style.display = "inline-block";
  document.getElementById("btnConfirmar").style.display = "none";
  document.getElementById("btnEditar").style.display = "none";
}

function confirmarCadastro() {
  document.getElementById("resumoEmpresa").style.display = "none";
  document.getElementById("btnConfirmar").style.display = "none";
  document.getElementById("btnEditar").style.display = "none";
  document.getElementById("mensagemFinal").style.display = "block";
  document.getElementById("mensagemFinal").textContent =
    "Cadastro realizado, em breve nosso time entrará em contato para marcar uma reunião de apresentação.";
}

function abrirCadastro() {
  document.getElementById("cadastroModal").style.display = "block";
  document.getElementById("formularioEmpresa").style.display = "block";
  document.getElementById("resumoEmpresa").style.display = "none";
  document.getElementById("mensagemFinal").style.display = "none";
  document.getElementById("btnProximo").style.display = "inline-block";
  document.getElementById("btnConfirmar").style.display = "none";
  document.getElementById("btnEditar").style.display = "none";
}

function fecharCadastro() {
  document.getElementById("cadastroModal").style.display = "none";
}

function abrirModalCadastro() {
  abrirCadastro(); 
}

function abrirModalResumo(mensagem) {
  document.getElementById('resumoModal').style.display = 'block';
  document.getElementById('resumoTexto').innerText = mensagem;
}

function fecharModal() {
  document.getElementById('resumoModal').style.display = 'none';
  fecharCadastro();
}
