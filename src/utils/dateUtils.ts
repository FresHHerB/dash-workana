export const parseRelativeTime = (relativeTime: string): Date => {
  const now = new Date();
  const timeString = relativeTime.toLowerCase();

  // Português
  if (timeString.includes('hora')) {
    const hours = parseInt(timeString.match(/\d+/)?.[0] || '1');
    return new Date(now.getTime() - hours * 60 * 60 * 1000);
  }

  if (timeString.includes('dia')) {
    const days = parseInt(timeString.match(/\d+/)?.[0] || '1');
    return new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  }

  if (timeString.includes('ontem')) {
    return new Date(now.getTime() - 24 * 60 * 60 * 1000);
  }

  if (timeString.includes('há') && timeString.includes('hora')) {
    return new Date(now.getTime() - 50 * 60 * 1000);
  }
  
  // Inglês (manter compatibilidade)
  if (timeString.includes('hour')) {
    const hours = parseInt(timeString.match(/\d+/)?.[0] || '1');
    return new Date(now.getTime() - hours * 60 * 60 * 1000);
  }

  if (timeString.includes('day')) {
    const days = parseInt(timeString.match(/\d+/)?.[0] || '1');
    return new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  }

  if (timeString.includes('yesterday')) {
    return new Date(now.getTime() - 24 * 60 * 60 * 1000);
  }

  return now;
};

export const formatBudget = (budget: string): string => {
  return budget
    .replace('USD', '$')
    .replace('Less than', '<')
    .replace('Over', '>')
    .replace('Menos de', '<')
    .replace('Mais de', '>');
};

export const truncateText = (text: string, maxLength: number): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};