# 🚀 Aplicación Node.js para Azure App Service

Esta es una aplicación web moderna desarrollada con Node.js y Express, diseñada para ser desplegada en Microsoft Azure App Service (modelo PaaS).

## 📋 Características

- **Framework**: Node.js con Express
- **Frontend**: HTML5, CSS3, JavaScript
- **UI**: Diseño moderno y responsivo
- **API**: Endpoint de salud para monitoreo
- **Deployment**: Optimizado para Azure App Service

## 🏗️ Estructura del Proyecto

```
.
├── index.js              # Servidor Express principal
├── package.json          # Configuración y dependencias
├── public/               # Archivos estáticos
│   ├── index.html       # Página principal
│   ├── styles.css       # Estilos CSS
│   └── app.js           # JavaScript del frontend
├── .gitignore           # Archivos a ignorar en Git
└── README.md            # Documentación

```

## 🚀 Guía de Despliegue en Azure App Service

### Paso 1: Preparar el código

1. Asegúrate de tener todos los archivos del proyecto
2. Instala las dependencias localmente (opcional, para probar):
   ```bash
   npm install
   ```

### Paso 2: Inicializar Git (si aún no lo has hecho)

```bash
git init
git add .
git commit -m "Initial commit - Aplicación Node.js para Azure"
```

### Paso 3: Desplegar a Azure

Ya tienes tu App Service creada. Ahora sigue estos pasos:

#### Opción A: Despliegue desde Azure Portal

1. Ve a tu [Azure Portal](https://portal.azure.com)
2. Busca tu App Service
3. En el menú izquierdo, ve a **Centro de implementación** (Deployment Center)
4. Selecciona tu origen (GitHub, Azure DevOps, Local Git, etc.)
5. Conecta tu repositorio
6. Azure desplegará automáticamente tu aplicación

#### Opción B: Despliegue desde línea de comandos (Azure CLI)

1. Instala Azure CLI si no lo tienes: https://aka.ms/InstallAzureCLI
2. Inicia sesión:
   ```bash
   az login
   ```
3. Configura el despliegue:
   ```bash
   az webapp up --name NOMBRE-DE-TU-APP --resource-group NOMBRE-DE-TU-RESOURCE-GROUP --runtime "NODE|18-lts"
   ```
4. Azure CLI detectará automáticamente que es una app Node.js y la desplegará

#### Opción C: Despliegue desde VS Code

1. Instala la extensión "Azure App Service" en VS Code
2. Haz clic derecho en la carpeta del proyecto
3. Selecciona **Deploy to Web App**
4. Selecciona tu suscripción y App Service
5. Espera a que termine el despliegue

### Paso 4: Configurar el entorno

1. En el Azure Portal, ve a tu App Service
2. Ve a **Configuración** → **Configuración general**
3. Verifica que:
   - **Pila de pila** esté configurada en **Node**
   - **Versión de Node** sea 18 LTS o 20 LTS
   - **Puerto** sea el predeterminado (o configura una variable de entorno PORT)

### Paso 5: Verificar el despliegue

1. Ve a la URL de tu App Service (algo como: `https://tu-app.azurewebsites.net`)
2. Deberías ver la página de bienvenida
3. Verifica que el endpoint `/api/health` responda correctamente

## 🧪 Pruebas Locales

Para probar la aplicación localmente antes de desplegar:

```bash
# Instalar dependencias
npm install

# Ejecutar la aplicación
npm start
```

La aplicación estará disponible en: http://localhost:8080

## 📁 Archivos Clave

### index.js
Servidor Express que:
- Sirve archivos estáticos desde la carpeta `public`
- Proporciona un endpoint `/api/health` para verificar el estado
- Configura el puerto desde variables de entorno (compatible con Azure)

### package.json
Define:
- Dependencias (Express)
- Scripts de inicio
- Configuración de Node.js y npm

### public/index.html
Página principal con información sobre la aplicación y estado del servicio

### public/styles.css
Estilos modernos con gradientes y animaciones CSS

### public/app.js
JavaScript del frontend que verifica el estado del servicio automáticamente

## 🌐 Variables de Entorno

Azure App Service configurará automáticamente:
- `PORT`: Puerto donde la aplicación escuchará (Azure configura esto automáticamente)
- `NODE_ENV`: Entorno de ejecución (production en Azure)

Puedes agregar variables de entorno en: **Configuración** → **Configuración de la aplicación** → **Nueva configuración de aplicación**

## 🔧 Solución de Problemas

### La aplicación no inicia
- Verifica los logs en: **Supervisión** → **Log stream**
- Asegúrate de que el archivo se llame `index.js` o modifica `package.json`
- Verifica que la versión de Node.js sea compatible

### Error 500
- Revisa los logs de la aplicación
- Verifica que `package.json` tenga el script `start` correcto
- Asegúrate de que todas las dependencias estén en `package.json`

### La página no carga
- Verifica que el puerto esté configurado correctamente
- Asegúrate de que los archivos estáticos estén en la carpeta `public`

## 📚 Recursos Adicionales

- [Documentación de Azure App Service](https://docs.microsoft.com/azure/app-service/)
- [Documentación de Node.js](https://nodejs.org/es/docs/)
- [Documentación de Express](https://expressjs.com/es/)

## 📞 Soporte

Para problemas con Azure:
- Documentación: https://docs.microsoft.com/azure/
- Soporte técnico: https://azure.microsoft.com/support/

## 🎉 ¡Listo!

Tu aplicación está preparada para ser desplegada en Azure App Service. Sigue los pasos de despliegue y tendrás tu aplicación web funcionando en la nube en minutos.

