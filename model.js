const model = {};

model.dataModel = (id, tglTerbang, hargaTiket, maskapai, tujuan, asalPenerbangan, jamBerangkat, jamSampai, transit) => {
    return {
        "id": id,
        "tgl_terbang": tglTerbang,
        "maskapai": maskapai,
        "harga_tiket": hargaTiket,
        "tujuan": tujuan,
        "asal_penerbangan": asalPenerbangan,
        "jam_berangkat": jamBerangkat,
        "jam_sampai": jamSampai,
        "transit": transit
    }
}

module.exports = model;