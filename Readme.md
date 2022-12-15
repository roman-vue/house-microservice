| Servicio                                             | Puerto |
| ---------------------------------------------------- | ------ |
| Base de datos Microservicio Auth                     | 5001   |
| Base de datos Microservicio Gestión de Descuentos    | 5002   |
| Base de datos Microservicio de Gestión de alquileres | 5003   |
| API-Gateway                                          | 4001   |

-   Es necesario tener instalado Docker y mantenerlo en ejecución en el equipo.

Una vez aclaradas las anotaciones, para ejecutar el proyecto debemos usar una terminal para centrarnos en la raíz del proyecto donde se encuentra el archivo `docker-compose.yaml` y ejecutaremos el siguiente comando.

```sh
docker-compose up
```

## API GATEWAY

Para visualizar la documentación del proyecto en Swagger debemos ingresar al siguiente enlace: `http://localhost:4001/api/v1/api-gateway/docs`

### SWAGGER

Usuario: microservicios-prueba
Contraseña: yx085q32g2Eu2Cgs

### RABBITMQ

Para ver el monitoreo de los servicios en rabbitMQ ingrese a la siguiente página:
`https://www.cloudamqp.com/`

puede crear una instancia gratuita y pone la URL en la variable de entorno

```sh
#RABBITMQ
AMQP_URL=
```
