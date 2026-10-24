[English](README.md) | **Português**

# Pacote de Overlays Limpo para Live (grátis)

Overlays limpos e animados para OBS Studio e Streamlabs Desktop, em 5 presets de cor. HTML puro, sem instalação, totalmente editável.

## O que vem no pacote

| Arquivo | Cena | Camadas |
|---|---|---|
| `starting.html` | Iniciando, com contagem regressiva | 1 fonte (tela cheia) |
| `ingame.html` | Em jogo | 1 fonte (transparente, vai por cima do jogo) |
| `justchatting-bg.html` + `justchatting.html` | Just Chatting | 2 fontes: fundo embaixo, moldura em cima |
| `brb.html` | Já volto | 1 fonte (tela cheia) |
| `ending.html` | Fim da transmissão | 1 fonte (tela cheia) |
| `config.js` | Nome do canal, @, textos, cores, idioma | é este que você edita |
| `fonts/` | Fonte Rajdhani e a licença dela | não mova |
| `alerts/` | Fundo de alerta (800×150, em loop) | opcional |

Tudo em 1920×1080. Bordas brilhantes, luz suave e uma grade discreta são animadas, e dá para reduzir isso.

## Requisitos

OBS Studio 28 ou mais novo, ou Streamlabs Desktop. Qualquer programa com Fonte de Navegador (Browser Source) serve.

## Começando

