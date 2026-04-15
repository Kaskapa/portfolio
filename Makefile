.PHONY: dev prod down clean

# Standard dev mode (Base + Override)
dev:
	sudo docker-compose up --build

# Production mode (Base + Prod, ignores Override)
prod:
	sudo docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d

# Stop everything
down:
	sudo docker-compose down

# Wipe volumes and containers (The 'Nuclear' reset)
clean:
	sudo docker-compose down -v
	sudo rm -rf .next node_modules
