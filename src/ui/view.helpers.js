export function list(items, templateFn) {
    if (items && templateFn) {
        const result = items.map((item) => {
            return templateFn(item);
        });
        return result.join('');
    }
    return '';
}
