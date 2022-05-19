const { Client } = require('linkedin-private-api');
const express = require('express');
const app = express();

const config = require('./config.json');

const puppeteer = require('puppeteer');
const LINKEDIN_USER='client_email';
const LINKEDIN_PWD='password';
let comments = ['Great post!', 'Great!', 'Awesome', 'Nice'];
const email=LINKEDIN_USER;
const password=LINKEDIN_PWD
/**
 *
 * Enable Cookies
 *
 * **/


function sessionCookies(email, password) {
    return makeReqLoginGET()
        .then(cookies => makeReqLoginPOST(email, password, cookies));
}    function makeReqLoginGET() {
    const reqConfig = {
        headers: {...constants.headers.loginGET},
        responseType: 'text',
    };
    return utils.fetchCookies(constants.urls.login, 'get', reqConfig);
}

function makeReqLoginPOST(email, password, cookies) {
    const csrfParam = utils.trim(cookies.bcookie, '"').split('&')[1];

    const auth = querystring.stringify({
        'session_key': email,
        'session_password': password,
        'isJsEnabled': 'false',
        'loginCsrfParam': csrfParam,
    });

    const headers = {
        ...constants.headers.loginSubmitPOST,
        cookie: utils.stringifyCookies(cookies),
    };

    const reqConfig = {
        headers,
        maxRedirects: 0,
        validateStatus: validateStatusForURLRedirection,
        data: auth,
        responseType: 'text',
    };

    return utils.fetchCookies(constants.urls.loginSubmit, 'post', reqConfig)
        .then(cookieUpdates => ({...cookies, ...cookieUpdates}));
}

function validateStatusForURLRedirection(status) {
    return status >= 200 && (status < 300 || status === 302);
}



(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    /***
     *
     * Authenticate user
     *
     * */
    await page.goto("https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin");
    await page.type('#username', LINKEDIN_USER)
    await page.type('#password', LINKEDIN_PWD)
    await page.click('.login__form_action_container')



    /**
     *
     * Navigate to the posts section
     *
     * */

    await page.waitForNavigation();

        var i=0;
        while(i<config.URLSNum){
            await page.goto(config.URLs[i] + '/recent-activity/shares/',{waitUntil: "networkidle2"});

                    try {
                        await page.click('span[class="reactions-react-button feed-shared-social-action-bar__action-button"] ');
                        await page.waitForTimeout(5000);
                        await page.type('div[aria-label="Text editor for creating content"]',comments[Math.floor(Math.random()*comments.length)]);
                      //  await page.click('button[class="comments-comment-box__submit-button mt3 artdeco-button artdeco-button--1 artdeco-button--primary ember-view"]');  //statement commented to avoid commenting on posts while testing
                        await page.waitForTimeout(15000);
                    } catch (e){
                        console.log("user has no posts")
                   }




            i++;
        }

    await browser.close();


})();

module.exports = {
    sessionCookies,
};