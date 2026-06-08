# Deploy Your Portfolio on Railway (Simple Guide)

This guide explains how to put your website online using **Docker** and **Railway**.

Think of it like this:
- Your **code** = the recipe
- **Docker** = a lunchbox that packs your app so it runs the same everywhere
- **Docker Hub** = a storage locker for your lunchbox (the image)
- **GitHub Actions** = a robot that builds and ships automatically when you push code
- **Railway** = the restaurant that serves your website to visitors on the internet

---

## What You Already Have in This Project

| File | What it does (simple words) |
|------|-----------------------------|
| `dockerfile` | Instructions to build your app and run it with Nginx (a web server) |
| `nginx.conf` | Rules for how the web server shows your site |
| `docker-compose.yml` | Optional way to run Docker on your own computer for testing |
| `.github/workflows/docker-deploy-server.yml` | Robot script that runs when you push to `main` |

Your website is built with **Vite + React**. After building, it becomes normal HTML/CSS/JS files. Nginx shows those files to people who visit your site.

---

## Part 1: Understand Docker (Simple)

### What is Docker?

Docker puts your app inside a **container**. A container is like a sealed box with everything your app needs:
- Node.js (to build the app)
- Your website files
- Nginx (to serve the website)

Anyone can run that box on their computer or on Railway, and it works the same way.

### What happens when Docker builds your app?

Your `dockerfile` has **2 steps**:

**Step 1 — Build (like cooking)**
1. Copy your project files into the box
2. Run `npm ci` (install packages)
3. Run `npm run build` (turn React code into website files in a `dist` folder)

**Step 2 — Serve (like opening a shop)**
1. Start Nginx (web server)
2. Copy the `dist` folder into Nginx
3. Open **port 80** so people can visit the site

### Test Docker on your computer (optional)

Before deploying online, you can test locally.

**1. Install Docker Desktop**
- Download from: https://www.docker.com/products/docker-desktop/
- Install it and open it (whale icon in taskbar should be running)

**2. Open terminal in your project folder**

**3. Build the image (create the lunchbox)**

```bash
docker build -f dockerfile -t personal-portfolio:latest .
```

This can take a few minutes the first time.

**4. Run the container (open the shop)**

```bash
docker run -d --name personal-portfolio-container -p 8080:80 personal-portfolio:latest
```

- `-p 8080:80` means: visit `http://localhost:8080` on your computer

**5. Open your browser**

Go to: `http://localhost:8080`

You should see your portfolio.

**6. Stop and remove when done testing**

```bash
docker stop personal-portfolio-container
docker rm personal-portfolio-container
```

### Important: Web3Forms key

Your contact form needs a secret key called `VITE_WEB3FORMS_KEY`.

- This key must be set **while building** the app (not after).
- Get a free key from: https://web3forms.com

To build with the key on your computer:

```bash
docker build -f dockerfile --build-arg VITE_WEB3FORMS_KEY=your-key-here -t personal-portfolio:latest .
```

---

## Part 2: Accounts You Need

Create these accounts before deploying:

| Service | Why you need it | Link |
|---------|-----------------|------|
| **GitHub** | Your code lives here | https://github.com |
| **Docker Hub** | Store your Docker image online | https://hub.docker.com |
| **Railway** | Host and run your website | https://railway.app |
| **Web3Forms** | Contact form on your site | https://web3forms.com |

---

## Part 3: Docker Hub Setup (Store Your Image Online)

**Docker Hub** is like Google Drive, but for Docker images.

### Step 1: Create Docker Hub account
1. Go to https://hub.docker.com
2. Sign up (free)

### Step 2: Create a repository
1. Click **Create Repository**
2. Name it something like `portfolio`
3. Set it to **Public** (easier for beginners) or **Private**
4. Your full image name will be: `yourusername/portfolio`

Example: if your username is `johndoe`, your image is `johndoe/portfolio`

