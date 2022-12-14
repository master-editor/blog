---
all:
  hosts:
    caap01t:
  children:
    sandbox:
      automation-servers:
        caap02t:
          http_port: 303
          maxRequestsPerChild: 909
        caap03t:
          http_port: 303
          maxRequestsPerChild: 909
        caap04t:
          http_port: 303
      app-servers:
        caap05t:
          http_port: 303
          env: dev
        caap06t:
          http_port: 303
          env: staging
        caap07:
          http_port: 303
          env: prod          
        caap08t:
          http_port: 303
          env: test