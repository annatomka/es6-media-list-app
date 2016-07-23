export function list(items, templateFn) {
    if (items && templateFn) {
        const result = items.map((item) => templateFn(item));
        return result.join('');
    }
    return '';
}
