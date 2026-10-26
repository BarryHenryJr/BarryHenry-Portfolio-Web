FROM node:20-slim

# Install pnpm (pinned to match CI and packageManager; unpinned installs pull breaking majors)
RUN npm install -g pnpm@9.15.0

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Public build-time config: Next.js inlines NEXT_PUBLIC_* into the client bundle during build,
# so Railway must pass these as build args (it does for declared ARGs matching service variables)
ARG NEXT_PUBLIC_POSTHOG_KEY
ARG NEXT_PUBLIC_POSTHOG_HOST
ENV NEXT_PUBLIC_POSTHOG_KEY=$NEXT_PUBLIC_POSTHOG_KEY
ENV NEXT_PUBLIC_POSTHOG_HOST=$NEXT_PUBLIC_POSTHOG_HOST

# Build the application
RUN pnpm build

# Expose port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]