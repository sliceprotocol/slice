# Testing Plan: Passkey Authentication

## 🧪 Test Suite Completo

### Setup de Testing

```bash
# 1. Tener 3 emails de prueba diferentes
TEST_EMAIL_1=test1@example.com
TEST_EMAIL_2=test2@example.com  
TEST_EMAIL_3=test3@example.com

# 2. Navegadores a probar
- Chrome (Desktop)
- Safari (Desktop)
- Firefox (Desktop)
- Chrome (Mobile)
- Safari (Mobile)

# 3. Limpiar estado antes de cada test
- Borrar usuarios de prueba de Supabase Dashboard
- Limpiar cookies/local storage del navegador
- Verificar que no hay sessiones activas
```

---

## 📋 Test Cases

### Grupo 1: Registro (Signup)

#### TC1.1: Registro exitoso con Passkey
**Precondiciones**: Email no existe en el sistema

**Pasos**:
1. Abrir app en navegador
2. Clic en login/connect
3. Seleccionar modo "Passkey"
4. Clic en "Sign up"
5. Ingresar email nuevo
6. Clic en "Register with Passkey"
7. Completar autenticación biométrica

**Resultado esperado**:
- ✅ Diálogo de WebAuthn aparece
- ✅ Usuario autenticado exitosamente
- ✅ Modal de login se cierra
- ✅ Usuario ve interfaz autenticada
- ✅ Registro en `user_passkeys` table
- ✅ Registro en `auth.users` table

**Logs esperados**:
```
=== PASSKEY SIGNUP STARTED ===
Starting passkey signup for: test1@example.com
Checking if email exists...
Email exists? false
Email check passed, proceeding with signup...
Account created, registering passkey...
usePasskey.register called with: { userId: ..., userName: ..., email: ... }
WebAuthn is supported, registering passkey...
Generating passkey registration options...
Requesting passkey creation from browser...
Passkey created successfully by browser
Passkey registered successfully
```

---

#### TC1.2: Registro con email ya existente
**Precondiciones**: Email ya existe (creado en TC1.1)

**Pasos**:
1. Intentar registrar con mismo email
2. Clic en "Register with Passkey"

**Resultado esperado**:
- ✅ Error: "An account with this email already exists"
- ✅ Sugerencia de usar login
- ✅ Modal cambia a modo signin automáticamente
- ✅ NO se crea cuenta duplicada

---

#### TC1.3: Registro cancelado por usuario
**Precondiciones**: Email no existe

**Pasos**:
1. Iniciar registro con passkey
2. Cancelar diálogo de WebAuthn

**Resultado esperado**:
- ✅ Error: "Failed to create passkey"
- ⚠️ Cuenta puede haberse creado en Supabase
- ⚠️ NO hay passkey registrado
- ⚠️ Usuario queda en estado inconsistente (tiene cuenta pero sin passkey)

**🐛 Bug conocido**: Cuenta se crea antes de verificar que passkey se registró exitosamente

**Solución propuesta**: Implementar transacción o rollback

---

### Grupo 2: Login (Signin)

#### TC2.1: Login exitoso con Passkey
**Precondiciones**: Usuario registrado con passkey (TC1.1)

**Pasos**:
1. Cerrar sesión si está activa
2. Clic en login/connect
3. Seleccionar modo "Passkey"
4. Mantener en modo "Welcome Back" (NO hacer clic en sign up)
5. Ingresar email
6. Clic en "Authenticate with Passkey"
7. Completar autenticación biométrica

**Resultado esperado**:
- ✅ Diálogo de WebAuthn aparece
- ✅ Usuario autenticado exitosamente
- ✅ Modal se cierra
- ✅ Usuario ve interfaz autenticada
- ✅ Sesión establecida correctamente

**Logs esperados**:
```
Calling authenticate with userId: ...
Authenticate API response status: 200
Authenticate API response: { success: true, userId: ..., email: ..., tokenHash: ..., tokenType: 'signup' }
Verifying token hash to establish session...
Session verification result: { sessionData: {...}, sessionError: null }
Authentication successful!
```

