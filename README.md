# ConectaDev Project

![ConectaDev Banner](https://raw.githubusercontent.com/MaironLima/ConectaDev-project/main/front-end/public/banner.png)

## 🚀 Sobre o Projeto
O **ConectaDev Project** é uma plataforma completa para conectar desenvolvedores, compartilhar conhecimento, publicar posts e visualizar documentos em PDF. O projeto utiliza uma arquitetura moderna com backend em NestJS, banco de dados gerenciado via Prisma e frontend em React + Vite + TailwindCSS.

---

## 📂 Estrutura do Projeto

```
conecta-dev-project/
  ├── src/           # Backend NestJS
  ├── prisma/        # Migrations e schema do Prisma
  ├── generated/     # Código gerado pelo Prisma
  ├── libs/          # Bibliotecas compartilhadas
  ├── front-end/     # Frontend React + Vite
  └── ...            # Outros arquivos e configs
```

---

## 🛠️ Tecnologias Utilizadas

- **Backend:** [NestJS](https://nestjs.com/), [Prisma ORM](https://www.prisma.io/)
- **Frontend:** [React](https://react.dev/), [Vite](https://vitejs.dev/), [TailwindCSS](https://tailwindcss.com/)
- **Banco de Dados:** PostgreSQL
- **Outros:** Cloudinary (upload de imagens), ESLint, TypeScript

---

## ⚙️ Como Rodar o Projeto

### 1. Clone o repositório
```bash
git clone https://github.com/MaironLima/ConectaDev-project.git
cd ConectaDev-project
```

### 2. Configure as variáveis de ambiente
Copie o arquivo `.env.example` para `.env` e preencha com suas credenciais.

### 3. Instale as dependências
```bash
# Backend
cd back-end && npm install
# Frontend
cd front-end && npm install
```

### 4. Rode as migrations do banco
```bash
npx prisma migrate dev
```

### 5. Inicie o backend
```bash
cd front-end 
npm run dev
```

### 6. Inicie o frontend
```bash
cd front-end
npm run dev
```

---

## 📄 Documentação
- **API:** Documentação gerada automaticamente via Swagger (acessar `/api` quando o backend estiver rodando)
- **Prisma:** [Documentação oficial](https://www.prisma.io/docs/)

---

## 💡 Funcionalidades
- Cadastro e autenticação de usuários
- Upload e visualização de imagens (Cloudinary)
- Publicação e listagem de posts
- Visualização de PDFs
- Integração frontend-backend

---

## 🖼️ Screenshots
> Adicione aqui prints do sistema em funcionamento para ilustrar as principais telas.

---

## 🤝 Contribuição
1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nome-feature`)
3. Commit suas alterações (`git commit -m 'feat: minha nova feature'`)
4. Push para a branch (`git push origin feature/nome-feature`)
5. Abra um Pull Request

---

## 📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor
- [Mairon Lima](https://github.com/MaironLima)

---

## ⭐ Agradecimentos
- A todos os colaboradores e à comunidade open source!
