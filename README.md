# Backend-en-la-nube

>Desplegar un backend que registre y administre el apoyo a recaudaciones con un beneficio social con las siguientes operaciones:

1.- Creación de usuario en alguna base de datos. POST /recaudacion/crearUsuario

2.-Donación a la campaña  POST /recaudacion/donacion

3.-Ingresar la información de la campaña de donación como propósito y meta POST /recaudacion/configurar

4.-Consulta de saldo Ruta GET /recaudacion/totalDonaciones

>Características del backend:

1.-Debe existir un solo controlador

2.-Debe generarse un workspace dentro de postman o herramienta equivalente con los casos de prueba

5.-La base de datos puede ser en mysql o dynamo db.

>Características del despliegue:

->La tabla en dynamo como la base de datos en mysql deben ser nuevas.

->No es necesario desplegar el proyecto en la nube de forma local, es suficiente.
