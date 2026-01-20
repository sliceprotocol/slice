# Bugs y Edge Cases: Passkey Authentication

## 🐛 Bugs Críticos (Requieren Fix Antes de Producción)

### BUG-001: Cuenta huérfana si usuario cancela WebAuthn
**Severidad**: 🔴 Alta  
**Descubierto**: Durante testing inicial  
**Estado**: ⚠️ Abierto

**Descripción**:
Si un usuario inicia el registro con passkey pero cancela el diálogo de WebAuthn, la cuenta de Supabase Auth se crea pero el passkey NO se registra. El usuario queda en estado inconsistente.

**Pasos para reproducir**:
1. Iniciar registro con passkey
2. Ingresar email nuevo
3. Clic en "Register with Passkey"
4. Cancelar diálogo de WebAuthn cuando aparece

**Resultado actual**:
- ❌ Cuenta creada en `auth.users`
- ❌ NO hay registro en `user_passkeys`
- ❌ Usuario no puede completar registro
- ❌ Usuario no puede iniciar sesión con passkey
- ⚠️ Usuario SÍ puede hacer login con email/password (usando el UUID aleatorio, pero no lo conoce)

**Impacto**:
- Usuario bloqueado
- Cuenta sin método de autenticación útil
- Requiere intervención manual para limpiar

**Solución propuesta**:

**Opción 1: Transacción (rollback)**
```typescript
// En handlePasskeySignup
try {
  const signupData = await supabase.auth.signUp(...);
  
  try {
    await register(passkey);
  } catch (passkeyError) {
    // Rollback: eliminar cuenta
    await adminClient.auth.admin.deleteUser(signupData.user.id);
    throw passkeyError;
  }
} catch (error) {
  // Cuenta no creada o fue eliminada
}
```

**Opción 2: Permitir completar registro después**
```typescript
// Si passkey falla, NO eliminar cuenta
// Permitir al usuario:
// - Intentar registrar passkey de nuevo
// - O establecer password manualmente
```

**Recomendación**: Opción 2 (más user-friendly)

**Archivos a modificar**:
- `src/components/auth/LoginModal.tsx:230-235`
- Crear: `src/components/auth/CompleteRegistration.tsx`

---

### BUG-002: No hay UI para agregar passkey a cuenta existente
**Severidad**: 🔴 Alta  
**Descubierto**: Durante análisis de edge cases  
**Estado**: ⚠️ Abierto

**Descripción**:
Usuario registrado con email/password no tiene forma de agregar passkey desde la UI.

**Escenario**:
```
1. Usuario se registra con email/password (2024)
2. Ahora quiere usar passkey (2026)
3. Va a perfil... ¿dónde está la opción?
```

**Resultado actual**:
- ❌ No existe UI en perfil
- ✅ Backend funciona (`usePasskey().register()` con usuario autenticado)
- ❌ Usuario no puede agregar passkey

**Impacto**:
- Feature incompleta
- Usuarios existentes no pueden migrar a passkey
- Mala UX

**Solución**:

**Paso 1: Crear componente**
```tsx
// src/components/profile/AddPasskeyButton.tsx
export function AddPasskeyButton() {
  const { user } = useSupabase();
  const { register, isLoading } = usePasskey();
  
  const handleAddPasskey = async () => {
    if (!user) return;
    
    try {
      await register({
        userId: user.id,
        userName: user.email || 'user',
        displayName: user.email?.split('@')[0] || 'User',
        email: user.email,
      });
      toast.success("Passkey added successfully!");
    } catch (error) {
      toast.error("Failed to add passkey");
    }
  };
  
  return (
    <Button onClick={handleAddPasskey} disabled={isLoading}>
      <KeyRound className="mr-2" />
      Add Passkey
    </Button>
  );
}
```

**Paso 2: Integrar en Settings**
```tsx
// src/components/profile/views/SettingsView.tsx
import { AddPasskeyButton } from '@/components/profile/AddPasskeyButton';

// En la sección de Security:
<div className="space-y-4">
  <h3>Security</h3>
  <AddPasskeyButton />
  <ChangePasswordButton />
</div>
```

**Archivos a crear**:
- `src/components/profile/AddPasskeyButton.tsx`

**Archivos a modificar**:
- `src/components/profile/views/SettingsView.tsx`

