# Hugging Face Spaces: Guía Completa y Manual de Uso

**Autor:** Manus AI

**Fecha:** 21 de Febrero de 2026

## 1. Introducción a Hugging Face Spaces

Hugging Face Spaces es una plataforma robusta y versátil diseñada para democratizar el despliegue y la demostración de aplicaciones de Machine Learning (ML). Permite a desarrolladores, investigadores y organizaciones alojar sus demos de ML directamente en sus perfiles o en los de sus organizaciones, facilitando la creación de portafolios, la presentación de proyectos en conferencias y la colaboración dentro del ecosistema de ML. La plataforma se integra profundamente con el Hugging Face Hub, aprovechando su infraestructura para la gestión de modelos y datasets.

El objetivo principal de Spaces es simplificar el proceso de llevar modelos de ML desde el desarrollo hasta una aplicación interactiva accesible para el público. Esto se logra a través de una infraestructura flexible que soporta múltiples SDKs y configuraciones de hardware, incluyendo la capacidad de utilizar aceleradores gráficos (GPUs) para aplicaciones más exigentes.

## 2. Funcionalidades Clave y Tipos de Spaces

Hugging Face Spaces ofrece una variedad de funcionalidades que lo hacen una herramienta indispensable para la comunidad de ML. Estas funcionalidades se centran en la facilidad de uso, la flexibilidad y la integración con el ecosistema de Hugging Face.

### 2.1. Creación y Despliegue de Spaces

La creación de un nuevo Space es un proceso sencillo que comienza en la página principal de Spaces en el Hugging Face Hub. Los usuarios pueden definir el nombre del Space, seleccionar una licencia opcional y establecer la visibilidad (público o privado). La plataforma soporta diferentes SDKs, lo que permite una gran flexibilidad en el tipo de aplicaciones que se pueden desplegar.

Cada Space se gestiona como un repositorio Git, similar a los repositorios de modelos y datasets en el Hub. Esto significa que los usuarios pueden clonar sus Spaces localmente, realizar cambios y luego subirlos (push) al repositorio. Cada vez que se realiza un nuevo commit, el Space se reconstruye y reinicia automáticamente, asegurando que la aplicación siempre refleje la última versión del código.

### 2.2. SDKs Soportados

Hugging Face Spaces ofrece soporte integrado para varios SDKs, lo que permite a los desarrolladores elegir la herramienta que mejor se adapte a sus necesidades:

*   **Gradio**: Es el SDK más popular y con soporte nativo. Permite construir interfaces de usuario interactivas para modelos de ML en Python con una cantidad mínima de código. Es ideal para prototipos rápidos y demostraciones.
*   **Streamlit**: Otro SDK popular para crear aplicaciones de datos en Python. Ofrece una forma sencilla de transformar scripts de Python en aplicaciones web interactivas.
*   **Static HTML**: Para aquellos que prefieren un control total sobre la interfaz de usuario, Spaces permite alojar aplicaciones web estáticas utilizando HTML, CSS y JavaScript. Esto es útil para demos que no requieren un backend de Python o para integrar frameworks frontend personalizados.
*   **Docker**: Para casos de uso más avanzados o cuando se requiere un entorno de ejecución muy específico, Spaces permite desplegar aplicaciones utilizando un Dockerfile. Esto proporciona la máxima flexibilidad, ya que los usuarios pueden definir su propio entorno, instalar dependencias personalizadas y ejecutar cualquier tipo de aplicación dentro de un contenedor Docker.

### 2.3. Gestión de Dependencias

La gestión de dependencias es crucial para asegurar que las aplicaciones se ejecuten correctamente. En Spaces, esto se maneja de manera similar a cualquier proyecto de Python o Docker:

*   **Python**: Para Gradio y Streamlit Spaces, las dependencias de Python se especifican en un archivo `requirements.txt` en la raíz del repositorio. Spaces instala automáticamente estas dependencias durante el proceso de construcción.
*   **Docker**: En Docker Spaces, las dependencias se definen dentro del Dockerfile, lo que permite un control granular sobre el entorno de ejecución, incluyendo bibliotecas del sistema operativo y versiones de Python específicas.

## 3. Configuración y Personalización de Spaces

La configuración de un Space se realiza principalmente a través de un bloque YAML en el archivo `README.md` en la raíz del repositorio. Este bloque permite definir metadatos y parámetros de configuración que afectan el comportamiento y la apariencia del Space.

### 3.1. Parámetros de Configuración Clave

Algunos de los parámetros más importantes que se pueden configurar en el `README.md` incluyen:

