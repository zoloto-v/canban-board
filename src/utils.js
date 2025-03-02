export const trimText = (str, max = 50) => {
  if (typeof str !== 'string') return ''

  return (str.length > max)
    ? str.slice(0, max) + '...'
    : str
}