### Step 3: Create an access token (password for robots)
1. Click your profile → **Account Settings**
2. Go to **Security**
3. Click **New Access Token**
4. Give it a name like `github-actions`
5. Copy the token and save it somewhere safe (you won't see it again)

You will need:
- `DOCKERHUB_USERNAME` = your Docker Hub username
- `DOCKERHUB_TOKEN` = the token you just created
- `DOCKER_IMAGE` = `yourusername/portfolio` (no `:latest` at the end)

---

## Part 4: Railway Setup (Put Your Site on the Internet)

**Railway** runs your Docker container and gives you a public website link.

### Step 1: Create Railway account
1. Go to https://railway.app
2. Sign up with GitHub (easiest)

### Step 2: Create a new project
1. Click **New Project**
2. Choose **Empty Project**

### Step 3: Add your Docker image as a service
1. Click **+ New**
2. Choose **Docker Image** (NOT "GitHub Repo" for this guide)
3. Type your image name: `yourusername/portfolio:latest`
4. Click deploy

> **Note:** The first time, the image might not exist yet on Docker Hub. That's OK. You will push it later with GitHub Actions, then click Deploy again on Railway.

### Step 4: Get a public website link
1. Click your service
2. Go to **Settings** → **Networking**
3. Click **Generate Domain**
4. Railway gives you a link like: `https://your-app.up.railway.app`

Anyone can open that link and see your site.

### Step 5: Get Railway token (for automatic deploys)
1. Open your **Project** in Railway
2. Go to **Project Settings** → **Tokens**
3. Click **Create Token**
4. Copy the token — this is your `RAILWAY_TOKEN`

Also remember your **service name** (shown in Railway dashboard, e.g. `portfolio`).

---

## Part 5: GitHub Secrets Setup (Give the Robot Your Passwords)

GitHub Actions is a robot. It needs secret passwords stored safely in GitHub.

### How to add secrets
1. Open your GitHub repository in the browser
2. Click **Settings**
3. Click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add each secret below

### Secrets you need

| Secret name | What to put | Example |
|-------------|-------------|---------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username | `johndoe` |
| `DOCKERHUB_TOKEN` | Docker Hub access token | `dckr_pat_abc123...` |
| `DOCKER_IMAGE` | Image name without tag | `johndoe/portfolio` |
| `VITE_WEB3FORMS_KEY` | Web3Forms access key | `abc-123-xyz` |
| `RAILWAY_TOKEN` | Railway project token | `xxxx-xxxx-xxxx` |

### Secrets you do NOT need for Railway

These were for Google Cloud VPS (old way). Skip them for Railway:

- `SERVER_HOST`
- `SERVER_USER`
- `SERVER_SSH_KEY`
- `SERVER_SSH_PORT`

---

## Part 6: How Deployment Works (The Full Story)

When you push code to the `main` branch on GitHub, this happens automatically:

```
You push code
    ↓
GitHub Actions wakes up
    ↓
Builds your website inside Docker
    ↓
Uploads (pushes) image to Docker Hub
    ↓
Tells Railway: "Hey, use the new image!"
    ↓
Railway pulls the new image and restarts
    ↓
Your site is live at your Railway link
```

### What each part does

1. **Build** — Turns your React code into a real website
2. **Push to Docker Hub** — Saves the new version online
3. **Redeploy on Railway** — Railway downloads the new version and runs it

---

## Part 7: Deploy Step by Step (Do This in Order)

### Before you start
- [ ] Code is on GitHub
- [ ] `dockerfile` exists in your repo
- [ ] Docker Hub account + repository created
- [ ] Railway project created
- [ ] All GitHub secrets added (Part 5)
- [ ] Workflow file updated for Railway (see Part 8)

### Step 1: Make sure your workflow uses Railway (not SSH)

Your workflow file should:
- Build and push to Docker Hub ✅ (you already have this)
- Redeploy on Railway ❌ (replace the SSH deploy part)

See Part 8 for the exact code changes.

### Step 2: Fix the dockerfile for the Web3Forms key

Your `dockerfile` builder section needs these lines so the contact form works:

```dockerfile
ARG VITE_WEB3FORMS_KEY
ENV VITE_WEB3FORMS_KEY=$VITE_WEB3FORMS_KEY
```

Add them **before** `RUN npm run build` in the builder stage.

### Step 3: Push your code to GitHub

```bash
git add .
git commit -m "Set up Railway deployment"
git push origin main
```

### Step 4: Watch GitHub Actions

1. Go to your repo on GitHub
2. Click the **Actions** tab
3. You should see a workflow running
4. Wait until both jobs show green checkmarks ✅

If something fails, click the failed step and read the error message.

### Step 5: First deploy on Railway (one time)

1. Go to Railway dashboard
2. Open your Docker Image service
3. Click **Deploy** (or **Redeploy**)
4. Wait until status says **Success**

### Step 6: Open your website

1. Copy your Railway domain (from Networking settings)
2. Paste it in your browser
3. Check that pages load
4. Test the contact form if you use it

### Step 7: Future updates (easy!)

Every time you change code:

```bash
git add .
git commit -m "Update my portfolio"
git push origin main
```

GitHub Actions + Railway will update your live site automatically. You don't need to do anything else.

---

## Part 8: Workflow Changes for Railway

Replace the **deploy** job in `.github/workflows/docker-deploy-server.yml`.

**Remove this** (old VPS/SSH deploy):
- SSH to a server
- `docker pull` on the server
- `docker run` on the server

**Add this** (Railway deploy):

```yaml
  deploy:
    name: Deploy to Railway
    runs-on: ubuntu-latest
    needs: build-and-push

    steps:
      - name: Install Railway CLI
        run: npm install -g @railway/cli

      - name: Redeploy on Railway
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
        run: railway redeploy --service YOUR_SERVICE_NAME --yes
```

Change `YOUR_SERVICE_NAME` to the real name shown in Railway (example: `portfolio`).

Also add `build-args` to the Docker build step so Web3Forms works:

```yaml
      - name: Build and push image
        uses: docker/build-push-action@v5
        with:
          context: .
          file: ./dockerfile
          push: true
          build-args: |
            VITE_WEB3FORMS_KEY=${{ secrets.VITE_WEB3FORMS_KEY }}
          tags: |
            ${{ secrets.DOCKER_IMAGE }}:latest
            ${{ secrets.DOCKER_IMAGE }}:${{ github.sha }}
```

---

## Part 9: Easier Option (No GitHub Actions Robot)

If all of this feels like too much, Railway can build directly from GitHub:

1. Railway → **New Project** → **Deploy from GitHub repo**
2. Pick your portfolio repo
3. Railway finds your `dockerfile` and builds it
4. Add `VITE_WEB3FORMS_KEY` in Railway → **Variables**
5. Click **Generate Domain**

**Pros:** Fewer secrets, simpler setup  
**Cons:** You don't use your custom GitHub Actions workflow

Good for learning. Use the Docker Hub + Actions way when you want full control.

---

## Part 10: Troubleshooting (When Something Goes Wrong)

### "Contact form key not configured"
- Add `VITE_WEB3FORMS_KEY` to GitHub secrets
- Add `ARG` and `ENV` lines to `dockerfile`
- Add `build-args` in the workflow
- Push again and redeploy

### GitHub Actions fails at "Login to Docker Hub"
- Check `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN`
- Make sure the token has read/write permission

### GitHub Actions fails at "Build and push image"
- Make sure `DOCKER_IMAGE` is correct (example: `johndoe/portfolio`)
- Do not add `:latest` in the secret

### Railway shows error or blank page
- Open Railway → your service → **Deployments** → click latest → read **Logs**
- Make sure you deployed at least once after the image was pushed to Docker Hub

### `railway redeploy` fails in GitHub Actions
- Check `RAILWAY_TOKEN` is correct and not expired
- Check service name matches Railway exactly
- Do one manual deploy on Railway first

### Site works locally but not on Railway
- Local: you used `http://localhost:8080`
- Railway: uses its own domain and handles port 80 inside the container
- Check Railway deployment logs, not just your computer

---

## Quick Checklist (Print This)

```
□ Docker Desktop installed (for local testing)
□ Docker Hub repo created
□ Docker Hub token saved
□ Railway account created
□ Railway project + Docker Image service created
□ Railway domain generated
□ Railway token saved
□ GitHub secrets added (5 secrets)
□ dockerfile updated with VITE_WEB3FORMS_KEY
□ workflow updated for Railway redeploy
□ Code pushed to main
□ GitHub Actions passed (green)
□ Railway deployment succeeded
□ Website opens in browser
```

---

## Summary in One Paragraph

You build your React portfolio into a Docker image (a ready-to-run package). GitHub Actions automatically builds that image and uploads it to Docker Hub whenever you push to `main`. Railway then pulls that image and runs it on the internet, giving you a public link like `https://your-app.up.railway.app`. You store passwords (tokens and keys) as GitHub Secrets so the robot can log in safely. After the first setup, updating your live site is as simple as pushing new code to GitHub.

---

## Helpful Links

- Docker Hub: https://hub.docker.com
- Railway: https://railway.app
- Web3Forms: https://web3forms.com
- GitHub Actions docs: https://docs.github.com/en/actions

Good luck with your deployment! 🚀
