#!/usr/bin/env bash

npm install --prefix .node corepack
.node/node_modules/.bin/corepack enable --install-directory .node
.node/yarn install
.node/yarn run build "${@}"
