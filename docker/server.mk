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
	docker ${PROJECT}_development_server_1:/app/node_modules/.prisma/client/index.d.ts ../types.d.ts

reset-db:
	${DOCKER_COMPOSE} up -d db
	${DOCKER_RUN} db dropdb -h db -U ${POSTGRES_USER} ${POSTGRES_DB}
	${DOCKER_RUN} db createdb -h db -U ${POSTGRES_USER} ${POSTGRES_DB}

fetch-dump:
	s3cmd --force get s3://donesince/dumps/latest.sql ../docker/production.sql

restore-db:
	${DOCKER_COMPOSE} up -d db
	${MAKE} fetch-dump reset-db psql-production
	${DOCKER_COMPOSE} down --remove-orphans

job-%:
	${DOCKER_RUN} server ts-node jobs/$*.ts
