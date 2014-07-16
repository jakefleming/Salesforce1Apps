<html lang="en" ng-app="app" class="ng-scope">
<head>
    <link href="../../stylesheets/app.css" rel="stylesheet" type="text/css">
</head>
<body class="ng-scope">
    <div id="sg-main">
            <header class="bg-1 mbx">
                <nav role="navigation">
                    <div id="sg-nav" class="sg-nav bg-5 clear">
                        <h1 class="fl man mls">
                            <a href="/" title="Salesforce1" class="dib pam">
                                <span class="text-color-5">Salesforce1 Data.com App</span>
                            </a>
                        </h1>
                    </div>
                </nav>
                <div id="sg-subnav" class="dn db-ns bg-1 border-top border--4 clear">
                    <ul class="list-horizontal fr mrl">
                        <!-- ngRepeat: nav in subnavItems -->
                    </ul>
                </div>
            </header>
            <section class="sg-iphone">
            <!-- #Record Home -->
            <!-- ngIf: currentExample == 'recordHome' -->
            <div ng-if="currentExample == 'recordHome'">
            <article class="sg-phone--container">
                <div class="sg-phone--page">





                </div>
            </article>
            </div>
            </section>
            <footer class="bg-5 pos-rel border-top border--8">
                <article class="db phxx ptxx fn-ns fl-l fn-m tc tl-l">
                    <img src="https://sfdc-styleguide.herokuapp.com/assets/R&DUX_Logo.png" alt="R&amp;D UX" width="75" height="65">
                </article>
                <article class="phxx ptx pbxx tc tr-l">
                    <p class="mtn mbs f4 text-color-5">&copy; Copyright 2014 Salesforce User Experience. <a href="http://www.salesforce.com/company/legal/intellectual.jsp"><span class="text-blue">All rights reserved</span></a>.</p>
                    <p class="mtn mbs f6 text-color-3">Salesforce.com, Inc. The Landmark @ One Market, Suite 300, San Francisco, CA, 94105, United States</p>
                    <p class="mtn mbs f6 text-color-3">Version 1.5. Last Updated on 06/27/2014.</p>
                </article>
            </footer>
    </div>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<div id="window-resizer-tooltip" style="display: none;"><a href="#" title="Edit settings" style="background-image: url(chrome-extension://kkelicaakdanhinjdeammmilcgefonfh/images/icon_19.png);"></a><span class="tooltipTitle">Window size: </span><span class="tooltipWidth" id="winWidth">995</span> x <span class="tooltipHeight" id="winHeight">1222</span><br><span class="tooltipTitle">Viewport size: </span><span class="tooltipWidth" id="vpWidth">995</span> x <span class="tooltipHeight" id="vpHeight">459</span></div>
</body>
</html>