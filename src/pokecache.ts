type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>()
    #reapIntervalId: NodeJS.Timeout | undefined = undefined
    #interval: number

    constructor(interval : number) {
        this.#interval = interval
        this.#startReapLoop();
    }
    add<T>(key: string, val: T ): void {
        this.#cache.set(key, {createdAt: Date.now() , val})
    }

    get<T>(key: string): T | undefined {
        const entry = this.#cache.get(key)
        return entry ? (entry.val as T ): undefined
    }

    #reap(): void {
        const now = Date.now()
        for (const [key, entry] of this.#cache.entries()) {
            if (entry.createdAt < now - this.#interval){
                this.#cache.delete(key)
            }
        }
    }

    #startReapLoop(): void{
        if (this.#reapIntervalId) return
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval)
    }


    stopReapLoop(): void {
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId)
            this.#reapIntervalId = undefined
        }
    }
}

