## Arquitectura del Sistema

```mermaid
graph TB
    subgraph "Frontend (Next.js)"
        A[Página Principal] --> B[Hook useTypesenseSearch]
        B --> C[Componente SearchFilters]
        B --> D[Componente ProductCard]
        B --> E[TypesenseService]
    end
    
    subgraph "Search Engine (Typesense)"
        F[Collection: plants] --> G[Indexed Documents]
        G --> H[Facets & Filters]
        G --> I[Search Results]
    end
    
    subgraph "Data Pipeline"
        J[plants.json] --> K[process-plants-data.js]
        K --> L[plants-processed.json]
        L --> M[setup-typesense.js]
        M --> F
    end
    
    E --> F
    F --> I
    I --> A
```

## Flujo de Datos

```mermaid
sequenceDiagram
    participant U as Usuario
    participant F as Frontend (Next.js)
    participant T as TypesenseService
    participant S as Typesense Server

    U->>F: Ingresa término de búsqueda
    F->>T: searchProducts(query, filters)
    T->>S: Construye parámetros de búsqueda
    S->>S: Ejecuta búsqueda semántica
    S->>T: Retorna resultados + facetas
    T->>F: Actualiza estado
    F->>U: Muestra resultados en tiempo real
```

## Características del Motor de Búsqueda

### 1. **Búsqueda Semántica**
- Búsqueda por texto en múltiples campos
- Tolerancia a errores tipográficos (hasta 2 errores)
- Búsqueda con prefijos
- Resaltado de términos encontrados

### 2. **Filtros Dinámicos**
```mermaid
graph LR
    A[Filtros Disponibles] --> B[Categorías]
    A --> C[Familias]
    A --> D[Rango de Precio]
    A --> E[Nivel de Cuidado]
    A --> F[Requerimientos de Luz]
    A --> G[Estado de Stock]
    A --> H[Origen]
    A --> I[Tamaño]
    A --> J[Estado]
    A --> K[Rango]
```

### 3. **Facetas Inteligentes**
- Agrupación automática de resultados
- Conteo dinámico de categorías
- Filtros combinables
- Actualización en tiempo real

## Estructura de Datos

### Schema de la Colección

```mermaid
erDiagram
    PLANTS {
        string id PK
        string common_name
        string scientific_name
        string category
        float price
        int32 stock
        string care_level
        string light_requirements
        string origin
        string size
        string status
        string rank
        string description
        string image_url
        string[] synonyms
        string search_text
    }
```

### Campos de Búsqueda
- `common_name`: Nombre común de la planta
- `scientific_name`: Nombre científico
- `description`: Descripción detallada
- `category`: Categoría de la planta
- `family`: Familia botánica
- `synonyms`: Sinónimos y variaciones
- `search_text`: Texto optimizado para búsqueda

## Configuración del Sistema

### 1. **Variables de Entorno**
```bash
# Typesense Configuration
TYPESENSE_API_KEY=tu-api-key
TYPESENSE_HOST=localhost
TYPESENSE_PORT=8108
TYPESENSE_PROTOCOL=http
```

### 2. **Docker Compose**
```yaml
services:
  typesense:
    image: typesense/typesense:29.0
    ports:
      - "8108:8108"
    environment:
      TYPESENSE_API_KEY: ${TYPESENSE_API_KEY}
      TYPESENSE_ENABLE_CORS: "true"
```

## Instalación y Configuración

### 1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd typesense-poc
```

### 2. **Instalar dependencias**
```bash
pnpm install
```

### 3. **Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

### 4. **Iniciar Typesense**
```bash
docker-compose up -d
```

### 5. **Configurar la base de datos**
```bash
# Procesar datos de plantas
node scripts/process-plants-data.js

# Configurar Typesense
node scripts/setup-typesense.js
```

### 6. **Ejecutar la aplicación**
```bash
pnpm dev
```

## Scripts Disponibles

### Procesamiento de Datos
- `scripts/get-trefle-data.js`: Obtiene datos de la API de Trefle
- `scripts/process-plants-data.js`: Procesa y enriquece los datos
- `scripts/setup-typesense.js`: Configura la colección en Typesense
- `scripts/seed-typesense.js`: Pobla la base de datos
- `scripts/clear-typesense.js`: Limpia la colección

## Métricas de Rendimiento

### Optimizaciones Implementadas
- **Búsqueda con prefijos**: Mejora la experiencia de autocompletado
- **Tolerancia a errores**: Maneja hasta 2 errores tipográficos
- **Facetas precalculadas**: Respuesta instantánea en filtros
- **Índices optimizados**: Búsqueda en múltiples campos simultáneamente

### Parámetros de Búsqueda
```javascript
{
  q: query || "*",
  query_by: "common_name,scientific_name,description,category,family,synonyms,search_text",
  filter_by: filterBy,
  facet_by: "category,family,care_level,light_requirements,origin,size,status,rank",
  sort_by: "_text_match:desc",
  per_page: 20,
  prefix: true,
  typo_tolerance_enabled: true,
  num_typos: 2,
  enable_highlight_v1: true
}
```

## Interfaz de Usuario

### Componentes Principales
- **SearchFilters**: Panel de filtros dinámicos
- **ProductCard**: Tarjeta de producto con información detallada
- **useTypesenseSearch**: Hook personalizado para gestión de estado

### Características UX
- Búsqueda en tiempo real
- Filtros combinables
- Estados de carga
- Manejo de errores
- Diseño responsive

## Ejemplos de Búsqueda

### Búsqueda por Texto
```
"oak" → Encuentra robles y especies relacionadas
"pino" → Encuentra pinos y coníferas
"flor" → Encuentra plantas con flores
```

### Filtros Combinados
```
Categoría: "Árboles" + 
Familia: "Fagaceae" + 
Precio: $20-$50 + 
Stock: "Alto Stock"
```

### Typesense Dashboard
Accede al dashboard en `http://localhost:8080` para:
- Ver estadísticas de búsqueda
- Monitorear rendimiento
- Explorar la colección
- Debuggear consultas
