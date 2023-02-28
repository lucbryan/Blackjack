class Trunfos {
	nome = '';
	imagem = 'url(imgs/trunfos/';
	descricao = "";
	tipo = "";

	constructor(nome,descricao,tipo) {
		this.nome = nome;
		this.imagem += nome+'.png)';
		this.descricao = descricao;
		this.tipo = tipo;
	}
}



trunfos = [];

trunfo_atual = 0;

t = new Trunfos('+2', "Adiciona a carta 2 ao seu baralho.", "+");
trunfos.push(t);
t = new Trunfos('+3', "Adiciona a carta 3 ao seu baralho.", "+");
trunfos.push(t);
t = new Trunfos('+4', "Adiciona a carta 4 ao seu baralho.", "+");
trunfos.push(t);
t = new Trunfos('+5', "Adiciona a carta 5 ao seu baralho.", "+");
trunfos.push(t);
t = new Trunfos('+6', "Adiciona a carta 6 ao seu baralho.", "+");
trunfos.push(t);
t = new Trunfos('+7', "Adiciona a carta 7 ao seu baralho.", "+");
trunfos.push(t);
t = new Trunfos('Exchange', "Inverte sua ultima carta pela ultima do seu oponente.", "T");
trunfos.push(t);






meta = 21;

total_cartas1 = 0;
total_cartas2 = 0;

manteve_jogo = 0;

cartas_pegas = [];


carta_secreta_robo = null;

posicao_carta_jogador = 2;
posicao_carta_robo = 2;



posicao_trunfo_jogador = 1;
posicao_trunfo_robo = 1;


cartas = [];

function criar_cartas() {
	i = 1;
	while (i < 12) {
		cartas.push(i);
		i+=1;
	}
}


function personalizar_carta(carta, pos_left, pos_top) {
	carta.style.height = "130px";
	carta.style.width = "105px";
	carta.style.position = "absolute";
	/*carta.style.border= '1px solid #969696';*/
	carta.style.backgroundSize = "cover";
	carta.style.boxShadow = 'inset 16px 0 40px 3px rgb(0, 0, 0), inset -3px 0 6px 1px white';


	carta.style.left = pos_left.toString() + "px";
	carta.style.top = pos_top.toString() + "px";


	carta.style.valor = '0'
	carta.style.color = 'transparent';

}

function personalizar_trunfo(carta, pos_left, pos_top) {
	carta.style.height = "130px";
	carta.style.width = "105px";
	carta.style.position = "absolute";
	carta.style.boxShadow = 'inset 16px 0 40px 3px rgb(0, 0, 0), inset -3px 0 6px 2px rgba(255, 255, 255, 0.2)';
	/*carta.style.border= '1px solid red';*/
	carta.style.backgroundSize = "cover";

  left = pos_left+25;

	carta.style.left = left.toString() + "px";
	carta.style.top = pos_top.toString() + "px";

}


function preparar_mesa1() {
	pos_left = 10;
	i = 1;

	while (i < 9) {
		var carta = document.createElement('div');
		var carta2 = document.createElement('div');

		var carta3 = document.createElement('div');
		var carta4 = document.createElement('div');

		carta.id = 'pos1.'+i.toString();
		carta2.id = 'pos2.'+i.toString();
		carta3.id = 'pos3.'+i.toString();
		carta4.id = 'pos4.'+i.toString();



		personalizar_carta(carta,pos_left,10);
		personalizar_trunfo(carta3,pos_left,150);
		personalizar_trunfo(carta4,pos_left,290);

	    personalizar_carta(carta2,pos_left,430);

	    document.getElementById("Jogador1").appendChild(carta);
	    document.getElementById("Jogador2").appendChild(carta2);
	    document.getElementById("Trunfos").appendChild(carta3);
	    document.getElementById("Trunfos").appendChild(carta4);


		pos_left += 120;
		i+=1;
	}
	carta_text = document.createElement('innerText');

	carta.appendChild(carta_text);
	carta.style.width = "160px";
	carta2.style.width = "160px";

	carta.style.fontSize = '60px';
	carta2.style.fontSize = '60px';

	carta.style.textAlign = 'center';
	carta2.style.textAlign = 'center';

	carta.style.color = '#229393';
	carta2.style.color = '#229393';
}


