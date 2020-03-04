module.exports = {
  cloud_name: 'nho',
  presets: {
    default: {
      fallbackWidth: 800,
      minWidth: 360,
      maxWidth: 1600,
      sizes: '(min-width: 66rem) 60rem, 90vw',
      attributes: {
        loading: 'lazy'
      }
    },
    onehalf: {
      fallbackWidth: 400,
      minWidth: 180,
      maxWidth: 800,
      sizes: '(min-width: 66rem) 30rem, (min-width: 40rem) 45vw, 90vw',
      classes: ['onehalf']
    },
    onethird: {
      fallbackWidth: 300,
      minWidth: 120,
      maxWidth: 560,
      sizes: '(min-width: 66rem) 20rem, 30vw',
      classes: ['onethird', 'right']
    },
    poster: {
      fallbackWidth: 200,
      minWidth: 100,
      maxWidth: 400,
      sizes: '(min-width: 66rem) 20rem, 30vw',
      classes: ['poster', 'right']
    }
  }
}
