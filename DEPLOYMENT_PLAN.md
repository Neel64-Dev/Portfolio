# Deployment Plan

## Objective
Create a hardened, production-ready deployment for the portfolio app with secure HTTPS delivery, optimized static asset handling, and container-level reliability.

## Scope
This plan covers:
- Nginx production hardening
- HTTPS readiness
- Security headers and CSP
- Asset caching and compression
- Rate limiting and request protection
- Docker build and runtime optimization
- Environment variable / secrets management
- Health checks and observability

---

## 1. Critical Implementation Tasks

### 1.1 HTTPS Readiness
- Obtain SSL/TLS certificates (Let’s Encrypt, cloud provider, or managed certs).
- Add `listen 443 ssl http2;` to `nginx.conf`.
- Add certificate file paths:
  - `ssl_certificate /etc/nginx/ssl/fullchain.pem;`
  - `ssl_certificate_key /etc/nginx/ssl/privkey.pem;`
- Add HTTP to HTTPS redirect block:
  - `listen 80; return 301 https://$host$request_uri;`
- Add HSTS header after validation:
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`

### 1.2 Nginx Security Headers
- Add the following security headers in `nginx.conf`:
  - `Content-Security-Policy`
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy` with conservative defaults
  - `Cross-Origin-Opener-Policy: same-origin`
  - `Cross-Origin-Resource-Policy: same-origin`
  - `X-XSS-Protection: 1; mode=block`
- Validate CSP using `report-only` mode before enforcing.

### 1.3 Asset Caching and Compression
- Configure long-term cache headers for hashed assets:
  - `Cache-Control: public, max-age=31536000, immutable`
- Configure no-cache headers for `index.html`:
  - `Cache-Control: public, max-age=0, no-cache, no-store, must-revalidate`
- Add gzip compression to Nginx for JS/CSS/HTML/SVG/fonts.
- Optionally add brotli support if the runtime image supports it.

### 1.4 Rate Limiting and Request Protection
- Add `limit_req_zone` and `limit_req` in `nginx.conf`.
- Use conservative rates for general traffic and stricter rates for API-like routes.
- Add request timeout values:
  - `client_body_timeout`
  - `client_header_timeout`
  - `send_timeout`
- Keep `client_max_body_size 1m` for the portfolio.

### 1.5 Environment Variables and Secrets
- Remove hardcoded `VITE_WEB3FORMS_KEY` from source.
- Use `.env` files for local development and `VITE_` environment variables for build/runtime.
- Ensure `.env.production` remains out of source control.
- Add documentation on passing env vars in `docker-compose.yml` or container runtime.

---

## 2. Docker Optimization Tasks

### 2.1 Dockerfile Improvements
- Switch from `npm install` to `npm ci` for reproducible builds.
- Add `.dockerignore` to exclude:
  - `node_modules`
  - `.git`
  - `.env*`
  - `dist`
  - local editor files and logs
- Copy `package*.json` first, install dependencies, then copy source.
- Use `COPY --chown=nginx:nginx` for final artifact ownership.
- Add a non-root runtime user, e.g. `USER nginx`.

### 2.2 docker-compose Enhancements
- Add environment section for production vars if needed.
- Add resource limit guidance (optional):
  - `deploy.resources.limits.memory`
  - `deploy.resources.limits.cpus`
- Consider exposing only HTTPS in production if TLS terminates at the container.

### 2.3 Health and Observability
- Add Docker `HEALTHCHECK` to verify Nginx is serving the app.
- Add a lightweight `/health` endpoint or use Nginx status if needed.
- Configure access and error logging in Nginx if not already present.
- Document health check behavior and expected status.

---

## 3. Detailed Implementation Schedule

| Step | Task | Owner | Priority | Estimated Time |
|------|------|-------|----------|----------------|
| 1 | Update `nginx.conf` with HTTPS, redirect, headers, cache, and rate limiting | Dev | High | 2-3 hours |
| 2 | Create `.dockerignore` and optimize `dockerfile` | Dev | High | 1-2 hours |
| 3 | Remove hardcoded secrets and wire env vars | Dev | Critical | 1 hour |
| 4 | Add Docker health check and runtime user | Dev | Medium | 1 hour |
| 5 | Test deployment locally with Docker Compose | Dev | High | 1-2 hours |
| 6 | Verify security headers and asset caching in browser/devtools | Dev | High | 1 hour |
| 7 | Document deployment steps and review the plan | Dev | Medium | 1 hour |

---

## 4. Recommended File Changes

### `nginx.conf`
- Add HTTPS server block or document that TLS is terminated upstream.
- Add security headers.
- Add compression and cache-control rules.
- Add rate limiting configuration.

### `dockerfile`
- Use `npm ci`.
- Add `WORKDIR /app` if not present.
- Add `COPY --chown=nginx:nginx --from=builder /app/dist /usr/share/nginx/html`.
- Add `USER nginx` before `CMD`.

### `docker-compose.yml`
- Document environment variables for build/runtime.
- Add resource guidance and restart policy.

### `.dockerignore`
- Create with:
  - `node_modules`
  - `.git`
  - `.env*`
  - `dist`
  - `*.log`
  - `.DS_Store`

### `DEPLOYMENT_ASSESSMENT.md`
- Use the plan to add any missing tasks or next steps.

---

## 5. Deep-dive Focus Areas

### 5.1 HTTPS / TLS
- Confirm whether TLS is terminated in the container or by an external proxy.
- If container-terminated, ensure cert files are mounted securely.
- If external, keep Nginx configuration clean and ensure redirect logic remains correct.

### 5.2 Content Security Policy
- Define a CSP based on actual resource usage:
  - `default-src 'self'`
  - `script-src 'self' https://api.web3forms.com`
  - `style-src 'self' 'unsafe-inline'` (if Tailwind uses inline styles)
  - `font-src 'self' https://fonts.gstatic.com`
  - `img-src 'self' data:`
  - `connect-src 'self' https://api.web3forms.com`
- Validate in report-only mode before enabling.

### 5.3 Asset Cache Strategy
- Use hashed filenames produced by Vite for long-lived caching.
- Ensure `index.html` is always revalidated.
- Add separate cache rules for assets and HTML.

---

## 6. Deployment Diagram

```text
Browser
   │
   ▼
[HTTPS Load Balancer / Proxy] (optional)
   │
   ▼
[Docker Container]
   ├─ Nginx
   │   ├─ Static files from /usr/share/nginx/html
   │   ├─ HTTPS termination
   │   ├─ Security headers
   │   ├─ Gzip compression
   │   ├─ Cache control
   │   └─ Rate limiting
   │
   └─ App artifacts copied from builder stage

Builder stage
   ├─ node:22-alpine
   ├─ npm ci
   ├─ npm run build
   └─ dist/ output
```

---

## 7. Validation Checklist

- [ ] `nginx.conf` syntax check passes.
- [ ] App serves correctly over HTTPS.
- [ ] Security headers appear in responses.
- [ ] `index.html` is not cached aggressively.
- [ ] Hashed assets receive long-lived cache headers.
- [ ] Rate limiting works without blocking normal users.
- [ ] Docker container runs as non-root.
- [ ] `VITE_WEB3FORMS_KEY` is no longer hardcoded.
- [ ] Local Docker Compose deployment succeeds.

---

## 8. Notes

- Keep production secrets out of the repository.
- Use a managed HTTPS provider if possible to reduce operational burden.
- Test with browser dev tools and security scanners after deployment.
- Revisit the plan after the first deployment to capture any operational changes.
