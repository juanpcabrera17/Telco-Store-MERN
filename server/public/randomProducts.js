const socket = io();
socket.on('connect', () => {
	console.log('WebSocket conectado');
});

socket.on('randomProduct-list', (data) => {
	let products = '';
	data.forEach((item) => {
		products += `
					<tr>
						<td class="border p-10">${item.name}</td>
						<td class="border p-10">${item.price}</td>
						<td class="border p-10"><img src="${item.thumbnail}" class="max-w-xs"/></td>
					</tr>
		`;
	});

	document.getElementById('div-list-products').innerHTML = products;
});
