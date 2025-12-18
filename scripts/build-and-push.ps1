param(
  [string]$Repository = "",
  [string]$Tag = "latest"
)

$ErrorActionPreference = 'Stop'

function Require-Docker {
  try {
    docker version > $null 2>&1
  } catch {
    Write-Host "Docker CLI not found or Docker Desktop not running." -ForegroundColor Red
    Write-Host "Start Docker Desktop, then re-run this script." -ForegroundColor Yellow
    exit 1
  }
}

Require-Docker

# Build images
Write-Host "Building frontend image (mean-frontend:$Tag)..." -ForegroundColor Cyan
docker build -t mean-frontend:$Tag -f frontend/Dockerfile frontend

Write-Host "Building backend image (mean-backend:$Tag)..." -ForegroundColor Cyan
docker build -t mean-backend:$Tag -f backend/dockerfile backend

if ($Repository -and $Repository.Trim() -ne "") {
  $frontendTag = "$Repository/mean-frontend:$Tag"
  $backendTag = "$Repository/mean-backend:$Tag"

  Write-Host "Tagging images for repository $Repository..." -ForegroundColor Cyan
  docker tag mean-frontend:$Tag $frontendTag
  docker tag mean-backend:$Tag $backendTag

  Write-Host "Pushing $frontendTag" -ForegroundColor Cyan
  docker push $frontendTag

  Write-Host "Pushing $backendTag" -ForegroundColor Cyan
  docker push $backendTag

  Write-Host "Done. Pushed to $Repository with tag $Tag" -ForegroundColor Green
} else {
  Write-Host "Repository not provided. Built local images: mean-frontend:$Tag, mean-backend:$Tag" -ForegroundColor Yellow
  Write-Host "To push, run: docker tag/push with your Docker Hub repo (e.g., 'youruser')." -ForegroundColor Yellow
}