---

## 🟡 Bugs Importantes (Fix Recomendado)

### BUG-003: Usuario Passkey no puede establecer password
**Severidad**: 🟡 Media  
**Descubierto**: Durante análisis de edge cases  
**Estado**: ⚠️ Abierto

**Descripción**:
Usuario registrado con passkey tiene password aleatorio que no conoce. Si quiere establecer uno, el flujo típico pide "current password".

**Problema**:
```typescript
// En registro con passkey:
password: crypto.randomUUID() // Usuario no conoce esto
```

**Resultado actual**:
- ❌ Usuario no puede cambiar a password
- ❌ Usuario "atrapado" con solo passkey
- ⚠️ Si pierde acceso a passkey, solo puede usar magic link

**Solución**:

**Paso 1: Detectar método de registro**
```typescript
// Ya guardamos esto en signup:
data: {
  signup_method: "passkey",
}

// Leer:
const signupMethod = user?.user_metadata?.signup_method;
const hasKnownPassword = signupMethod !== 'passkey';
```

**Paso 2: UI condicional**
```tsx
{hasKnownPassword ? (
  <ChangePasswordForm requiresCurrent={true} />
) : (
  <SetPasswordForm 
    title="Set Your Password"
    description="You registered with passkey. Set a password as backup."
    requiresCurrent={false}
  />
)}
```

**Paso 3: Implementar SetPasswordForm**
```tsx
const handleSetPassword = async (newPassword: string) => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  
  if (error) {
    toast.error("Failed to set password");
  } else {
    toast.success("Password set successfully!");
  }
};
```

**Archivos a crear**:
- `src/components/profile/SetPasswordForm.tsx`

---

### BUG-004: Logs de debug en producción
**Severidad**: 🟡 Media (Seguridad/Performance)  
**Descubierto**: Durante code review  
**Estado**: ⚠️ Abierto

**Descripción**:
Múltiples `console.log()` en el código que expondrán información en producción.

**Archivos afectados**:
- `src/components/auth/LoginModal.tsx` (15+ logs)
- `src/hooks/usePasskey.ts` (5+ logs)
- `src/lib/webauthn.ts` (3+ logs)

**Información expuesta**:
- UserIds
- Emails
- Token hashes (aunque no son sensibles)
- Flujo de autenticación completo

**Solución**:

**Paso 1: Crear utilidad de logging**
```typescript
// src/lib/logger.ts
const isDev = process.env.NODE_ENV === 'development';

export const logger = {
  log: (...args: any[]) => {
    if (isDev) console.log(...args);
  },
  error: (...args: any[]) => {
    // Errors siempre se loguean, pero se pueden enviar a servicio de tracking
    console.error(...args);
  },
  warn: (...args: any[]) => {
    if (isDev) console.warn(...args);
  },
};
```

**Paso 2: Reemplazar console.log**
```typescript
// Antes:
console.log("Starting passkey signup for:", email);

// Después:
logger.log("Starting passkey signup for:", email);
```

**Archivos a modificar**: Todos los mencionados arriba

---

### BUG-005: Endpoint delete-test-user accesible
**Severidad**: 🟡 Media (Seguridad)  
**Descubierto**: Durante code review  
**Estado**: ⚠️ Abierto

**Descripción**:
Endpoint de desarrollo para eliminar usuarios está creado pero solo tiene protección básica.

**Archivo**: `src/app/api/auth/delete-test-user/route.ts`

**Protección actual**:
```typescript
// Solo permite en desarrollo
if (process.env.NODE_ENV === 'production') {
  return 403;
}

// Solo emails con 'test', 'demo', o '+'
```

**Problema**: 
- En staging (NODE_ENV !== 'production'), podría ser accesible
- No requiere autenticación de admin

**Solución**:

**Opción 1: Eliminar archivo antes de merge**
```bash
rm src/app/api/auth/delete-test-user/route.ts
```

**Opción 2: Proteger con auth token**
```typescript
const adminToken = request.headers.get('X-Admin-Token');
if (adminToken !== process.env.ADMIN_API_TOKEN) {
  return 403;
}
```

**Recomendación**: Opción 1 (eliminar), recrear solo si necesario localmente

---

## 🟢 Bugs Menores (Nice to Fix)

