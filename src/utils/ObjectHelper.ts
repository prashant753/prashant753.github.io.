import { Serializer, Deserializer, CacheKey } from 'json-object-mapper';

export const isOfType = (type: string, val: any): boolean => {
  return (val.constructor && val.constructor.name.toLowerCase() === type.toLowerCase());
};
