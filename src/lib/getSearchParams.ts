import { cache } from "react";

const storeParams = (searchParams: Record<string, string>): any => {
    return searchParams;
}

const getSearchParams = cache(storeParams);

export default getSearchParams;