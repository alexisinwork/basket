export const calculateNumber = (num: number): number => {
  if (num) {
    if (num < 10) return num+1
    return num
  }

  return 1
}