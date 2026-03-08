import {
  CreateSnippet,
  Snippet,
  UpdateSnippet,
} from "../interfaces/snippetInterfaces";
import axios from "@/node_modules/axios/index";

const BASE_URL =
  process.env.URL || "http://localhost:3000";

type GetSnippetsParams = {
  search?: string;
  tags?: string;
  page?: number;
  limit?: number;
};

const buildQuery = (params: GetSnippetsParams) => {
  const searchParams = new URLSearchParams();

  if (params.search) searchParams.set("search", params.search);
  if (params.tags) searchParams.set("tags", params.tags);
  if (params.page) searchParams.set("page", String(params.page));
  if (params.limit) searchParams.set("limit", String(params.limit));

  return searchParams.toString();
};

export const getSnippets = async (params: GetSnippetsParams = {}) => {
  const query = buildQuery(params);
  const url =`${BASE_URL}/snippet${query ? `?${query}` : ""}`
  console.log(url, 'url');
  const res = await axios
    .get(url)
      if (!res.data) {
        throw new Error("Не вдалося завантажити snippets");
      }
      return res.data;
};

export const getSnippetById = async (id: string): Promise<Snippet> => {
  const res = await axios(`${BASE_URL}/snippet/${id}`)
    if (!res.data) {
      throw new Error("Не вдалося завантажити snippet");
    }
    return res.data;
  

};

export const createSnippet = async (data: CreateSnippet): Promise<Snippet> => {
  const res = await axios.post(`${BASE_URL}/snippet`, data);
  if (!res.data) {
    const error = await res.data.catch(() => null);
    throw new Error(error?.message || "Не вдалося створити snippet");
  }
  return res.data;
};

export const updateSnippet = async (
  id: string,
  data: UpdateSnippet
): Promise<Snippet> => {
  const res = await axios.patch(`${BASE_URL}/snippet/${id}`, data);
  if (!res.data) {
    const error = await res.data.catch(() => null);
    throw new Error(error?.message || "Не вдалося оновити snippet");
  }
  return res.data;
};