*   **`title`**: Título que se mostrará para el Space.
*   **`emoji`**: Un emoji para representar visualmente el Space.
*   **`colorFrom` y `colorTo`**: Colores para el gradiente de la miniatura del Space.
*   **`sdk`**: Especifica el SDK utilizado (`gradio`, `docker`, `static`).
*   **`python_version`**: Versión de Python a utilizar (por defecto `3.10`).
*   **`sdk_version`**: Versión específica del SDK (por ejemplo, Gradio).
*   **`suggested_hardware`**: Hardware recomendado para el Space, útil para cuando otros usuarios lo duplican.
*   **`app_file`**: Ruta al archivo principal de la aplicación (por ejemplo, `app.py` para Gradio, `index.html` para estático).
*   **`app_port`**: Puerto en el que se ejecuta la aplicación (solo para Docker, por defecto `7860`).
*   **`fullWidth`**: Si el Space se renderiza a ancho completo o en una columna de ancho fijo.
*   **`header`**: Tipo de encabezado (`mini` o `default`).
*   **`hf_oauth`**: Habilita la autenticación OAuth con Hugging Face.
*   **`preload_from_hub`**: Permite precargar modelos o archivos grandes del Hugging Face Hub durante el tiempo de construcción para optimizar el tiempo de inicio. Esto es especialmente útil para modelos grandes que de otro modo tendrían que descargarse en tiempo de ejecución.

### 3.2. Gestión de Secretos y Variables de Entorno

Es fundamental manejar de forma segura la información sensible en las aplicaciones. Hugging Face Spaces proporciona mecanismos para gestionar variables de entorno y secretos:

*   **Variables**: Se utilizan para almacenar valores de configuración no sensibles. Son accesibles públicamente y se copian automáticamente cuando un Space es duplicado. Son útiles para configuraciones que no representan un riesgo de seguridad.
*   **Secretos**: Diseñados para almacenar información sensible como claves API, tokens de acceso o credenciales. Son privados, su valor no puede ser leído una vez establecido y no se copian al duplicar un Space. Esto garantiza que la información confidencial permanezca segura.

El acceso a estas variables y secretos varía según el SDK:

*   **Static Spaces**: Accesibles a través de JavaScript en el cliente mediante `window.huggingface.variables`.
*   **Docker Spaces**: La gestión del entorno se realiza a través del Dockerfile.
*   **Otros SDKs (Python)**: Se exponen como variables de entorno estándar, accesibles mediante `os.getenv('NOMBRE_DE_LA_VARIABLE')`.

Hugging Face también cuenta con un escáner de secretos que advierte a los propietarios de Spaces si se detectan secretos codificados directamente en el código, promoviendo así las mejores prácticas de seguridad.

## 4. Hardware, Cuotas y Facturación

Hugging Face Spaces ofrece una gama de opciones de hardware para adaptarse a diferentes necesidades de rendimiento y presupuesto, desde CPUs básicas hasta GPUs de alto rendimiento.

### 4.1. Opciones de Hardware

La plataforma proporciona varias configuraciones de CPU y GPU. Los usuarios pueden actualizar su Space para utilizar aceleradores GPU a través de la configuración del Space. Las opciones de hardware incluyen:

*   **CPU Basic**: 2 vCPU, 16 GB de RAM, 50 GB de disco (Gratis).
*   **CPU Upgrade**: 8 vCPU, 32 GB de RAM, 50 GB de disco ($0.03 por hora).
*   **GPU**: Una amplia gama de GPUs, desde Nvidia T4 (pequeña, $0.40 por hora) hasta configuraciones con múltiples Nvidia A100 (hasta 8x A100 por $20 por hora). Estas opciones varían en vCPU, RAM, memoria de GPU y tamaño de disco.

La elección del hardware adecuado depende de los requisitos de computación y memoria de la aplicación. Para aplicaciones de ML intensivas, las GPUs son esenciales para un rendimiento óptimo.

### 4.2. Facturación y Ciclo de Vida

La facturación en Spaces se basa en el uso del hardware y se calcula por minuto. Se cobra por cada minuto que el Space está en ejecución en el hardware solicitado, independientemente de si está siendo utilizado activamente. Es importante destacar que no se incurre en costos durante el tiempo de construcción del Space.

