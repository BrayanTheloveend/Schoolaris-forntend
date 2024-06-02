import { extendTheme } from '@chakra-ui/react'


export const primaryLight = '#56aceb' 
//'#A020F0' 
export const primaryDark = '#007dfe' 
export const background = '#007dfe' 
export const colorBase = '#56aceb' 
export const Maincolor =  'green'
export const vert =  '#60c94c'
export const rvb = '72 187 120' 
export const listIcon = [
  "easel-outline", "duplicate-outline", "folder-outline", "laptop-outline", "map-outline", "extension-puzzle-outline",
  "file-tray-full-outline", "hardware-chip-outline", "megaphone-outline", "pie-chart-outline"
]

export const containerVariant={
  hidden: {
    opacity: 0,
    x: '100vw',
    transition: {
      when: "afterChildren"
    }
  },
  visible: {
      opacity: 1,
      x: 0,
      transition: {
        ease: 'linear',
        delay: 0.3,
        when: "beforeChildren", staggerChildren: 0.2
      }
  }
}

export const formatter = new Intl.NumberFormat('FR-es', {
  style: 'currency',
  currency: 'XAF',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});


const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

const theme = extendTheme({
  config,
  fonts: {
    heading: `Poppins, sans-serif`,
    body: `Poppins, sans-serif`,
  },


})




export default theme