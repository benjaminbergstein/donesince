db-init:
	${DOCKER_RUN} server prisma init

db-migrate:
	${DOCKER_EXEC} -T server yarn prisma migrate save --name ${MIGRATION} --experimental

db-up:
	${DOCKER_RUN} server prisma migrate up --experimental

db-client-generate:
	${DOCKER_RUN} server prisma generate

pgpass:
	echo "db:5432:${POSTGRES_DB}:${POSTGRES_USER}:${POSTGRES_PASSWORD}" > ~/.pgpass
	chmod 600 ~/.pgpass

psql-%:
	${DOCKER_RUN} db psql -h db -U ${POSTGRES_USER} ${POSTGRES_DB} < $*.sql

psql:
	${DOCKER_RUN} db psql -h db -U ${POSTGRES_USER} ${POSTGRES_DB}

types.d.ts:
	docker cp zap_development_server_1:/app/node_modules/@prisma/client/index.d.ts ../types.d.ts