---

#### TC2.2: Login con email sin passkey
**Precondiciones**: Usuario registrado con email/password (NO passkey)

**Pasos**:
1. Intentar login con passkey
2. Ingresar email de usuario sin passkey

**Resultado esperado**:
- ✅ Error: "No passkey found for this account"
- ✅ Sugerencia de registrar passkey primero
- ✅ Modal cambia a modo signup
- ✅ NO se autentica

---

#### TC2.3: Login con passkey incorrecto
**Precondiciones**: Usuario registrado con passkey

**Pasos**:
1. Intentar login con passkey
2. Usar dispositivo/huella diferente

**Resultado esperado**:
- ❓ WebAuthn debería rechazar
- ❓ Error de autenticación
- ✅ NO se autentica

**⚠️ Requiere testing**: Comportamiento puede variar por navegador

---

### Grupo 3: Email/Password

#### TC3.1: Registro con Email/Password
**Precondiciones**: Email no existe

**Pasos**:
1. Clic en login/connect
2. Seleccionar modo "Email"
3. Clic en "Sign up"
4. Ingresar email y password (mínimo 6 caracteres)
5. Clic en "Sign Up"

**Resultado esperado**:
- ✅ Mensaje: "Account created! Please check your email for verification"
- ⚠️ SI confirmación está habilitada: Email de confirmación enviado
- ⚠️ SI confirmación está deshabilitada: Usuario autenticado inmediatamente
- ✅ Usuario en `auth.users`
- ❌ NO hay registro en `user_passkeys`

**⚠️ Requiere verificar**: Configuración de confirmación de email en Supabase Dashboard

---

#### TC3.2: Login con Email/Password
**Precondiciones**: Usuario registrado con email/password (TC3.1)

**Pasos**:
1. Si email confirmation está habilitada: Confirmar email primero
2. Clic en login/connect
3. Seleccionar modo "Email"
4. Ingresar email y password
5. Clic en "Sign In"

**Resultado esperado**:
- ✅ Usuario autenticado
- ✅ Modal se cierra
- ✅ Usuario ve interfaz autenticada

---

### Grupo 4: Magic Link

#### TC4.1: Envío de Magic Link
**Precondiciones**: Usuario registrado con email/password

**Pasos**:
1. Clic en login/connect
2. Seleccionar modo "Email"
3. Mantener en modo "Welcome Back"
4. Ingresar email
5. Clic en "Send Magic Link"

**Resultado esperado**:
- ✅ Mensaje: "Check your email for the magic link!"
- ✅ Email recibido con link
- ✅ NO hay errores en consola

**⚠️ Requiere testing manual**: Verificar que email llegue

---

#### TC4.2: Clic en Magic Link
**Precondiciones**: Magic Link enviado (TC4.1)

**Pasos**:
1. Abrir email
2. Clic en magic link

**Resultado esperado**:
- ✅ Redirección a app
- ✅ Usuario autenticado automáticamente
- ✅ URL: `/?auth=success`

**⚠️ Requiere testing**: Flujo completo no verificado

---

### Grupo 5: Edge Cases

#### TC5.1: Usuario Email/Pass → Agregar Passkey
**Precondiciones**: Usuario registrado con email/password, sesión activa

**Pasos**:
1. Login con email/password
2. Ir a perfil/settings
3. ??? (UI no existe actualmente)

**Resultado esperado**:
- ⚠️ DEBE EXISTIR botón "Add Passkey"
- ⚠️ Al hacer clic, solicitar WebAuthn
- ⚠️ Registrar passkey para usuario actual

**🐛 Bug**: UI no implementada

**Archivo a crear**: `src/components/profile/AddPasskeyButton.tsx`

**Código sugerido**:
```tsx
// En SettingsView.tsx
<Button onClick={handleAddPasskey}>
  Add Passkey
</Button>

// handleAddPasskey usa usePasskey().register() con user?.id actual
```