*   **Spaces Gratuitos**: Los Spaces que utilizan hardware gratuito (CPU Basic) entran en un estado de "reposo" (sleep) y dejan de ejecutarse después de un período de inactividad (actualmente, 48 horas). Se reinician automáticamente cuando un usuario los visita.
*   **Spaces de Pago**: Los Spaces con hardware de pago se ejecutan indefinidamente por defecto. Sin embargo, los usuarios pueden configurar un "tiempo de reposo" personalizado para que el Space se detenga si no se utiliza, lo que permite ahorrar costos. El tiempo en pausa no se factura.
*   **Pausa Manual**: Los usuarios pueden pausar manualmente un Space desde la configuración del repositorio. Un Space en pausa no consume recursos y, por lo tanto, no se factura hasta que se reinicia manualmente.

### 4.3. ZeroGPU: Asignación Dinámica de GPU

ZeroGPU es una infraestructura compartida innovadora que optimiza el uso de GPU para modelos y demos de IA en Hugging Face Spaces. Permite la asignación y liberación dinámica de GPUs NVIDIA H200 según sea necesario, ofreciendo:

*   **Acceso Gratuito a GPU**: Facilita el uso de GPU de manera rentable para Spaces.
*   **Soporte Multi-GPU**: Permite que los Spaces aprovechen múltiples GPUs simultáneamente en una sola aplicación.

ZeroGPU está diseñado para ser compatible con la mayoría de los Spaces basados en PyTorch y el SDK de Gradio. Para utilizar ZeroGPU, las funciones dependientes de GPU deben ser decoradas con `@spaces.GPU`. Esto permite que el Space solicite una GPU cuando se llama a la función y la libere al finalizar.

**Especificaciones Técnicas de ZeroGPU**:

| Tamaño de GPU | Hardware de Respaldo | VRAM | Costo de Cuota |
| :------------ | :------------------- | :--- | :------------ |
| `large` (por defecto) | Media NVIDIA H200 | 70GB | 1× |
| `xlarge` | Completa NVIDIA H200 | 141GB | 2× |

**Cuotas Diarias de Uso de GPU (ZeroGPU)**:

| Tipo de Cuenta | Cuota Diaria de GPU | Prioridad en Cola |
| :------------- | :----------------- | :--------------- |
| No autenticado | 2 minutos | Baja |
| Cuenta Gratuita | 3.5 minutos | Media |
| Cuenta PRO | 25 minutos | Más Alta |
| Miembro de Organización (Team) | 25 minutos | Más Alta |
| Miembro de Organización (Enterprise) | 45 minutos | Más Alta |

La cuota se restablece exactamente 24 horas después del primer uso de GPU. La cuota restante impacta directamente la prioridad en las colas de ZeroGPU. Existen limitaciones de alojamiento: un máximo de 10 ZeroGPU Spaces para cuentas PRO personales y 50 para organizaciones (Team & Enterprise).

## 5. Almacenamiento de Datos

El almacenamiento de datos es un aspecto crucial para las aplicaciones, especialmente aquellas que manejan grandes volúmenes de información o necesitan persistencia.

### 5.1. Almacenamiento Efímero

Cada Space viene con una pequeña cantidad de almacenamiento en disco efímero (50 GB). Esto significa que el contenido de este disco se perderá si el Space se reinicia o se detiene. Para datos que necesitan persistir más allá del ciclo de vida de un Space, se requieren soluciones alternativas.

### 5.2. Almacenamiento Persistente (Histórico)

Anteriormente, Hugging Face Spaces ofrecía una función de almacenamiento persistente que permitía a los usuarios actualizar su Space para tener espacio en disco que persistía a través de los reinicios. Este almacenamiento actuaba como un disco tradicional montado en `/data`.

**Especificaciones del Almacenamiento Persistente (Histórico)**:

| Nivel | Espacio en Disco | Persistente | Precio Mensual |
| :---- | :--------------- | :---------- | :------------- |
| Free tier | 50GB | No (efímero) | ¡Gratis! |
| Small | 20GB | Sí | $5 |
| Medium | 150 GB | Sí | $25 |
| Large | 1TB | Sí | $100 |

**Es importante señalar que la función de almacenamiento persistente ya no está disponible.**

### 5.3. Alternativas para la Persistencia de Datos

Dado que el almacenamiento persistente directo ya no está disponible, la alternativa recomendada para datos que necesitan vivir más tiempo que el Space es utilizar **repositorios de datasets** en el Hugging Face Hub. Los usuarios pueden interactuar programáticamente con estos repositorios utilizando la biblioteca `huggingface_hub` para cargar y descargar archivos, asegurando así la persistencia de los datos.

Para optimizar el tiempo de inicio de los Spaces que utilizan modelos o datasets grandes, se puede configurar la variable de entorno `HF_HOME` a `/data/.huggingface`. Esto permite que bibliotecas como `transformers` y `diffusers` almacenen en caché los activos descargados del Hub en el almacenamiento efímero del Space, evitando descargas repetidas en cada reinicio.

