export PROJECT=donesince
export ENVIRONMENT ?= development
export SERVICE ?= server
export PORT ?= 11000
export CLIENT_PORT ?= 11001

export GIT_SHA=$(shell git rev-parse --short=5 HEAD)

export POSTGRES_USER=${PROJECT}
export POSTGRES_PASSWORD=l@s3r
export POSTGRES_DB=${PROJECT}_${ENVIRONMENT}

export HOST ?= dev.wips.link
export SERVER_URL ?= http://server:3000
export CLIENT_URL ?= http://${HOST}:${PORT}

export DOCKER_BASE=registry.digitalocean.com/benbergstein/${PROJECT}
SERVICE_IMAGE=${DOCKER_BASE}/${SERVICE}/${ENVIRONMENT}
DOCKER_TAG ?= latest

define DOCKER_COMPOSE
docker-compose -f ./docker-compose.${ENVIRONMENT}.yml --project-directory .. -p ${PROJECT}_${ENVIRONMENT}
endef

define DOCKER_RUN
${DOCKER_COMPOSE} run --rm
endef

define DOCKER_EXEC
${DOCKER_COMPOSE} exec
endef

define BUILD_ARGS
endef

all:
	SERVICE=server make build tag push
	SERVICE=client make build tag push

include ${SERVICE}.mk

release: ENVIRONMENT=production
release: CLIENT_URL=http://server.donesince.k8s.wips.link
release: SERVER_URL=http://donesince-server-production-lb.default.svc.cluster.local
release: all

build:
	docker build ../${SERVICE} ${BUILD_ARGS} \
		-f ./Dockerfile.${SERVICE} \
		-t ${SERVICE_IMAGE}:${DOCKER_TAG}

tag:
	docker tag ${SERVICE_IMAGE}:${DOCKER_TAG} ${SERVICE_IMAGE}:${GIT_SHA}

push:
	docker push ${SERVICE_IMAGE}:${DOCKER_TAG}
	docker push ${SERVICE_IMAGE}:${GIT_SHA}

start:
	${DOCKER_COMPOSE} up -d

logs:
	${DOCKER_COMPOSE} logs -f ${SERVICE}

stop:
	${DOCKER_COMPOSE} down --remove-orphans

console:
	${DOCKER_RUN} --entrypoint /bin/bash ${SERVICE}

attach:
	${DOCKER_COMPOSE} exec ${SERVICE} /bin/bash

# psql:
# 	psql -h localhost -U ${POSTGRES_USER} ${POSTGRES_DB}

package.json:
	${DOCKER_RUN} --entrypoint cat ${SERVICE} package.json > ../${SERVICE}/package.json

backup:
	cd ../server && zip -r ../backup.zip data
