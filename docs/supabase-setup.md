# Supabase Auth Setup Guide

Esta guía explica cómo configurar Supabase Auth en el proyecto Slice después de migrar desde Privy.

## Prerrequisitos

1. Cuenta de Supabase (gratuita en [supabase.com](https://supabase.com))
2. Proyecto creado en Supabase Dashboard

## Configuración

### 1. Variables de Entorno

Asegúrate de tener las siguientes variables en tu archivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Estas variables ya deberían estar configuradas según el plan.

### 2. Crear Tabla de Passkeys

Ejecuta la migración SQL en tu proyecto de Supabase:

1. Ve a SQL Editor en el Dashboard de Supabase
2. Ejecuta el contenido de `supabase/migrations/001_create_user_passkeys.sql`

O ejecuta directamente:

```sql
-- Ver el archivo supabase/migrations/001_create_user_passkeys.sql
```

Esta migración crea:
- Tabla `user_passkeys` para almacenar credenciales WebAuthn
- Políticas RLS (Row Level Security) para seguridad
- Índices para búsquedas rápidas

### 3. Configurar Autenticación en Supabase

En el Dashboard de Supabase:

1. Ve a **Authentication** > **Providers**
2. Habilita **Email** provider
3. (Opcional) Configura otros proveedores OAuth si los necesitas

### 4. Configurar URLs de Redirección

En **Authentication** > **URL Configuration**:

- **Site URL**: `http://localhost:3000` (desarrollo) o tu dominio de producción
- **Redirect URLs**: Agrega `http://localhost:3000/auth/callback` y tu dominio de producción

## Uso

### Autenticación con Email

Los usuarios pueden:
- Registrarse con email y contraseña
- Iniciar sesión con email y contraseña
- Usar Magic Links (enviados por email)

### Passkeys (WebAuthn)

Los usuarios pueden:
- Registrar un passkey después de autenticarse con email
- Autenticarse usando su passkey (biometría o dispositivo)

**Nota**: Los passkeys requieren que el usuario primero se autentique con email para vincular el passkey a su cuenta.

### Conexión de Wallets

Después de autenticarse con Supabase, los usuarios pueden conectar sus wallets blockchain usando Wagmi (MetaMask, Coinbase Wallet, etc.).

## Arquitectura

```
┌─────────────────────────────────────────┐
│  Supabase Auth (Email + Passkeys)      │
│  - Autenticación de usuario            │
│  - Sesiones del servidor/cliente       │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Wagmi (Wallets Blockchain)             │
│  - Conexión de wallets externas         │
│  - Transacciones on-chain               │
└─────────────────────────────────────────┘
```

## Componentes Clave

- `SupabaseProvider`: Proporciona contexto de autenticación
- `LoginModal`: Modal de login con email y passkeys
- `useSliceConnect`: Hook para conectar/desconectar
- `usePasskey`: Hook para manejar passkeys

## Migración desde Privy

- ✅ Privy removido completamente
- ✅ Supabase Auth implementado
- ✅ Passkeys implementados con WebAuthn
- ✅ Wagmi mantenido para wallets blockchain
- ✅ Tenant BEEXO sigue funcionando sin cambios

## Próximos Pasos

1. Probar el flujo completo de autenticación
2. Probar registro y autenticación con passkeys
3. Verificar que las operaciones blockchain funcionan correctamente
4. Configurar producción con las URLs correctas
