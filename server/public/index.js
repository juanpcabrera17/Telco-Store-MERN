const socket = io();
socket.on('connect', () => {
	console.log('WebSocket conectado');
});

const schema = normalizr.schema;
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const authorSchema = new schema.Entity('authors', {}, { idAttribute: 'idEmail' });
const messageSchema = new schema.Entity(
	'messages',
	{
		author: authorSchema,
	},
	{ idAttribute: '_id' }
);
const messageList = [messageSchema];

socket.on('msg', (data) => {
	console.log(data);
});

socket.on('msg-list', (data) => {
	const denormalized = denormalize(data.result, messageList, data.entities);
	const normalizedLength = JSON.stringify(data).length;
	const denormalizedLength = JSON.stringify(denormalized).length;
	const compresion = ((denormalizedLength - normalizedLength) * 100) / denormalizedLength;

	let html = '';
	denormalized.forEach((item) => {
		html += `
		<div class="flex flex-nowrap items-center pb-2">
			(${item.socketid}) <span class= "text-sky-700 font-bold mx-2">${item.author.idEmail}</span> <span class="text-amber-800 mx-2">[${item.date}]:</span><span class="text-green-700 italic mx-2"> ${item.text}</span><img src="${item.author.avatar}" class="mx-2" style="max-width: 8%"/>
		</div>
		`;
	});
	document.getElementById('div-list-msgs').innerHTML = html;

	let htmlCompresion = '';
	{
		htmlCompresion += `
	<h3>
		Porcentaje de compresión: %${compresion.toFixed(2)}
	</h3>
	`;
	}
	document.getElementById('compresion').innerHTML = htmlCompresion;
});

async function enviarMsg() {
	const idEmail = document.getElementById('idEmail').value;
	const name = document.getElementById('name').value;
	const surname = document.getElementById('surname').value;
	const age = document.getElementById('age').value;
	const alias = document.getElementById('alias').value;
	const avatar = document.getElementById('avatar').value;
	const text = document.getElementById('text').value;

	const Object = {
		author: {
			idEmail: idEmail,
			name: name,
			surname: surname,
			age: age,
			alias: alias,
			avatar: avatar,
		},
		text: text,
	};

	await socket.emit('msg', Object);
}

function id(number) {
	socket.emit('id', number);
}

function deleteId(number) {
	socket.emit('deleteId', number);
}

function deleteAll() {
	socket.emit('deleteAll');
}

function replace(number, body) {
	socket.emit('replace', number, body);
}

const modalToggles = document.querySelectorAll('[data-modal-toggle]');

modalToggles.forEach((toggle) => {
	toggle.addEventListener('click', () => {
		const target = toggle.dataset.modalTarget;
		const modal = document.getElementById(target);

		if (modal) {
			modal.classList.toggle('hidden');
			modal.setAttribute('aria-hidden', modal.classList.contains('hidden'));
			document.body.classList.toggle('modal-open');
		}
	});
});

const modalHides = document.querySelectorAll('[data-modal-hide]');

modalHides.forEach((hide) => {
	hide.addEventListener('click', () => {
		const target = hide.dataset.modalHide;
		const modal = document.getElementById(target);

		if (modal) {
			modal.classList.add('hidden');
			modal.setAttribute('aria-hidden', modal.classList.contains('hidden'));
			document.body.classList.remove('modal-open');
		}
	});
});

function deleteProduct(username, productId) {
	fetch(`/api/carrito/${username}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ productId }),
	}).catch((err) => {
		console.error('Error deleting product:', err);
	});
}
