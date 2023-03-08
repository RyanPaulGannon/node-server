import { CosmosClient } from '@azure/cosmos'

const endpoint = process.env.AZURE_COSMOS_DATABASE_URL!
const key = process.env.AZURE_PRIMARY_KEY_COSMOS!
const client = new CosmosClient({ endpoint, key })

export async function connect() {
  const { database } = await client.databases.createIfNotExists({
    id: 'Test',
  })
  console.log(database.id)

  const { container } = await database.containers.createIfNotExists({
    id: 'Practice',
  })
  console.log(container.id)

  await container.item('1').read()

  const { resources } = await container.items
    .query('SELECT * from c')
    .fetchAll()
  for (const restaurant of resources) {
    console.log(`${restaurant.name} is a ${restaurant.cuisine} place`)
  }

  console.log(resources)
}
