export function AutoBind(_, __, descriptor) {
    const original_method = descriptor.value;
    const mod_descriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = original_method.bind(this);
            return boundFn;
        },
    };
    return mod_descriptor;
}
//# sourceMappingURL=autobind.js.map