import { CosmosClient } from '@azure/cosmos'

const endpoint = process.env.AZURE_COSMOS_DATABASE_URL!
const key = process.env.AZURE_PRIMARY_KEY_COSMOS!
const client = new CosmosClient({ endpoint, key })

const databaseName = 'YourWesthoughtonFood'
const containerName = 'Restaurants'

export async function connect() {
  const database = client.database(databaseName)

  const container = database.container(containerName)

  await container.item('1').read()

  const { resources } = await container.items
    .query('SELECT * from c')
    .fetchAll()
  for (const restaurant of resources) {
    console.log(`${restaurant.name} is a ${restaurant.cuisine} place`)
  }

  console.log(resources)
}
