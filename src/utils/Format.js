class Format {
    constructor() {}

    formatCPF(cpf) {
        if (!cpf) return '';
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    formatAltura(altura) {
        if (!altura) return '';
        return altura.replace(/(\d)(\d{2})$/, '$1,$2');
    }

    formatPeso(peso) {
        if (!peso) return '';
        const pesoNum = parseFloat(peso);
        if (isNaN(pesoNum)) return '';
        return `${Math.floor(pesoNum)}`;
    }
}

export default Format;