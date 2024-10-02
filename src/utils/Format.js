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

    formatTime(timeValue){
        if (!timeValue) return '';
  
        if (typeof timeValue === 'string') {
          return timeValue; 
        }
      
        if (timeValue.HH && timeValue.mm) {
          const hours = timeValue.HH.padStart(2, '0');
          const minutes = timeValue.mm.padStart(2, '0');
          return `${hours}:${minutes}`;
        }
        
        return '';
    }
}

export default Format;