### BUG-006: Warning search_path mutable en función
**Severidad**: 🟢 Baja (Advertencia de seguridad)  
**Descubierto**: Via MCP Supabase Advisors  
**Estado**: ⚠️ Abierto

**Descripción**:
La función `update_updated_at_column()` tiene search_path mutable.

**Advertencia de Supabase**:
```
Function `public.update_updated_at_column` has a role mutable search_path
```

**Solución**:
```sql
-- En la migración, cambiar:
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- A:
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;
```

**Archivo a modificar**:
- `supabase/migrations/001_create_user_passkeys.sql:124-130`

---

### BUG-007: Nombres genéricos de dispositivos
**Severidad**: 🟢 Baja (UX)  
**Descubierto**: Durante análisis de features  
**Estado**: ⚠️ Abierto

**Descripción**:
Los passkeys se guardan con nombres genéricos "This Device" o "External Device".

**Código actual**:
```typescript
// src/lib/webauthn.ts:100-103
const deviceName =
  (credential as any).authenticatorAttachment === "platform"
    ? "This Device"
    : "External Device";
```

**Problema**:
- No muy descriptivo
- Difícil distinguir entre múltiples passkeys
- Mala UX al ver lista

**Mejora propuesta**:
```typescript
// Detectar tipo de dispositivo
const getDeviceName = () => {
  const ua = navigator.userAgent;
  if (/(iPhone|iPad|iPod)/.test(ua)) return "iPhone/iPad";
  if (/Mac/.test(ua)) return "Mac";
  if (/Windows/.test(ua)) return "Windows PC";
  if (/Android/.test(ua)) return "Android";
  return "This Device";
};

// O mejor: permitir al usuario nombrar el passkey
const deviceName = prompt("Name this passkey (e.g., 'My iPhone')") || getDeviceName();
```

---

## 🎭 Edge Cases Importantes

### EDGE-001: Usuario con Email/Pass intenta registrar passkey duplicado
**Escenario**:
```
1. Usuario tiene cuenta con email/password
2. Agrega passkey
3. Intenta agregar el mismo passkey otra vez (mismo dispositivo)
```

**Comportamiento actual**:
- ⚠️ No probado

**Comportamiento esperado**:
- ✅ Error: "This passkey is already registered"
- ✅ No se crea registro duplicado

**Verificación**:
La columna `credential_id` tiene constraint UNIQUE, así que la DB rechazará duplicados. Pero el error debe ser manejado gracefully.

**Archivo a verificar**: `src/app/api/auth/passkey/register/route.ts:75-81`

---

### EDGE-002: Usuario tiene múltiples passkeys y pierde uno
**Escenario**:
```
1. Usuario registra passkey en laptop
2. Usuario registra passkey en teléfono
3. Laptop se pierde
4. Usuario intenta login desde laptop nuevo
```

**Comportamiento actual**:
- ✅ Usuario puede usar passkey del teléfono
- ✅ Sistema no se bloquea

**Comportamiento esperado**:
- ✅ Usuario usa passkey disponible (teléfono)
- ✅ Usuario puede agregar nuevo passkey desde laptop nuevo
- ⚠️ Usuario debería poder eliminar passkey perdido desde UI

**Status**: ✅ Funciona, pero falta UI para gestión

---

### EDGE-003: Dos usuarios con mismo email en diferentes auth providers
**Escenario**:
```
1. Usuario A: test@gmail.com (registrado con email/password)
2. Usuario B: test@gmail.com (intentar registrar con Google OAuth)
```

**Comportamiento de Supabase**:
- Supabase vincula identidades al mismo usuario si el email coincide
- Usuario final es el mismo con múltiples métodos de login

**Impacto en Passkeys**:
- ⚠️ La columna `email` en `user_passkeys` debe ser única por `user_id`, no globalmente única
- ✅ Actualmente: `credential_id` es único (correcto)
- ✅ Múltiples passkeys por usuario soportado

**Status**: ✅ Diseño correcto

---

### EDGE-004: Usuario cambia su email en Supabase
**Escenario**:
```
1. Usuario registrado: old@email.com con passkey
2. Usuario cambia email a: new@email.com
3. Usuario intenta login con passkey usando new@email.com
```

**Comportamiento actual**:
- ⚠️ No probado

