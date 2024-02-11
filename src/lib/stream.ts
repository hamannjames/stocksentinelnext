import { Collection } from "mongodb";
import { Query } from "./queryBuilder";

function iteratorToStream(iterator: any) {
    return new ReadableStream({
      async pull(controller) {
        const { value, done } = await iterator.next()
   
        if (done) {
          controller.close()
        } else {
          controller.enqueue(value)
        }
      },
    })
}

async function* fetchPages({collection, query}: {collection: Collection, query: Query}) {
    let page = 0;
    let pageSize = 100;
    let count = pageSize;
    
    while (page < count) {
        const items = collection.aggregate([
            {
                $facet: {
                    metadata: [{ $count: 'total' }],
                    data: [
                        { $skip: (page) },
                        { $limit: pageSize },
                        { $match: query}
                    ]
                }
            }
        ]) as any;

        yield items;
        page += pageSize;
        count = parseInt(items.metadata.total)
    }
}

export default async function stream({collection, query}: {collection: Collection, query: Query}) {
    const iterator = fetchPages({collection, query});
    const stream = iteratorToStream(iterator);

    return new Response(stream)
}