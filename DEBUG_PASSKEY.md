# Debug de Passkey Registration

## Problema: No se pide la huella digital

### Pasos para solucionar

1. **Reinicia el servidor:**

   ```bash
   # Detén el servidor (Ctrl+C)
   pnpm dev
   ```

2. **Limpia el caché del navegador:**
   - Chrome/Edge: `Cmd+Shift+R` (Mac) o `Ctrl+Shift+R` (Windows/Linux)
   - O abre DevTools > Network tab > Check "Disable cache"

3. **Verifica que el navegador soporte WebAuthn:**
   - Abre la consola del navegador
   - Ejecuta: `console.log(window.PublicKeyCredential)`
   - Debería mostrar un objeto, no `undefined`

4. **Verifica el flujo:**
   - Al hacer clic en "Register with Passkey", deberías ver en consola:
     1. "Starting passkey signup for: [email]"
     2. "Account created, registering passkey..."
     3. **Aquí debería aparecer el diálogo del navegador para registrar huella**
     4. "Passkey registered successfully"

### Endpoints actualizados

- ✅ `/api/auth/check-email` - Verifica si email existe (nuevo)
- ✅ `/api/auth/passkey/register` - Registra passkey (usa Admin API para RLS)
- ⚠️  `/api/auth/passkey/find-user` - Solo para autenticación, NO para signup

### Si sigue sin funcionar

1. Verifica que estés en `https://` o `localhost` (WebAuthn requiere conexión segura)
2. Verifica que el navegador soporte passkeys (Chrome 67+, Safari 13+, Firefox 60+)
3. Verifica que no haya errores en la consola antes de hacer clic

### Logs esperados en consola

```
Starting passkey signup for: email@example.com
Account created, registering passkey...
Passkey registered successfully
```

### Si ves este error: `POST /api/auth/passkey/find-user 404`

Significa que el navegador está usando código en caché. Haz un **hard refresh** (Cmd+Shift+R).