function iniciarJogo() {
	comprarCarta(cartas[getRandomInt(1,cartas.length-1)],2,1);


	carta_secreta_robo = getRandomInt(1,cartas.length-1);
	removeCarta(carta_secreta_robo);

	pos1_robo = document.getElementById("pos1.1");
	pos1_robo.style.backgroundImage = 'url(imgs/interrogation.png)';
	pos1_robo.style.backgroundColor = 'white';


	vezJogador();

}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


function comprarCarta3(jogador,posicao_carta) {

	if (cartas.length >= 1) {
		numero = getRandomInt(1,cartas.length-1);
		manteve_jogo = 0;

		carta_sorteada = cartas[numero];

		carta = document.getElementById("pos" + jogador.toString() + "."+posicao_carta.toString());
		removeCarta(carta_sorteada);

		if (jogador != 1 || posicao_carta != 1) {
			carta.style.valor = carta_sorteada;
			carta.style.backgroundImage = 'url(imgs/baralho/'+carta_sorteada.toString()+".png)";
		}

		pos = document.getElementById("pos"+jogador.toString() +'.8');

		if (jogador == 1) { total_cartas1+=carta_sorteada; alocarTotal(pos,total_cartas1);}
		else { total_cartas2+=carta_sorteada; alocarTotal(pos,total_cartas2);}

		}
		else {
			alert("Baralho finalizado.")
		}

}


function comprarCarta(carta_sorteada,jogador,posicao_carta) {

	if (cartas.length >= 1) {
		manteve_jogo = 0;

		carta = document.getElementById("pos" + jogador.toString() + "."+posicao_carta.toString());
		removeCarta(carta_sorteada);

		if (jogador != 1 || posicao_carta != 1) {
			carta.style.valor = carta_sorteada;
			carta.style.backgroundImage = 'url(imgs/baralho/'+carta_sorteada.toString()+".png)";
		}

		pos = document.getElementById("pos"+jogador.toString() +'.8');

		if (jogador == 1) { total_cartas1+=carta_sorteada; alocarTotal(pos,total_cartas1);}
		else { total_cartas2+=carta_sorteada; alocarTotal(pos,total_cartas2);}

		}
		else {
			alert("Baralho finalizado.")
		}

}


function removeCarta(numero) { 
	for (var i = cartas.length - 1; i >= 0; i--) {
		if (cartas[i] === numero) {
			cartas.splice(i, 1);
	 	}
	}
}

function analisarJogo() {
	total_real = total_cartas1 + carta_secreta_robo;
	quanto_falta = 21 - total_real;
	if (quanto_falta > 5) {comprarCarta(cartas[getRandomInt(1,cartas.length-1)],1,posicao_carta_robo); posicao_carta_robo+=1;}
	else { manter(1);}
}
function alocarTotal(pos,total) {
	pos.innerText = total.toString()+"/"+meta;
}

function vezRobo() {
	analisarJogo();
}

function vezJogador() {
	if (total_cartas2 < 21) {
	comprarCarta(cartas[getRandomInt(1,cartas.length-1)],2,posicao_carta_jogador);
	posicao_carta_jogador+=1;
	vezRobo();
	}
	else { alert('Você não pode comprar cartas apos ter estourado.')}
}

function manter(jogador){
	alert('Passo..')
	manteve_jogo+=1;

	if (manteve_jogo >= 2) {
		fimDoJogo();
	}
	else if (jogador == 2){
		alert(jogador + "vez do robo")
		vezRobo();
	}
}

function fimDoJogo() {
	alert("Fim do jogo.")
	carta = document.getElementById("pos1.1");
	carta.style.backgroundImage = 'url(imgs/baralho/'+carta_secreta_robo.toString()+'.png)';
	pos_total = document.getElementById("pos1.8");
	
	total = total_cartas1+carta_secreta_robo;
	alocarTotal(pos_total,total);

	/*total2 = parseInt(document.getElementById("pos2.8").innerText);*/
	total2 = total_cartas2;

	if (total == total2) { alert("Empate");}

	else if (total <= 21 && total2 <= 21) {
		alert("HMMMMMMM 1")
		if (total > total2) {alert("Vc perdeu.");}
		else if (total2 > total) {alert("Vc venceu.");}
	}

	else if (total > 21 && total2 > 21) {
		alert("HMMMMM 2")
		if (total < total2) {alert("Vc perdeu.");}
		else if (total2 < total) {alert("Vc venceu.");}
	}

	else if (total <= 21 && total2 > 21) {alert("Vc perdeu.");}
	else if (total2 <= 21 && total > 21) {alert("Vc venceu.");}

}


