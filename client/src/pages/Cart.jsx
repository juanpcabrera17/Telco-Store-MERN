import React from 'react';

export const Cart = () => {
	return (
		<body className="bg-gray-100">
			<div className="container mx-auto mt-10">
				<div className="flex shadow-md my-10">
					<div className="w-3/4 bg-white px-10 py-10">
						<div className="flex justify-between border-b pb-8">
							<h1 className="font-semibold text-2xl">Carrito</h1>
							<h2 className="font-semibold text-2xl">{/* totalQuantity */} Items</h2>
						</div>
						<div className="flex mt-10 mb-5">
							<h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
								Detalles del producto
							</h3>
							<h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
								Cantidad
							</h3>
							<h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
								Precio
							</h3>
							<h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
								Total
							</h3>
						</div>

						{/* each products */}
						<div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
							<div className="flex w-2/5">
								{/* product  */}
								<div className="w-40">
									<img
										className="h-40 object-contain"
										src="{{this.thumbnail}}"
										alt=""
									/>
								</div>
								<div className="flex flex-col justify-around ml-12 flex-grow">
									<span className="font-bold text-sm">{/* this.name */}</span>
									<button
										onClick="deleteProduct('{{../username}}', '{{this.id}}'); location.reload();"
										href="#"
										className="font-semibold hover:text-red-500 text-gray-500 text-xs"
									>
										Eliminar
									</button>
								</div>
							</div>
							<span className="text-center w-1/5 font-semibold text-sm">
								{/* this.quantity */}
							</span>
							<span className="text-center w-1/5 font-semibold text-sm">
								$ {/* this.price */}
							</span>
							<span className="text-center w-1/5 font-semibold text-sm">
								$ {/* this.total */}
							</span>
						</div>
						{/* /each */}

						<a
							href="/api/productos"
							className="flex font-semibold text-indigo-600 text-sm mt-10"
						>
							<svg
								className="fill-current mr-2 text-indigo-600 w-4"
								viewBox="0 0 448 512"
							>
								<path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"></path>
							</svg>
							Seguir comprando
						</a>
					</div>

					<div id="summary" className="w-1/4 px-8 py-10">
						<h1 className="font-semibold text-2xl border-b pb-8">Total de la orden</h1>
						<div className="flex justify-between mt-10 mb-5">
							<span className="font-semibold text-sm uppercase">
								Items {/* totalQuantity */}
							</span>
							<span className="font-semibold text-sm">${/* totalCost */}</span>
						</div>
						<div>
							<label className="font-medium inline-block mb-3 text-sm uppercase">
								Envío
							</label>
							<select className="block p-2 text-gray-600 w-full text-sm">
								<option>Envío a domicilio - gratis</option>
							</select>
						</div>
						<div className="py-10">
							<label
								for="promo"
								className="font-semibold inline-block mb-3 text-sm uppercase"
							>
								Cupón de descuento
							</label>
							<input
								type="text"
								id="promo"
								placeholder="Ingrese el cupón"
								className="p-2 text-sm w-full"
							/>
						</div>
						<button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
							Aplicar
						</button>
						<div className="border-t mt-8">
							<div className="flex font-semibold justify-between py-6 text-sm uppercase">
								<span>Precio total</span>
								<span>${/* totalCost */} </span>
							</div>
							<form action="/api/carrito" method="post">
								{/* #each products */}
								<input type="hidden" name="name" value="{{this.name}}" />
								<input type="hidden" name="price" value="{{this.price}}" />
								<input type="hidden" name="quantity" value="{{this.quantity}}" />
								<input type="hidden" name="total" value="{{this.total}}" />
								{/* /each */}
								<input type="hidden" name="totalCost" value="{{totalCost}}" />
								<button
									className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
									type="submit"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light"
									style="
														background: linear-gradient(
															to right,
															#ee7724,
															#d8363a,
															#dd3675,
															#b44593
														);
														"
								>
									Finalizar Compra
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</body>
	);
};
