'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function TransactionDateFilter() {
    const searchParams = useSearchParams();
    const pathname = usePathname()
    const {replace} = useRouter()

    const handleChage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams)


        if (event.target.value) {
            params.set('start', event.target.value)
        } else {
            params.delete('start')
        }

        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div>
            <input type="date" name="start" value={searchParams.get('start') || undefined} onChange={handleChage} />
        </div>
    )
}