#!/bin/bash
# Instala as dependencias
npm install

# Constrói o projeto
npm run build

# Abre um navegador para o projeto
xdg-open http://localhost:4173/cadastro-insumos-medicos-front/

# Inicia o servidor de desenvolvimento
npm run preview
