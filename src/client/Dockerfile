FROM node:23-slim

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie apenas os arquivos necessários para instalar as dependências
COPY package.json package-lock.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Execute o build do projeto
RUN npm run build

# Exponha a porta 3000
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]