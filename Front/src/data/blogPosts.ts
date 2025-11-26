import microservicesImg from "@/assets/blog/microservices-architecture.jpg";
import postgresqlImg from "@/assets/blog/postgresql-optimization.jpg";
import jwtImg from "@/assets/blog/jwt-security.jpg";
import dockerImg from "@/assets/blog/docker-production.jpg";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  author: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "arquitectura-microservicios-guia-practica",
    title: "Arquitectura de Microservicios: Guía Práctica",
    excerpt: "Aprende a diseñar e implementar una arquitectura de microservicios escalable con las mejores prácticas del sector.",
    date: "2024-03-15",
    readTime: "8 min",
    category: "Arquitectura",
    image: microservicesImg,
    author: "Backend Developer",
    tags: ["Microservicios", "Arquitectura", "Escalabilidad", "DevOps"],
    content: `
# Arquitectura de Microservicios: Guía Práctica

La arquitectura de microservicios se ha convertido en un estándar de la industria para construir aplicaciones escalables y mantenibles. En este artículo, exploraremos las mejores prácticas para diseñar e implementar una arquitectura de microservicios exitosa.

## ¿Qué son los Microservicios?

Los microservicios son un enfoque arquitectónico donde una aplicación se construye como una colección de servicios pequeños e independientes, cada uno ejecutándose en su propio proceso y comunicándose mediante protocolos ligeros como HTTP/REST o mensajería asíncrona.

## Principios Fundamentales

### 1. Diseño por Dominios de Negocio

Cada microservicio debe estar alineado con un dominio de negocio específico. Esto facilita:
- Mayor cohesión dentro del servicio
- Bajo acoplamiento entre servicios
- Equipos autónomos y especializados

### 2. Autonomía e Independencia

Los servicios deben ser:
- **Desplegables independientemente**: Sin afectar otros servicios
- **Escalables individualmente**: Según las necesidades específicas
- **Tecnológicamente diversos**: Libertad de elegir el stack adecuado

### 3. Comunicación Descentralizada

Utiliza patrones de comunicación apropiados:
- **Sincrónica**: REST, gRPC para operaciones inmediatas
- **Asíncrona**: Message queues, Event Sourcing para procesos desacoplados

## Patrones de Diseño Esenciales

### API Gateway

Un punto de entrada único que:
- Enruta peticiones a los servicios apropiados
- Maneja autenticación y autorización
- Implementa rate limiting y caché
- Agrega respuestas de múltiples servicios

### Service Discovery

Permite que los servicios se encuentren dinámicamente:
\`\`\`javascript
// Ejemplo con Consul
const service = await consul.health.service({
  service: 'user-service',
  passing: true
});
\`\`\`

### Circuit Breaker

Previene fallos en cascada:
\`\`\`javascript
const breaker = new CircuitBreaker(apiCall, {
  timeout: 3000,
  errorThresholdPercentage: 50,
  resetTimeout: 30000
});
\`\`\`

## Gestión de Datos

### Base de Datos por Servicio

Cada microservicio debe tener su propia base de datos para mantener la autonomía. Esto implica:

- **Ventajas**:
  - Acoplamiento reducido
  - Libertad tecnológica
  - Escalabilidad independiente

- **Desafíos**:
  - Consistencia eventual
  - Transacciones distribuidas
  - Consultas entre servicios

### Event Sourcing

Almacena el estado como una secuencia de eventos:
\`\`\`javascript
const events = [
  { type: 'OrderCreated', data: { orderId: 1, amount: 100 } },
  { type: 'PaymentProcessed', data: { orderId: 1, status: 'success' } },
  { type: 'OrderShipped', data: { orderId: 1, trackingId: 'ABC123' } }
];
\`\`\`

## Observabilidad

### Logging Centralizado

Utiliza herramientas como ELK Stack o Splunk para:
- Correlacionar logs entre servicios
- Debugging distribuido
- Análisis de patrones

### Distributed Tracing

Implementa OpenTelemetry o Jaeger para:
- Visualizar el flujo de peticiones
- Identificar cuellos de botella
- Medir latencias

### Métricas y Monitoreo

Herramientas como Prometheus y Grafana para:
- Métricas de rendimiento
- Alertas proactivas
- Dashboards en tiempo real

## Seguridad

### Autenticación y Autorización

- **OAuth 2.0 / OpenID Connect**: Para autenticación federada
- **JWT**: Para tokens entre servicios
- **mTLS**: Para comunicación segura entre servicios

### API Security

\`\`\`javascript
// Ejemplo de middleware de autenticación
app.use(async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = await verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});
\`\`\`

## Despliegue y DevOps

### Containerización

Docker es fundamental para microservicios:
\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

### Orquestación

Kubernetes para gestionar el ciclo de vida:
- Auto-scaling horizontal
- Service mesh (Istio, Linkerd)
- Rolling updates sin downtime

## Conclusión

La arquitectura de microservicios ofrece grandes beneficios pero también introduce complejidad. Es fundamental:

1. Empezar simple y evolucionar gradualmente
2. Invertir en automatización desde el principio
3. Establecer prácticas sólidas de observabilidad
4. Documentar decisiones arquitectónicas
5. Fomentar la comunicación entre equipos

Recuerda que los microservicios no son la solución para todo. Evalúa cuidadosamente si tu proyecto se beneficiará de esta arquitectura antes de adoptarla.
    `
  },
  {
    slug: "optimizacion-consultas-postgresql",
    title: "Optimización de Consultas en PostgreSQL",
    excerpt: "Técnicas avanzadas para mejorar el rendimiento de tus bases de datos PostgreSQL y reducir los tiempos de respuesta.",
    date: "2024-03-01",
    readTime: "6 min",
    category: "Database",
    image: postgresqlImg,
    author: "Backend Developer",
    tags: ["PostgreSQL", "Database", "Performance", "SQL"],
    content: `
# Optimización de Consultas en PostgreSQL

PostgreSQL es uno de los sistemas de bases de datos relacionales más potentes y flexibles. En este artículo, exploraremos técnicas avanzadas para optimizar consultas y mejorar significativamente el rendimiento de tus aplicaciones.

## Análisis de Consultas con EXPLAIN

El primer paso para optimizar es entender cómo PostgreSQL ejecuta tus consultas.

### EXPLAIN ANALYZE

\`\`\`sql
EXPLAIN ANALYZE
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2024-01-01'
GROUP BY u.id, u.name
ORDER BY order_count DESC
LIMIT 10;
\`\`\`

Esto te mostrará:
- El plan de ejecución real
- Tiempo de ejecución de cada nodo
- Filas procesadas vs. estimadas
- Uso de índices

## Índices: La Clave del Rendimiento

### Índices B-tree

Los más comunes, ideales para comparaciones:
\`\`\`sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_created ON orders(user_id, created_at);
\`\`\`

### Índices Parciales

Para consultas que filtran un subconjunto específico:
\`\`\`sql
CREATE INDEX idx_active_users ON users(email) 
WHERE status = 'active';
\`\`\`

### Índices GiST y GIN

Para búsquedas full-text y datos complejos:
\`\`\`sql
CREATE INDEX idx_products_search ON products 
USING GIN(to_tsvector('spanish', name || ' ' || description));
\`\`\`

### Índices en Expresiones

\`\`\`sql
CREATE INDEX idx_users_lower_email ON users(LOWER(email));
\`\`\`

## Técnicas de Optimización

### 1. Evitar SELECT *

\`\`\`sql
-- ❌ Malo
SELECT * FROM users;

-- ✅ Bueno
SELECT id, name, email FROM users;
\`\`\`

### 2. Usar LIMIT Apropiadamente

\`\`\`sql
-- Para paginación eficiente
SELECT id, name FROM users
ORDER BY created_at DESC
OFFSET 20 LIMIT 10;
\`\`\`

### 3. Joins Eficientes

\`\`\`sql
-- Asegúrate de que las columnas en JOIN tengan índices
SELECT u.name, p.title
FROM users u
INNER JOIN posts p ON u.id = p.user_id
WHERE u.status = 'active';
\`\`\`

### 4. Common Table Expressions (CTEs)

Para consultas complejas más legibles:
\`\`\`sql
WITH active_users AS (
  SELECT id, name FROM users WHERE status = 'active'
),
recent_orders AS (
  SELECT user_id, COUNT(*) as order_count
  FROM orders
  WHERE created_at > NOW() - INTERVAL '30 days'
  GROUP BY user_id
)
SELECT au.name, COALESCE(ro.order_count, 0) as orders
FROM active_users au
LEFT JOIN recent_orders ro ON au.id = ro.user_id;
\`\`\`

## Particionamiento de Tablas

Para tablas muy grandes:

\`\`\`sql
CREATE TABLE orders (
  id SERIAL,
  user_id INTEGER,
  created_at TIMESTAMP,
  amount DECIMAL
) PARTITION BY RANGE (created_at);

CREATE TABLE orders_2024_q1 PARTITION OF orders
FOR VALUES FROM ('2024-01-01') TO ('2024-04-01');

CREATE TABLE orders_2024_q2 PARTITION OF orders
FOR VALUES FROM ('2024-04-01') TO ('2024-07-01');
\`\`\`

## Mantenimiento Regular

### VACUUM

Limpia espacio y actualiza estadísticas:
\`\`\`sql
-- Manual
VACUUM ANALYZE users;

-- Configurar autovacuum
ALTER TABLE users SET (autovacuum_vacuum_scale_factor = 0.1);
\`\`\`

### REINDEX

Reconstruye índices fragmentados:
\`\`\`sql
REINDEX INDEX idx_users_email;
REINDEX TABLE users;
\`\`\`

## Configuración del Servidor

Ajustes importantes en postgresql.conf:

\`\`\`conf
# Memoria
shared_buffers = 4GB
effective_cache_size = 12GB
work_mem = 64MB

# Paralelización
max_parallel_workers_per_gather = 4
max_parallel_workers = 8

# Checkpoints
checkpoint_completion_target = 0.9
\`\`\`

## Pooling de Conexiones

Usa PgBouncer para gestionar conexiones eficientemente:

\`\`\`javascript
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'mydb',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
\`\`\`

## Monitoreo de Performance

### pg_stat_statements

Identifica consultas lentas:
\`\`\`sql
CREATE EXTENSION pg_stat_statements;

SELECT query, calls, total_exec_time, mean_exec_time
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 10;
\`\`\`

### Logs de Consultas Lentas

\`\`\`conf
log_min_duration_statement = 1000  # Log queries > 1s
log_statement = 'all'
\`\`\`

## Conclusión

La optimización de PostgreSQL es un proceso continuo:

1. **Mide primero**: Usa EXPLAIN ANALYZE
2. **Indexa inteligentemente**: No todos los índices mejoran el rendimiento
3. **Mantén actualizado**: VACUUM y ANALYZE regularmente
4. **Monitorea constantemente**: pg_stat_statements es tu amigo
5. **Prueba en producción**: El entorno de desarrollo no siempre refleja la realidad

Con estas técnicas, podrás mantener tu base de datos PostgreSQL funcionando de manera óptima incluso con grandes volúmenes de datos.
    `
  },
  {
    slug: "implementando-jwt-forma-segura",
    title: "Implementando JWT de Forma Segura",
    excerpt: "Mejores prácticas para implementar autenticación JWT en tus APIs, incluyendo refresh tokens y seguridad.",
    date: "2024-02-20",
    readTime: "10 min",
    category: "Security",
    image: jwtImg,
    author: "Backend Developer",
    tags: ["JWT", "Security", "Authentication", "Node.js"],
    content: `
# Implementando JWT de Forma Segura

JSON Web Tokens (JWT) se han convertido en el estándar para la autenticación stateless en APIs modernas. Sin embargo, una implementación incorrecta puede exponer tu aplicación a vulnerabilidades graves. En este artículo, exploraremos las mejores prácticas para implementar JWT de forma segura.

## ¿Qué es JWT?

JWT es un estándar abierto (RFC 7519) que define una forma compacta y autónoma de transmitir información entre partes como un objeto JSON. Consta de tres partes:

\`\`\`
header.payload.signature
\`\`\`

### Estructura

\`\`\`javascript
// Header
{
  "alg": "HS256",
  "typ": "JWT"
}

// Payload
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "exp": 1516242622
}

// Signature
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)
\`\`\`

## Implementación Básica con Node.js

### Instalación

\`\`\`bash
npm install jsonwebtoken bcryptjs
\`\`\`

### Generación de Tokens

\`\`\`javascript
const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    { 
      expiresIn: '15m',
      issuer: 'my-api',
      audience: 'my-app'
    }
  );
}
\`\`\`

### Verificación de Tokens

\`\`\`javascript
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET, {
      issuer: 'my-api',
      audience: 'my-app'
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token expired');
    }
    if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    }
    throw error;
  }
}
\`\`\`

## Refresh Tokens: La Clave de la Seguridad

Los access tokens deben tener una vida corta (15-30 minutos). Los refresh tokens permiten obtener nuevos access tokens sin requerir login nuevamente.

### Implementación de Refresh Tokens

\`\`\`javascript
const crypto = require('crypto');

// Generar refresh token
function generateRefreshToken() {
  return crypto.randomBytes(40).toString('hex');
}

// Almacenar en base de datos
async function saveRefreshToken(userId, token) {
  await db.query(
    'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
    [userId, token, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)] // 7 días
  );
}

// Endpoint de refresh
app.post('/auth/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  
  // Verificar que existe en BD
  const tokenData = await db.query(
    'SELECT * FROM refresh_tokens WHERE token = $1 AND expires_at > NOW()',
    [refreshToken]
  );
  
  if (!tokenData.rows.length) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
  
  const user = await db.query('SELECT * FROM users WHERE id = $1', 
    [tokenData.rows[0].user_id]
  );
  
  // Generar nuevo access token
  const accessToken = generateAccessToken(user.rows[0]);
  
  res.json({ accessToken });
});
\`\`\`

## Mejores Prácticas de Seguridad

### 1. Usa Algoritmos Fuertes

\`\`\`javascript
// ❌ Evitar
const token = jwt.sign(payload, secret, { algorithm: 'none' });

// ✅ Recomendado
const token = jwt.sign(payload, secret, { algorithm: 'HS256' });
// O mejor aún, RSA
const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });
\`\`\`

### 2. Secrets Seguros

\`\`\`javascript
// ❌ Nunca hagas esto
const JWT_SECRET = 'mysecret';

// ✅ Usa variables de entorno con valores aleatorios
const JWT_SECRET = process.env.JWT_SECRET; // Mínimo 256 bits de entropía
\`\`\`

Generar secret seguro:
\`\`\`bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
\`\`\`

### 3. Claims Esenciales

\`\`\`javascript
const payload = {
  // Identificador único del usuario
  sub: user.id,
  
  // Tiempo de emisión
  iat: Math.floor(Date.now() / 1000),
  
  // Expiración
  exp: Math.floor(Date.now() / 1000) + (15 * 60),
  
  // Emisor
  iss: 'my-api.com',
  
  // Audiencia
  aud: 'my-app.com',
  
  // Token ID único (para revocación)
  jti: crypto.randomUUID()
};
\`\`\`

### 4. Validación Completa

\`\`\`javascript
async function validateToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const token = authHeader.substring(7);
    
    // Verificar firma y claims
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verificar que el usuario existe y está activo
    const user = await db.query(
      'SELECT * FROM users WHERE id = $1 AND status = $2',
      [decoded.sub, 'active']
    );
    
    if (!user.rows.length) {
      return res.status(401).json({ error: 'User not found or inactive' });
    }
    
    // Verificar que el token no ha sido revocado
    const revoked = await checkTokenRevocation(decoded.jti);
    if (revoked) {
      return res.status(401).json({ error: 'Token revoked' });
    }
    
    req.user = user.rows[0];
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
\`\`\`

### 5. Revocación de Tokens

\`\`\`javascript
// Lista negra de tokens (usar Redis para producción)
const revokedTokens = new Set();

async function revokeToken(tokenId) {
  // Agregar a lista negra
  await redis.setex(\`revoked:\${tokenId}\`, 900, 'true'); // 15 minutos TTL
}

async function checkTokenRevocation(tokenId) {
  return await redis.exists(\`revoked:\${tokenId}\`);
}

// Endpoint de logout
app.post('/auth/logout', authenticateToken, async (req, res) => {
  const token = req.headers.authorization.substring(7);
  const decoded = jwt.decode(token);
  
  // Revocar access token
  await revokeToken(decoded.jti);
  
  // Eliminar refresh token de BD
  await db.query(
    'DELETE FROM refresh_tokens WHERE user_id = $1',
    [req.user.id]
  );
  
  res.json({ message: 'Logged out successfully' });
});
\`\`\`

## Almacenamiento en el Cliente

### ❌ LocalStorage (Vulnerable a XSS)

\`\`\`javascript
// Evitar
localStorage.setItem('token', token);
\`\`\`

### ✅ HttpOnly Cookies (Más Seguro)

\`\`\`javascript
// Backend
res.cookie('refreshToken', refreshToken, {
  httpOnly: true,
  secure: true, // Solo HTTPS
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
});

// Access token en memoria o cookie separada
res.cookie('accessToken', accessToken, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 15 * 60 * 1000 // 15 minutos
});
\`\`\`

## Protección contra Ataques

### CSRF Protection

\`\`\`javascript
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

app.post('/api/sensitive', csrfProtection, (req, res) => {
  // Endpoint protegido
});
\`\`\`

### Rate Limiting

\`\`\`javascript
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 intentos
  message: 'Too many authentication attempts'
});

app.post('/auth/login', authLimiter, loginHandler);
\`\`\`

## Testing de Seguridad

\`\`\`javascript
describe('JWT Security', () => {
  it('should reject expired tokens', async () => {
    const expiredToken = jwt.sign({ userId: 1 }, secret, { expiresIn: '0s' });
    
    const response = await request(app)
      .get('/protected')
      .set('Authorization', \`Bearer \${expiredToken}\`);
      
    expect(response.status).toBe(401);
  });
  
  it('should reject tampered tokens', async () => {
    const token = jwt.sign({ userId: 1 }, secret);
    const tampered = token.slice(0, -5) + 'XXXXX';
    
    const response = await request(app)
      .get('/protected')
      .set('Authorization', \`Bearer \${tampered}\`);
      
    expect(response.status).toBe(401);
  });
});
\`\`\`

## Conclusión

Implementar JWT de forma segura requiere:

1. **Access tokens de corta duración** (15-30 min)
2. **Refresh tokens almacenados de forma segura**
3. **Validación exhaustiva** de todos los claims
4. **Mecanismo de revocación** para casos de emergencia
5. **Cookies HttpOnly** cuando sea posible
6. **Rate limiting** en endpoints de autenticación
7. **Monitoreo continuo** de intentos sospechosos

La seguridad es un proceso continuo. Mantén tus dependencias actualizadas y realiza auditorías de seguridad regularmente.
    `
  },
  {
    slug: "docker-produccion-consejos-trucos",
    title: "Docker en Producción: Consejos y Trucos",
    excerpt: "Guía completa para desplegar aplicaciones con Docker en entornos de producción de manera eficiente y segura.",
    date: "2024-02-10",
    readTime: "7 min",
    category: "DevOps",
    image: dockerImg,
    author: "Backend Developer",
    tags: ["Docker", "DevOps", "Containers", "Production"],
    content: `
# Docker en Producción: Consejos y Trucos

Docker ha revolucionado la forma en que desplegamos aplicaciones, pero llevar contenedores a producción requiere más que un simple \`docker run\`. En este artículo, exploraremos las mejores prácticas y trucos para desplegar aplicaciones con Docker de manera segura y eficiente.

## Optimización de Imágenes

### Multi-stage Builds

Reduce el tamaño de tus imágenes significativamente:

\`\`\`dockerfile
# Etapa de build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa de producción
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
EXPOSE 3000
USER node
CMD ["node", "dist/server.js"]
\`\`\`

### Usar Imágenes Base Mínimas

\`\`\`dockerfile
# ❌ Imagen grande (1GB+)
FROM node:18

# ✅ Imagen optimizada (~150MB)
FROM node:18-alpine

# ✅✅ Distroless para máxima seguridad (~50MB)
FROM gcr.io/distroless/nodejs:18
\`\`\`

### Layer Caching Eficiente

\`\`\`dockerfile
# Copiar solo package files primero
COPY package*.json ./
RUN npm ci --only=production

# Copiar el código después
COPY . .
\`\`\`

## Seguridad en Contenedores

### No Ejecutar como Root

\`\`\`dockerfile
FROM node:18-alpine

# Crear usuario no privilegiado
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Establecer permisos
WORKDIR /app
COPY --chown=nodejs:nodejs . .

# Cambiar a usuario no root
USER nodejs

EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

### Escaneo de Vulnerabilidades

\`\`\`bash
# Con Trivy
trivy image myapp:latest

# Con Snyk
snyk container test myapp:latest
\`\`\`

### Secrets Management

\`\`\`dockerfile
# ❌ Nunca hagas esto
ENV DATABASE_PASSWORD=mysecretpass

# ✅ Usa Docker secrets o variables en runtime
CMD ["sh", "-c", "node server.js"]
\`\`\`

\`\`\`bash
# Docker Swarm secrets
docker service create \
  --name myapp \
  --secret db_password \
  myapp:latest

# O con variables de entorno en runtime
docker run -e DATABASE_PASSWORD_FILE=/run/secrets/db_password myapp:latest
\`\`\`

## Health Checks

### Dockerfile Health Check

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app
COPY . .

HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node healthcheck.js || exit 1

CMD ["node", "server.js"]
\`\`\`

### Health Check Script

\`\`\`javascript
// healthcheck.js
const http = require('http');

const options = {
  host: 'localhost',
  port: 3000,
  path: '/health',
  timeout: 2000
};

const request = http.request(options, (res) => {
  if (res.statusCode === 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

request.on('error', () => process.exit(1));
request.end();
\`\`\`

## Networking en Producción

### Docker Compose para Stack Completo

\`\`\`yaml
version: '3.8'

services:
  app:
    image: myapp:latest
    networks:
      - backend
      - frontend
    environment:
      - NODE_ENV=production
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    networks:
      - frontend
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - app

  db:
    image: postgres:15-alpine
    networks:
      - backend
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
    secrets:
      - db_password
    volumes:
      - postgres_data:/var/lib/postgresql/data

networks:
  frontend:
    driver: overlay
  backend:
    driver: overlay
    internal: true

volumes:
  postgres_data:

secrets:
  db_password:
    external: true
\`\`\`

### Nginx como Reverse Proxy

\`\`\`nginx
upstream app_servers {
    least_conn;
    server app:3000 max_fails=3 fail_timeout=30s;
}

server {
    listen 80;
    server_name example.com;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;

    location / {
        proxy_pass http://app_servers;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
\`\`\`

## Logging y Monitoring

### Logging Centralizado

\`\`\`javascript
// Usar structured logging
const winston = require('winston');

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
});

logger.info('Server started', { port: 3000, env: process.env.NODE_ENV });
\`\`\`

### Docker Logging Driver

\`\`\`yaml
services:
  app:
    image: myapp:latest
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
\`\`\`

### Prometheus Metrics

\`\`\`javascript
const promClient = require('prom-client');
const express = require('express');

const app = express();

// Crear registro de métricas
const register = new promClient.Registry();

// Métricas por defecto
promClient.collectDefaultMetrics({ register });

// Métrica personalizada
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 1, 3, 5]
});

register.registerMetric(httpRequestDuration);

// Endpoint de métricas
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
\`\`\`

## CI/CD Pipeline

### GitHub Actions Example

\`\`\`yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: \${{ secrets.DOCKER_USERNAME }}
          password: \${{ secrets.DOCKER_PASSWORD }}
      
      - name: Build and push
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: myapp:latest,myapp:\${{ github.sha }}
          cache-from: type=registry,ref=myapp:latest
          cache-to: type=inline
      
      - name: Security scan
        run: |
          docker run --rm aquasec/trivy image myapp:\${{ github.sha }}
      
      - name: Deploy to production
        run: |
          # Deploy using your orchestration tool
          kubectl set image deployment/myapp myapp=myapp:\${{ github.sha }}
\`\`\`

## Resource Management

### Limitar Recursos

\`\`\`bash
docker run -d \
  --name myapp \
  --memory="512m" \
  --memory-swap="1g" \
  --cpus="0.5" \
  --pids-limit=100 \
  myapp:latest
\`\`\`

### Monitoring de Recursos

\`\`\`bash
# Stats en tiempo real
docker stats

# Con formato específico
docker stats --format "table {{.Container}}\\t{{.CPUPerc}}\\t{{.MemUsage}}"
\`\`\`

## Backup y Disaster Recovery

### Backup de Volúmenes

\`\`\`bash
# Backup
docker run --rm \
  -v postgres_data:/data \
  -v \$(pwd):/backup \
  alpine tar czf /backup/backup.tar.gz /data

# Restore
docker run --rm \
  -v postgres_data:/data \
  -v \$(pwd):/backup \
  alpine tar xzf /backup/backup.tar.gz -C /
\`\`\`

### Database Backups

\`\`\`bash
# PostgreSQL backup
docker exec postgres pg_dump -U user dbname > backup.sql

# Backup automatizado con cron
0 2 * * * docker exec postgres pg_dump -U user dbname | \
  gzip > /backups/db_\$(date +\\%Y\\%m\\%d).sql.gz
\`\`\`

## Conclusión

Desplegar Docker en producción de forma exitosa requiere:

1. **Imágenes optimizadas** y seguras
2. **Health checks** robustos
3. **Logging y monitoring** apropiados
4. **Gestión adecuada de secretos**
5. **Límites de recursos** definidos
6. **Plan de backup** y recuperación
7. **Pipeline CI/CD** automatizado

Recuerda que la contenedorización es solo una parte de la solución. La observabilidad, seguridad y automatización son igualmente importantes para un sistema de producción robusto.
    `
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}
