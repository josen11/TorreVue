module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  //Nice https://www.youtube.com/watch?v=hbcnZ_GokBA
  devServer: {
    //proxy: 'http://localhost:4000'
    proxy: 'https://bio.torre.co/',
  }
}
