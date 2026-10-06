// Worksheet 3 - JavaScript | Ponto 2: Home Sweet Home
// Wrapper "use strict" pedido na alínea c) do ponto 1 da ficha.
// Tudo o que precisamos fica DENTRO desta função, para não criar variáveis globais.
var app = (function () {
	'use strict';

	// ======================================================
	// 2.a / 2.b / 2.c / 2.d — Toggle buttons das luzes e da música
	// ======================================================

	// Função genérica e reutilizável. Recebe:
	//   - buttonId    -> id do botão clicado (ex.: 'kitchenLightsBtn')
	//   - iconId      -> id do ícone que lhe corresponde (ex.: 'kitchenLightsIcon')
	//   - iconOnColor -> classe de cor do ícone quando está LIGADO (ex.: 'text-warning')
	// Faz o "toggle" (troca) entre os estados on/off. Usamo-la para os 4 botões,
	// em vez de repetir o mesmo código 4 vezes.
	function toggleState(buttonId, iconId, iconOnColor) {
		var btn = document.getElementById(buttonId);
		var icon = document.getElementById(iconId);

		// getAttribute('value') lê o valor ATUAL do atributo "value" do botão
		// (slide 36 da teórica: setAttribute()/getAttribute())
		var state = btn.getAttribute('value');

		if (state === 'off') {
			// estava "off" -> passa a "on"
			btn.setAttribute('value', 'on'); // atualiza o atributo value
			btn.textContent = 'On';          // atualiza o texto visível do botão

			// classList.remove/add trocam as classes de cor (slide 37 da teórica)
			btn.classList.remove('text-danger');
			btn.classList.add('text-success');

			// ícone: de "contorno" (fa-regular) para "preenchido" (fa-solid)...
			icon.classList.remove('fa-regular');
			icon.classList.add('fa-solid');
			// ...e de cinzento para a cor "ligado" desse ícone
			icon.classList.remove('text-muted');
			icon.classList.add(iconOnColor);
		} else {
			// estava "on" -> passa a "off"
			btn.setAttribute('value', 'off');
			btn.textContent = 'Off';

			btn.classList.remove('text-success');
			btn.classList.add('text-danger');

			icon.classList.remove('fa-solid');
			icon.classList.add('fa-regular');
			icon.classList.remove(iconOnColor);
			icon.classList.add('text-muted');
		}
	}

	// Um addEventListener('click', ...) por botão (slide 30 da teórica).
	// Cada um chama a mesma função toggleState(), só mudam os ids e a cor do ícone.
	document.getElementById('kitchenLightsBtn').addEventListener('click', function () {
		toggleState('kitchenLightsBtn', 'kitchenLightsIcon', 'text-warning');
	});

	document.getElementById('ceilingLightsBtn').addEventListener('click', function () {
		toggleState('ceilingLightsBtn', 'ceilingLightsIcon', 'text-warning');
	});

	document.getElementById('ambientLightsBtn').addEventListener('click', function () {
		toggleState('ambientLightsBtn', 'ambientLightsIcon', 'text-warning');
	});

	document.getElementById('ambientMusicBtn').addEventListener('click', function () {
		toggleState('ambientMusicBtn', 'ambientMusicIcon', 'text-primary');
	});

	// ======================================================
	// 2.e — Temperatura aleatória a cada 5 segundos
	// ======================================================

	// Gera um número aleatório entre 10 e 30, com 1 casa decimal,
	// já formatado como "23.4 °C" (slide 9: Math object)
	function randomTemperature() {
		var min = 10;
		var max = 30;
		var value = Math.random() * (max - min) + min; // número entre 10 e 30
		return value.toFixed(1) + ' °C'; // toFixed(1) arredonda a 1 casa decimal
	}

	// Atualiza as DUAS temperaturas do dashboard (Kitchen e Living Room)
	function updateTemperatures() {
		document.getElementById('kitchenTemp').textContent = randomTemperature();
		document.getElementById('livingRoomTemp').textContent = randomTemperature();
	}

	// setInterval corre a função a cada 5000 ms = 5 segundos (slide 32)
	setInterval(updateTemperatures, 5000);

	// ======================================================
	// 2.f — Data (uma vez) e relógio (a cada segundo)
	// ======================================================

	// Função auxiliar: garante que números de 1 dígito ficam com um "0" à frente
	// (ex.: 9 -> "09"), para o relógio/data ficarem sempre com 2 dígitos
	function pad(number) {
		return number < 10 ? '0' + number : number;
	}

	// Lê a data do sistema e escreve-a no formato AAAA-MM-DD, igual ao dashboard original
	function updateDate() {
		var now = new Date();
		// getMonth() começa em 0 (janeiro = 0), por isso somamos 1
		document.getElementById('clockDate').textContent =
			now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
	}

	// Lê a hora do sistema e escreve-a no formato HH:MM:SS
	function updateClock() {
		var now = new Date();
		document.getElementById('clockTime').textContent =
			pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());
	}

	// A data só precisa de ser escrita UMA VEZ, quando a página carrega
	// (este script já corre no fim do <body>, por isso a página já está "carregada")
	updateDate();

	// A hora tem de aparecer logo ao carregar a página...
	updateClock();
	// ...e depois atualizar-se sozinha a cada 1000 ms = 1 segundo (slide 32)
	setInterval(updateClock, 1000);

})();
