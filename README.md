<div align="center">


## Gollery

**A photo gallery application built with Go**


[![GitHub issues](https://img.shields.io/github/issues/LIYINGZHEN/gollery.svg)](https://github.com/LIYINGZHEN/gollery/issues)
[![Build Status](https://cloud.drone.io/api/badges/LIYINGZHEN/gollery/status.svg)](https://cloud.drone.io/LIYINGZHEN/gollery)
[![Go Report Card](https://goreportcard.com/badge/github.com/LIYINGZHEN/gollery)](https://goreportcard.com/report/github.com/LIYINGZHEN/gollery)
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
$ git clone https://github.com/LIYINGZHEN/gollery
$ cd gollery
$ docker-compose -f docker-compose-dev.yml up
```

visit http://localhost:3000

**Production**

1. Create the acme.json file.

```
$ cd gollery
$ touch acme.json
$ chmod 600 acme.json
```

2. Open `traefik.toml` file, replace `domain` and `email` with yours.

3. Open `docker-compose.yml` and replace `gollery.cc` with your domain.

4. Run the app.

```
$ docker-compose up -d
```

5. visit https://your-domain.com


## Screenshots

![1](https://user-images.githubusercontent.com/11765228/54899236-733bb380-4ecf-11e9-8ffc-072cb072bdd2.png)
![3](https://user-images.githubusercontent.com/11765228/54899240-73d44a00-4ecf-11e9-9892-2622a61ee2aa.png)
![4](https://user-images.githubusercontent.com/11765228/54899242-73d44a00-4ecf-11e9-86d2-3bc1b65deaf9.png)

## Roadmap

- [x] Make https work. (Traefik)
- [x] Persist data. (Docker Volume)
- [x] Make CI/CD work. (Drone)
