async function initMocks() {
  if (typeof window === 'undefined') {
    const { server } = await import('./server')
    server.listen()
  } else {
    const { worker } = await import('./browser')
    worker.start({
      onUnhandledRequest(req, print) {
        console.log(req.text());
        // if (req.url.host.startsWith('https')) {
        //   return 
        // }
      }
    })
  }
}

initMocks()

export {}