## 6. Integración y Colaboración

Hugging Face Spaces está diseñado para fomentar la colaboración y la integración con otros componentes del Hugging Face Hub.

### 6.1. Vinculación de Modelos y Datasets

Los Spaces pueden mostrar los modelos y datasets del Hub que utilizan. Esto se logra añadiendo sus identificadores en los metadatos del archivo `README.md` del Space, bajo las claves `models` y `datasets`. La plataforma también puede analizar automáticamente el código para identificar los artefactos utilizados.

### 6.2. Duplicación de Spaces

La función de duplicación permite a los usuarios crear una copia de un Space existente, lo que es útil para construir nuevas demos a partir de plantillas o para tener una versión personalizada con hardware mejorado. Al duplicar un Space, se pueden modificar el propietario, el nombre, la visibilidad, el hardware y configurar los secretos y variables de entorno.

### 6.3. OAuth para Inicio de Sesión

Spaces soporta la integración de OAuth, permitiendo a los usuarios añadir un botón de "Iniciar Sesión con HF" a sus aplicaciones. Esto facilita la autenticación de usuarios y la gestión de permisos dentro del Space. Los parámetros de configuración de OAuth se definen en el `README.md` e incluyen `hf_oauth`, `hf_oauth_scopes`, `hf_oauth_expiration_minutes` y `hf_oauth_authorized_org`.

## 7. Manual de Uso: Cómo Crear y Gestionar un Space

Esta sección proporciona una guía paso a paso para crear y gestionar un Space en Hugging Face.

### 7.1. Creación de un Nuevo Space