---

#### TC5.2: Usuario Passkey → Establecer Password
**Precondiciones**: Usuario registrado con passkey únicamente

**Pasos**:
1. Login con passkey
2. Ir a perfil/settings
3. Intentar cambiar password

**Resultado esperado**:
- ⚠️ DEBERÍA mostrar opción "Set Password" (no "Change Password")
- ⚠️ NO debe pedir "Current Password"
- ⚠️ Permitir establecer nuevo password

**🐛 Bug**: Flujo no implementado

**Solución**:
```tsx
// Detectar si usuario tiene password
const hasPassword = user?.app_metadata?.signup_method !== 'passkey';

{hasPassword ? (
  <ChangePasswordForm />
) : (
  <SetPasswordForm /> // No pide current password
)}
```

---

#### TC5.3: Usuario con ambos métodos
**Precondiciones**: Usuario tiene email/password Y passkey

**Pasos**:
1. Login con email/password ✅
2. Logout
3. Login con passkey ✅
4. Logout
5. Login con magic link ✅

**Resultado esperado**:
- ✅ Todos los métodos deben funcionar
- ✅ Usuario puede elegir su método preferido

**Status**: ⚠️ Requiere testing

---

#### TC5.4: Múltiples Passkeys
**Precondiciones**: Usuario registrado

**Pasos**:
1. Registrar passkey en laptop
2. Agregar passkey desde teléfono
3. Login desde laptop ✅
4. Login desde teléfono ✅

**Resultado esperado**:
- ✅ Base de datos soporta múltiples passkeys
- ⚠️ UI para gestionar múltiples passkeys NO existe
- ⚠️ NO se puede ver lista de passkeys
- ⚠️ NO se puede eliminar passkeys individuales

**Mejora propuesta**: `src/components/profile/PasskeyManager.tsx`

---

#### TC5.5: Passkey perdido/eliminado
**Precondiciones**: Usuario tiene passkey en laptop, laptop se rompe

**Pasos**:
1. Intentar login con passkey → NO funciona
2. Intentar login con email/password
3. ¿Funciona?

**Resultado esperado**:
- ⚠️ SI usuario registró password: Puede acceder
- ⚠️ SI usuario SOLO tiene passkey: NO puede acceder
- ⚠️ Debe usar magic link para recovery

**Documentación requerida**: Proceso de recovery para usuarios

---

### Grupo 6: Seguridad

#### TC6.1: RLS - Usuario A no ve passkeys de Usuario B
**Precondiciones**: 2 usuarios registrados con passkeys

**Pasos**:
1. Login como Usuario A
2. Intentar consulta directa: `SELECT * FROM user_passkeys`

**Resultado esperado**:
- ✅ Usuario A solo ve sus propios passkeys
- ✅ No puede ver passkeys de Usuario B

**Verificación**:
```sql
-- En Supabase SQL Editor, logueado como Usuario A
SELECT * FROM user_passkeys;
-- Debería mostrar solo passkeys de Usuario A
```

---

#### TC6.2: Token expiration
**Precondiciones**: Usuario registrado

**Pasos**:
1. Iniciar login con passkey
2. Completar WebAuthn
3. Esperar > 1 hora (tiempo de expiración de token)
4. Intentar completar login

**Resultado esperado**:
- ⚠️ DEBE fallar con "Token expired"
- ⚠️ Usuario debe reiniciar proceso

**Status**: ⚠️ Requiere testing - tokens actualmente usan tipo 'signup' que no expira rápidamente

---

#### TC6.3: Admin API authorization
**Precondiciones**: Variable `SUPABASE_SERVICE_ROLE_KEY` NO configurada

**Pasos**:
1. Intentar registrar passkey

**Resultado esperado**:
- ✅ Error: "Server configuration error"
- ✅ NO se registra passkey
- ✅ Error 500

---

### Grupo 7: UX/UI