function somarCartas(i,jogador) {
	total = 0;
	while (i < 8) {
		valor = parseInt(document.getElementById("pos"+jogador+"."+i).style.valor);
		total += valor;
		i+=1;
	} document.getElementById("pos"+jogador+".8").innerText = total;
}


function adicionarTrunfo() {
	trunfo = document.getElementById("trunfoAtivo");
	trunfo.style.backgroundImage = trunfos[trunfo_atual].imagem;
	trunfo.style.nome = trunfos[trunfo_atual].nome;
	trunfo.style.descricao = trunfos[trunfo_atual].descricao;
	trunfo.style.tipo = trunfos[trunfo_atual].tipo;

}

function exibirTrunfo(i,trunfo) {
	alert(i);
	trunfo.style.backgroundImage = trunfos[i].imagem;
}


function proximoTrunfo() {
	trunfo_atual+=1;
	adicionarTrunfo()
}
function exibirDescricao() {
	trunfo = document.getElementById("trunfoAtivo");
	alert(trunfo.style.descricao);
}



function verifica(numero) {
	for (var i = cartas.length - 1; i >= 0; i--) {
		if (cartas[i] == numero){
			return 'True';
		}
	} return 'False';
}

function comprarCarta2(jogador,posicao_carta,valor) {


		if (verifica(valor) == "True") {

			carta_sorteada = valor;

			carta = document.getElementById("pos" + jogador.toString() + "."+posicao_carta.toString());
			removeCarta(carta_sorteada);

			if (jogador != 1 || posicao_carta != 1) {
				carta.style.valor = carta_sorteada;
				carta.style.backgroundImage = 'url(imgs/baralho/'+carta_sorteada.toString()+".png)";
			}

			pos = document.getElementById("pos"+jogador.toString() +'.8');

			if (jogador == 1) { total_cartas1+=carta_sorteada; alocarTotal(pos,total_cartas1);}
			else { total_cartas2+=carta_sorteada; alocarTotal(pos,total_cartas2);}

			}

			else {
				alert("Carta não disponível.")
			}

}


function inverteCartas() {
	p1 = posicao_carta_robo-1;
	p2 = posicao_carta_jogador-1;

	carta1 = document.getElementById("pos1."+p1)
	carta2 = document.getElementById("pos2."+p2)
	
	var imagemCarta1 = carta1.style.backgroundImage;
	var valorCarta1 = carta1.style.valor;


	total_cartas1 -= carta1.style.valor;
	total_cartas2 -= carta2.style.valor;

	total_cartas1 += carta2.style.valor;
	total_cartas2 += carta1.style.valor;



	carta1.style.backgroundImage = carta2.style.backgroundImage;
	carta1.style.valor = carta2.style.valor;

	
	carta2.style.backgroundImage = imagemCarta1;
	carta2.style.valor = valorCarta1;

	alocarTotal(document.getElementById("pos1.8"),total_cartas1);
	alocarTotal(document.getElementById("pos2.8"),total_cartas2);

}


function usarTrunfo(jogador) {
	trunfo = document.getElementById("trunfoAtivo");
 
	posUser = '';
	pos_trunfo = '';
	if (jogador == 2) { posUser = '4.'; pos_trunfo = posicao_trunfo_jogador;}
	else if (jogador == 1) { posUser = '3.'; pos_trunfo = posicao_carta_robo;}

	pos = document.getElementById('pos'+ posUser + pos_trunfo);
	pos.style.backgroundImage = trunfo.style.backgroundImage;
	posicao_trunfo_jogador+=1;

	if (trunfo.style.tipo == "+") {

		valor = parseInt(trunfo.style.nome.split('')[1]);


		if(verifica(valor) == "True"){
			comprarCarta(valor,jogador,posicao_carta_jogador);
			posicao_carta_jogador+=1;
		}
		else {alert("Carta indisponível.");}
	}
	else if (trunfo.style.tipo == "T") {inverteCartas();}
}

preparar_mesa1();
criar_cartas();


iniciarJogo();
