
<div class="ht-20 w-100p bg-primary">
    <!-- ngIf: phoneType == 'iphone' --><img src="../../stylesheets/assets/iphone-status-bar-white.png" width="320" ng-if="phoneType == 'iphone'" class="ng-scope"><!-- end ngIf: phoneType == 'iphone' -->
    <!-- ngIf: phoneType == 'htc' -->
</div>
<section class="sg-phone--header ht-44 clear">
    <header class="bg-primary ht-44 ng-isolate-scope" role="group">
        <ul class="fl man pan list-horizontal ht-44">
            <li class="pos-rel fl ht-44">
                <a href="javascript:void(0)" title="Navigation" class="phm ht-44 pam">
                    <span class="icon-utility-rows active--icon-1 text-color-5"></span>
                    <span class="tha">Navigation</span>
                </a>
            </li>
        </ul>
        <ul class="fr man pan list-horizontal ht-44">
            <li class="pos-rel fl ht-44">
                <a href="javascript:void(0)" title="Search" class="phm ht-44 pam">
        <span class="icon-utility-search active--icon-1 text-color-5">
        </span>
                    <span class="tha">Search</span>
                </a>
            </li>
            <li class="pos-rel fl ht-44">
                <a href="javascript:void(0)" title="Notifications" class="phm ht-44 pam">
        <span class="icon-utility-notification active--icon-1 text-color-5 notifications" data-notification-count="">
        </span>
                    <span class="tha"> Notifications</span>
                </a>
            </li>
        </ul>
    </header>
</section>
<section class="sg-phone--content clear">
<div ng-transclude="">

<section class="sg-phone--content scrollable bg-2 clear ng-scope">
<header class="bg-4 tc ptl phm ng-isolate-scope" title="James Bakersfield" description="CEO | Trinidad Corp. | (635) 519-3762" icon="contact">
    <div class="icon icon--contact bgs-100 sq-48 brm"></div>
    <h1 class="f-20 text-color-5 man ng-binding">
        James Bakersfield
    </h1>
    <h2 class="f5 text-color-7 man pbm ng-binding">
        CEO | Trinidad Corp. | (635) 519-3762
    </h2>
</header>
<div>
    <section class="dt w-100p bg-2 prm plm">
        <a href="javascript:void(0)" class="dtc a-mid size-1of2 ht-44 tc" ng-click="recordHomeFeed()">
            <span class="fw-semibold f6 caps text-color-2" ng-class="{'text-color-1': recordHomePage1, 'text-color-2': !recordHomePage1}">About</span>
        </a>
        <a href="javascript:void(0)" class="dtc a-mid size-1of2 ht-44 tc" ng-click="recordHomeDetails()">
            <span class="fw-semibold f6 caps text-color-1" ng-class="{'text-color-1': recordHomePage2, 'text-color-2': !recordHomePage2}">Feed</span>
        </a>
    </section>
    <section id="currentTab" class="pos-rel dt w-100p bg-2 prm plm border-bottom border--2">
        <article class="current bg-primary size-1of2 pos2" ng-class="{'pos1': recordHomePage1,'pos2': recordHomePage2,'pos3': recordHomePage3}"></article>
    </section>
