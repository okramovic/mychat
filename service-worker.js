const shellName = "markoschat_v0.0.11",
     shellFiles = [
  "/index.html",
  "/dist/52e6306f9e66fd5a4b1fc7a3c41213b5.css",
  "/dist/e6abc6390b18e55608b4011e95c4e1e9.js"
]

self.addEventListener('install', e =>{
     console.log('[ServiceWorker] Install');

     e.waitUntil(
               caches.open(shellName)
               .then(cache => {
                    //console.log('[ServiceWorker] installation: Caching app shell', cache);
                    //return cache.addAll(shellFiles);
               })
               .then(()=>{
                    //console.log('[install] All required resources have been cached');
                    return self.skipWaiting();
               })
     );
});
self.addEventListener('activate', e =>{

     console.log('Cache newest version:', shellName);

     // deleting old caches
     e.waitUntil(
          caches.keys().then( cacheNames =>{
               return Promise.all(
                    cacheNames.map( cacheName => {
                              //console.log("activate: cache filtering:", cacheName);
                         
                              if (cacheName !== shellName) {
                                   console.log('deleting cache:', cacheName)
                                   return caches.delete(cacheName);
                              }
                    })
               );
          })
     );
})


self.addEventListener('push', e =>{
    console.log('push event', e.data.text(), e )
    const pushMsg = JSON.parse( e.data.text() )
    console.log('pushMsg',pushMsg, typeof pushMsg)
  
    //console.log('e.clientId', e.clientId, clients)
  
    // filter notifs here
    
    e.waitUntil(clients.matchAll({
        type: "window"
    })
    .then(clientList =>{
        console.log('clientList', clientList)
        if (clientList.length==0) return;

        //if (clientList[0].focused == true) return console.log('client is focused, no push notif')

        clientList[0].postMessage({
            msg: JSON.stringify({
                get:[ "userName", "lastRoom"],
                fromRoomName: pushMsg.room,
                fromUser: pushMsg.from
            }),
            url: 'https://snapdrop.glitch.me'  //e.request.url
        });
      
    }))

    // show notif  
    /*e.waitUntil(
        self.registration.showNotification('test push notif', {body: `it works, mom ${e.data.text()}`})
            .then(() => { // here you may want to send some feedback to your API, e.g. update notification status 
            })
            .catch((er) => { console.error('push msg error', er) })
    );*/
})

self.addEventListener('message', e =>{
    console.log("SW Received Message: " + e.data);
  
    const msg = JSON.parse(e.data)
    
    console.log(msg.userName, msg.fromUser, msg.fromRoomName, msg.lastRoom)
    console.log(msg.userName !== msg.fromUser, msg.fromRoomName!== msg.lastRoom)
  
  //  if (msg.userName !== msg.fromUser && msg.fromRoomName!== msg.lastRoom )
    if (msg.userName !== msg.fromUser)
      e.waitUntil(
          self.registration.showNotification(`room: ${msg.fromRoomName}`, {body: `${msg.fromUser} wrote something`})
      )
})
//  https://developers.google.com/web/fundamentals/codelabs/push-notifications/


self.addEventListener('fetch', e =>{

    //console.log('sw', e.request.url)
  
    if (e.request.url.match('^.*(\/api\/|\/socket.io\/|\/public\/).*$')) {
        //console.log('API request', e.request.url)
        return false
      
    } else {
      // not API request
    }
  
    /*e.respondWith(
               fromNetwork(e.request.url, 400)
               .catch(() => fromCache(e.request))
     );
  
  
    function fromNetwork(request, timeout) {
          return new Promise((resolve, reject)=>{

               const timeoutId = setTimeout(reject, timeout);
                
               fetch(request)
               .then(response => {
                    clearTimeout(timeoutId);
                    resolve(response);
               }, reject);
          });
     }
  
    function fromCache(request) {
          return caches.open(shellName)
               .then( cache =>{
                    return cache.match(request)
                              .then(matching => {
                                   return matching || Promise.reject('no-match');
                              });
          });
     }   */  
});