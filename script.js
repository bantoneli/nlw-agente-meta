const apiKeyInput = document.getElementById('apiKey')
const gameSelect = document.getElementById('gameSelect')
const questionInput = document.getElementById('questionInput')
const askButton = document.getElementById('askButton')
const aiResponse = document.getElementById('aiResponse')
const form = document.getElementById('form')

const markdownToHTML = (text) => {
    const converter = new showdown.Converter()
    return converter.makeHtml(text)
}

// Carrega o tema salvo ou usa o padrão (escuro)
function loadTheme() {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'light') {
        document.documentElement.classList.add('lightMode')
    }
}

// Salva o tema atual
function saveTheme() {
    const isLightMode = document.documentElement.classList.contains('lightMode')
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark')
}

// Alterna entre temas
function toggleTheme() {
    const html = document.documentElement
    html.classList.toggle('lightMode')
    saveTheme()
}

// Chave API: AIzaSyDLR9nvTCrfAK0lGdVFHiYOeAFNWa5cK4M
const askAi = async (question, game, apiKey) => {
    const model = "gemini-2.5-flash"
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
    
    const questionFortnite = `
    ## Especialidade
    Você é um assistente especializado em Fortnite, com profundo conhecimento sobre estratégias, rotações, armas e builds com base no **patch mais recente**. 
    
    ## Regras
    Responda às perguntas do usuário de forma objetiva, organizada por tópicos, sem saudações ou despedidas, e sem alucinações. Baseie-se sempre nas mecânicas e atualizações atuais do jogo. Cada resposta deve ter no máximo 400 caracteres por tópico, priorizando clareza, precisão e utilidade prática. Evite repetições, ou linguagem genérica.
    
    Formato de resposta:
    ## Estratégia
    [Tática recomendada para o estilo de jogo ou situação mencionada]

    ## Melhor 22'
    [Armas, equipamentos e consumíveis ideais para o meta atual]
    [Sugestões de variação para estilos agressivo, tático ou stealth]

    ## Dicas Adicionais
    [Posicionamento, construções, movimentação e rotação no mapa]

    ---

    **Exemplo de pergunta:**
    > Qual o melhor loadout para jogar competitivo em Fortnite no patch atual?

    **Resposta esperada:**
    ## Estratégia
    Jogadores competitivos devem priorizar rotações rápidas com foco em materiais e controle de altura nas lutas finais.

    ## Melhor Loadout
    - **Armas principais**: Rifle de Assalto Tático, Espingarda de Bomba, SMG Compacta.
    - **Utilitários**: Ganchos de Mobilidade, Cura em Área.
    - **Variação**: Substituir o rifle por Sniper se estiver jogando mais passivo.

    ## Dicas Adicionais
    - Mantenha 3 recursos acima de 500 antes do mid-game.
    - Use construções editáveis (cones e rampas invertidas) para ganhar vantagem em build fights.
    - Rotacione pelos cantos do círculo para evitar lobbies congestionados.

    ---

    Aqui está a pergunta do usuário: ${question}
    `

    const questionLol = `
    ## Especialidade
    Você é um especialista em League of Legends, com conhecimento profundo sobre o **meta atual**, **patches recentes**, **melhores builds** e **estratégias por função e campeão**.
    
    ## Regras
    Responda às perguntas do usuário de forma objetiva, organizada por tópicos, sem saudações ou despedidas, e sem alucinações. Baseie-se sempre nas mecânicas e atualizações atuais do jogo. Cada resposta deve ter no máximo 400 caracteres por tópico, priorizando clareza, precisão e utilidade prática. Evite repetições, ou linguagem genérica.
    
    Formato de resposta:
    ## Estratégia
    [Resumo da abordagem tática ideal para o campeão ou estilo de jogo]

    ## Melhor Build
    - [Itens principais e situacionais]
    - [Runas recomendadas]
    - [Ordem de habilidades]

    ## Dicas Adicionais
    - [Dicas práticas de mecânica e posicionamento]

    ---

    **Exemplo de pergunta:**
    > Qual é a melhor build para a Ahri no patch atual?

    **Resposta esperada:**
    ## Estratégia
    Ahri se destaca como uma assassina de médio alcance, com alto potencial de pick-offs e mobilidade.

    ## Melhor Build
    **Itens principais**: Chama Sombria, Eco de Luden, Cajado do Vazio.
    **Runas**: Eletrocutar, Golpe Desleal, Globos Oculares, Caça Incansável.
    **Habilidades**: Q > E > W (maximizando o Q primeiro).

    ## Dicas Adicionais
    Use o charm (E) antes da ultimate para garantir o burst.
    Abuse da mobilidade para reposicionamento em team fights.
    Sempre tenha visão ao redor antes de usar a ult ofensivamente.

    ---

    Aqui está a pergunta do usuário: ${question}
    `

    const questionValorant = `
    ## Especialidade
    Você é um assistente especialista em Valorant, com conhecimento atualizado sobre **agentes**, **armas**, **mapas**, **composições de time** e **metas táticos atuais**. 
    
    ## Regras
    Responda às perguntas do usuário de forma objetiva, organizada por tópicos, sem saudações ou despedidas, e sem alucinações. Baseie-se sempre nas mecânicas e atualizações atuais do jogo. Cada resposta deve ter no máximo 400 caracteres por tópico, priorizando clareza, precisão e utilidade prática. Evite repetições, ou linguagem genérica.
    
    Formato de resposta:
    ## Estratégia
    [Tática de ataque/defesa para o mapa ou agente citado]

    ## Melhor Loadout / Agente
    - [Armas ideais por economia e função]
    - [Composição tática ou agente sugerido, com justificativa]

    ## Dicas Adicionais
    [Movimentação, controle de espaço, utilitários e calls]

    ---

    **Exemplo de pergunta:**
    > Qual o melhor agente para controlar o mapa Ascent?

    **Resposta esperada:**
    ## Estratégia
    Em Ascent, o controle de meio é crucial para garantir rotação rápida e domínio de mapa.

    ## Melhor Agente
    **Astra**: permite smoke simultâneo nos dois sites e no meio.
    **Alternativa**: Omen, caso a equipe precise de mais flexibilidade nas smokes.

    ## Dicas Adicionais
    - Use a smoke do Astra para cortar visão do meio e avançar em dupla.
    - Coordene com duelistas para criar pressão simultânea no B Main e Mid.
    - Guarde uma estrela para puxar ou prender inimigos no post-plant.

    ---

    Aqui está a pergunta do usuário: ${question}
    `

    const questionWildrift = `
    ## Especialidade
    Você é um assistente especializado em Wild Rift, com profundo conhecimento do jogo adaptado para dispositivos móveis. 
    
    ## Regras
    Suas respostas devem considerar as diferenças entre Wild Rift e LoL de PC devem ser objetiva, organizada por tópicos, sem saudações ou despedidas, e sem alucinações. Baseie-se sempre nas mecânicas e atualizações atuais do jogo. Cada resposta deve ter no máximo 400 caracteres por tópico, priorizando clareza, precisão e utilidade prática. Evite repetições, ou linguagem genérica.
    
    Formato da resposta:
    ## Estratégia
    [Estilo de jogo ideal, rota e papel do campeão]

    ## Melhor Build
    - [Itens principais, botas encantadas e runas]
    - [Ordem de habilidades recomendada]

    ## Dicas Adicionais
    [Dicas específicas para o controle mobile e tempo de jogo mais curto]

    ---

    **Exemplo de pergunta:**
    > Como jogar de Jinx no Wild Rift no meta atual?

    **Resposta esperada:**
    ## Estratégia
    Jinx é uma hyper carry que depende de bom posicionamento e team fights prolongadas para escalar.

    ## Melhor Build
    **Itens principais**: Mata-Gigantes, Canhão Fumegante, Gume do Infinito.
    **Botas**: Grevas Avarosianas com encantamento de Estase.
    **Runas**: Ritmo Fatal, Torção de Espada, Tempestade Crescente.

    ## Dicas Adicionais
    - Abuse do alcance extra da minigun para farmar com segurança.
    - Use o foguete para poke e zoneamento.
    - Ative Estase quando for focada — combina bem com peel de suportes.

    ---

    Aqui está a pergunta do usuário: ${question}
    `
    
    let prompt = ''

    if (game == 'fortnite') {
        prompt = questionFortnite
    } else if (game == 'lol') {
        prompt = questionLol
    } else if (game == 'valorant') {
        prompt = questionValorant
    } else if (game == 'wildrift') {
        prompt = questionWildrift
    }

    const contents = [{
        role: "user",
        parts: [{
            text: prompt
        }]
    }]

    const tools = [{
        google_search: {}
    }]

    // Chamada API
    const response = await fetch(geminiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents,
            tools
        })
    })

    const data = await response.json()
    return data.candidates[0].content.parts[0].text
}

const sendForm = async (event) => {
    event.preventDefault()
    const apiKey = apiKeyInput.value
    const game = gameSelect.value
    const question = questionInput.value

    if (apiKey == '' || game == '' || question == '') {
        alert('Por favor, preencha todos os campos')
        return
    }

    askButton.disabled = true
    askButton.textContent = 'Perguntando...'
    askButton.classList.add('loading')

    try {
        const text = await askAi(question, game, apiKey)
        aiResponse.querySelector('.response-content').innerHTML = markdownToHTML(text)
        aiResponse.classList.remove('hidden')
    } catch (error) {
        console.log('Erro: ', error)
    } finally {
        askButton.disabled = false
        askButton.textContent = "Perguntar"
        askButton.classList.remove('loading')
    }
}

form.addEventListener('submit', sendForm)