#### TC7.1: Loading states
**Precondiciones**: Ninguna

**Pasos**:
1. Durante registro/login, observar UI

**Resultado esperado**:
- ✅ Botón muestra "Registering..." / "Authenticating..."
- ✅ Botón está disabled durante proceso
- ✅ NO se puede hacer doble-clic

**Status**: ✅ Implementado

---

#### TC7.2: Error messages
**Precondiciones**: Varios escenarios de error

**Resultado esperado**:
- ✅ Mensajes claros y en lenguaje del usuario
- ✅ Sugerencias de qué hacer (actionable)
- ❌ NO mostrar errores técnicos al usuario

**Ejemplo bueno**: "No passkey found. Please sign up first."  
**Ejemplo malo**: "Error 404: passkey.credential_id not found in database"

---

#### TC7.3: Navegación entre modos
**Precondiciones**: Ninguna

**Pasos**:
1. Abrir modal de login
2. Cambiar entre modos: Email ↔ Passkey
3. Cambiar entre: Sign up ↔ Sign in

**Resultado esperado**:
- ✅ Transiciones suaves
- ✅ Estado del formulario se mantiene (email ingresado)
- ✅ Textos cambian apropiadamente

---

## 🎯 Test Execution Checklist

### Pre-Testing
- [ ] Limpiar base de datos de usuarios de prueba
- [ ] Verificar variables de entorno
- [ ] Verificar configuración de email en Supabase
- [ ] Tener emails de prueba listos

### Execution
- [ ] Ejecutar Grupo 1 (Signup)
- [ ] Ejecutar Grupo 2 (Login)
- [ ] Ejecutar Grupo 3 (Email/Password)
- [ ] Ejecutar Grupo 4 (Magic Link)
- [ ] Ejecutar Grupo 5 (Edge Cases)
- [ ] Ejecutar Grupo 6 (Seguridad)
- [ ] Ejecutar Grupo 7 (UX/UI)

### Post-Testing
- [ ] Documentar bugs encontrados
- [ ] Priorizar bugs (Crítico/Alto/Medio/Bajo)
- [ ] Crear issues en GitHub para bugs
- [ ] Actualizar documentación con resultados

---

## 📊 Test Results Template

```markdown
## Test Run: [FECHA]

**Tester**: [NOMBRE]
**Navegador**: [Chrome/Safari/Firefox] [VERSION]
**OS**: [Mac/Windows/Linux/iOS/Android]

### Resultados

| Test Case | Status | Notes |
|-----------|--------|-------|
| TC1.1 | ✅ Pass | |
| TC1.2 | ✅ Pass | |
| TC1.3 | ❌ Fail | Bug: Cuenta se crea sin passkey |
| ... | | |

### Bugs Encontrados

1. **[BUG-001] Cuenta sin passkey cuando usuario cancela**
   - Severity: 🔴 High
   - Steps to reproduce: TC1.3
   - Expected: Rollback de cuenta
   - Actual: Cuenta creada sin passkey

2. **[BUG-002] ...**
   ...

### Notas Adicionales

- Email confirmation está habilitada en Supabase Dashboard
- Magic link tarda ~30 segundos en llegar
- ...
```

---

## 🐛 Known Issues Tracking

```markdown
## Bug Tracker

### 🔴 Critical
- [ ] TC1.3: Cuenta se crea sin passkey si usuario cancela WebAuthn

### 🟡 High  
- [ ] TC5.1: No existe UI para agregar passkey
- [ ] TC5.2: No existe UI para establecer password

### 🟢 Medium
- [ ] TC5.4: No existe UI para gestionar múltiples passkeys
- [ ] TC4.2: Magic Link no testeado completamente

### 🔵 Low
- [ ] TC7.2: Algunos error messages muy técnicos
- [ ] Logs de debug visibles en producción
```

---

**Última actualización**: 2026-01-19  
**Próxima review**: Después de implementar fixes de bugs críticos
