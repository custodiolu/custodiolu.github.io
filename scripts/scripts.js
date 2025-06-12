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

        document.querySelectorAll('.chat-option').forEach(button => {
    button.addEventListener('click', () => {
        const service = button.innerText;
        const chatBody = document.getElementById('chat-body');

        const botResponse = document.createElement('div');
        botResponse.className = 'bot-message';
        botResponse.innerHTML = `🔹 <strong>${service}</strong><br>`;

        switch (service) {
            case 'ERP Agrícola':
                botResponse.innerHTML += 'Soluções ERP focadas na gestão de produção, estoque, financeiro e operações agrícolas.';
                break;
            case 'Suporte Técnico 24h':
                botResponse.innerHTML += 'Nossa equipe está disponível 24 horas para resolver problemas técnicos e garantir estabilidade.';
                break;
            case 'Cloud e Infraestrutura':
                botResponse.innerHTML += 'Implantação de servidores em nuvem, backups automatizados e escalabilidade segura.';
                break;
            case 'Segurança de Dados':
                botResponse.innerHTML += 'Implementamos criptografia, controle de acesso e monitoramento de vulnerabilidades.';
                break;
            case 'Integração com IoT':
                botResponse.innerHTML += 'Conectamos sensores do campo com sistemas de análise e gestão em tempo real.';
                break;
            case 'Transformação Digital':
                botResponse.innerHTML += 'Ajudamos sua empresa a modernizar processos com tecnologias ágeis e eficientes.';
                break;
            case 'Automatização de Processos':
                botResponse.innerHTML += 'Reduza tarefas manuais com soluções automatizadas sob medida para o agro.';
                break;
            case 'Manutenção Preventiva':
                botResponse.innerHTML += 'Monitoramento contínuo e correções programadas para evitar falhas críticas.';
                break;
            default:
                botResponse.innerHTML += 'Esse serviço ainda está sendo detalhado.';
        }

        chatBody.appendChild(botResponse);
        chatBody.scrollTop = chatBody.scrollHeight;
    });
});

        
        const cadastroKeywords = ['cadastro', 'cadastrar', 'quero me cadastrar'];
        if (cadastroKeywords.some(keyword => input.includes(keyword))) {
            abrirModalCadastro();
        }

    }, delay);

    inputField.value = '';
    verificarFimDeConversa(input);

    setTimeout(() => {
    document.querySelectorAll('.chat-option').forEach(button => {
        button.addEventListener('click', () => {
            const service = button.innerText;
            const chatBody = document.getElementById('chat-body');

            const botResponse = document.createElement('div');
            botResponse.className = 'bot-message';
            botResponse.innerHTML = `Ótimo! Aqui está um resumo sobre <strong>${service}</strong>.<br>`;

            switch (service) {
                case 'ERP Agrícola':
                    botResponse.innerHTML += 'Soluções ERP focadas na gestão de produção, estoque, financeiro e operações agrícolas.';
                    break;
                case 'Suporte Técnico 24h':
                    botResponse.innerHTML += 'Nossa equipe está disponível 24 horas para resolver problemas técnicos e garantir estabilidade.';
                    break;
                case 'Cloud e Infraestrutura':
                    botResponse.innerHTML += 'Implantação de servidores em nuvem, backups automatizados e escalabilidade segura.';
                    break;
                case 'Segurança de Dados':
                    botResponse.innerHTML += 'Implementamos criptografia, controle de acesso e monitoramento de vulnerabilidades.';
                    break;
                case 'Integração com IoT':
                    botResponse.innerHTML += 'Conectamos sensores do campo com sistemas de análise e gestão em tempo real.';
                    break;
                case 'Transformação Digital':
                    botResponse.innerHTML += 'Ajudamos sua empresa a modernizar processos com tecnologias ágeis e eficientes.';
                    break;
                case 'Automatização de Processos':
                    botResponse.innerHTML += 'Reduza tarefas manuais com soluções automatizadas sob medida para o agro.';
                    break;
                case 'Manutenção Preventiva':
                    botResponse.innerHTML += 'Monitoramento contínuo e correções programadas para evitar falhas críticas.';
                    break;
                default:
                    botResponse.innerHTML += 'Esse serviço ainda está sendo detalhado.';
            }

            chatBody.appendChild(botResponse);
            chatBody.scrollTop = chatBody.scrollHeight;
        });
    });
}, 100); // pequeno delay para garantir que os botões existam no DOM

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
        'Oferecemos uma variedade de serviços especializados para startups do agronegócio:<br><br>' +
        '<button class="chat-option">ERP Agrícola</button> ' +
        '<button class="chat-option">Suporte Técnico 24h</button> ' +
        '<button class="chat-option">Cloud e Infraestrutura</button> ' +
        '<button class="chat-option">Segurança de Dados</button> ' +
        '<button class="chat-option">Integração com IoT</button> ' +
        '<button class="chat-option">Transformação Digital</button> ' +
        '<button class="chat-option">Automatização de Processos</button> ' +
        '<button class="chat-option">Manutenção Preventiva</button><br><br>' +
        'Clique em um serviço para saber mais ou me diga o que você está procurando! 😉'
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
                'Nosso suporte funciona 24h. Entre em contato pelo nosso e-mail ou WhatsApp.'
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
        },
        {
    palavras: ['duvidas', 'dúvidas', 'perguntas frequentes', 'faq'],
    respostas: [
        'Você pode perguntar sobre nossos <strong>serviços</strong>, formas de <strong>cadastro</strong>, <strong>atendimento</strong> ou qualquer outro assunto relacionado à tecnologia para o agro. 😉'
    ],
},

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
    botMessage.innerHTML = `
        <p>Olá! 👋 Sou a assistente virtual da UNITECH. Em que posso te ajudar?</p>
        <div class="menu-interativo">
            <div class="menu-item" data-option="cadastro">
                📝<br><strong>Cadastro</strong>
            </div>
            <div class="menu-item" data-option="servicos">
                🛠️<br><strong>Serviços</strong>
            </div>
            <div class="menu-item" data-option="contato">
                📞<br><strong>Contato</strong>
            </div>
            <div class="menu-item" data-option="suporte">
                🆘<br><strong>Suporte</strong>
            </div>
            <div class="menu-item" data-option="duvidas">
                ❓<br><strong>Dúvidas</strong>
            </div>
        </div>
    `;

    chatBody.appendChild(botMessage);
    chatBody.scrollTop = chatBody.scrollHeight;

    // Eventos de clique para cada item do menu
    setTimeout(() => {
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', () => {
                const opcao = item.dataset.option;
                const inputField = document.getElementById('user-input');
                inputField.value = opcao;
                sendMessage();
            });
        });
    }, 100); // delay leve para garantir renderização
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
