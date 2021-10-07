import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import fetch from 'node-fetch'
import { AppError } from '../definition/common';

type Method = "GET" 

type FetchOption = {
  method: Method,
  body?: any,
  headers?: any,
}

export async function jsonFetch<R = any>(endpoint: string, options: FetchOption, cls: ClassConstructor<R> = null): Promise<[R?, AppError?]> {
  let res = null;
  try {
    res = await fetch(endpoint, options);
  } catch (e) {
    const message = e.code === 'ENOTFOUND' ? `${endpoint} could not be found` : e.message
    return [null, { message }]
  }
  const text = await res.text()

  let json = null;
  try {
    json = JSON.parse(text);
  } catch (e) {
    return [null, { message: `Failed to parse ${text}` }]
  }

  if(!cls) return [json, null]

  const object = plainToClass(cls, json, { excludeExtraneousValues: true });
  const objectValidateErr = await validate(object as any);

  if(objectValidateErr.length > 0) {
    console.debug("Failed to validate response", JSON.stringify(object))
    return [null, { message: JSON.stringify(objectValidateErr.map((v) => ({ value: v.value, message: v.constraints }))) }]
  }

  return [object, null]
}