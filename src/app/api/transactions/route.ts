import { getClient } from "@/lib/client";
import queryBuilder from "@/lib/queryBuilder";
import stream from "@/lib/stream";
import { EstimatedDocumentCountOptions } from "mongodb";

export async function GET(request: Request) {
    const client = await getClient();
    const { searchParams } = new URL(request.url)

    console.log(searchParams);

    const query = queryBuilder(searchParams);

    const count = await client.db('stocksentinel').collection('transactions').estimatedDocumentCount(query as EstimatedDocumentCountOptions);

    if (count > 100) {
        return Response.json({count});
    }

    return stream({collection: client.db('stocksentinel').collection('transactions'), query});
}