# Linkedin Automation Bot
Auto like and comment on posts of a few given companies in Linkedin. The 
automated script will run on the LinkedIn website login with credentials, navigate 
to each URL from the given config file and then like and comment on the latest 
post. The script is written in NodeJS and uses Puppeteer, the popular browser 
automation library, based on Node.js, which provides a high-level API over the 
Chrome DevTools Protocol.

## How to use 
```bash
$ npm install 
$ npm install puppeteer
$ npm npm start
```

## Environment variable
LINKEDIN_USERNAME: your mail address or phone number of your Linkedin 
account
LINKEDIN_PASSWORD: your password of your Linkedin account
The client only needs to provide values for these variables.
