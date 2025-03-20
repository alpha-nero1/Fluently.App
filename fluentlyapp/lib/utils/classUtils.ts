export const loadInstanceVariables = <TInstance>(instance: TInstance, opts: Partial<TInstance>) => {
    if (!opts) return;
    Object.keys(opts).forEach(key => {
        const typedKey = key as keyof TInstance;
        if (typeof opts[typedKey] !== 'undefined') {
            instance[typedKey] = opts[typedKey];
        }
    })
}