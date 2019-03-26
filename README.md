<div align="center">


## Gollery

**A photo gallery application built with Go**


[![GitHub issues](https://img.shields.io/github/issues/LIYINGZHEN/gollery.svg)](https://github.com/LIYINGZHEN/gollery/issues)
[![GitHub license](https://img.shields.io/github/license/LIYINGZHEN/gollery.svg)](https://github.com/LIYINGZHEN/gollery)


```text

  ___   __   __    __    ____  ____  _  _
 / __) /  \ (  )  (  )  (  __)(  _ \( \/ )
( (_ \(  O )/ (_/\/ (_/\ ) _)  )   / )  /
 \___/ \__/ \____/\____/(____)(__\_)(__/



🚀 A PHOTO GALLERY 🚀

```
</div>
<br>

## How to start

**Local Development**

```
cd $GOPATH/src
git clone https://github.com/LIYINGZHEN/gollery
cd gollery
docker-compose -f docker-compose-dev.yml up
```

visit http://localhost:3000

**Production**

Under Construction

```
$ touch acme.json
$ chmod 600 /opt/traefik/acme.json
```

## Screenshots

![1](https://user-images.githubusercontent.com/11765228/54899236-733bb380-4ecf-11e9-8ffc-072cb072bdd2.png)
![3](https://user-images.githubusercontent.com/11765228/54899240-73d44a00-4ecf-11e9-9892-2622a61ee2aa.png)
![4](https://user-images.githubusercontent.com/11765228/54899242-73d44a00-4ecf-11e9-86d2-3bc1b65deaf9.png)

## Roadmap

- [x] Make https work. (Traefik)
- [ ] Persist data. (Docker Volume)
- [ ] Make CI/CD work. (Drone)
