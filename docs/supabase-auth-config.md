# Configuración de Supabase Auth para Desarrollo

## Problema: Email Confirmation en Signup

Por defecto, Supabase requiere que los usuarios confirmen su email después de registrarse. Esto significa que:

1. Usuario se registra con email/password
2. Supabase envía un email con un magic link
3. Usuario debe hacer clic en el link para confirmar su cuenta
4. Solo después de confirmar, el usuario puede iniciar sesión

## Solución: Deshabilitar Email Confirmation para Desarrollo

Para facilitar el desarrollo y testing, puedes deshabilitar la confirmación de email:

### Pasos:

1. Ve a tu [Supabase Dashboard](https://app.supabase.com)
2. Selecciona tu proyecto
3. Ve a **Authentication** > **Settings** (o **Providers** > **Email**)
4. Busca la opción **"Confirm email"** o **"Enable email confirmations"**
5. **Deshabilita** la confirmación de email

### Resultado:

Después de deshabilitar:
- Los usuarios se registran y quedan **autenticados inmediatamente**
- No se requiere confirmar el email
- Puedes usar `signInWithPassword` sin problemas

### ⚠️ Importante para Producción:

En producción, **SÍ deberías habilitar** la confirmación de email por seguridad. Solo deshabilítala en desarrollo/testing.

## Flujos de Autenticación Disponibles

### 1. Signup con Email/Password (sin confirmación)
```typescript
const { error } = await supabase.auth.signUp({
  email: "user@example.com",
  password: "password123",
});
// Usuario queda autenticado inmediatamente si confirmación está deshabilitada
```

### 2. Signup con Email/Password (con confirmación)
```typescript
const { error } = await supabase.auth.signUp({
  email: "user@example.com",
  password: "password123",
  options: {
    emailRedirectTo: `${window.location.origin}/auth/callback`,
  },
});
// Usuario recibe email con link para confirmar
```

### 3. Magic Links (sin password)
```typescript
const { error } = await supabase.auth.signInWithOtp({
  email: "user@example.com",
  options: {
    emailRedirectTo: `${window.location.origin}/auth/callback`,
  },
});
// Usuario recibe email con link mágico
```

### 4. Login con Email/Password
```typescript
const { error } = await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "password123",
});
// Solo funciona si la cuenta está confirmada (o si confirmación está deshabilitada)
```

## Callback Handler

El callback handler en `/auth/callback` maneja:
- ✅ Códigos de confirmación (signup)
- ✅ Magic links (OTP)
- ✅ Errores (links expirados, etc.)

## Recomendación para Testing

Para testing rápido:
1. **Deshabilita** email confirmation en Supabase Dashboard
2. Usa `signUp` → usuario queda autenticado inmediatamente
3. Usa `signInWithPassword` para iniciar sesión

Para producción:
1. **Habilita** email confirmation
2. Usa magic links o signup con confirmación
3. Implementa manejo de errores para links expirados
