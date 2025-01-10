const isIntegerString = (value: string): boolean => {
  return /^-?\d+$/.test(value);
}

export default isIntegerString