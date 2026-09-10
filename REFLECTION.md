1. Image vs container in your run.
The image (my-api) is the built, static template — created once with docker build -t my-api .. The container is a running instance of that image — I ran multiple containers from the same image at different points (my-api-container during D3 testing, fresh-test-api-1 during the fresh-clone test), each an independent running process with its own lifecycle, even though they came from the same image.

2. One Dockerfile choice, and what reversing it breaks.
I copied package*.json and ran npm install before copying the rest of the source code (COPY package*.json ./ → RUN npm install → COPY . .). This lets Docker cache the dependency-install layer, so it only reruns when package.json actually changes. If I reversed it — COPY . . first, then npm install — every single source code edit would invalidate the cache and force a full npm install on every rebuild, making builds much slower.

3. First real error, what logs showed, what you changed.
My first real error was during docker compose up: Error response from daemon: ports are not available: ... bind: Only one usage of each socket address is normally permitted. This happened because a container from earlier testing (my-api-container) was still running and holding port 3000. I ran docker ps to confirm it was still up, then docker stop/docker rm on it, and Compose started cleanly afterward.