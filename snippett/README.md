# Snippet API

REST API для збереження та управління код-сніпетами.
Проєкт написаний на **NestJS** з використанням **MongoDB (Mongoose)**.

---

# Технології

* NestJS
* MongoDB
* Mongoose
* TypeScript
* class-validator
* class-transformer
* Jest

---

# Встановлення

```bash
git clone <repo>
cd snippett
npm install
```

---

# Env example
DB = "mongodb+srv://username:password@cluster0.iphvysy.mongodb.net/"


# Запуск

### dev режим

```bash
npm run start:dev
```

### production

```bash
npm run build
npm run start:prod
```

---

# API

## Отримати всі сніпети (з пагінацією)

```
GET /snippets?page=1&limit=5
```

Response

```json
{
  "items": [],
  "total": 20,
  "page": 1,
  "limit": 10,
  "totalPages": 2
}
```

---

## Отримати сніпет по id

```
GET /snippets/:id
```

---

## Створити сніпет

```
POST /snippets
```

Body

```json
{
  "title": "NestJS Pagination",
  "content": "const page = query.page ?? 1",
  "tags": ["#nestjs", "#pagination"],
  "type": "code"
}
```

---

## Оновити сніпет

```
PATCH /snippets/:id
```

---


# Структура Snippet

```ts
{
  title: string
  content: string
  tags: string[]
  type: string
  createdAt: Date
  updatedAt: Date
}
```

---

# Pagination

API підтримує пагінацію через query параметри.

```
?page=1
?limit=5
```

Приклад:

```
GET /snippets?page=2&limit=5
```

---

# Database

MongoDB використовується як база даних через **Mongoose**.

Snippet schema включає:

* title
* content
* tags
* type
* createdAt
* updatedAt

Для швидкого пошуку можна використовувати **text index**:

```ts
SnippetSchema.index({ title: 'text', content: 'text' });
```

---

# Scripts

```bash
npm run start
npm run start:dev
npm run build
npm run lint
npm run test
npm run test:cov
```

---

# License

UNLICENSED
