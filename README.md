# Pokedex Frontend

Aplicacion web tipo Pokedex construida con Next.js 16 y React 19 que consume la [PokeAPI](https://pokeapi.co/) publica. Permite explorar Pokemon, movimientos, objetos, ubicaciones, habitats y tipos, con rutas dinamicas anidadas, estados de carga y manejo de errores por segmento.

---

## Requisitos

- Node.js 18 o superior
- npm 9 o superior (incluido con Node.js)
- Conexion a internet (la app consume la PokeAPI en tiempo real)

---

## Instalacion

1. Clona el repositorio:

```bash
git clone https://github.com/Abisaac1809/Frontend-PokeApi.git
cd Frontend-PokeApi
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia el servidor de desarrollo:

```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Scripts disponibles

| Comando | Descripcion |
|---|---|
| `npm run dev` | Servidor de desarrollo con Turbopack |
| `npm run build` | Genera el build de produccion |
| `npm run start` | Inicia el servidor en modo produccion |
| `npm run lint` | Ejecuta ESLint |

---

## Arquitectura de carpetas

```
src/
├── app/                        # App Router de Next.js (rutas y paginas)
│   ├── layout.tsx              # Layout raiz (NavBar, fuentes, metadatos globales)
│   ├── page.tsx                # Pagina de inicio
│   ├── globals.css             # Tokens de diseno y estilos globales (tema oscuro)
│   │
│   ├── pokemon/                # /pokemon
│   │   ├── page.tsx            # Listado de Pokemon
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── [id]/               # /pokemon/:id
│   │       ├── page.tsx        # Detalle de Pokemon
│   │       ├── loading.tsx
│   │       └── error.tsx
│   │
│   ├── moves/                  # /moves
│   │   ├── page.tsx            # Listado de tipos de movimientos
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── [typeName]/         # /moves/:typeName
│   │       ├── page.tsx
│   │       ├── loading.tsx
│   │       └── error.tsx
│   │
│   ├── items/                  # /items
│   │   ├── page.tsx            # Listado de categorias de objetos
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── [categoryName]/     # /items/:categoryName
│   │       ├── page.tsx
│   │       ├── loading.tsx
│   │       ├── error.tsx
│   │       └── [itemId]/       # /items/:categoryName/:itemId
│   │           ├── page.tsx
│   │           ├── loading.tsx
│   │           └── error.tsx
│   │
│   ├── locations/              # /locations
│   │   ├── page.tsx            # Listado de regiones
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── [regionId]/         # /locations/:regionId
│   │       ├── page.tsx
│   │       ├── loading.tsx
│   │       ├── error.tsx
│   │       └── [locationId]/   # /locations/:regionId/:locationId
│   │           ├── page.tsx
│   │           ├── loading.tsx
│   │           └── error.tsx
│   │
│   ├── habitat/                # /habitat
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── [habitatName]/      # /habitat/:habitatName
│   │       ├── page.tsx
│   │       ├── loading.tsx
│   │       └── error.tsx
│   │
│   └── pokemon-types/          # /pokemon-types
│       ├── page.tsx
│       ├── loading.tsx
│       ├── error.tsx
│       └── [typeName]/         # /pokemon-types/:typeName
│           ├── page.tsx
│           ├── loading.tsx
│           └── error.tsx
│
├── components/                 # Componentes de UI reutilizables
│   ├── nav/
│   │   └── NavBar.tsx
│   ├── layout/
│   │   ├── CardGrid.tsx        # Contenedor de cuadricula responsiva
│   │   └── SectionHeader.tsx
│   ├── controls/
│   │   ├── SearchBar.tsx
│   │   └── Pagination.tsx
│   ├── feedback/
│   │   ├── CardSkeleton.tsx
│   │   ├── CardGridSkeleton.tsx
│   │   └── ErrorState.tsx
│   ├── pokemon/                # Componentes especificos de Pokemon
│   │   ├── PokemonCard.tsx
│   │   ├── PokemonHero.tsx
│   │   ├── StatBar.tsx
│   │   ├── StatList.tsx
│   │   ├── TypeBadge.tsx
│   │   ├── FlavorText.tsx
│   │   ├── EvolutionChain.tsx
│   │   ├── EvolutionNode.tsx
│   │   └── EncounterTableByArea.tsx
│   ├── moves/
│   │   └── MoveCard.tsx
│   ├── items/
│   │   ├── ItemCard.tsx
│   │   └── ItemCategoryCard.tsx
│   ├── locations/
│   │   ├── RegionCard.tsx
│   │   ├── LocationCard.tsx
│   │   ├── LocationAreaPanel.tsx
│   │   └── EncounterTableByPokemon.tsx
│   ├── habitat/
│   │   └── HabitatCard.tsx
│   └── types/
│       └── TypeCard.tsx
│
├── lib/                        # Capa de datos y utilidades
│   ├── client.ts               # Fetch base hacia la PokeAPI
│   ├── pokemon.ts              # Fetchers de Pokemon
│   ├── moves.ts                # Fetchers de movimientos
│   ├── items.ts                # Fetchers de objetos
│   ├── locations.ts            # Fetchers de ubicaciones
│   ├── type-colors.ts          # Mapa de colores por tipo de Pokemon
│   └── utils.ts                # Funciones de utilidad generales
│
└── types/                      # Tipos TypeScript
    ├── pokemon.ts
    ├── move.ts
    ├── item.ts
    ├── location.ts
    └── shared.ts               # Tipos compartidos (NamedAPIResource, etc.)
```
