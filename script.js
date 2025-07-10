const apiKeyInput = document.getElementById("apiKeyInput");
const gameSelect = document.getElementById("gameSelect");
const questionInput = document.getElementById("questionInput");
const askButton = document.getElementById("askButton");
const aiResponse = document.getElementById("aiResponse");
const form = document.querySelector("form");

const markdownToHTML = (text) => {
  const converter = new showdown.Converter();
  return converter.makeHtml(text);
}

const perguntarAI = async (question, game, apiKey) => {
  const model = "gemini-2.5-flash";
  const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const dota2 = `
  ## Especialidade
  Você é uma espacialista assistente de meta para o jogo ${game}.
  
  ## Tarefa
  Você deve responder as perguntas do usuário com bse no seu conhecimento do jogo, estratégias, build e dicas.
  
  ## Regras
  - Se você não souber a resposta, diga que não sabe. Não invente respostas.
  - Responda em português.
  - Se a pergunta não for sobre o jogo, diga que não é uma pergunta relacionada ao jogo ${game}.
  - Considere a data atual ${new Date().toLocaleDateString()} para responder as perguntas.
  - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para responder as perguntas de forma coerente.
  - Nunca responda itens que vc não tem certeza de que existe no patch atual.
  
  ## Resposta
  - Economize na resposta, seja direto e responda no máxima 500 caracteres.
  - Responda em markdown, para que o usuário possa ler a resposta de forma mais fácil.
  - Se a resposta for uma lista, use o formato de lista do markdown.
  - Se a resposta for uma tabela, use o formato de tabela do markdown.
  - Se a resposta for uma imagem, use o formato de imagem do markdown.
  - Se a resposta for um link, use o formato de link do markdown.
  - Não precisa fazer nenhuma saudação ao despedida, apenas responda a pergunta do usuário.
  - Não precisa fazer nenhuma introdução, apenas responda a pergunta do usuário.
  
  ---
  Aqui está a pergunta do usuário:
  ${question}
  `
  const counterStrike = `
  ## Especialidade
Você é um especialista assistente de meta para o jogo CS2 (Counter-Strike 2)

## Tarefa
Você deve responder as perguntas do usuário com base no seu conhecimento sobre o jogo, estratégias de equipe, táticas, configurações de armas e dicas de movimentação.

## Regras
- Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
- Se a pergunta não estiver relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo.'
- Considere a data atual ${new Date().toLocaleDateString()}
- Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
- Nunca responda itens que você não tenha certeza de que existem no patch atual.

## Resposta
- Economize na resposta, seja direto e responda no máximo 500 caracteres.
- Responda em markdown.
- Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

## Exemplo de resposta
pergunta do usuário: Melhor tática para defender Mirage B
resposta: **Defesa Mirage B:** \n\n1. Smoke na Van. \n2. Um jogador na Forest, outro no Bench. \n3. Flash para atrasar rush. \n4. Rotação rápida do Mid se necessário.
 ---
  Aqui está a pergunta do usuário:
  ${question}
`
  const pubg = `## Especialidade
Você é um especialista assistente de meta para o jogo PUBG (PlayerUnknown's Battlegrounds)

## Tarefa
Você deve responder as perguntas do usuário com base no seu conhecimento sobre estratégias de loot, posicionamento, escolha de armas e táticas de final de jogo.

## Regras
- Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
- Se a pergunta não estiver relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo.'
- Considere a data atual ${new Date().toLocaleDateString()}
- Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
- Nunca responda itens que você não tenha certeza de que existem no patch atual.

## Resposta
- Economize na resposta, seja direto e responda no máximo 500 caracteres.
- Responda em markdown.
- Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

## Exemplo de resposta
pergunta do usuário: Melhor arma de longo alcance
resposta: A **Mk14** é excelente para longo alcance com mira 6x ou 8x. Boa estabilidade e alto dano.
 ---
  Aqui está a pergunta do usuário:
  ${question}
`
  const valorante = `
## Especialidade
Você é um especialista assistente de meta para o jogo Valorant

## Tarefa
Você deve responder as perguntas do usuário com base no seu conhecimento sobre agentes, composições de time, estratégias de ataque e defesa e dicas de economia.

## Regras
- Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
- Se a pergunta não estiver relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo.'
- Considere a data atual ${new Date().toLocaleDateString()}
- Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
- Nunca responda itens que você não tenha certeza de que existem no patch atual.

## Resposta
- Economize na resposta, seja direto e responda no máximo 500 caracteres.
- Responda em markdown.
- Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

## Exemplo de resposta
pergunta do usuário: Melhor composição para Bind
resposta: **Composição recomendada:** Brimstone (smokes), Sova (recon), Jett (entry), Sage (suporte), Raze (dano).
 ---
  Aqui está a pergunta do usuário:
  ${question}
`
  const lol = `## Especialidade
Você é um especialista assistente de meta para o jogo League of Legends

## Tarefa
Você deve responder as perguntas do usuário com base no seu conhecimento sobre campeões, builds, runas, estratégias de rotação e dicas de gameplay.

## Regras
- Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
- Se a pergunta não estiver relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo.'
- Considere a data atual ${new Date().toLocaleDateString()}
- Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
- Nunca responda itens que você não tenha certeza de que existem no patch atual.

## Resposta
- Economize na resposta, seja direto e responda no máximo 500 caracteres.
- Responda em markdown.
- Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

## Exemplo de resposta
pergunta do usuário: Melhor build para Jinx ADC
resposta: **Itens:** Kraken Slayer, Phantom Dancer, Infinity Edge. \n\n**Runas:** Precision (Lethal Tempo, Presence of Mind, Bloodline, Coup de Grace).
 ---
  Aqui está a pergunta do usuário:
  ${question}
`
  let askAPI = "";
  switch (game) {
    case "valorante":
      askAPI = valorante;
      break;
    case "lol":
      askAPI = lol;
      break;
    case "dota2":
      askAPI = dota2;
      break;
    case "csgo":
      askAPI = counterStrike;
      break;
    case "pubg":
      askAPI = pubg;
      break;
    default:
      askAPI = "";
  }
  if (!askAPI) {
    alert("Selecione um jogo válido.");
    return;
  }

  const contents = [{
    role: "user",
    parts: [{
      text: askAPI
    }]
  }]
  const tools = [{
    google_search: {}
  }]
  const aiResponse = await fetch(geminiURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents,
      tools
    })
  });
  const data = await aiResponse.json();
  return data.candidates[0].content.parts[0].text;
}

const enviarFormulario = async (event) => {
  event.preventDefault();
  const apiKey = apiKeyInput.value;
  const game = gameSelect.value;
  const question = questionInput.value;

  if (!apiKey || !game || !question) {
    alert("Por favor, preencha todos os campos.");
    return;
  }
  askButton.disabled = true
  askButton.textContent = 'Perguntando...';
  askButton.classList.add('loading');

  try {
    const text = await perguntarAI(question, game, apiKey)
    aiResponse.querySelector('.response-content').innerHTML = markdownToHTML(text);
    aiResponse.classList.remove('hidden');
  } catch (error) {
    console.log(error);

  }
  finally {
    askButton.disabled = false;
    askButton.textContent = 'Perguntar';
    askButton.classList.remove('loading');
  }
}
form.addEventListener("submit", enviarFormulario)