</div>
<div class="sg-carouselof3 sg-show-page-2" ng-class="{&quot;sg-show-page-1&quot;: recordHomePage1, &quot;sg-show-page-2&quot;: recordHomePage2, &quot;sg-show-page-3&quot;: recordHomePage3}">
<div class="sg-carousel-page sg-page-1">
    <article class="mam bg-1 brm ng-isolate-scope" timestamp="28 minutes ago" likes="2 likes" comments="4 comments" body="Feedback from everyone else is welcome also! Please let me know what you think. I am desperate for your approval and appreciation. Shower me with love and affection. Fishing for compliments here." actor="Jenny Hancock" actorimage="http://placekitten.com/45/45">
        <div class="flag pam">
            <div class="flag--image prm">
                <img src="https://s3.amazonaws.com/uifaces/faces/twitter/gt/128.jpg" width="45" height="45" alt="gt" class="brm">
            </div>
            <div class="flag--body">
                <a href="javascript:void(0)" name="actor" title="Jenny Hancock" class="fw-semibold f3 db ng-binding">
                    Jenny Hancock
                </a>
                <time class="db f6 text-color-2 ng-binding" datetime="2013-11-13">
                    28 minutes ago
                </time>
            </div>
        </div>
        <p class="phm mtn fw-normal f4 text-color-1 ng-binding">
            Feedback from everyone else is welcome also! Please let me know what you think. I am desperate for your approval and appreciation. Shower me with love and affection. Fishing for compliments here.
        </p>
        <div ng-transclude=""></div>
        <footer class="clear pvm mhm border-top border--3">
            <a href="javascript:void(0)" name="like" title="Liked" class="f5 fl">
                <span class="dib mrs icon-utility-like f4"></span>
                Liked
            </a>
            <span class="f5 fr mlm ng-binding">4 comments</span>
            <span class="f5 fr ng-binding">2 likes</span>
        </footer>
    </article>
    <article class="mam bg-1 brm ng-isolate-scope">
        <div class="flag pam">
            <div class="flag--image prm">
                <img src="https://s3.amazonaws.com/uifaces/faces/twitter/gt/128.jpg" width="45" height="45" alt="gt" class="brm">
            </div>
            <div class="flag--body">
                <a href="javascript:void(0)" name="actor" title="Geoff Teehan" class="fw-semibold f3 db">
                    Geoff Teehan
                </a>
                <time class="db f6 text-color-2" datetime="2013-11-13">29 minutes ago</time>
            </div>
        </div>
        <p class="phm mtn fw-normal f4 text-color-1">
            Feedback from everyone else is welcome also! Please let me know what you think. I am desperate for your approval and appreciation. Shower me with love and affection. Fishing for compliments here.
        </p>
        <article class="mhm brm mbm bg-3 pam">
            <div class="flag">
                <div class="flag--image prm">
                    <img src="../../stylesheets/assets/icons/doctype/excel.svg" class="ht-30" alt="excel">
                </div>
                <div class="flag--body">
                    <span class="f4 text-color-1 db">photo.pdf</span>
                    <span class="db f5 text-color-2">1.2 MB</span>
                </div>
            </div>
        </article>
        <footer class="clear pvm mhm border-top border--3">
            <a href="javascript:void(0)" name="like" title="Like" class="f5 fl">
                <span class="text-color-2 dib mrs icon-utility-like f4"></span>
                <span class="text-color-2">Like</span>
            </a>
            <span class="f5 fr mlm">5 comments</span>
            <span class="f5 fr">3 likes</span>
        </footer>
    </article>
    <article class="mam bg-1 brm ng-isolate-scope" timestamp="28 minutes ago" likes="2 likes" comments="4 comments" body="Feedback from everyone else is welcome also! Please let me know what you think. I am desperate for your approval and appreciation. Shower me with love and affection. Fishing for compliments here." actor="Jenny Hancock" actorimage="http://placekitten.com/45/45">
        <div class="flag pam">
            <div class="flag--image prm">
                <img src="https://s3.amazonaws.com/uifaces/faces/twitter/gt/128.jpg" width="45" height="45" alt="gt" class="brm">
            </div>
            <div class="flag--body">
                <a href="javascript:void(0)" name="actor" title="Jenny Hancock" class="fw-semibold f3 db ng-binding">
                    Jenny Hancock
                </a>
                <time class="db f6 text-color-2 ng-binding" datetime="2013-11-13">
                    28 minutes ago
                </time>
            </div>
        </div>
        <p class="phm mtn fw-normal f4 text-color-1 ng-binding">
            Feedback from everyone else is welcome also! Please let me know what you think. I am desperate for your approval and appreciation. Shower me with love and affection. Fishing for compliments here.
        </p>
        <div ng-transclude=""></div>
        <footer class="clear pvm mhm border-top border--3">
            <a href="javascript:void(0)" name="like" title="Liked" class="f5 fl">
                <span class="dib mrs icon-utility-like f4"></span>
                Liked
            </a>
            <span class="f5 fr mlm ng-binding">4 comments</span>
            <span class="f5 fr ng-binding">2 likes</span>
        </footer>
    </article>
    <article class="mam bg-1 brm ng-isolate-scope">
        <div class="flag pam">
            <div class="flag--image prm">
                <img src="https://s3.amazonaws.com/uifaces/faces/twitter/gt/128.jpg" width="45" height="45" alt="gt" class="brm">
            </div>
            <div class="flag--body">
                <a href="javascript:void(0)" name="actor" title="Geoff Teehan" class="fw-semibold f3 db">
                    Geoff Teehan
                </a>
                <time class="db f6 text-color-2" datetime="2013-11-13">29 minutes ago</time>
            </div>
        </div>
        <p class="phm mtn fw-normal f4 text-color-1">
            Feedback from everyone else is welcome also! Please let me know what you think. I am desperate for your approval and appreciation. Shower me with love and affection. Fishing for compliments here.
        </p>
        <article class="mhm brm mbm bg-3 pam">
            <div class="flag">
                <div class="flag--image prm">
                    <img src="../../stylesheets/assets/icons/doctype/excel.svg" class="ht-30" alt="excel">
                </div>
                <div class="flag--body">
                    <span class="f4 text-color-1 db">photo.pdf</span>
                    <span class="db f5 text-color-2">1.2 MB</span>
                </div>
            </div>
        </article>
        <footer class="clear pvm mhm border-top border--3">
            <a href="javascript:void(0)" name="like" title="Like" class="f5 fl">
                <span class="text-color-2 dib mrs icon-utility-like f4"></span>
                <span class="text-color-2">Like</span>
            </a>
            <span class="f5 fr mlm">5 comments</span>
            <span class="f5 fr">3 likes</span>
        </footer>
    </article>
