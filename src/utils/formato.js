// Formatea un número como soles peruanos: 69.9 → "S/ 69.90"
export const soles = (monto) => `S/ ${Number(monto).toFixed(2)}`