**Problema potencial**:
- La tabla `user_passkeys` tiene email almacenado
- Si email cambia en `auth.users`, ¿se actualiza en `user_passkeys`?
- Actualmente: ❌ NO hay trigger/función para sincronizar

**Solución propuesta**:

**Opción 1: Trigger en auth.users**
```sql
-- No es posible: auth.users está en schema auth (no modificable directamente)
```

**Opción 2: Hook de Supabase Auth**
```typescript
// Usar Supabase Auth Hooks para sincronizar
// Cuando email cambia, actualizar user_passkeys
```

**Opción 3: Buscar por user_id, no por email**
```typescript
// En find-user endpoint, cambiar:
// Buscar primero en auth.users
// Luego buscar passkeys por user_id (no por email)
```

**Recomendación**: Opción 3 + documentar limitación

**Archivo a modificar**: `src/app/api/auth/passkey/find-user/route.ts`

---

### EDGE-005: Rate limiting
**Escenario**:
```
Usuario hace múltiples intentos de registro/login en poco tiempo
```

**Comportamiento actual**:
- ✅ Supabase Auth tiene rate limiting built-in
- ✅ Se captura error 429
- ✅ Se muestra mensaje al usuario

**Código**:
```typescript
if (error.status === 429) {
  throw new Error("Too many requests. Please wait a moment and try again.");
}
```

**Status**: ✅ Manejado correctamente

---

### EDGE-006: Usuario elimina todos sus passkeys
**Escenario**:
```
1. Usuario tiene 2 passkeys
2. Elimina passkey 1
3. Elimina passkey 2
4. Ya no tiene passkeys
5. Intenta login con passkey
```

**Comportamiento esperado**:
- ✅ Error: "No passkey found"
- ✅ Sugerencia de registrar nuevo passkey
- ✅ Usuario puede usar email/password o magic link

**Status**: ✅ Debería funcionar (pero falta UI para probar)

---

### EDGE-007: WebAuthn no soportado en navegador
**Escenario**:
```
Usuario con navegador antiguo intenta usar passkey
```

**Comportamiento actual**:
```typescript
// En webauthn.ts:71
if (!window.PublicKeyCredential) {
  throw new Error("WebAuthn is not supported in this browser");
}
```

**Resultado**:
- ✅ Error claro
- ✅ Usuario puede usar métodos alternativos

**Mejora propuesta**:
```tsx
// En LoginModal, esconder opción de Passkey si no está soportado
{isPasskeySupported && (
  <Button onClick={() => setMode("passkey")}>Passkey</Button>
)}
```

**Status**: ✅ Ya implementado (`isPasskeySupported` se usa)

---

### EDGE-008: Usuario intenta login durante signup
**Escenario**:
```
1. Usuario está en modo "Create Account"
2. Cambia a modo "Passkey"
3. NO hace clic en "Sign up" (se queda en estado signup pero con UI de passkey)
4. Hace clic en botón
```

**Comportamiento actual**:
- ✅ Se detecta `isSignUp = true`
- ✅ Llama a `handlePasskeySignup` (correcto)

**Status**: ✅ Funciona correctamente

---

## 🔒 Consideraciones de Seguridad

### SEC-001: Verificación de firma de passkey
**Severidad**: 🔴 Crítica (No implementada)  
**Estado**: ⚠️ TODO en el código

**Ubicación**: `src/app/api/auth/passkey/authenticate/route.ts:41`

```typescript
// TODO: Implement proper WebAuthn verification
// For now, we'll just verify the credential exists and update counter
// In production, you should verify the signature using the public key
```

**Problema**:
Actualmente NO se verifica la firma criptográfica del passkey. Solo se verifica que el `credential_id` existe.

**Impacto**:
- 🔴 Cualquiera con el `credential_id` puede autenticarse
- 🔴 No hay verificación criptográfica real
- 🔴 NO usar en producción así

**Solución requerida**:
Implementar verificación de firma usando biblioteca como:
- `@simplewebauthn/server`
- `webauthn-p256`