</div>
<div class="sg-carousel-page sg-page-2">
    <ul class="list-plain man pan ng-isolate-scope">
        <li class="active--list-2">
    <span class="db mhm pvm border-bottom border--2">
      <span class="db text-color-2 f6">Title 1</span>
      <span class="db text-color-1 f4">List Item</span>
    </span>
        </li>
        <li class="active--list-2">
    <span class="db mhm pvm border-bottom border--2">
      <span class="db text-color-2 f6">Title 2</span>
      <span class="db text-color-1 f4">List Item</span>
    </span>
        </li>
        <li class="active--list-2">
    <span class="db mhm pvm border-bottom border--2">
      <span class="db text-color-2 f6">Title 3</span>
      <span class="db text-color-1 f4">List Item</span>
    </span>
        </li>
        <li class="active--list-2">
    <span class="db mhm pvm border-bottom border--2">
      <span class="db text-color-2 f6">Title 4</span>
      <span class="db text-color-1 f4">List Item</span>
    </span>
        </li>
    </ul>
    <ul class="list-plain man pan ng-isolate-scope">
        <li class="active--list-2">
    <span class="db mhm pvm border-bottom border--2">
      <span class="db text-color-2 f6">Title 1</span>
      <span class="db text-color-1 f4">List Item</span>
    </span>
        </li>
        <li class="active--list-2">
    <span class="db mhm pvm border-bottom border--2">
      <span class="db text-color-2 f6">Title 2</span>
      <span class="db text-color-1 f4">List Item</span>
    </span>
        </li>
        <li class="active--list-2">
    <span class="db mhm pvm border-bottom border--2">
      <span class="db text-color-2 f6">Title 3</span>
      <span class="db text-color-1 f4">List Item</span>
    </span>
        </li>
        <li class="active--list-2">
    <span class="db mhm pvm border-bottom border--2">
      <span class="db text-color-2 f6">Title 4</span>
      <span class="db text-color-1 f4">List Item</span>
    </span>
        </li>
    </ul>
    <ul class="list-plain man pan ng-isolate-scope">
        <li class="active--list-2">
    <span class="db mhm pvm border-bottom border--2">
      <span class="db text-color-2 f6">Title 1</span>
      <span class="db text-color-1 f4">List Item</span>
    </span>
        </li>
        <li class="active--list-2">
    <span class="db mhm pvm border-bottom border--2">
      <span class="db text-color-2 f6">Title 2</span>
      <span class="db text-color-1 f4">List Item</span>
    </span>
        </li>
        <li class="active--list-2">
    <span class="db mhm pvm border-bottom border--2">
      <span class="db text-color-2 f6">Title 3</span>
      <span class="db text-color-1 f4">List Item</span>
    </span>
        </li>
        <li class="active--list-2">
    <span class="db mhm pvm border-bottom border--2">
      <span class="db text-color-2 f6">Title 4</span>
      <span class="db text-color-1 f4">List Item</span>
    </span>
        </li>
    </ul>
    <ul class="list-plain man pan ng-isolate-scope">
        <li class="active--list-2">
    <span class="db mhm pvm border-bottom border--2">
      <span class="db text-color-2 f6">Title 1</span>
      <span class="db text-color-1 f4">List Item</span>
    </span>
        </li>
        <li class="active--list-2">
    <span class="db mhm pvm border-bottom border--2">
      <span class="db text-color-2 f6">Title 2</span>
      <span class="db text-color-1 f4">List Item</span>
    </span>
        </li>
        <li class="active--list-2">
    <span class="db mhm pvm border-bottom border--2">
      <span class="db text-color-2 f6">Title 3</span>
      <span class="db text-color-1 f4">List Item</span>
    </span>
        </li>
        <li class="active--list-2">
    <span class="db mhm pvm border-bottom border--2">
      <span class="db text-color-2 f6">Title 4</span>
      <span class="db text-color-1 f4">List Item</span>
    </span>
        </li>
    </ul>
    <ul class="list-plain man pan ng-isolate-scope">
        <li class="active--list-2">
    <span class="db mhm pvm border-bottom border--2">
      <span class="db text-color-2 f6">Title 1</span>
      <span class="db text-color-1 f4">List Item</span>
    </span>
        </li>
        <li class="active--list-2">
    <span class="db mhm pvm border-bottom border--2">
      <span class="db text-color-2 f6">Title 2</span>
      <span class="db text-color-1 f4">List Item</span>
    </span>
        </li>
        <li class="active--list-2">
    <span class="db mhm pvm border-bottom border--2">
      <span class="db text-color-2 f6">Title 3</span>
      <span class="db text-color-1 f4">List Item</span>
    </span>
        </li>
        <li class="active--list-2">
    <span class="db mhm pvm border-bottom border--2">
      <span class="db text-color-2 f6">Title 4</span>
      <span class="db text-color-1 f4">List Item</span>
    </span>
        </li>
    </ul>
