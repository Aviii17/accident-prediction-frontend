import type { NextApiRequest, NextApiResponse } from 'next'
import csv from 'csv-parser'
import fs from 'fs'
import path from 'path'
import { cache } from '../../config/cache'

const csvImport = async () => {
  try {
    const list: Array<any> = []
    const filePath = path.resolve('./public', 'data.csv')

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => list.push(data))
        .on('error', reject)
        .on('end', async () => {
          await Promise.all(list)
          resolve(list)
        })
    })
    const santized = JSON.parse(JSON.stringify(list).replace(/"\s+|\s+"/g, '"'))
    const result = santized.map((item: any, i: number) => {
      return {
        _id: `accident_no_${i}`,
        time: item.time || null,
        date: item.date || null,
        latitude: item.latitude || null,
        longitude: item.longitude || null,
        weather_condition: item.weather_condition || null,
        light_condition: item.light_condition || null,
        visibility: item.visibility || null,
        causes: item.causes || null,
      }
    })
    cache.set('accident_list', JSON.stringify(result))

    console.log('Successfully imported csv data')
    return result
  } catch (err) {
    console.log(err)
    return null
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    let data
    const cacheData = (await cache.get('accident_list')) as any
    if (!cacheData || cacheData.length === 0) {
      console.log('not cached')

      data = await csvImport()
    } else {
      console.log('cached')
      data = JSON.parse(cacheData)
    }
    res.status(200).json(data)
  } catch (err: any) {
    res.status(400).json((err && err.message) || 'Something went wrong!')
  }
}
