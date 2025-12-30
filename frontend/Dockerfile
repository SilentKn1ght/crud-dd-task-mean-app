# Stage 1: Build Angular App
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit
COPY . .

# Increase memory limit to prevent "service is no longer running" error
RUN node --max_old_space_size=1024 ./node_modules/@angular/cli/bin/ng build --configuration=production


# Stage 2: Serve with Nginx
FROM nginx:stable-alpine AS runner
COPY --from=builder /app/dist/angular-15-crud /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