</div>
<div class="sg-carousel-page sg-page-3">
    <article class="mam bg-1 brm ng-isolate-scope">
        <header class="clear pam border-bottom border--3">
            <h1 class="fl man fw-normal f4 text-color-1">Contacts</h1>
            <a href="javascript:void(0)" title="More" class="fr">
                <span class="fl f5 text-color-1">More</span>
            </a>
        </header>
        <ul class="man pan list-plain">
            <li class="pam border-bottom border--3">
                <div class="mbs flag flag--rev">
                    <div class="flag--body">
                        <span class="f3 text-color-1 fw-semibold">Jonathan Perilla-Jones</span>
                    </div>
                    <div class="flag--image prm">
                        <div class="icon icon--contact brs bgs-100 a-mid sq-30"></div>
                    </div>
                </div>
                <ul class="list-plain man pan">
                    <li class="f5 text-color-2">Director of Consumer Sales</li>
                    <li class="f5 text-color-2">United Partners</li>
                    <li class="f5 text-color-2">(415)432-5456</li>
                </ul>
            </li>
            <li class="pam border-bottom border--3">
                <div class="mbs flag flag--rev">
                    <div class="flag--body">
                        <span class="f3 text-color-1 fw-semibold">Jonathan Perilla-Jones</span>
                    </div>
                    <div class="flag--image prm">
                        <div class="icon icon--contact brs bgs-100 a-mid sq-30"></div>
                    </div>
                </div>
                <ul class="list-plain man pan">
                    <li class="f5 text-color-2">Director of Consumer Sales</li>
                    <li class="f5 text-color-2">United Partners</li>
                    <li class="f5 text-color-2">(415)432-5456</li>
                </ul>
            </li>
            <li class="pam">
                <div class="mbs flag flag--rev">
                    <div class="flag--body">
                        <span class="f3 text-color-1 fw-semibold">Jonathan Perilla-Jones</span>
                    </div>
                    <div class="flag--image prm">
                        <div class="icon icon--contact brs bgs-100 a-mid sq-30"></div>
                    </div>
                </div>
                <ul class="list-plain man pan">
                    <li class="f5 text-color-2">Director of Consumer Sales</li>
                    <li class="f5 text-color-2">United Partners</li>
                    <li class="f5 text-color-2">(415)432-5456</li>
                </ul>
            </li>
        </ul>
    </article>
    <article class="mam bg-1 brm ng-isolate-scope">
        <header class="clear pam border-bottom border--3">
            <h1 class="fl man fw-normal f4 text-color-1">Contacts</h1>
            <a href="javascript:void(0)" title="More" class="fr">
                <span class="fl f5 text-color-1">More</span>
            </a>
        </header>
        <ul class="man pan list-plain">
            <li class="pam border-bottom border--3">
                <div class="mbs flag flag--rev">
                    <div class="flag--body">
                        <span class="f3 text-color-1 fw-semibold">Jonathan Perilla-Jones</span>
                    </div>
                    <div class="flag--image prm">
                        <div class="icon icon--contact brs bgs-100 a-mid sq-30"></div>
                    </div>
                </div>
                <ul class="list-plain man pan">
                    <li class="f5 text-color-2">Director of Consumer Sales</li>
                    <li class="f5 text-color-2">United Partners</li>
                    <li class="f5 text-color-2">(415)432-5456</li>
                </ul>
            </li>
            <li class="pam border-bottom border--3">
                <div class="mbs flag flag--rev">
                    <div class="flag--body">
                        <span class="f3 text-color-1 fw-semibold">Jonathan Perilla-Jones</span>
                    </div>
                    <div class="flag--image prm">
                        <div class="icon icon--contact brs bgs-100 a-mid sq-30"></div>
                    </div>
                </div>
                <ul class="list-plain man pan">
                    <li class="f5 text-color-2">Director of Consumer Sales</li>
                    <li class="f5 text-color-2">United Partners</li>
                    <li class="f5 text-color-2">(415)432-5456</li>
                </ul>
            </li>
            <li class="pam">
                <div class="mbs flag flag--rev">
                    <div class="flag--body">
                        <span class="f3 text-color-1 fw-semibold">Jonathan Perilla-Jones</span>
                    </div>
                    <div class="flag--image prm">
                        <div class="icon icon--contact brs bgs-100 a-mid sq-30"></div>
                    </div>
                </div>
                <ul class="list-plain man pan">
                    <li class="f5 text-color-2">Director of Consumer Sales</li>
                    <li class="f5 text-color-2">United Partners</li>
                    <li class="f5 text-color-2">(415)432-5456</li>
                </ul>
            </li>
        </ul>
    </article>
</div>
