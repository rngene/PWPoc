import { rest } from 'msw'
import GetCountriesResult from '../models/getCountriesResult'

export const handlers = [
  rest.post('http://countries.trevorblades.com/graphql', (_req, res, ctx) => {
    return res(
      ctx.body('{"data":{"countries":[{"name":"test country","code":"AA"}]}}')
  )}),
  // rest.post('https://countries.trevorblades.com/graphql', (_req, res, ctx) => {
  //   return res(
  //     ctx.body('{"data":{"country":{"name":"test country","capital":"test capital","currency":"test currency","__typename":"Country"}}}')
  // )}),  
]