```typescript
import { verifyAuthenticationResponse } from '@simplewebauthn/server';

// Verificar firma
const verification = await verifyAuthenticationResponse({
  response: authenticatorResponse,
  expectedChallenge,
  expectedOrigin: window.location.origin,
  expectedRPID: window.location.hostname,
  authenticator: {
    credentialPublicKey: Buffer.from(passkey.public_key, 'base64'),
    counter: passkey.counter,
  },
});

if (!verification.verified) {
  return 401;
}
```

**⚠️ CRÍTICO**: Este es el bug de seguridad más importante. DEBE corregirse antes de producción.

---

### SEC-002: Service Role Key exposure
**Severidad**: 🔴 Crítica  
**Estado**: ✅ Protegido

**Verificación**:
- ✅ Service Role Key solo se usa en server-side
- ✅ Nunca se envía al cliente
- ✅ Solo en variables de entorno (no en código)
- ✅ `.env.local` en `.gitignore`

**Status**: ✅ Seguro

---

### SEC-003: Public key storage
**Severidad**: 🟢 Baja (Información)  
**Estado**: ✅ OK

**Nota**: 
Las public keys de passkeys se guardan en texto plano en la DB. Esto es correcto y esperado - las public keys están diseñadas para ser públicas.

**Status**: ✅ No es un problema de seguridad

---

## 📊 Matriz de Compatibilidad de Métodos

### Escenarios de Coexistencia

| Método Registro | Método Login | ¿Funciona? | Notas |
|----------------|--------------|-----------|-------|
| Passkey | Passkey | ✅ | Flujo principal |
| Passkey | Email/Pass | ⚠️ | Usuario no conoce password |
| Passkey | Magic Link | ✅ | Debería funcionar |
| Email/Pass | Email/Pass | ✅ | Flujo tradicional |
| Email/Pass | Passkey | ⚠️ | Requiere agregar passkey primero |
| Email/Pass | Magic Link | ✅ | Flujo de Supabase |

### Transiciones

| De | A | ¿Posible? | Cómo |
|----|---|----------|------|
| Email/Pass | + Passkey | ⚠️ | Falta UI (BUG-002) |
| Passkey | + Password | ⚠️ | Falta implementación (BUG-003) |
| Solo Passkey | Recovery | ✅ | Via Magic Link |
| Solo Email/Pass | + Passkey | ⚠️ | Falta UI (BUG-002) |

---

## 🔄 Plan de Fixes

### Sprint 1 (Antes de Merge)
- [ ] 🔴 BUG-001: Implementar Opción 2 (permitir completar después)
- [ ] 🔴 SEC-001: ⚠️ Documentar que NO está en producción o implementar verificación
- [ ] 🟡 BUG-005: Eliminar endpoint delete-test-user

### Sprint 2 (Post-Merge Inmediato)
- [ ] 🔴 BUG-002: Implementar AddPasskeyButton
- [ ] 🟡 BUG-003: Implementar SetPasswordForm
- [ ] 🟡 BUG-004: Sistema de logging condicional

### Sprint 3 (Mejoras)
- [ ] 🟢 BUG-006: Fix search_path warning
- [ ] 🟢 BUG-007: Mejorar nombres de dispositivos
- [ ] Testing completo de todos los edge cases

---

## 📝 Notas para Reviewers

### Puntos Críticos a Revisar

1. **Seguridad de Admin API** (`src/app/api/auth/passkey/register/route.ts`)
   - Verificar que solo se usa Admin API cuando es necesario
   - Verificar que Service Role Key no se expone

2. **RLS Policies** (`supabase/migrations/001_create_user_passkeys.sql`)
   - Verificar que políticas son correctas
   - Verificar que no hay bypass accidental

3. **Manejo de Errores** (Todos los archivos)
   - Verificar que errores no exponen información sensible
   - Verificar que mensajes son user-friendly

4. **TODO: Verificación de firma** (`authenticate/route.ts:41`)
   - ⚠️ **CRÍTICO**: Esto debe ser implementado antes de producción
   - Actualmente NO se verifica la firma criptográfica

### Preguntas para el Equipo

1. ¿Email confirmation debe estar habilitada o deshabilitada?
2. ¿Cuál es la estrategia para usuarios que pierden sus passkeys?
3. ¿Implementamos verificación de firma ahora o en otro PR?
4. ¿Eliminamos endpoint delete-test-user o lo protegemos?

---

**Última actualización**: 2026-01-19  
**Próxima review**: Después de fixes de Sprint 1
