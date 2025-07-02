# UTN Backend (Proyecto de Gestión de Productos)

Este proyecto es el backend para un sistema de gestión de productos desarrollado en Node.js, Express y MySQL. Permite realizar operaciones CRUD sobre productos, incluyendo carga de imágenes con multer.
Para poder acceder al panel del CRUD se debe de ingresar con el mail de admin@example.com password Inicio4$ permitiendo asi administrar los productos que se mostraran en el Inicio de la web. Con el mail usuario@example.com password Inicio4$ se utiliza para controlar que los usuarios que no tengan rol admin no puedan ingresar al gestor de productos.

---

## 📦 Tecnologías

- **Node.js** (v16+)
- **Express.js**
- **JWT**
- **MySQL** (a través de `mysql2` o `mysql`)
- **Multer** para manejo de archivos
- **CORS**, **dotenv** para configuración
- **Morgan** para logging
- **DOTENV** para las variables de entorno

 ## 🛠️ Endpoints disponibles

  - app.use("/productos", productos);
  - productoRouter.get("/", controller.getAll);
  - productoRouter.get("/:id", controller.getOne);
  - productoRouter.post("/", uploader.single("imagen"), controller.createProduct);
  - productoRouter.put("/:id", controller.modificarProducto);
  - productoRouter.delete("/:id", controller.removeProducto);
