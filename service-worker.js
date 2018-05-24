const shellName = "markoschat_v0.0.04",
     shellFiles = [
  "/index.html"
 // "/dist/52e6306f9e66fd5a4b1fc7a3c41213b5.css",
 // "/dist/e6abc6390b18e55608b4011e95c4e1e9.js"
]

/* update test 4 */

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
    
    const pushMsg = JSON.parse( e.data.text() )
    //console.log('pushMsg',pushMsg)
  
    
    e.waitUntil(
        clients.matchAll({
            type: "window"
        })
        .then(clientList =>{
            //console.log('clientList', clientList)
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

        })
    )

    // https://developers.google.com/web/fundamentals/push-notifications/display-a-notification
    // show notif  
    /*e.waitUntil(
        self.registration.showNotification('test push notif', {body: `it works, mom ${e.data.text()}`})
            .then(() => { // here you may want to send some feedback to your API, e.g. update notification status 
            })
            .catch((er) => { console.error('push msg error', er) })
    );*/
})

self.addEventListener('message', e =>{
    //console.log("SW Received Message: " + e.data);
  
    const msg = JSON.parse(e.data)  // or e.data.json()
    
    //console.log('notif', e)
    console.log(msg.userName, msg.fromUser, msg.fromRoomName, msg.lastRoom)
    console.log(msg.userName !== msg.fromUser, msg.fromRoomName!== msg.lastRoom)
  
  //  if (msg.userName !== msg.fromUser && msg.fromRoomName!== msg.lastRoom )
    if (msg.userName !== msg.fromUser){
      const options = {  //`room: ${msg.fromRoomName}`, 
                      //body: `${msg.fromUser} wrote something`,
                      icon: 'https://cdn.glitch.com/a2eec912-3cca-419e-908b-6e26f3a8dee3%2Fhand128.png?1526414438634',
                      badge: 'https://cdn.glitch.com/a2eec912-3cca-419e-908b-6e26f3a8dee3%2FM1.png?1526421180346',
                      sound: 'https://cdn.glitch.com/a2eec912-3cca-419e-908b-6e26f3a8dee3%2Fwoodblock_cool.mp3?1526420551633',
                      actions: [
                        { action: 'open',
                          title: 'Show me'
                        },{ action: 'close',
                          title: 'Come on..'
                        }
                      ]
      }
      /*if ('actions' in Notification.prototype) 
          options.actions = [
                        { action: 'act 1',
                          title: 'title 1'
                        },
                        { action: 'act 2',
                          title: 'title 2'
                        }
                      ]*/
      e.waitUntil(
          self.registration.showNotification( `${msg.fromUser} wrote in ${msg.fromRoomName}`, options)
    ) //  https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
    }
})
//  https://developers.google.com/web/fundamentals/codelabs/push-notifications/
//  https://developers.google.com/web/fundamentals/push-notifications/display-a-notification



// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/onnotificationclick
// double notif display?  https://stackoverflow.com/questions/31108699/chrome-push-notification-this-site-has-been-updated-in-the-background


self.onnotificationclick = function(e) {
    console.log('On notification click: ', e.notification);
  
    if (e.action && e.action=='close') {
      console.log('Action!', e.action, e.action=='close')
      //if (e.action=='open')
      //if (e.action=='close') 
        return e.notification.close()
  
      
    } else e.waitUntil(clients.matchAll({
        type: "window"
    })
    .then(clientList =>{
      //console.log('clickedNotification', e.notification )
      for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i]
          console.log('client',client)

          if (client.url == 'https://snapdrop.glitch.me/' && 'focus' in client){
            console.log('yep condition /')
            client.focus()
            return e.notification.close()
            
          } else console.log('nope condition /')
      }
      if (clients.openWindow) return clients.openWindow('/')
      
      else return null
    }))
  
  function openClient(){
  }
  
  /*
  const clickedNotification = event.notification;
  clickedNotification.close();
  */
}



self.addEventListener('fetch', e =>{

    //console.log('sw', e.request.url)
  
    if (e.request.url.match('^.*(\/api\/|\/socket.io\/|\/public\/).*$')) {
        //console.log('API request', e.request.url)
        return false
      
    } else {
      // not API request
    
      //console.log('not api', e.request.url)
      
      /*e.respondWith(
                 fromNetwork(e.request.url, 1000)
                 //.catch(() => fromCache(e.request))
      );*/


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
       } 
      
    }
});