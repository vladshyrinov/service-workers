if('serviceWorker' in navigator) {
    console.log('SW supported');
    window.addEventListener('load', () => {
        navigator.serviceWorker
        .register('../sw_cached_site.js')
        .then((reg) => console.log("SW registered: ", reg))
        .catch(error => console.log(error))
    })
}