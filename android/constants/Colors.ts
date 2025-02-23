export const Colors = {
  chestnut: {
    '0': '#ffffff',
    '50': '#fafaf6',
    '100': '#f7efde',
    '200': '#edd9bb',
    '300': '#d6b48b',
    '400': '#bb8a5d',
    '500': '#9f693b',
    '600': '#834f28',
    '700': '#643b21',
    '800': '#452919',
    '900': '#2c1a11',
    '950': '#1a0f0a',
  },
  olive: {
    '0': '#ffffff',
    '50': '#f9f9f6',
    '100': '#f2efe4',
    '200': '#e2dcc7',
    '300': '#c0ba98',
    '400': '#94936a',
    '500': '#767346',
    '600': '#5f5932',
    '700': '#4a4328',
    '800': '#332e1e',
    '900': '#211d15',
    '950': '#13100b',
  },
  patina: {
    '50': '#f6f8f6',
    '100': '#eaefee',
    '200': '#d0dedb',
    '300': '#a4beb7',
    '400': '#6e998d',
    '500': '#537a69',
    '600': '#44604f',
    '700': '#37493e',
    '800': '#27322d',
    '900': '#19201f',
  },
  botticelli: {
    '50': '#f5f8f7',
    '100': '#e5eff2',
    '200': '#c7dfe4',
    '300': '#99bfc5',
    '400': '#619ba0',
    '500': '#497c7e',
    '600': '#3c6263',
    '700': '#314a4d',
    '800': '#233337',
    '900': '#162025',
  },
  sea: {
    '50': '#f6f8f8',
    '100': '#e8eff4',
    '200': '#cddde9',
    '300': '#a2bcce',
    '400': '#7096ae',
    '500': '#577690',
    '600': '#475b74',
    '700': '#39455a',
    '800': '#28303f',
    '900': '#191e29',
  },
  cyan: {
    '50': '#f7f9f8',
    '100': '#e9eff6',
    '200': '#d1dbed',
    '300': '#a9b9d7',
    '400': '#7e92bb',
    '500': '#6471a1',
    '600': '#525686',
    '700': '#404167',
    '800': '#2c2d48',
    '900': '#1b1c2e',
  },
  blue: {
    '50': '#f8f9f9',
    '100': '#edeff6',
    '200': '#d9d9ed',
    '300': '#b6b5d6',
    '400': '#918ebb',
    '500': '#766ca2',
    '600': '#615086',
    '700': '#4a3c67',
    '800': '#342a47',
    '900': '#1f1b2c',
  },
  gray: {
    '50': '#f9f9f9',
    '100': '#f0eff4',
    '200': '#ded8e9',
    '300': '#beb4cf',
    '400': '#9d8cb0',
    '500': '#826a94',
    '600': '#6a4e77',
    '700': '#513b5b',
    '800': '#38293f',
    '900': '#221a27',
  },
  beaver: {
    '50': '#fafaf8',
    '100': '#f4efee',
    '200': '#e7d8dd',
    '300': '#cdb2b9',
    '400': '#b18992',
    '500': '#966770',
    '600': '#7b4c54',
    '700': '#5e3940',
    '800': '#41282d',
    '900': '#28191c',
  },
  almond: {
    '50': '#fafaf7',
    '100': '#f6efe6',
    '200': '#edd8cb',
    '300': '#d6b29f',
    '400': '#be8773',
    '500': '#a3664f',
    '600': '#874b38',
    '700': '#67392c',
    '800': '#47271f',
    '900': '#2d1914',
  },
}

export const AppColors = {
  primary: Colors.chestnut,
  secondary: Colors.olive,
}

/**
  * Convert hex color to rgb color.
  * @param {string} hex - Hex color in format #RRGGBB
  * @returns {string} - RGB color in format R G B
  *
  */
export function hexToRgb(hex: string): string {
  const hexCode = hex.replace('#', '')
  const r = parseInt(hexCode.substring(0, 2), 16)
  const g = parseInt(hexCode.substring(2, 4), 16)
  const b = parseInt(hexCode.substring(4, 6), 16)

  return `${r} ${g} ${b}`
}
