# You can use most Debian-based base images
FROM node:20.1-slim

# Install curl
RUN apt-get update && apt-get install -y curl && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY compile_page.sh /compile_page.sh
RUN chmod +x /compile_page.sh

# # Install dependencies and customize sandbox
WORKDIR /home/user/nextjs-app
RUN ls
# Create Next.js app in a subdirectory first
RUN npx --yes create-next-app@15.3.3 . --no-install --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack 

RUN ls -la
# Install dependencies explicitly with timeout and non-interactive mode
RUN npm install --no-audit --no-fund --prefer-offline --timeout=60000

RUN npx --yes shadcn@2.6.3 init --yes -b neutral --force
RUN npx --yes shadcn@2.6.3 add --all --yes

# Move the Nextjs app to the home directory and remove the nextjs-app directory
RUN cd /home/user/nextjs-app && \
    find . -maxdepth 1 -not -name '.' -exec cp -r {} /home/user/ \; && \
    cd /home/user && \
    rm -rf /home/user/nextjs-app
