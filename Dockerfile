FROM node:22-bookworm-slim

WORKDIR /app

ENV HOST=0.0.0.0
ENV npm_config_update_notifier=false

EXPOSE 4321

CMD ["sh", "-lc", "npm ci && npm run dev -- --host 0.0.0.0"]
