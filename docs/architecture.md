Arquitetura recomendada (simples e forte)

Mobile/App → API Gateway/Proxy → API (stateless) → DB

Gateway/Proxy (Cloudflare / API Gateway) faz:

TLS, WAF, bloqueio básico, regras

Rate limit (por IP, por rota)

Cache de respostas públicas

(Opcional) validação de token antes de bater na sua API

Sua API (Nest) faz:

validação de assinatura/token

logs, métricas

acesso ao banco

Banco: Postgres gerenciado barato (Neon/Supabase/Railway) ou SQLite se for só leitura/pequeno.