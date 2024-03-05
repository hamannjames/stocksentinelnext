'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function TransactionFilters() {
    const searchParams = useSearchParams();
    const pathname = usePathname()
    const {replace, push} = useRouter()

    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() - 60)

    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0]
    }

    const handleChage = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams)

        if (event.target.value) {
            params.set(event.target.getAttribute('name') as string, event.target.value)
        } else {
            params.delete(event.target.getAttribute('name') as string)
        }

        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="flex gap-4">
            <label htmlFor="start">Start Date</label>
            <input type="date" name="start" defaultValue={searchParams.get('start')?.toString() || formatDate(defaultDate)} onChange={handleChage} />
            <label htmlFor="end">End Date</label>
            <input type="date" name="end" defaultValue={searchParams.get('end')?.toString()} onChange={handleChage} />
            <label htmlFor="party">Party</label>
            <select name="party" defaultValue={searchParams.get('party')?.toString()} onChange={handleChage}>
                <option value="">All</option>
                <option value="D">Democrat</option>
                <option value="R">Republican</option>
                <option value="I">Independent</option>
            </select>
        </div>
    )
}