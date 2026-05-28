# Hosted Images

Plataforma fullstack para publicação de imagens, integração com banco de dados e visualização dinâmica de conteúdo.  
- **Backend e banco de dados:** Railway  
- **Frontend:** [Vercel - hosted-images.vercel.app](https://hosted-images.vercel.app)

---

## 🌐 Demonstração

- [Acesse o frontend em produção](https://hosted-images.vercel.app)

---

## 📦 Tecnologias Utilizadas

- **Backend:** Node.js, NestJS, Prisma ORM, PostgreSQL  
- **Frontend:** React, Vite, TailwindCSS  
- **Hospedagem:** [Railway](https://railway.app/) (API & DB), [Vercel](https://vercel.com/) (Frontend)  
- **Outros:** TypeScript, Cloudinary (uploads de imagem)

---

## 🚀 Como rodar o projeto localmente

1. **Clone o repositório**

   ```bash
   git clone https://github.com/MaironLima/Hosted-Images.git
   ```

2. **Configure as variáveis de ambiente**

   - No backend, copie `.env.example` para `.env` e defina suas credenciais Railway e Cloudinary.

3. **Instale as dependências**

   ```bash
   # Backend
   cd back-end
   npm install

   # Frontend
   cd ../front-end
   npm install
   ```

4. **Rode as migrações no banco de dados**

   ```bash
   cd ../back-end
   npx prisma migrate dev
   ```

5. **Inicie o backend**

   ```bash
   npm run start:dev
   ```

6. **Inicie o frontend**

   ```bash
   cd ../front-end
   npm run dev
   ```

---

## 🏗️ Deploy

- **Backend + Database:**  
  - Configure um projeto Railway, conecte o repositório e defina as variáveis de ambiente.
  - Railway cria e conecta automaticamente o banco PostgreSQL ao backend.

- **Frontend:**  
  - Faça deploy da pasta `front-end` diretamente na Vercel.
  - Configure as variáveis de ambiente necessárias, como a URL da API.

- **Ver produção:**  
  https://hosted-images.vercel.app

---

## ⚙️ Funcionalidades Principais

- Cadastro e autenticação de usuários
- Upload e visualização de imagens
- Publicação de postagens
- Integração backend-frontend
- Banco de dados PostgreSQL (Railway)
- Deploy contínuo (Railway e Vercel)

---

## 📸 Screenshots

> Adicione aqui prints das principais telas do sistema.

---

## 🤝 Contribuindo

1. Faça um fork
2. Crie uma branch (`git checkout -b feature/nome`)
3. Commite suas alterações (`git commit -m 'feat: descrição da feature'`)
4. Envie para o repositório (`git push origin feature/nome`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

- [Mairon Lima](https://github.com/MaironLima)
