export const getTemperatureColor = (temperatura: number): string => {
  if (temperatura <= 25) return 'from-blue-600 to-blue-800'; // ❄️ Frio
  if (temperatura <= 45) return 'from-cyan-600 to-cyan-800'; // 🌡️ Morno baixo
  if (temperatura <= 60) return 'from-yellow-600 to-yellow-800'; // 🔥 Morno
  if (temperatura <= 75) return 'from-orange-600 to-orange-800'; // 🔥🔥 Entre morno e quente
  if (temperatura <= 85) return 'from-red-600 to-red-800'; // 🔥🔥🔥 Quente
  return 'from-purple-500 to-purple-700'; // 🚀 On fire
};

export const getTemperatureBorder = (temperatura: number): string => {
  if (temperatura <= 25) return 'border-blue-500'; 
  if (temperatura <= 45) return 'border-cyan-500';
  if (temperatura <= 60) return 'border-yellow-500';
  if (temperatura <= 75) return 'border-orange-500';
  if (temperatura <= 85) return 'border-red-500';
  return 'border-purple-400';
};

export const getTemperatureLabel = (temperatura: number): string => {
  if (temperatura <= 25) return '❄️ Frio';
  if (temperatura <= 45) return '🌡️ Morno baixo';
  if (temperatura <= 60) return '🔥 Morno';
  if (temperatura <= 75) return '🔥🔥 Entre morno e quente';
  if (temperatura <= 85) return '🔥🔥🔥 Quente';
  return '🚀 On fire';
};

export const getTemperatureDescription = (temperatura: number): string => {
  if (temperatura <= 25) return 'Baixa viabilidade';
  if (temperatura <= 45) return 'Viabilidade limitada';
  if (temperatura <= 60) return 'Viabilidade moderada';
  if (temperatura <= 75) return 'Boa viabilidade';
  if (temperatura <= 85) return 'Alta viabilidade';
  return 'Excelente viabilidade';
};