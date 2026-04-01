# 📦 Frontend Setup – IoT Dashboard (Next.js)

## 🧩 Descripción

Este proyecto es el frontend de un sistema IoT desarrollado con **Next.js (App Router)** y
**React**, que permite visualizar datos de sensores, alertas y dashboards en tiempo real.

Incluye funcionalidades como:

- Visualización de datos en tiempo real
- Manejo de estado y cache
- Formularios validados
- Mapas interactivos
- Soporte offline con IndexedDB
- Comunicación en tiempo real con SignalR

---

## ⚙️ Tecnologías utilizadas

- **Framework:** Next.js (App Router)
- **Lenguaje:** TypeScript / JavaScript
- **Estilos:** Tailwind CSS, shadcn/ui
- **UI/UX:** Hero Icons
- **Gráficas:** Chart.js
- **Formularios:** React Hook Form + Zod
- **Estado y fetching:** TanStack Query
- **Grid / tablas:** React Grid
- **Autenticación:** NextAuth
- **Mapas:** Leaflet
- **Tiempo real:** SignalR
- **Cache offline:** IndexedDB

---

## 🧪 Requisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js:** `v25.4.0`
- **npm:** `v11.12.1`

Puedes verificar con:

```bash
node -v
npm -v
```

---

## 🚀 Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/mondo84/SimonMovilidad.git
cd SimonMovilidad
```

2. Instalar dependencias:

```bash
npm install
```

---

## 🔐 Variables de entorno

Crear un archivo `.env.local` en la raíz del proyecto con las variables necesarias, por ejemplo:

```env
NEXTAUTH_SECRET=una_clave_super_larga_y_segura
SWAGGER_API=http://localhost:5010
SWAGGER_API_DEV=http://localhost:5134
```

## ▶️ Ejecución del proyecto

Para correr el proyecto en desarrollo:

```bash
npm run dev -- -p numero_puerto Ej. npm run dev -- -p 3030
```

Luego abrir en el navegador:

```
http://localhost:3030 ó el puerto que indicaste en npm run dev -- -p xxxx
```

## 🏗️ Estructura del proyecto

```bash
/app
/components
/hooks
/lib
/modules
/providers
/types
```

- `/app` → rutas y layout (App Router)
- (publica)
- `/login`
- `/register`

- (Privadas)
- `/alerts`
- `/dashboard`
- `/home`
- `/user`
- /api/\*
  ----- → rutas consumo de API

---

## 🔄 Funcionalidades clave

### 📡 Tiempo real (SignalR)

Se utiliza SignalR para recibir actualizaciones en vivo desde el backend.

### 💾 Cache offline (IndexedDB)

Permite almacenar datos localmente cuando no hay conexión a internet.

### 📊 Visualización de datos

Uso de Chart.js para representar datos históricos.

### 🗺️ Mapas

Integración con Leaflet para mostrar ubicaciones geográficas.

---

## 🛠️ Scripts disponibles

```bash
npm run dev                 # Ejecuta en modo desarrollo en el puerto por default 3000
npm run dev  -- -p xxxx     # Ejecuta en modo desarrollo en el numero de puerto especifico
npm run build    # Construye la app para producción
npm run start    # Ejecuta la app en producción
npm run lint     # Linter
```

---

## 📌 Notas adicionales

- Asegurarse de que el backend esté corriendo correctamente.
- Verificar conexión con SignalR para datos en tiempo real. (En la consola del navegador, debe salir un mensaje que dice conectado a SignalR)
- Dar permiso al navegador para poder ubicar el marker del mapa en la ubicacion actual.

---

## 👨‍💻 Autor Yesid Davila => elmondoles@gmail.com

Proyecto desarrollado como parte de una prueba tecnica IoT con arquitectura moderna en comunicación en tiempo real.
