export const isPDF = (type: File['type']): boolean => {
  if (type === "application/pdf") {
      return true
  } else {
      return false
  }
}