default:
    echo 'Hello, world!'

start-dev:
    bun run ./packages/cli/gyoza.ts dev --config=./app.config.ts --port=3000 --mode=development --hostname=0.0.0.0

start-docs:
    bun run --cwd=./docs dev