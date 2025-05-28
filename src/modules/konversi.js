
export function konversiStok(jumlahPcs, isiPerDus) {
    const totalPcs = parseInt(jumlahPcs);
    const isiDus = parseInt(isiPerDus);

    // Validasi input
    if (isNaN(totalPcs) || isNaN(isiDus) || isiDus <= 0) {
        return { dus: 0, pcs: 0 };
    }

    const dus = Math.floor(totalPcs / isiDus);
    const pcs = totalPcs % isiDus;

    return { dus, pcs };
}

export function formatStok(jumlahPcs, isiPerDus, satuanB = 'dus', satuanK = 'pcs', emptyLabel = 'Stok habis') {
    const { dus, pcs } = konversiStok(jumlahPcs, isiPerDus);
    const parts = [];
    if (dus > 0) parts.push(`${dus} ${satuanB}`);
    if (pcs > 0) parts.push(`${pcs} ${satuanK}`);

    return parts.length ? parts.join(' + ') : `${emptyLabel}`;
}