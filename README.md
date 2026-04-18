é um mini-jogo interativo de memória desenvolvido como um presente digital personalizado.
O projeto combina tecnologia, design e emoção para transformar momentos especiais em uma experiência única e envolvente.

---

## 💡 Sobre o Projeto

vai além de um simples jogo da memória.
Cada par de cartas representa uma lembrança especial (foto + mensagem), criando uma jornada emocional à medida que o usuário avança no jogo.

Ao completar todos os pares, uma **galeria exclusiva é desbloqueada**, funcionando como um álbum digital interativo.

---

## ✨ Funcionalidades

### 🏠 Tela Inicial (Home)

* Apresentação do projeto
* Identidade visual “Velvet Memory”
* Botão para iniciar o jogo

---

### 🎮 Jogo da Memória

* Grid dinâmico de cartas geradas automaticamente
* Sistema de virar cartas com animação
* Verificação de pares
* Exibição de mensagens personalizadas ao acertar
* Contador de tentativas
* Bloqueio de interação durante comparação
* Embaralhamento automático a cada nova partida

---

### 🎨 Experiência Visual

* Design minimalista e romântico
* Transições suaves entre telas
* Efeito de “glow” ao acertar pares
* Feedback visual interativo

---

### 🏆 Tela de Vitória

* Exibida ao completar todos os pares
* Mensagem final personalizada
* Exibição de desempenho (tentativas e/ou tempo)
* Opção de jogar novamente
* Acesso à galeria desbloqueada

---

### 🖼️ Galeria de Memórias

* Liberada apenas após vencer o jogo
* Exibe todas as imagens utilizadas
* Cada memória contém sua mensagem associada
* Funciona como um álbum digital interativo

---

## 🧠 Conceitos Aplicados

* Manipulação de DOM com JavaScript
* Estrutura SPA (Single Page Application)
* Separação de responsabilidades (HTML, CSS, JS, dados)
* Algoritmo de embaralhamento (Fisher-Yates)
* Controle de estado da aplicação
* Persistência com `localStorage`

---

## 🎮 Regras do Jogo

* As cartas são duplicadas a partir dos pares definidos

* As posições são embaralhadas a cada:

  * início do jogo
  * reinício
  * recarregamento da página

* Interações:

  * Apenas 2 cartas podem ser viradas por vez
  * Acerto:

    * cartas permanecem abertas
    * mensagem exibida
    * efeito visual aplicado
  * Erro:

    * cartas voltam após pequeno delay

* O jogo termina ao encontrar todos os pares

---

## 🔒 Regra da Galeria

* A galeria começa bloqueada
* Só é liberada após a vitória
* Estado salvo com `localStorage`
* Permanece liberada mesmo após recarregar a página

---

## 🔧 Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript (Vanilla)

## 🎯 Objetivos do Projeto

* Criar uma experiência emocional e interativa
* Praticar organização e arquitetura de código
* Desenvolver um projeto criativo para portfólio
* Aplicar conceitos reais de front-end

---

## ❤️ Considerações Finais

Velvet Memory transforma código em sentimento.
Mais do que um jogo, é uma forma criativa de eternizar momentos através da tecnologia.

---