1. **Descompacte a pasta num lugar definitivo** (por exemplo `Documentos\Overlays\`). Se você mover depois, o OBS perde os arquivos e você precisa selecioná-los de novo. Mantenha todos os arquivos juntos, pois cada página usa o `config.js`, o `style.css`, o `scenes.js` e a pasta `fonts`.
2. Abra o `config.js` no Bloco de Notas e defina `name` e `handle`. Salve.
3. No OBS, crie uma cena (por exemplo "Iniciando").
4. Adicione uma fonte: **Fontes → + → Navegador**.
5. Marque **Arquivo local**, clique em **Procurar** e escolha `starting.html`.
6. Defina **Largura 1920** e **Altura 1080**. Clique em OK.
7. Repita para as outras cenas (tabela acima).

Recomendado: nas propriedades de cada fonte de navegador, marque **Atualizar navegador quando a cena se tornar ativa**. A contagem reinicia e as animações tocam toda vez que você entra na cena.

## Ordem das camadas

**Cenas de tela cheia** (Iniciando, Já volto, Fim): só a fonte.

**Em jogo** (de baixo para cima):
1. Captura do jogo
2. `ingame.html`: moldura da webcam, cards de viewers e seguidor
3. Sua webcam, dentro da moldura
4. Suas fontes de alerta (veja abaixo)

**Just Chatting** (de baixo para cima):
1. `justchatting-bg.html`: o fundo
2. Sua webcam, dentro da moldura da esquerda
3. `justchatting.html`: molduras e barra, com janelas transparentes
4. Sua fonte de chat, dentro da moldura da direita
5. Suas fontes de alerta

Os arquivos de moldura são transparentes. As janelas da webcam e do chat são vazadas, então o que estiver embaixo aparece por ali.

## Onde cada coisa vai (espaços)

O overlay desenha só as molduras. Contagem de viewers, último seguidor, último sub e alertas vêm das suas próprias fontes do OBS (StreamElements, Streamlabs ou outra ferramenta). Arraste-as por cima das molduras.

**Em jogo**

| Espaço | Tamanho | Posição (x, y) |
|---|---|---|
| Card Viewers | 300×72 | embaixo, centralizado, primeiro |
| Card Novo seguidor | 300×72 | embaixo, centralizado, segundo |
| Card Novo sub | 300×72 | embaixo, centralizado, terceiro |

**Just Chatting**

| Espaço | Tamanho | Posição (x, y) |
|---|---|---|
| Chat | 708×820 | 1180, 120 |
| Card Viewers | 353×72 | 32, 32 |
| Card Novo seguidor | 353×72 | 405, 32 |
| Card Novo sub | 354×72 | 778, 32 |

**Webcam**

Escolha o formato da sua webcam no `config.js` (`webcam`). A moldura se ajusta e fica centralizada na área dela:

| `webcam` | Em jogo | Just Chatting |
|---|---|---|
| `"16:9"` (wide) | 400×225 | 1100×619 |
| `"4:3"` | 400×300 | 1093×820 |
| `"1:1"` (quadrada) | 400×400 | 820×820 |
| `"9:16"` (vertical) | 400×711 | 461×820 |

Corte ou redimensione a fonte da webcam no OBS para o mesmo tamanho, ou encaixe-a dentro da moldura.

Os cards têm um ícone à esquerda (olho = viewers, coração = novo seguidor, estrela = novo sub). Coloque uma fonte de texto com o número ou o nome do usuário no resto do card, com cerca de 210 px de largura (cerca de 275 px no Just Chatting, onde os cards são mais largos). Os alertas não têm área reservada: coloque a sua fonte de alertas no topo da lista de camadas, por cima de tudo, e ajuste tamanho e posição como preferir. Os fundos de alerta em `alerts/media` têm 800×150.

Para mudar essas posições, abra `ingame.html` ou `justchatting.html` num editor de texto. As posições ficam no bloco `<style>` no começo, com um comentário acima.

## Fundos de alerta

Em `alerts/media/` há um fundo em loop para cada preset de cor: `alert-bg-purple.webm`, `-blue`, `-green`, `-red` e `-pink` (800×150, 4 segundos, transparente), mais um `.png` estático de cada.

No Streamlabs ou no StreamElements, envie o `.webm` do seu preset como imagem ou vídeo do alerta e escreva o texto do alerta nas configurações do próprio serviço (o texto fica por cima do fundo). Se o seu serviço não tocar `.webm` com transparência, use o `.png`. Teste com um alerta de teste antes de entrar ao vivo.

## Personalizando

Abra o `config.js`:

- `lang`: `"en"` (English) ou `"pt"` (Português).
- `preset`: `"purple"`, `"blue"`, `"green"`, `"red"` ou `"pink"`. Muda todas as cores de uma vez.
- `effects`: `"full"` (todas as animações), `"calm"` (só brilho suave) ou `"none"` (tudo parado).
- `webcam`: formato da moldura da webcam (veja acima).
- `brbOpacity`: quão sólido é o fundo do Já volto. `1` é totalmente sólido, `0.8` (padrão) deixa o jogo ou a câmera aparecerem por trás, `0.5` mostra bastante. Use `?brb=0.6` no endereço para testar uma fonte.
- `name`, `handle`: aparecem nas cenas.
- `schedule`: aparece em Iniciando e Fim. Um texto por idioma.
- `colors`: ajustes opcionais por cima do preset, por exemplo `colors: { accent: "#ff8800" }`. Chaves: `bg`, `panel`, `accent`, `accent2`, `text`, `muted`. Qualquer cor CSS serve. Para criar seu preset, copie um bloco em `OVERLAY_PRESETS` e troque o nome.
- `OVERLAY_TEXT`: todas as frases de todas as cenas. Edite qualquer uma, ou copie o bloco `en`, renomeie (por exemplo `es`), traduza e use `lang: "es"`.

Para esconder um texto que você não quer (por exemplo o horário), deixe-o vazio: `schedule: "",`. Não use `#` nem apague só o valor: neste arquivo, comentários começam com `//`.

Salve e clique em **Atualizar cache da página atual** nas propriedades da fonte. Não precisa reiniciar.

### Opções pelo endereço

Desmarque **Arquivo local** e use o endereço (o caminho abaixo é só um exemplo):

- Duração da contagem: `file:///C:/Users/Voce/Documents/Overlays/starting.html?min=10` (minutos, padrão 5).
- Idioma, cor ou efeitos só para uma fonte: acrescente `?lang=pt`, `?preset=blue` ou `?fx=calm` (use `&` no lugar de `?` na segunda opção).

## Problemas comuns

- **Caixa preta ou branca no lugar do overlay:** a Fonte de Navegador não achou o arquivo. Selecione de novo com **Procurar** e confira se os arquivos não saíram da pasta.
- **A fonte aparece errada:** a pasta `fonts` foi movida ou está faltando. Ela precisa ficar ao lado dos arquivos HTML.
- **Minha webcam sumiu:** a moldura está acima dela com o arquivo errado. No Just Chatting, o fundo vai **abaixo** da webcam e a moldura **acima**.
- **Animações travadas ou lentas:** nas propriedades da fonte, desmarque **Desligar fonte quando não estiver visível** e deixe a taxa de quadros em 30 ou 60. Confirme que a aceleração por hardware está ligada em **Configurações → Avançado** do OBS.
- **Textos cortados:** nomes muito longos não cabem nos cards. Encurte ou diminua a fonte da sua fonte de texto.
- **A contagem não reinicia:** marque **Atualizar navegador quando a cena se tornar ativa**.

## Licença

Uso livre nas suas próprias lives, inclusive em canais monetizados. Não é permitido vender o pacote nem se passar pelo autor. Termos completos em `LICENSE.txt` (em inglês).

A fonte Rajdhani está sob a SIL Open Font License 1.1 (`fonts/OFL.txt`).

## Suporte

Dúvidas ou problemas? Contato: jnsdias na Twitch ou no Discord
