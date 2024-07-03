export function ehNumeroValido(param: any): boolean {
    return typeof param === 'number' && !Number.isNaN(param);
}