1.  **Acceder al Hub**: Navega a [huggingface.co/spaces](https://huggingface.co/spaces).
2.  **Crear Nuevo Space**: Haz clic en el botón "Create new Space".
3.  **Configuración Inicial**: Proporciona un nombre para tu Space, selecciona una licencia (opcional) y elige la visibilidad (público o privado).
4.  **Seleccionar SDK**: Elige el SDK que mejor se adapte a tu proyecto: Gradio, Streamlit, Static HTML o Docker. Para la mayoría de las demos de ML en Python, Gradio es una excelente opción para empezar.
5.  **Inicializar Repositorio**: Una vez configurado, Hugging Face creará un repositorio Git para tu Space.

### 7.2. Desarrollo y Despliegue de tu Aplicación

1.  **Clonar el Repositorio**: Clona el repositorio de tu Space a tu máquina local utilizando Git. Puedes encontrar la URL de clonación en la página de tu Space, bajo la opción "Clone repository".
    ```bash
    git clone https://huggingface.co/<tu-usuario>/<tu-space>
    ```
2.  **Añadir Archivos**: Desarrolla tu aplicación y añade los archivos necesarios al directorio de tu Space. Esto incluye tu código principal (por ejemplo, `app.py`), un archivo `requirements.txt` con las dependencias de Python, y cualquier otro recurso (modelos, datos, archivos estáticos).
3.  **Configurar `README.md`**: Edita el archivo `README.md` para incluir el bloque YAML de configuración. Aquí puedes especificar el SDK, la versión de Python, el hardware sugerido y otros metadatos relevantes. Por ejemplo:
    ```yaml
    ---
    title: Mi Increíble Demo de ML
    emoji: 🚀
    colorFrom: blue
    colorTo: indigo
    sdk: gradio
    python_version: 3.10
    app_file: app.py
    ---
    ```
4.  **Gestionar Dependencias**: Asegúrate de que tu archivo `requirements.txt` contenga todas las bibliotecas de Python que tu aplicación necesita. Si usas Docker, define las dependencias en tu `Dockerfile`.
5.  **Subir Cambios**: Una vez que hayas realizado los cambios, súbelos al repositorio de tu Space:
    ```bash
    git add .
    git commit -m "Mi primera versión de la demo"
    git push
    ```
    Hugging Face detectará los cambios, reconstruirá tu Space y desplegará la nueva versión de tu aplicación.

### 7.3. Gestión de Hardware y Almacenamiento

1.  **Actualizar Hardware**: Para cambiar el hardware de tu Space (por ejemplo, para usar una GPU), ve a la pestaña "Settings" (Configuración) de tu Space en el Hub. Allí podrás seleccionar la opción de hardware deseada.
2.  **Configurar ZeroGPU**: Si tu aplicación es compatible con ZeroGPU y deseas aprovechar la asignación dinámica de GPU, asegúrate de que el hardware ZeroGPU esté seleccionado en la configuración y decora tus funciones dependientes de GPU con `@spaces.GPU`.
3.  **Persistencia de Datos**: Para datos que necesitan persistir, utiliza repositorios de datasets en el Hugging Face Hub. Puedes cargar y descargar archivos a estos repositorios programáticamente desde tu Space.

### 7.4. Gestión de Secretos y Variables

1.  **Añadir Secretos/Variables**: Para añadir secretos o variables de entorno, ve a la pestaña "Settings" de tu Space. En la sección correspondiente, puedes añadir nuevas variables o secretos. Recuerda usar secretos para información sensible.
2.  **Acceder en el Código**: Accede a estas variables en tu código utilizando `os.getenv('NOMBRE_DE_LA_VARIABLE')` en Python.

### 7.5. Duplicación y Colaboración

1.  **Duplicar un Space**: Para duplicar un Space, haz clic en los tres puntos en la esquina superior derecha de la página del Space y selecciona "Duplicate this Space". Podrás configurar el nuevo Space según tus necesidades.
2.  **Colaboración**: Invita a otros usuarios a colaborar en tu Space dándoles acceso al repositorio Git. Pueden clonar, modificar y subir cambios como en cualquier otro repositorio Git.

## 8. Restricciones y Consideraciones

Aunque Hugging Face Spaces es una plataforma muy flexible, existen algunas restricciones y consideraciones importantes a tener en cuenta:

*   **Almacenamiento Persistente**: Como se mencionó, la función de almacenamiento persistente directo ya no está disponible. Los usuarios deben planificar el uso de repositorios de datasets para la persistencia de datos a largo plazo.
*   **Cuotas de ZeroGPU**: El acceso a ZeroGPU está sujeto a cuotas diarias que varían según el tipo de cuenta. Las aplicaciones que requieren un uso intensivo y continuo de GPU pueden necesitar hardware de pago dedicado.
*   **Compatibilidad de ZeroGPU**: Actualmente, ZeroGPU es compatible principalmente con el SDK de Gradio y aplicaciones basadas en PyTorch. Otros SDKs o frameworks pueden tener compatibilidad limitada o requerir configuraciones específicas.
*   **Seguridad de Secretos**: Aunque Spaces proporciona un mecanismo para gestionar secretos, es responsabilidad del desarrollador asegurarse de que la información sensible no se exponga accidentalmente en el código o en los logs.
*   **Tiempo de Inactividad**: Los Spaces gratuitos se detienen después de un período de inactividad. Para aplicaciones que necesitan estar siempre disponibles, se recomienda actualizar a hardware de pago.
*   **Pre-carga de Repositorios Privados**: La pre-carga de archivos desde repositorios privados del Hub no es compatible actualmente con `preload_from_hub`.

## 9. Conclusión

Hugging Face Spaces representa una solución integral para el despliegue y la demostración de aplicaciones de Machine Learning. Su facilidad de uso, la flexibilidad en la elección de SDKs, las opciones de hardware escalables (incluyendo ZeroGPU) y las robustas características de configuración y colaboración lo convierten en una herramienta invaluable para la comunidad de IA. Al comprender sus funcionalidades, tipos, cuotas, características y restricciones, los usuarios pueden aprovechar al máximo esta plataforma para compartir sus innovaciones de ML con el mundo.

## 10. Referencias

[1] Hugging Face. (n.d.). *Spaces*. Recuperado de [https://huggingface.co/docs/hub/spaces](https://huggingface.co/docs/hub/spaces)
[2] Hugging Face. (n.d.). *Spaces Overview*. Recuperado de [https://huggingface.co/docs/hub/spaces-overview](https://huggingface.co/docs/hub/spaces-overview)
[3] Hugging Face. (n.d.). *Using GPU Spaces*. Recuperado de [https://huggingface.co/docs/hub/spaces-gpus](https://huggingface.co/docs/hub/spaces-gpus)
[4] Hugging Face. (n.d.). *Spaces ZeroGPU: Dynamic GPU Allocation for Spaces*. Recuperado de [https://huggingface.co/docs/hub/spaces-zerogpu](https://huggingface.co/docs/hub/spaces-zerogpu)
[5] Hugging Face. (n.d.). *Disk usage on Spaces*. Recuperado de [https://huggingface.co/docs/hub/spaces-storage](https://huggingface.co/docs/hub/spaces-storage)
[6] Hugging Face. (n.d.). *Spaces Configuration Reference*. Recuperado de [https://huggingface.co/docs/hub/spaces-config-reference](https://huggingface.co/docs/hub/spaces-config-reference)
