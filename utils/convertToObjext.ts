/* export function convertToSerializableObject<T>(doc: T): T {
  return JSON.parse(
    JSON.stringify(doc, (key, value) => {
      if (value) {
        if (value instanceof Date) return value.toISOString();
        if (typeof value === "object" && value.toJSON && value.toString)
          return value.toString();
      }
      return value;
    })
  );
} */

import { ObjectId } from "mongodb";

export function convertToSerializableObject<T>(doc: T): any {
  if (doc === null || doc === undefined) return doc;
  if (doc instanceof Date) return doc.toISOString();
  if (doc instanceof ObjectId) return doc.toString();
  if (typeof doc !== "object") return doc;

  if (Array.isArray(doc)) {
    return doc.map((item) => convertToSerializableObject(item));
  }

  const result: any = {};
  for (const [key, value] of Object.entries(doc)) {
    result[key] = convertToSerializableObject(value);
  }
  return result;
}
