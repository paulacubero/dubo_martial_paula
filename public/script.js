fetch('/usuarioLogeado')
	.then((response) => response.json())
	.then((data) => {
		if (data) {
			const boton = document.querySelector('.boton-login');
			boton.href = '/cerrar';
			boton.textContent = 'Cerrar Sesion';
		}
	});
