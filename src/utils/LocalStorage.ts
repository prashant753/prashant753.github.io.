async function set<T>(key: string, data: T): Promise<void> {
   localStorage.setItem(key, JSON.stringify(data));
}

async function get<T>(key: string): Promise<T | null> {
  const value: string | null = await localStorage.getItem(key);
  if (!value) {
    return null;
  }

  const data: T = JSON.parse(value) as T;
  return data;
}

async function clear<T>(key: string): Promise<void> {
   localStorage.removeItem(key);
}

export const LocalStorage = {
  get,
  set,
  clear,
};
