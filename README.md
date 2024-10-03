# Simulador de investimentos

> ### Introdução

Este projeto nasceu de uma necessidade pessoal, enquanto eu realizava alguns investimentos no mercado financeiro. Após uma busca na internet, não consegui localizar nenhuma ferramenta parecida.

A principal dor era de calcular quantos papéis seriam necessários adquirir aportando um valor X em uma carteira de investimentos montada manualmente. Outra dor era de salvar essas carteiras criadas, além de realizar a manutenção (diminuir o peso do ativo na carteira, remover o ativo, incluir um novo ativo, etc).

Uma outra motivação para o projeto foi também a possibilidade de aprofundar os estudos me versões mais novas do Angular (mais precisamente versão 17), bem como no seu controle de estado utilizado o [ngrx](https://ngrx.io/).

> ### Fonte de dados

Para que o projeto funcionasse sem grandes esforços, era necessário encontrar alguma API que disponibilizasse as cotações dos ativos da bolsa de valores de forma gratuita. A primeira plataforma que pensei foi justamente a [B3](https://developers.b3.com.br/), porém não achei as informações que necessitava tão facilmente.

Após essa tentativa frustrada com a B3, comecei a procurar outras fontes de dados. Foi então que encontrei a [API da Brapi](https://brapi.dev/). Nela, de forma bem simples e fácil, foi possível obter as cotações de ações, fundos e BDR's, via requisição REST, sempre do <b>dia útil anterior.</b>

A API da Brapi possui um plano gratuito até então, o qual possui algumas limitações como:

- Limitação de até 15.000 requisições por mês;
- Até 1 ação por requisição;
- Dados históricos de até 1 mês;
- Dados com ao menos 30 minutos de atraso.

Dessa forma, foi necessário pensar em uma estratégia para minimizaro impacto dessas travas.

> ### Funcionamento

Como citado acima, devido a limitação de quantidade de requisições por mês, foi necessário pensar em uma forma de armazenar essas informações. Além disso, devido a custos, foi descartada a criação de uma API com um banco de dados para persistência dessas informações, visto que o projeto tinha o intuito de ser simples, rápido e "gratuito".

Sendo assim, a primeira vez que o usuário realiza o acesso ao site no dia, o sistema realiza chamada na API da Brapi, captura os dados e salva no LocalStorage do navegador. Caso o usuário acesse novamente o site durante o dia, em vez de realizar nova chamda na API da Brapi, o sistema consulta as informações já salvas no LocalStorage.

> ### Funcionalidades

Como funcionalidades do sistema temos:
- Criação/Edição/Deleção de uma carteira de investimentos;
- Possibilidade de ativar ou desativar uma carteira;
- Realizar simulações de investimentos na carteira escolhida.

Além disso na Home Page existe um carrossel com o último preço dos ativos.

![Demonstracao](./media/demonstracao-simulador-investimentos.gif)

> ### Hospedagem

Devido a necessidade de não gastar com hospedagem do site, realizei uma breve pesquisa e encontrei a possibilidade de utilizar o [GitHub Pages](https://pages.github.com/).

Com ele é possível hospedar o site diretamente do repositório GitHub, gerando um domínio pronto relacionado ao meu perfil no GitHub.

Porém vale ressaltar que ele possui limitação de hospedagem para sites "estáticos", mas foi possível configurar hospedar o Angular sem dificuldades.

[Clique aqui](https://gustavoaraujo26.github.io/investment-simulation/home) para acessar o site hospedado.

> ### Pacotes utilizados

Segue abaixo lista de pacotes utilizados na construção do site.

- angular 17.3.0
- angular material 17.3.0
- ngrx 17.2.0
- angular-input-masks 4.4.1
- material-design-lite 1.3.0
- ng2-currency-mask 13.0.3
- ngx-device-detector 7.0.0
- ngx-loading 17.0.0
- ngx-mask 18.0.0
- rxjs 7.8.0
- sweetalert2 11.4.0
- uuid 10.0.0

> ### Possíveis evoluções

Dentre possíveis evoluções que poderiam ser feitas posteriormente, destaco:

- Inclusão de ativos de outras bolsas como americana e europeia;
- Dashboard para pesquisa de ações;
