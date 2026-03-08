# Snippet Frontend

Frontend частина застосунку для роботи зі **сніпетами коду**.
Проєкт побудований на **Next.js + React** та взаємодіє з **NestJS API**.

---

# Технології

* Next.js
* React
* TypeScript
* Axios
* TailwindCSS
* ESLint

---

# Встановлення

```bash
git clone <repo>
cd spinet-front
npm install
```

---
# Env example
URL = "http://localhost:3000"
# Запуск

### development

```bash
npm run dev
```

додаток буде доступний:

```
http://localhost:3000
```

---

### production

```bash
npm run build
npm run start
```

---

# Структура проєкту

```
app/
components/
services/
types/
styles/
```

### app

Next.js сторінки

### components

React компоненти

### services

API запити до backend

### types

TypeScript типи

---

# API інтеграція

Frontend працює з **Snippet API** через **Axios**.

Приклад запиту:

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const getSnippets = async (page = 1) => {
  const res = await api.get(`/snippets?page=${page}`);
  return res.data;
};
```

---

# Snippet структура

```ts
type Snippet = {
  id: string
  title: string
  content: string
  tags: string[]
  type: string
  createdAt: Date
  updatedAt: Date
}
```

---

# Основні можливості

* перегляд списку сніпетів
* пагінація
* створення сніпета
* редагування
* видалення
* перегляд деталей

---

# Scripts

```bash
npm run dev
npm run build
npm run start
```

---

# Стилі

У проєкті використовується **TailwindCSS** для стилізації.

Приклад:

```html
<div className="p-4 border rounded-lg shadow">
  Snippet
</div>
```

---

---

# License

Private
