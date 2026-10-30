-- Biblioteca inicial: 188 exercícios do protocolo, com instrução e pontos de atenção.
-- Gerado por scripts/gerar_biblioteca.mjs. Rodar de novo não apaga vídeo nem texto que a Renata já editou.
insert into public.exercicios (nome, grupo, padrao, equipamento, instrucao, pontos_atencao) values
  ('Supino Reto Barra', 'Peito', 'supino-reto', 'Barra', 'Deitado no banco, pés firmes no chão, pegada um pouco mais aberta que os ombros. Desça a barra controlada até a linha do mamilo e empurre de volta até estender os cotovelos.', 'Escápulas retraídas e deprimidas o tempo todo, peito alto
Cotovelos a cerca de 45–60° do tronco, nunca abertos a 90°
Punhos alinhados sobre os cotovelos, sem dobrar para trás
Glúteos e cabeça apoiados no banco; arco lombar natural, sem exagero'),
  ('Supino Reto Halteres', 'Peito', 'supino-reto', 'Halteres', 'Deitado no banco com um haltere em cada mão na altura do peito. Empurre para cima aproximando levemente os halteres e desça controlando até sentir alongar o peitoral.', 'Escápulas encaixadas no banco durante toda a série
Desça até o haltere ficar na linha do peito, sem passar dos ombros
Cotovelos a 45–60° do tronco
Suba sem bater os halteres e sem perder o controle no topo'),
  ('Supino Reto Máquina', 'Peito', 'supino-reto', 'Máquina', 'Ajuste o banco para a pegada ficar na linha do meio do peito. Empurre as alças à frente até quase estender os cotovelos e volte devagar.', 'Costas e escápulas apoiadas no encosto o tempo todo
Pegadas na altura do meio do peito, não dos ombros
Volta controlada, sem deixar o peso bater
Não trave os cotovelos no final'),
  ('Chest Press Máquina', 'Peito', 'supino-reto', 'Máquina', 'Sentado com as costas no encosto, alças na altura do peito. Empurre à frente e retorne controlando até sentir o peitoral alongar.', 'Escápulas encostadas e peito aberto durante todo o movimento
Ajuste o assento para as mãos ficarem na linha do peito
Ombros longe das orelhas
Retorno lento, sem soltar o peso'),
  ('Supino Reto no Smith', 'Peito', 'supino-reto', 'Smith', 'Deitado com o banco posicionado para a barra descer na linha do mamilo. Destrave, desça controlando e empurre de volta.', 'Confira a posição do banco antes: a barra deve tocar a linha do mamilo
Escápulas retraídas, peito alto
Cotovelos a 45–60° do tronco
Trave a barra nos ganchos antes de soltar'),
  ('Spoto Press (supino reto parando 2cm acima do peito)', 'Peito', 'supino-reto', 'Barra', 'Supino reto com barra em que você para a barra cerca de 2 cm acima do peito, segura um instante sem encostar e empurra de volta.', 'Pausa real e controlada, sem quicar
Mantenha a tensão no peitoral durante a pausa
Escápulas retraídas e pés firmes
Use carga menor que no supino comum'),
  ('Supino Unilateral Máquina (Hammer)', 'Peito', 'supino-reto', 'Máquina', 'Na máquina articulada, empurre com um braço de cada vez, mantendo o outro lado estável.', 'Tronco parado, sem girar para ajudar o lado que empurra
Escápula do lado em trabalho encaixada no encosto
Amplitude completa, retorno lento
Comece pelo lado mais fraco'),
  ('Hex Press (halteres colados)', 'Peito', 'supino-reto', 'Halteres', 'Deitado, segure os halteres encostados um no outro sobre o peito e pressione um contra o outro o tempo todo enquanto sobe e desce.', 'Pressione os halteres entre si durante toda a série
Cotovelos próximos ao tronco
Desça até encostar no peito sem perder a pressão
Escápulas retraídas'),
  ('Flexão de Braço', 'Peito', 'supino-reto', 'Peso do corpo', 'Mãos um pouco mais abertas que os ombros, corpo reto da cabeça aos calcanhares. Desça o peito até perto do chão e empurre de volta.', 'Abdômen e glúteos contraídos: quadril não cai nem sobe
Cotovelos a cerca de 45° do tronco
Cabeça neutra, olhando um pouco à frente das mãos
Se não completar com qualidade, apoie os joelhos'),
  ('Flexão com Pausa Embaixo', 'Peito', 'supino-reto', 'Peso do corpo', 'Flexão de braço com uma pausa de 1 a 2 segundos com o peito a poucos centímetros do chão antes de subir.', 'Corpo em bloco durante a pausa, sem deixar o quadril cair
Cotovelos a 45° do tronco
Não apoie o peito no chão na pausa
Suba de forma controlada'),
  ('Flexão com Déficit e Anilha nas Costas', 'Peito', 'supino-reto', 'Peso do corpo', 'Flexão com as mãos apoiadas em suportes ou anilhas para descer mais fundo, com uma anilha sobre a parte alta das costas.', 'Anilha bem posicionada entre as escápulas, sem escorregar
Amplitude maior só se o ombro estiver confortável
Corpo reto, abdômen firme
Pare se sentir dor na frente do ombro'),
  ('Supino Inclinado Barra', 'Peito', 'supino-inclinado', 'Barra', 'Banco inclinado entre 30° e 45°. Desça a barra até a parte alta do peito, logo abaixo da clavícula, e empurre de volta.', 'Escápulas retraídas e peito alto
A barra desce na parte alta do peito, não no pescoço
Cotovelos a 45–60° do tronco
Glúteos apoiados no banco durante toda a série'),
  ('Supino Inclinado Barra 30° com pausa no peito', 'Peito', 'supino-inclinado', 'Barra', 'Supino inclinado com o banco a 30°, encostando a barra na parte alta do peito com uma pausa curta antes de empurrar.', 'Pausa sem relaxar: o peito segura a barra
Não quique a barra no peito
Escápulas retraídas o tempo todo
Carga menor que no inclinado sem pausa'),
  ('Supino Inclinado Halteres 30°', 'Peito', 'supino-inclinado', 'Halteres', 'Banco a 30°, halteres na altura da parte alta do peito. Empurre para cima e desça controlando até alongar o peitoral.', 'Escápulas encaixadas no banco
Desça até a linha do peito, sem forçar além do conforto do ombro
Cotovelos a 45–60° do tronco
Sem bater os halteres no topo'),
  ('Supino Inclinado no Smith', 'Peito', 'supino-inclinado', 'Smith', 'Banco inclinado posicionado para a barra descer na parte alta do peito. Desça controlando e empurre.', 'Confira o banco: a barra deve tocar abaixo da clavícula
Escápulas retraídas
Cotovelos a 45–60°
Trave a barra antes de soltar'),
  ('Supino Inclinado Máquina', 'Peito', 'supino-inclinado', 'Máquina', 'Sentado na máquina inclinada, empurre as alças para cima e à frente e retorne devagar.', 'Costas e escápulas apoiadas o tempo todo
Assento ajustado para as alças ficarem na parte alta do peito
Ombros longe das orelhas
Retorno lento'),
  ('Landmine Press (unilateral)', 'Peito', 'supino-inclinado', 'Barra', 'Segure a ponta da barra apoiada no landmine na altura do ombro e empurre para cima e à frente com um braço.', 'Abdômen firme e quadril parado, sem girar o tronco
Cotovelo levemente à frente do corpo ao iniciar
Estenda o braço sem encolher o ombro
Bom para quem sente o ombro no supino comum'),
  ('Flexão com Pés Elevados', 'Peito', 'supino-inclinado', 'Peso do corpo', 'Flexão com os pés apoiados num banco ou degrau, mãos no chão um pouco mais abertas que os ombros.', 'Corpo reto, sem deixar o quadril cair
Cotovelos a 45° do tronco
Quanto mais alto o pé, mais difícil e mais ombro
Cabeça neutra'),
  ('Supino Declinado Barra', 'Peito', 'supino-declinado', 'Barra', 'Banco declinado com as pernas presas. Desça a barra até a parte baixa do peito e empurre de volta.', 'Peça ajuda para tirar e devolver a barra
A barra desce na parte baixa do peito
Escápulas retraídas
Não fique muito tempo de cabeça para baixo entre as séries'),
  ('Supino Declinado Halteres', 'Peito', 'supino-declinado', 'Halteres', 'Banco declinado com as pernas presas, halteres na parte baixa do peito. Empurre para cima e desça controlando.', 'Suba e desça do banco com cuidado segurando os halteres junto ao corpo
Escápulas encaixadas
Cotovelos a 45–60°
Amplitude confortável para o ombro'),
  ('Mergulho nas Paralelas', 'Peito', 'mergulho', 'Peso do corpo', 'Apoiado nas paralelas com braços estendidos, incline o tronco um pouco à frente e desça dobrando os cotovelos; empurre de volta.', 'Ombros afastados das orelhas o tempo todo
Desça só até o ombro ficar na altura do cotovelo, sem forçar mais
Tronco à frente para trabalhar mais o peito
Pare se sentir dor na frente do ombro'),
  ('Mergulho Lastrado (tronco à frente)', 'Peito', 'mergulho', 'Peso do corpo', 'Mergulho nas paralelas com peso preso a um cinto, tronco inclinado à frente.', 'Só use lastro com o mergulho livre bem dominado
Peso preso firme, sem balançar
Ombros longe das orelhas
Amplitude até o ombro na linha do cotovelo'),
  ('Mergulho na Máquina (dip assistido)', 'Peito', 'mergulho', 'Máquina', 'Na máquina com assistência, apoie os joelhos na plataforma e faça o mergulho. Mais peso na máquina significa mais ajuda.', 'Ombros longe das orelhas
Tronco levemente à frente
Desça até o ombro na linha do cotovelo
Diminua a assistência aos poucos'),
  ('Crucifixo Reto Halteres', 'Peito', 'crucifixo', 'Halteres', 'Deitado com os halteres acima do peito e cotovelos levemente dobrados, abra os braços em arco até sentir o peitoral alongar e volte pelo mesmo caminho.', 'Cotovelos levemente dobrados e fixos durante toda a série
Desça só até a linha do peito
Escápulas encaixadas no banco
Carga moderada: é exercício de alongamento, não de força'),
  ('Crucifixo Inclinado Halteres', 'Peito', 'crucifixo', 'Halteres', 'Banco inclinado a 30°, halteres acima do peito. Abra os braços em arco e volte aproximando os halteres.', 'Cotovelos levemente dobrados e fixos
Não desça além da linha dos ombros
Escápulas retraídas
Movimento lento na descida'),
  ('Peck Deck', 'Peito', 'crucifixo', 'Máquina', 'Sentado com as costas apoiadas, braços abertos nas alças ou almofadas. Feche os braços à frente do peito e volte devagar.', 'Ajuste o assento para as alças ficarem na altura do peito
Escápulas encostadas, peito aberto
Cotovelos levemente dobrados
Volta controlada até sentir o peito alongar'),
  ('Crossover Alto → Baixo', 'Peito', 'crucifixo', 'Cabo', 'Polias no alto. Com um passo à frente e tronco levemente inclinado, puxe as alças em arco para baixo e à frente, cruzando na altura do quadril.', 'Cotovelos levemente dobrados e fixos
Tronco estável, sem balançar para ajudar
Ombros baixos, longe das orelhas
Volta lenta até alongar o peito'),
  ('Crossover Baixo → Alto', 'Peito', 'crucifixo', 'Cabo', 'Polias embaixo. Puxe as alças em arco de baixo para cima até a altura do peito, aproximando as mãos.', 'Cotovelos levemente dobrados
Palmas para cima e peito aberto
Não use o ombro para subir: suba até a altura do peito
Tronco parado'),
  ('Crossover Unilateral (baixo → alto)', 'Peito', 'crucifixo', 'Cabo', 'Com uma polia embaixo, puxe a alça com um braço em arco até a altura do peito, cruzando levemente a linha do meio.', 'Tronco parado, sem girar
Cotovelo levemente dobrado
Ombro baixo durante o movimento
Volta controlada'),
  ('Crucifixo no Cabo (banco inclinado)', 'Peito', 'crucifixo', 'Cabo', 'Banco inclinado entre duas polias baixas. Faça o crucifixo puxando os cabos em arco até acima do peito.', 'Cotovelos levemente dobrados e fixos
Escápulas encaixadas no banco
Não desça além da linha dos ombros
Tensão constante do cabo no topo'),
  ('Crucifixo no Cabo', 'Peito', 'crucifixo', 'Cabo', 'Em pé entre as polias na altura do peito, faça o crucifixo trazendo as alças à frente do peito.', 'Um passo à frente para estabilidade
Cotovelos levemente dobrados
Peito aberto e ombros baixos
Volta lenta'),
  ('Svend Press (anilhas pressionadas)', 'Peito', 'crucifixo', 'Anilha', 'Em pé, segure duas anilhas pressionadas entre as palmas na frente do peito e empurre à frente, mantendo a pressão.', 'Aperte as anilhas uma contra a outra o tempo todo
Ombros baixos
Cotovelos estendem sem travar
Abdômen firme, sem jogar o tronco para trás'),
  ('Pullover com Haltere', 'Peito', 'pullover', 'Halteres', 'Deitado no banco, segure um haltere com as duas mãos acima do peito. Leve-o para trás da cabeça em arco, com cotovelos levemente dobrados, e volte.', 'Cotovelos levemente dobrados e fixos
Desça só até onde o ombro fica confortável
Abdômen firme para a lombar não arquear
Segure bem o haltere pela anilha'),
  ('Barra Fixa', 'Costas', 'puxada', 'Peso do corpo', 'Pendurado na barra com pegada pronada um pouco mais aberta que os ombros, puxe o corpo até o queixo passar a barra e desça controlando até estender os braços.', 'Comece o movimento descendo as escápulas, não dobrando os braços
Peito em direção à barra, sem balançar o corpo
Desça até o braço quase estender, sem largar o ombro
Abdômen firme, pernas paradas'),
  ('Barra Fixa Lastrada', 'Costas', 'puxada', 'Peso do corpo', 'Barra fixa com peso preso a um cinto ou entre as pernas.', 'Só use lastro com a barra livre bem dominada
Peso firme, sem balançar
Escápulas descem primeiro
Amplitude completa, sem meia repetição'),
  ('Barra Fixa Assistida (máquina)', 'Costas', 'puxada', 'Máquina', 'Na máquina com assistência, apoie os joelhos na plataforma e faça a barra fixa. Mais peso na máquina significa mais ajuda.', 'Escápulas descem antes de dobrar os braços
Peito em direção à barra
Descida controlada
Diminua a assistência aos poucos'),
  ('Puxada Aberta', 'Costas', 'puxada', 'Cabo', 'Sentado com as coxas presas, pegada aberta na barra. Puxe a barra até a parte alta do peito e volte estendendo os braços.', 'Tronco levemente inclinado para trás, sem balançar
Puxe levando os cotovelos para baixo e para trás
Escápulas descem e se aproximam no final
Nunca puxe por trás da nuca'),
  ('Puxada Neutra', 'Costas', 'puxada', 'Cabo', 'Puxada no pulley com o triângulo ou barra de pegada neutra, levando as mãos até a parte alta do peito.', 'Cotovelos rentes ao corpo
Peito alto, sem curvar a coluna
Volta controlada até alongar as costas
Sem jogar o tronco para trás'),
  ('Puxada Supinada', 'Costas', 'puxada', 'Cabo', 'Puxada com pegada supinada (palmas para você) na largura dos ombros, levando a barra até o peito.', 'Cotovelos descem rentes ao corpo
Não transforme em rosca: puxe com as costas
Peito alto
Volta controlada'),
  ('Puxada Unilateral no Cabo', 'Costas', 'puxada', 'Cabo', 'Com uma alça no pulley alto, puxe com um braço levando o cotovelo para baixo, junto ao corpo.', 'Tronco parado, sem girar
Escápula desce primeiro
Alongue bem na volta
Comece pelo lado mais fraco'),
  ('Puxada na Máquina (articulada)', 'Costas', 'puxada', 'Máquina', 'Na máquina articulada, puxe as alças para baixo até a altura do peito e volte controlando.', 'Peito colado ao apoio quando houver
Cotovelos para baixo e para trás
Ombros longe das orelhas
Volta lenta'),
  ('Pullover no Cabo', 'Costas', 'pullover', 'Cabo', 'De frente para o pulley alto, com a corda ou barra, leve as mãos do alto até as coxas em arco, braços quase estendidos.', 'Cotovelos levemente dobrados e fixos
Quadril levemente para trás, coluna neutra
Sem usar o tronco para empurrar
Volta até alongar as costas'),
  ('Pulldown com Braço Reto', 'Costas', 'pullover', 'Cabo', 'De frente para o pulley alto, braços quase estendidos, puxe a barra até as coxas e volte devagar.', 'Cotovelos fixos, levemente dobrados
Escápulas descem durante o movimento
Tronco estável
Não encolha os ombros na volta'),
  ('Remada Curvada Barra', 'Costas', 'remada', 'Barra', 'Em pé, joelhos levemente dobrados, tronco inclinado à frente com a coluna reta. Puxe a barra até a parte baixa do abdômen e desça controlando.', 'Coluna neutra do início ao fim: sem arredondar a lombar
Tronco parado, sem levantar para ajudar
Cotovelos para trás, junto ao corpo
Abdômen firme'),
  ('Remada Pendlay', 'Costas', 'remada', 'Barra', 'Tronco paralelo ao chão, barra parte do chão a cada repetição. Puxe de forma explosiva até o abdômen e devolva a barra ao chão.', 'Coluna neutra, tronco paralelo ao chão
Barra volta ao chão e para a cada repetição
Sem levantar o tronco para puxar
Carga que permita manter a posição'),
  ('Remada Cavalinho Apoiada', 'Costas', 'remada', 'Barra', 'Peito apoiado no suporte, puxe a barra ou as alças até o abdômen e volte estendendo os braços.', 'Peito colado no apoio o tempo todo
Cotovelos para trás
Escápulas se aproximam no final
Sem tirar o peito do apoio para puxar'),
  ('Remada Meadows (landmine unilateral)', 'Costas', 'remada', 'Barra', 'Ao lado da barra no landmine, tronco inclinado, segure a ponta da barra e puxe com um braço até o quadril.', 'Coluna neutra e quadril para trás
Tronco sem girar
Cotovelo vai para trás e para cima
Apoie a mão livre na coxa'),
  ('Remada Unilateral Haltere', 'Costas', 'remada', 'Halteres', 'Uma mão e um joelho apoiados no banco, coluna reta. Puxe o haltere até o quadril e desça controlando.', 'Costas paralelas ao chão, sem girar o tronco
Puxe o cotovelo em direção ao quadril
Escápula se aproxima da coluna no topo
Alongue bem embaixo'),
  ('Remada Inclinada Halteres', 'Costas', 'remada', 'Halteres', 'Deitado de bruços no banco inclinado, puxe os halteres até a lateral do abdômen e desça devagar.', 'Peito apoiado no banco o tempo todo
Cotovelos para trás
Ombros longe das orelhas
Sem levantar o peito para ajudar'),
  ('Remada com Apoio no Peito (chest-supported)', 'Costas', 'remada', 'Máquina', 'Peito apoiado no suporte da máquina, puxe as alças até o abdômen e volte controlando.', 'Peito colado no apoio
Cotovelos para trás e escápulas juntas no final
Volta completa para alongar
Ombros baixos'),
  ('Remada Apoiada no Peito', 'Costas', 'remada', 'Halteres', 'Deitado de bruços no banco inclinado, puxe os halteres até a lateral do tronco.', 'Peito apoiado o tempo todo
Cotovelos para trás
Pausa curta com as escápulas juntas
Descida lenta'),
  ('Remada Baixa no Cabo', 'Costas', 'remada', 'Cabo', 'Sentado, pés apoiados e joelhos levemente dobrados. Puxe o triângulo até o abdômen e volte estendendo os braços.', 'Tronco parado, sem balançar para frente e para trás
Coluna neutra e peito alto
Escápulas se aproximam no final
Na volta, alongue sem arredondar a coluna'),
  ('Remada Baixa Pegada Aberta', 'Costas', 'remada', 'Cabo', 'Remada sentada com barra de pegada aberta, levando a barra até a parte baixa do peito.', 'Cotovelos para fora e para trás
Tronco parado
Ombros baixos
Volta controlada'),
  ('Remada Unilateral no Cabo', 'Costas', 'remada', 'Cabo', 'Com uma alça no cabo, puxe com um braço até o quadril e volte alongando.', 'Tronco sem girar
Cotovelo junto ao corpo
Escápula vai para trás no final
Comece pelo lado mais fraco'),
  ('Remada Máquina (articulada)', 'Costas', 'remada', 'Máquina', 'Na máquina articulada, peito no apoio, puxe as alças para trás e volte devagar.', 'Peito colado no apoio
Cotovelos para trás
Escápulas juntas no final
Volta completa'),
  ('Remada Invertida (na barra)', 'Costas', 'remada', 'Peso do corpo', 'Deitado sob uma barra baixa, corpo reto, puxe o peito até a barra e desça controlando.', 'Corpo em bloco, quadril alinhado
Puxe o peito até a barra
Escápulas juntas no topo
Pés mais à frente deixa mais difícil'),
  ('Levantamento Terra', 'Costas', 'terra', 'Barra', 'Pés na largura do quadril, barra sobre o meio do pé. Segure a barra, alinhe a coluna e levante empurrando o chão com as pernas até ficar em pé; desça pelo mesmo caminho.', 'Coluna neutra do início ao fim: nunca arredonde a lombar
Barra rente às pernas durante todo o movimento
Abdômen contraído antes de tirar a barra do chão
No topo, fique em pé sem jogar o quadril à frente'),
  ('Levantamento Terra com Trap Bar', 'Costas', 'terra', 'Barra', 'Dentro da trap bar, segure as alças, alinhe a coluna e levante empurrando o chão com as pernas.', 'Coluna neutra o tempo todo
Peito alto e quadril não sobe antes do peito
Abdômen contraído
Descida controlada'),
  ('Hiperextensão Lombar', 'Costas', 'extensao-lombar', 'Peso do corpo', 'No banco de hiperextensão, quadril no apoio, desça o tronco e suba até ficar alinhado com as pernas.', 'Suba só até alinhar o corpo, sem jogar a cabeça para trás
Movimento lento
Contraia glúteos no topo
Pare se sentir dor na lombar'),
  ('Encolhimento com Halteres', 'Costas', 'encolhimento', 'Halteres', 'Em pé com um haltere em cada mão, eleve os ombros em direção às orelhas, segure e desça.', 'Suba reto, sem girar os ombros
Braços relaxados, sem dobrar os cotovelos
Pausa curta no topo
Pescoço neutro'),
  ('Encolhimento com Barra', 'Costas', 'encolhimento', 'Barra', 'Em pé segurando a barra à frente das coxas, eleve os ombros e desça controlando.', 'Movimento só para cima e para baixo
Cotovelos estendidos
Pausa no topo
Cabeça neutra'),
  ('Desenvolvimento Militar em Pé', 'Ombros', 'desenvolvimento', 'Barra', 'Em pé, barra apoiada na frente dos ombros. Empurre a barra acima da cabeça até estender os braços e desça controlando.', 'Abdômen e glúteos contraídos para a lombar não arquear
Leve a cabeça levemente para trás para a barra passar e volte
No topo, a barra fica sobre o meio do pé
Punhos alinhados sobre os cotovelos'),
  ('Desenvolvimento Halteres Sentado', 'Ombros', 'desenvolvimento', 'Halteres', 'Sentado com encosto, halteres na altura dos ombros. Empurre para cima e desça até a altura das orelhas.', 'Costas no encosto, sem arquear a lombar
Cotovelos levemente à frente do corpo
Desça até a linha das orelhas
Sem bater os halteres no topo'),
  ('Desenvolvimento Halteres', 'Ombros', 'desenvolvimento', 'Halteres', 'Halteres na altura dos ombros, empurre acima da cabeça e desça controlando.', 'Abdômen firme, sem arquear a lombar
Cotovelos levemente à frente
Amplitude confortável para o ombro
Movimento controlado'),
  ('Desenvolvimento Máquina', 'Ombros', 'desenvolvimento', 'Máquina', 'Sentado na máquina, empurre as alças para cima e volte devagar.', 'Costas no encosto
Assento ajustado para as alças começarem na altura dos ombros
Não trave os cotovelos
Ombros longe das orelhas no início'),
  ('Desenvolvimento no Smith', 'Ombros', 'desenvolvimento', 'Smith', 'Sentado sob o Smith, barra na frente do rosto. Empurre para cima e desça até a altura do queixo.', 'Banco posicionado para a barra descer à frente do rosto
Costas no encosto
Desça até o queixo, não até o peito
Trave a barra antes de soltar'),
  ('Arnold Press', 'Ombros', 'desenvolvimento', 'Halteres', 'Comece com os halteres na frente dos ombros, palmas para você. Ao empurrar para cima, gire as palmas para frente; inverta na descida.', 'Rotação suave e contínua
Abdômen firme, sem arquear
Carga menor que no desenvolvimento comum
Pare se sentir pinçar o ombro'),
  ('Elevação Lateral', 'Ombros', 'elevacao-lateral', 'Halteres', 'Em pé, halteres ao lado do corpo, cotovelos levemente dobrados. Eleve os braços para os lados até a altura dos ombros e desça devagar.', 'Suba só até a linha do ombro
Cotovelos levemente dobrados e à frente das mãos
Sem encolher o ombro nem balançar o tronco
Carga leve e descida lenta'),
  ('Elevação Lateral pesada', 'Ombros', 'elevacao-lateral', 'Halteres', 'Elevação lateral com carga mais alta e repetições menores, aceitando um pequeno impulso controlado.', 'Impulso pequeno, sem jogar o tronco
Ombros longe das orelhas
Suba até a linha do ombro
Descida sempre controlada'),
  ('Elevação Lateral no Cabo (por trás do corpo)', 'Ombros', 'elevacao-lateral', 'Cabo', 'Com a polia baixa do lado oposto e o cabo passando por trás do corpo, eleve o braço para o lado até a altura do ombro.', 'Tronco parado, sem inclinar para longe
Cotovelo levemente dobrado
Suba até a linha do ombro
Volta lenta'),
  ('Elevação Lateral Máquina', 'Ombros', 'elevacao-lateral', 'Máquina', 'Sentado na máquina, braços nas almofadas, eleve os braços para os lados até a altura dos ombros.', 'Ajuste o assento para o ombro alinhar com o eixo da máquina
Sem encolher os ombros
Suba até a linha do ombro
Descida lenta'),
  ('Elevação Lateral Inclinada (deitado de lado)', 'Ombros', 'elevacao-lateral', 'Halteres', 'Deitado de lado num banco inclinado, eleve o haltere do braço de cima para o lado.', 'Tronco apoiado e parado
Cotovelo levemente dobrado
Carga bem leve
Movimento lento'),
  ('Elevação Frontal Halteres', 'Ombros', 'elevacao-frontal', 'Halteres', 'Em pé, halteres à frente das coxas, eleve os braços à frente até a altura dos ombros e desça.', 'Suba só até a linha do ombro
Sem balançar o tronco
Cotovelos levemente dobrados
Carga leve'),
  ('Elevação Frontal no Cabo', 'Ombros', 'elevacao-frontal', 'Cabo', 'De costas para a polia baixa, com o cabo entre as pernas, eleve o braço à frente até a altura do ombro.', 'Tronco parado
Suba até a linha do ombro
Cotovelo levemente dobrado
Volta lenta'),
  ('Elevação Y no Banco Inclinado', 'Ombros', 'deltoide-posterior', 'Halteres', 'Deitado de bruços no banco inclinado, eleve os braços à frente formando um Y, polegares para cima.', 'Carga bem leve
Escápulas descem e se aproximam
Sem levantar o peito do banco
Polegares apontando para cima'),
  ('Face Pull', 'Ombros', 'deltoide-posterior', 'Cabo', 'Corda na polia alta. Puxe a corda em direção ao rosto, abrindo as mãos e levando os cotovelos para trás e para cima.', 'Cotovelos altos, na linha dos ombros
No final, mãos ao lado das orelhas e escápulas juntas
Tronco parado
Carga moderada, foco na contração'),
  ('Crucifixo Invertido', 'Ombros', 'deltoide-posterior', 'Halteres', 'Tronco inclinado à frente com a coluna reta, halteres pendurados. Abra os braços para os lados até a altura dos ombros.', 'Coluna neutra
Cotovelos levemente dobrados
Sem encolher os ombros
Carga leve e movimento lento'),
  ('Crucifixo Invertido na Máquina (peck deck inverso)', 'Ombros', 'deltoide-posterior', 'Máquina', 'De frente para o encosto do peck deck, abra os braços para trás até a linha do corpo.', 'Peito apoiado no encosto
Ombros baixos
Cotovelos levemente dobrados
Volta controlada'),
  ('Crucifixo Invertido no Cabo', 'Ombros', 'deltoide-posterior', 'Cabo', 'Entre duas polias altas, cruzando os cabos, abra os braços para trás na altura dos ombros.', 'Tronco parado
Cotovelos levemente dobrados
Ombros longe das orelhas
Volta lenta'),
  ('Rosca Direta Barra', 'Bíceps', 'rosca', 'Barra', 'Em pé, barra com pegada supinada na largura dos ombros. Dobre os cotovelos levando a barra até o peito e desça controlando.', 'Cotovelos colados ao tronco, sem ir à frente
Tronco parado, sem jogar o corpo para trás
Desça até estender quase todo o braço
Punhos firmes, alinhados ao antebraço'),
  ('Rosca Direta Barra W', 'Bíceps', 'rosca', 'Barra', 'Rosca direta com a barra W, que deixa os punhos em ângulo mais confortável.', 'Cotovelos junto ao corpo
Sem balançar o tronco
Descida controlada até quase estender
Punhos firmes'),
  ('Rosca 21 (barra W)', 'Bíceps', 'rosca', 'Barra', 'Sete repetições da metade de baixo, sete da metade de cima e sete completas, sem descanso.', 'Carga menor que a da rosca comum
Cotovelos fixos em todas as fases
Sem balançar para completar
Respeite as três amplitudes'),
  ('Rosca Alternada Halteres', 'Bíceps', 'rosca', 'Halteres', 'Em pé, halteres ao lado do corpo. Dobre um cotovelo de cada vez, girando a palma para cima ao subir.', 'Cotovelo parado ao lado do corpo
Gire a palma para cima durante a subida
Tronco sem balançar
Descida lenta'),
  ('Rosca Inclinada Halteres', 'Bíceps', 'rosca-alongada', 'Halteres', 'Sentado num banco inclinado a 45°, braços pendurados atrás da linha do corpo. Dobre os cotovelos e desça devagar.', 'Cotovelos apontando para o chão, sem ir à frente
Costas e cabeça apoiadas
Alongue bem embaixo
Carga menor que na rosca em pé'),
  ('Rosca Bayesian no Cabo', 'Bíceps', 'rosca-alongada', 'Cabo', 'De costas para a polia baixa, um passo à frente, braço estendido para trás. Dobre o cotovelo trazendo a alça à frente do ombro.', 'Cotovelo atrás da linha do corpo durante toda a série
Tronco parado
Alongue bem na volta
Um braço de cada vez'),
  ('Rosca Scott', 'Bíceps', 'rosca-scott', 'Barra', 'Braços apoiados no banco Scott, dobre os cotovelos levando a barra até perto dos ombros e desça devagar.', 'Axilas encostadas no topo do apoio
Não estenda o cotovelo de forma brusca embaixo
Descida lenta
Carga moderada'),
  ('Rosca Scott Máquina', 'Bíceps', 'rosca-scott', 'Máquina', 'Na máquina Scott, braços no apoio, dobre os cotovelos e volte devagar.', 'Ajuste o assento para a axila encostar no apoio
Sem tirar os braços do apoio
Descida controlada
Não trave o cotovelo embaixo'),
  ('Rosca Spider', 'Bíceps', 'rosca-scott', 'Halteres', 'Deitado de bruços num banco inclinado, braços pendurados à frente, dobre os cotovelos.', 'Braços na vertical, cotovelos parados
Peito apoiado
Contraia bem no topo
Descida lenta'),
  ('Rosca Spider (peito apoiado no banco inclinado)', 'Bíceps', 'rosca-scott', 'Halteres', 'Peito apoiado num banco inclinado, braços pendurados na vertical, faça a rosca com halteres ou barra.', 'Cotovelos parados apontando para o chão
Peito sempre no banco
Pausa curta no topo
Carga moderada'),
  ('Rosca Concentrada', 'Bíceps', 'rosca-scott', 'Halteres', 'Sentado, cotovelo apoiado na parte interna da coxa, dobre o braço levando o haltere até o ombro.', 'Cotovelo firme na coxa
Tronco parado
Contraia no topo
Descida lenta'),
  ('Rosca no Cabo (barra)', 'Bíceps', 'rosca', 'Cabo', 'De frente para a polia baixa com a barra, faça a rosca levando a barra até o peito.', 'Cotovelos junto ao corpo
Tronco parado
Tensão constante, descida lenta
Punhos firmes'),
  ('Rosca Martelo', 'Bíceps', 'rosca-martelo', 'Halteres', 'Em pé, halteres com as palmas viradas para o corpo. Dobre os cotovelos mantendo a pegada neutra.', 'Palmas viradas para dentro o tempo todo
Cotovelos colados ao tronco
Sem balançar
Descida controlada'),
  ('Rosca Martelo Pesada', 'Bíceps', 'rosca-martelo', 'Halteres', 'Rosca martelo com carga alta e poucas repetições.', 'Impulso mínimo do tronco
Cotovelos junto ao corpo
Punhos firmes
Descida sempre controlada'),
  ('Rosca Martelo Cruzada', 'Bíceps', 'rosca-martelo', 'Halteres', 'Rosca martelo levando o haltere em direção ao ombro oposto, cruzando à frente do corpo.', 'Cotovelo perto do tronco
Pegada neutra
Sem girar o tronco
Um braço de cada vez'),
  ('Rosca Martelo na Corda', 'Bíceps', 'rosca-martelo', 'Cabo', 'Com a corda na polia baixa, faça a rosca martelo afastando levemente as pontas no topo.', 'Cotovelos colados ao corpo
Palmas viradas uma para a outra
Tronco parado
Volta lenta'),
  ('Rosca Inversa (pegada pronada)', 'Bíceps', 'rosca-martelo', 'Barra', 'Rosca com a barra segurada com as palmas para baixo.', 'Punhos retos, sem dobrar para trás
Cotovelos junto ao corpo
Carga menor que na rosca direta
Descida controlada'),
  ('Tríceps Testa Barra W', 'Tríceps', 'triceps-testa', 'Barra', 'Deitado, barra W acima do rosto com os braços estendidos. Dobre só os cotovelos levando a barra até a testa e estenda de volta.', 'Cotovelos apontando para cima, sem abrir para os lados
Mexa só o antebraço, braço parado
Descida lenta, perto da testa
Pare se sentir dor no cotovelo'),
  ('Tríceps Testa Halteres', 'Tríceps', 'triceps-testa', 'Halteres', 'Deitado, halteres acima do peito com as palmas uma para a outra. Dobre os cotovelos levando os halteres ao lado da cabeça.', 'Cotovelos fixos apontando para cima
Descida controlada
Pegada firme
Carga moderada'),
  ('Tríceps Francês no Cabo (overhead)', 'Tríceps', 'triceps-acima', 'Cabo', 'De costas para a polia, corda atrás da cabeça, estenda os braços para cima e à frente.', 'Cotovelos próximos da cabeça, apontando à frente
Abdômen firme, sem arquear a lombar
Alongue bem atrás da cabeça
Tronco parado'),
  ('Tríceps Francês Haltere', 'Tríceps', 'triceps-acima', 'Halteres', 'Sentado, segure um haltere com as duas mãos acima da cabeça. Desça atrás da cabeça dobrando os cotovelos e estenda.', 'Cotovelos apontando para cima, perto da cabeça
Costas apoiadas, sem arquear
Descida controlada
Segure o haltere pela anilha'),
  ('Tríceps na Polia (barra V)', 'Tríceps', 'triceps-polia', 'Cabo', 'De frente para a polia alta, cotovelos colados ao corpo. Empurre a barra até estender os braços e volte até 90°.', 'Cotovelos fixos ao lado do tronco
Sem usar o peso do corpo
Estenda totalmente no final
Ombros baixos'),
  ('Tríceps Corda', 'Tríceps', 'triceps-polia', 'Cabo', 'Com a corda na polia alta, estenda os braços abrindo as pontas da corda no final.', 'Cotovelos colados ao corpo
Abra as mãos no final do movimento
Tronco parado
Volta controlada'),
  ('Tríceps Coice no Cabo', 'Tríceps', 'triceps-polia', 'Cabo', 'Tronco inclinado à frente, cotovelo junto ao corpo, estenda o braço para trás com o cabo.', 'Braço paralelo ao chão e parado
Mexa só o antebraço
Estenda totalmente
Carga leve'),
  ('Tríceps Unilateral no Cabo', 'Tríceps', 'triceps-polia', 'Cabo', 'Com uma alça na polia alta, estenda um braço de cada vez.', 'Cotovelo colado ao corpo
Tronco sem girar
Estenda totalmente
Volta lenta'),
  ('Supino Fechado', 'Tríceps', 'triceps-supino', 'Barra', 'Supino com a barra e pegada na largura dos ombros. Desça a barra até a parte baixa do peito com os cotovelos junto ao corpo.', 'Pegada na largura dos ombros, não colada
Cotovelos rentes ao tronco
Escápulas retraídas
Punhos alinhados'),
  ('Mergulho no Banco', 'Tríceps', 'triceps-supino', 'Peso do corpo', 'Mãos apoiadas na borda de um banco atrás de você, desça o corpo dobrando os cotovelos e suba.', 'Quadril perto do banco
Desça só até o cotovelo a 90°
Ombros longe das orelhas
Pare se sentir a frente do ombro'),
  ('Flexão Diamante', 'Tríceps', 'triceps-supino', 'Peso do corpo', 'Flexão com as mãos juntas formando um diamante sob o peito.', 'Cotovelos perto do tronco
Corpo em bloco
Se for difícil, apoie os joelhos
Punhos confortáveis'),
  ('Agachamento Livre', 'Quadríceps', 'agachamento', 'Barra', 'Barra apoiada no trapézio, pés na largura dos ombros e levemente para fora. Desça o quadril para trás e para baixo até as coxas ficarem pelo menos paralelas ao chão e suba empurrando o chão.', 'Coluna neutra e peito alto o tempo todo
Joelhos acompanham a direção dos pés, sem cair para dentro
Calcanhares no chão durante toda a repetição
Abdômen contraído antes de descer'),
  ('Agachamento Frontal', 'Quadríceps', 'agachamento', 'Barra', 'Barra apoiada na frente dos ombros, cotovelos altos. Agache mantendo o tronco o mais vertical possível e suba.', 'Cotovelos altos para a barra não rolar
Tronco vertical, sem arredondar as costas
Joelhos alinhados com os pés
Calcanhares no chão'),
  ('Agachamento no Smith', 'Quadríceps', 'agachamento', 'Smith', 'Barra do Smith no trapézio, pés um pouco à frente da barra. Agache e suba controlando.', 'Posição do pé define o foco: mais à frente alivia o joelho
Joelhos alinhados com os pés
Coluna neutra
Trave a barra nos ganchos ao terminar'),
  ('Agachamento Goblet', 'Quadríceps', 'agachamento', 'Halteres', 'Segure um haltere em pé junto ao peito, pés na largura dos ombros, e agache entre as pernas.', 'Haltere colado ao peito
Cotovelos descem por dentro dos joelhos
Tronco alto
Calcanhares no chão'),
  ('Hack Squat', 'Quadríceps', 'agachamento', 'Máquina', 'Costas no encosto da máquina, ombros sob as almofadas. Agache até as coxas ficarem paralelas e suba.', 'Costas inteiras apoiadas no encosto
Joelhos acompanham os pés
Sem travar os joelhos no topo
Descida controlada'),
  ('Agachamento Pêndulo', 'Quadríceps', 'agachamento', 'Máquina', 'Na máquina pêndulo, costas no apoio, agache em arco e suba empurrando a plataforma.', 'Costas apoiadas o tempo todo
Amplitude profunda e confortável
Joelhos alinhados com os pés
Sem travar os joelhos'),
  ('Leg Press 45°', 'Quadríceps', 'leg-press', 'Máquina', 'Costas e quadril no encosto, pés na largura dos ombros no meio da plataforma. Desça até os joelhos dobrarem cerca de 90° e empurre de volta.', 'Quadril não sai do banco na descida: pare antes disso
Nunca trave os joelhos no topo
Joelhos alinhados com os pés
Segure as alças laterais'),
  ('Leg Press Horizontal', 'Quadríceps', 'leg-press', 'Máquina', 'Sentado, pés na plataforma, empurre até quase estender as pernas e volte controlando.', 'Lombar apoiada no encosto
Sem travar os joelhos
Joelhos acompanham os pés
Volta lenta'),
  ('Cadeira Extensora', 'Quadríceps', 'extensora', 'Máquina', 'Sentado com o joelho alinhado ao eixo da máquina e o rolo sobre o tornozelo, estenda as pernas e desça devagar.', 'Joelho alinhado ao eixo da máquina
Costas no encosto, segure as alças
Pausa curta no topo
Descida lenta'),
  ('Agachamento Búlgaro', 'Quadríceps', 'unilateral', 'Halteres', 'Pé de trás apoiado num banco, pé da frente afastado. Desça o joelho de trás em direção ao chão e suba com a perna da frente.', 'Joelho da frente acompanha o pé
Tronco estável, levemente à frente
O peso fica na perna da frente
Ajuste a distância antes da série'),
  ('Afundo Andando com Halteres', 'Quadríceps', 'unilateral', 'Halteres', 'Com halteres ao lado do corpo, dê passos à frente descendo o joelho de trás perto do chão a cada passo.', 'Passo longo o suficiente para o joelho da frente não passar muito do pé
Tronco alto
Joelho de trás quase toca o chão
Equilíbrio antes de cada passo'),
  ('Afundo no Smith', 'Quadríceps', 'unilateral', 'Smith', 'Barra do Smith no trapézio, um pé à frente e outro atrás. Desça e suba sem mudar os pés de lugar.', 'Joelho da frente alinhado com o pé
Tronco alto
Peso na perna da frente
Trave a barra ao terminar'),
  ('Avanço Reverso com Halteres', 'Quadríceps', 'unilateral', 'Halteres', 'Com halteres ao lado do corpo, dê um passo para trás descendo o joelho, e volte à posição inicial.', 'Mais gentil com o joelho que o afundo à frente
Tronco alto
Peso na perna da frente
Controle o retorno'),
  ('Step-up no Banco', 'Quadríceps', 'unilateral', 'Halteres', 'Com um pé no banco, suba empurrando com essa perna até ficar em pé sobre ele e desça devagar.', 'Suba com a perna de cima, sem impulso da de baixo
Joelho alinhado com o pé
Banco firme e na altura do joelho
Descida controlada'),
  ('Levantamento Romeno (RDL)', 'Posterior', 'hinge', 'Barra', 'Em pé com a barra, joelhos levemente dobrados. Leve o quadril para trás descendo a barra rente às pernas até sentir alongar o posterior e volte.', 'Coluna neutra do início ao fim
O movimento é do quadril, os joelhos quase não mudam
Barra rente às pernas
Desça só até onde mantém as costas retas'),
  ('Stiff com Halteres', 'Posterior', 'hinge', 'Halteres', 'Com halteres à frente das coxas, leve o quadril para trás descendo os halteres e volte contraindo os glúteos.', 'Coluna neutra
Halteres perto das pernas
Joelhos levemente dobrados e fixos
Amplitude até alongar o posterior'),
  ('Stiff Unilateral com Haltere', 'Posterior', 'hinge', 'Halteres', 'Apoiado numa perna, incline o tronco à frente levando a outra perna para trás e volte.', 'Quadril nivelado, sem abrir para o lado
Coluna neutra
Segure um apoio se precisar
Movimento lento'),
  ('Good Morning', 'Posterior', 'hinge', 'Barra', 'Barra no trapézio, joelhos levemente dobrados. Incline o tronco à frente levando o quadril para trás e volte.', 'Coluna neutra sempre
Carga leve
Desça só até onde mantém as costas retas
Abdômen contraído'),
  ('Mesa Flexora', 'Posterior', 'flexora', 'Máquina', 'Deitado de bruços, rolo acima dos calcanhares. Dobre os joelhos trazendo o rolo em direção ao glúteo e desça devagar.', 'Quadril colado no banco
Joelho alinhado ao eixo da máquina
Descida lenta
Sem impulso'),
  ('Flexora Sentado', 'Posterior', 'flexora', 'Máquina', 'Sentado, rolo atrás dos tornozelos e trava sobre as coxas. Dobre os joelhos e volte devagar.', 'Trava firme sobre as coxas
Joelho alinhado ao eixo
Costas no encosto
Volta controlada'),
  ('Flexora em Pé (unilateral)', 'Posterior', 'flexora', 'Máquina', 'Em pé na máquina, dobre um joelho de cada vez levando o calcanhar ao glúteo.', 'Quadril parado
Joelho alinhado ao eixo
Descida lenta
Comece pela perna mais fraca'),
  ('Nordic Curl', 'Posterior', 'flexora', 'Peso do corpo', 'Ajoelhado com os tornozelos presos, desça o tronco à frente devagar com o corpo reto, usando o posterior para frear.', 'Exercício avançado: desça o mais devagar possível
Quadril estendido, corpo em linha
Use as mãos para amortecer no chão
Poucas repetições'),
  ('Hip Thrust com Barra', 'Glúteos', 'hip-thrust', 'Barra', 'Costas apoiadas no banco, barra sobre o quadril. Empurre o quadril para cima até o corpo ficar reto e desça.', 'Queixo levemente recolhido, olhando à frente
Contraia os glúteos no topo, sem arquear a lombar
Canelas verticais no topo
Use protetor na barra'),
  ('Hip Thrust na Máquina', 'Glúteos', 'hip-thrust', 'Máquina', 'Na máquina de hip thrust, empurre o quadril para cima contra o apoio e desça devagar.', 'Glúteos contraídos no topo
Sem arquear a lombar
Pés firmes
Descida controlada'),
  ('Elevação Pélvica no Chão', 'Glúteos', 'hip-thrust', 'Peso do corpo', 'Deitado de costas, joelhos dobrados e pés no chão. Eleve o quadril até alinhar com joelhos e ombros.', 'Empurre pelos calcanhares
Contraia os glúteos no topo
Sem arquear a lombar
Pausa curta em cima'),
  ('Glúteo no Cabo (coice)', 'Glúteos', 'gluteo-isolado', 'Cabo', 'Tornozeleira na polia baixa, leve a perna para trás estendendo o quadril.', 'Tronco parado, abdômen firme
Sem arquear a lombar
Movimento do quadril, não da coluna
Volta controlada'),
  ('Cadeira Abdutora', 'Glúteos', 'abducao', 'Máquina', 'Sentado na máquina, afaste as pernas contra as almofadas e volte devagar.', 'Costas no encosto
Movimento controlado nas duas direções
Pausa curta aberto
Sem impulso'),
  ('Abdução com Elástico', 'Glúteos', 'abducao', 'Elástico', 'Com um elástico acima dos joelhos, afaste os joelhos ou dê passos laterais.', 'Joelhos não caem para dentro
Quadril levemente dobrado
Tensão constante no elástico
Tronco parado'),
  ('Panturrilha em Pé', 'Panturrilha', 'panturrilha', 'Máquina', 'Na máquina em pé, ponta dos pés na borda do apoio. Suba na ponta dos pés e desça alongando abaixo da linha do apoio.', 'Amplitude completa: alongue embaixo e suba bem
Joelhos estendidos sem travar
Pausa curta embaixo, sem quicar
Movimento lento'),
  ('Panturrilha Sentado (sóleo)', 'Panturrilha', 'panturrilha', 'Máquina', 'Sentado com a almofada sobre as coxas, suba e desça os calcanhares.', 'Amplitude completa
Pausa embaixo e em cima
Sem quicar
Movimento lento'),
  ('Panturrilha no Leg Press', 'Panturrilha', 'panturrilha', 'Máquina', 'No leg press, ponta dos pés na borda da plataforma, empurre com os tornozelos.', 'Joelhos estendidos sem travar
Pés firmes para não escorregar
Amplitude completa
Não solte a trava de segurança'),
  ('Panturrilha Unilateral no Degrau', 'Panturrilha', 'panturrilha', 'Peso do corpo', 'Num degrau, um pé de cada vez, suba na ponta do pé e desça alongando.', 'Segure um apoio para equilíbrio
Amplitude completa
Sem quicar embaixo
Movimento lento'),
  ('Abdominal Ajoelhado no Cabo', 'Abdômen', 'flexao-tronco', 'Cabo', 'Ajoelhado de frente para a polia alta, corda atrás da cabeça. Enrole o tronco levando os cotovelos em direção às coxas.', 'O movimento é de enrolar a coluna, não de sentar sobre os calcanhares
Quadril parado
Mãos fixas junto à cabeça
Expire ao descer'),
  ('Abdominal Crunch', 'Abdômen', 'flexao-tronco', 'Peso do corpo', 'Deitado com joelhos dobrados, eleve os ombros do chão enrolando o tronco e desça devagar.', 'Não puxe a cabeça com as mãos
Queixo afastado do peito
Lombar no chão
Expire ao subir'),
  ('Crunch Declinado com Anilha', 'Abdômen', 'flexao-tronco', 'Anilha', 'No banco declinado, pernas presas, segure uma anilha no peito e enrole o tronco para cima.', 'Enrole a coluna, não suba reto
Desça controlando
Carga moderada
Pare se sentir a lombar'),
  ('Abdominal na Máquina', 'Abdômen', 'flexao-tronco', 'Máquina', 'Sentado na máquina, enrole o tronco à frente contra a resistência e volte devagar.', 'Movimento do abdômen, não dos braços
Expire ao enrolar
Volta lenta
Ajuste o assento antes'),
  ('Reverse Crunch Declinado', 'Abdômen', 'elevacao-pernas', 'Peso do corpo', 'Deitado no banco declinado, segure atrás da cabeça e eleve o quadril trazendo os joelhos ao peito.', 'Tire o quadril do banco, não só as pernas
Sem impulso
Descida lenta
Lombar controlada'),
  ('Elevação de Pernas na Barra (até a barra)', 'Abdômen', 'elevacao-pernas', 'Peso do corpo', 'Pendurado na barra, eleve as pernas estendidas até perto da barra e desça controlando.', 'Sem balançar o corpo
Enrole o quadril no topo
Descida lenta
Ombros ativos na barra'),
  ('Elevação de Joelhos na Barra com Tornozeleira', 'Abdômen', 'elevacao-pernas', 'Peso do corpo', 'Pendurado na barra com caneleira, eleve os joelhos em direção ao peito.', 'Sem balanço
Enrole o quadril, não só levante a perna
Descida controlada
Carga leve'),
  ('Toes-to-bar', 'Abdômen', 'elevacao-pernas', 'Peso do corpo', 'Pendurado na barra, leve os pés até encostar na barra e desça controlando.', 'Exercício avançado
Ombros ativos, sem relaxar na barra
Controle a descida para não balançar
Pare se perder a técnica'),
  ('Elevação de Pernas no Banco', 'Abdômen', 'elevacao-pernas', 'Peso do corpo', 'Deitado no banco segurando atrás da cabeça, eleve as pernas até a vertical e desça sem encostar.', 'Lombar colada no banco
Descida lenta
Dobre os joelhos se a lombar levantar
Sem impulso'),
  ('Ab Wheel (roda) completa', 'Abdômen', 'anti-extensao', 'Roda', 'De joelhos ou em pé, role a roda à frente estendendo o corpo e volte usando o abdômen.', 'Lombar não pode afundar
Vá só até onde mantém o abdômen firme
Glúteos contraídos
Volte puxando com o abdômen'),
  ('Prancha', 'Abdômen', 'anti-extensao', 'Peso do corpo', 'Antebraços no chão sob os ombros, corpo reto da cabeça aos calcanhares. Segure pelo tempo combinado.', 'Quadril alinhado: nem caído, nem alto
Abdômen e glúteos contraídos
Respiração contínua
Pare quando perder a posição'),
  ('Dead Bug com Anilha', 'Abdômen', 'anti-extensao', 'Anilha', 'Deitado de costas, braços para cima segurando a anilha e pernas a 90°. Estenda as pernas alternadas sem tirar a lombar do chão.', 'Lombar colada no chão o tempo todo
Movimento lento
Expire ao estender a perna
Anilha parada acima do peito'),
  ('Hollow Body Hold', 'Abdômen', 'anti-extensao', 'Peso do corpo', 'Deitado, eleve ombros e pernas do chão formando uma canoa e segure.', 'Lombar colada no chão
Dobre os joelhos se a lombar subir
Queixo recolhido
Respiração contínua'),
  ('Dragon Flag Negativa', 'Abdômen', 'anti-extensao', 'Peso do corpo', 'Deitado no banco segurando atrás da cabeça, suba o corpo reto e desça o mais devagar possível.', 'Exercício avançado
Corpo reto do ombro ao pé
Só a descida, devagar
Pare se a lombar arquear'),
  ('Pallof Press', 'Abdômen', 'anti-rotacao', 'Cabo', 'De lado para a polia na altura do peito, segure a alça junto ao peito e empurre à frente sem deixar o corpo girar.', 'Tronco e quadril sem girar
Abdômen contraído
Pausa com os braços estendidos
Faça os dois lados'),
  ('Woodchopper no Cabo (alto → baixo)', 'Abdômen', 'rotacao', 'Cabo', 'Com a polia alta ao lado, puxe a alça em diagonal até o lado oposto do quadril, girando o tronco.', 'O giro vem do tronco, com os quadris acompanhando
Braços quase estendidos
Volta controlada
Faça os dois lados'),
  ('Prancha Lateral', 'Abdômen', 'anti-rotacao', 'Peso do corpo', 'Apoiado num antebraço e na lateral do pé, corpo reto, segure pelo tempo combinado.', 'Quadril alto, alinhado com o corpo
Cotovelo sob o ombro
Não deixe o quadril cair
Faça os dois lados'),
  ('Suitcase Carry (farmer unilateral)', 'Abdômen', 'anti-rotacao', 'Halteres', 'Segure um haltere pesado em uma mão e caminhe sem deixar o corpo inclinar para o lado do peso.', 'Tronco reto, sem inclinar
Ombros nivelados
Passos curtos
Troque de lado'),
  ('Farmer Walk', 'Antebraço', 'carregamento', 'Halteres', 'Segure um haltere pesado em cada mão ao lado do corpo e caminhe com passos curtos pela distância ou tempo combinado.', 'Postura alta, ombros baixos e para trás
Abdômen firme
Passos curtos e controlados
Pegue e solte os pesos agachando com a coluna reta'),
  ('Rosca de Punho', 'Antebraço', 'punho', 'Barra', 'Sentado, antebraços apoiados nas coxas, punhos para fora do joelho. Flexione os punhos levantando a barra.', 'Antebraços parados
Amplitude completa do punho
Carga leve
Movimento lento'),
  ('Remada T-Bar', 'Costas', 'remada', 'Barra', 'Com a barra no landmine e o pegador em V, tronco inclinado e coluna reta, puxe até o abdômen.', 'Coluna neutra, sem arredondar
Tronco parado
Cotovelos para trás
Carga que permita manter a posição'),
  ('Remada T-Bar Apoiada', 'Costas', 'remada', 'Máquina', 'Na máquina T-bar com apoio de peito, puxe as alças até o abdômen e volte devagar.', 'Peito colado no apoio
Cotovelos para trás
Escápulas juntas no final
Volta completa'),
  ('Band Pull-apart', 'Ombros', 'deltoide-posterior', 'Elástico', 'Segure um elástico à frente do peito com os braços estendidos e afaste as mãos até o elástico encostar no peito.', 'Escápulas se aproximam no final
Ombros baixos
Cotovelos quase estendidos
Volta controlada'),
  ('Elevação Lateral no Cabo', 'Ombros', 'elevacao-lateral', 'Cabo', 'Com a polia baixa ao lado, eleve o braço para o lado até a altura do ombro.', 'Tronco parado
Cotovelo levemente dobrado
Suba até a linha do ombro
Descida lenta'),
  ('Rosca Zottman', 'Bíceps', 'rosca-martelo', 'Halteres', 'Suba com as palmas para cima, gire no topo para as palmas ficarem para baixo e desça assim.', 'Rotação só no topo
Descida lenta com a pegada pronada
Cotovelos fixos
Carga moderada'),
  ('Rosca 21 com Halteres', 'Bíceps', 'rosca', 'Halteres', 'Sete repetições da metade de baixo, sete da metade de cima e sete completas com halteres.', 'Carga menor que a usual
Cotovelos fixos
Sem balançar
Respeite as três amplitudes'),
  ('Rosca 21 no Cabo', 'Bíceps', 'rosca', 'Cabo', 'Rosca 21 na polia baixa: sete metades de baixo, sete de cima e sete completas.', 'Tensão constante do cabo
Cotovelos fixos
Tronco parado
Carga moderada'),
  ('Tríceps Testa no Cabo', 'Tríceps', 'triceps-testa', 'Cabo', 'Deitado num banco de frente para a polia baixa, faça o tríceps testa com a barra presa ao cabo.', 'Cotovelos apontando para cima e fixos
Mexa só o antebraço
Tensão constante
Descida lenta'),
  ('Tríceps Coice com Haltere', 'Tríceps', 'triceps-polia', 'Halteres', 'Tronco inclinado com apoio no banco, cotovelo junto ao corpo, estenda o haltere para trás.', 'Braço parado, paralelo ao chão
Estenda totalmente
Sem balançar o haltere
Carga leve'),
  ('Sissy Squat', 'Quadríceps', 'extensora', 'Peso do corpo', 'Segurando um apoio, incline o corpo para trás enquanto dobra os joelhos à frente, mantendo quadril e tronco alinhados.', 'Exercício avançado: comece com pouca amplitude
Quadril estendido o tempo todo
Segure um apoio firme
Pare se sentir dor no joelho'),
  ('Leg Press Unilateral', 'Quadríceps', 'leg-press', 'Máquina', 'Leg press com uma perna de cada vez, pé no meio da plataforma.', 'Quadril sem girar
Joelho alinhado com o pé
Sem travar o joelho
Comece pela perna mais fraca'),
  ('Leg Press Pés Baixos', 'Quadríceps', 'leg-press', 'Máquina', 'Leg press com os pés na parte baixa da plataforma, para trabalhar mais o quadríceps.', 'Calcanhares sempre apoiados
Amplitude confortável para o joelho
Quadril no banco
Sem travar os joelhos'),
  ('Nordic Curl Assistido', 'Posterior', 'flexora', 'Peso do corpo', 'Nordic curl com ajuda de um elástico preso ao peito ou de amplitude reduzida.', 'Corpo em linha do joelho à cabeça
Descida controlada
Use as mãos para amortecer
Diminua a ajuda aos poucos'),
  ('Panturrilha no Smith', 'Panturrilha', 'panturrilha', 'Smith', 'Barra do Smith no trapézio, pontas dos pés num step. Suba e desça os calcanhares.', 'Step firme
Amplitude completa
Corpo reto
Trave a barra ao terminar'),
  ('Ab Wheel de Joelhos', 'Abdômen', 'anti-extensao', 'Roda', 'Ajoelhado, role a roda à frente e volte usando o abdômen.', 'Lombar não afunda
Amplitude só até manter o abdômen firme
Glúteos contraídos
Volta lenta'),
  ('Prancha com Alcance', 'Abdômen', 'anti-extensao', 'Peso do corpo', 'Em prancha com os braços estendidos, leve uma mão à frente de cada vez sem girar o quadril.', 'Quadril parado, sem balançar
Pés mais afastados facilitam
Abdômen firme
Movimento lento'),
  ('Prancha RKC', 'Abdômen', 'anti-extensao', 'Peso do corpo', 'Prancha contraindo ao máximo glúteos, abdômen e coxas, puxando os cotovelos em direção aos pés.', 'Contração total por pouco tempo (10 a 20 s)
Quadril alinhado
Respiração curta e controlada
Cotovelos sob os ombros'),
  ('Prancha Lateral com Peso', 'Abdômen', 'anti-rotacao', 'Anilha', 'Prancha lateral segurando uma anilha sobre o quadril.', 'Só com a prancha lateral bem dominada
Quadril alto
Corpo reto
Faça os dois lados'),
  ('Russian Twist com Anilha', 'Abdômen', 'rotacao', 'Anilha', 'Sentado com o tronco inclinado para trás, gire o tronco levando a anilha de um lado ao outro.', 'Coluna reta, sem arredondar
Giro do tronco, não só dos braços
Pés no chão se a lombar incomodar
Movimento controlado'),
  ('Elevação de Pernas nas Paralelas', 'Abdômen', 'elevacao-pernas', 'Peso do corpo', 'Apoiado nas paralelas com braços estendidos, eleve as pernas à frente e desça devagar.', 'Ombros longe das orelhas
Sem balançar
Dobre os joelhos para facilitar
Descida lenta'),
  ('Supino Pegada Neutra com Halteres', 'Peito', 'supino-reto', 'Halteres', 'Supino reto com as palmas viradas uma para a outra. Desça os halteres ao lado do peito e empurre de volta.', 'Cotovelos mais próximos do tronco
Escápulas encaixadas
Boa opção para quem sente o ombro no supino comum
Amplitude controlada'),
  ('Supino Máquina Convergente', 'Peito', 'supino-reto', 'Máquina', 'Na máquina em que as alças se aproximam ao empurrar, empurre à frente e volte devagar.', 'Costas e escápulas apoiadas
Alças na linha do meio do peito
Não trave os cotovelos
Retorno controlado'),
  ('Supino Inclinado Unilateral com Haltere', 'Peito', 'supino-inclinado', 'Halteres', 'Banco inclinado, um haltere em uma mão. Empurre para cima e desça controlando, mantendo o tronco parado.', 'Segure o banco com a mão livre para estabilizar
Tronco sem girar
Escápula do lado em trabalho encaixada
Comece pelo lado mais fraco'),
  ('Crucifixo Declinado Halteres', 'Peito', 'crucifixo', 'Halteres', 'Banco declinado, halteres acima do peito. Abra os braços em arco e volte aproximando.', 'Cotovelos levemente dobrados
Não desça além da linha do peito
Escápulas encaixadas
Carga moderada'),
  ('Peck Deck Unilateral', 'Peito', 'crucifixo', 'Máquina', 'No peck deck, feche um braço de cada vez até a frente do peito e volte devagar.', 'Tronco parado, sem girar
Cotovelo levemente dobrado
Escápulas encostadas
Volta lenta'),
  ('Peck Deck Baixo', 'Peito', 'crucifixo', 'Máquina', 'Peck deck com as alças ajustadas abaixo da linha do peito, fechando os braços de baixo para cima.', 'Assento ajustado para as alças ficarem abaixo do peito
Peito aberto, ombros baixos
Cotovelos levemente dobrados
Retorno controlado'),
  ('Crossover na Altura do Peito', 'Peito', 'crucifixo', 'Cabo', 'Polias na altura do peito. Com um passo à frente, traga as alças à frente do peito em arco.', 'Cotovelos levemente dobrados e fixos
Tronco estável
Ombros baixos
Volta lenta até alongar'),
  ('Flexão com Colete', 'Peito', 'supino-reto', 'Peso do corpo', 'Flexão de braço usando colete com peso.', 'Só use colete com a flexão livre bem feita
Corpo reto, abdômen firme
Cotovelos a 45° do tronco
Colete justo, sem balançar'),
  ('Flexão com Déficit', 'Peito', 'supino-reto', 'Peso do corpo', 'Flexão com as mãos sobre suportes ou anilhas para o peito descer mais que o nível das mãos.', 'Desça só até onde o ombro fica confortável
Corpo em bloco
Cotovelos a 45° do tronco
Suportes firmes, sem deslizar')
on conflict (nome) do update set
  grupo = excluded.grupo, padrao = excluded.padrao, equipamento = excluded.equipamento,
  instrucao = coalesce(public.exercicios.instrucao, excluded.instrucao),
  pontos_atencao = coalesce(public.exercicios.pontos_atencao, excluded.pontos_atencao);
