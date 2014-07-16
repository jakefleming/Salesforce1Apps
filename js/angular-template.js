angular.module("app").run(["$templateCache", function($templateCache) {

    $templateCache.put("myComponent.html",
            "<div>\n" +
            "    My Component\n" +
            "    <s1-button-secondary-default class=\"my-component-button\" label=\"Component Action\"></s1-button-secondary-default>\n" +
            "</div>"
    );

    $templateCache.put("sgExampleContainer.html",
            "<div>\n" +
            "  <article class=\"sg-phone--container\">\n" +
            "    <div class=\"sg-phone--page\">\n" +
            "      <div ng-transclude></div>\n" +
            "    </div>\n" +
            "  </article>\n" +
            "</div>"
    );

    $templateCache.put("sgExampleContainerDefaultHeader.html",
            "<div>\n" +
            "  <article class=\"sg-phone--container\">\n" +
            "    <div class=\"sg-phone--page\">\n" +
            "      <section class=\"sg-phone--header ht-44 clear\">\n" +
            "        <s1-header-primary-default></s1-header-primary-default>\n" +
            "      </section>\n" +
            "      <section class=\"sg-phone--content clear\">\n" +
            "        <div ng-transclude></div>\n" +
            "      </section>\n" +
            "    </div>\n" +
            "  </article>\n" +
            "</div>"
    );

    $templateCache.put("sgExamples.html",
            "<div class=\"sg-page\" ng-controller=\"examplesController\">\n" +
            "\n" +
            "  <div class=\"grid sg-content-main\">\n" +
            "\n" +
            "    <div class=\"grid-cell\">\n" +
            "\n" +
            "      <ul class=\"sg-col-nav list-plain pan man mhm f5 fw-normal\">\n" +
            "        <li ng-repeat=\"example in examples\">\n" +
            "          <a href=\"javascript:void(0)\" class=\"dib flag--body pas f5\" ng-click=\"showExample(example.id)\">{{example.title}}</a>\n" +
            "        </li>\n" +
            "      </ul>\n" +
            "\n" +
            "    </div>\n" +
            "    <section class=\"pos-rel grid-cell sg-exampleDetails\">\n" +
            "      <div class=\"sg-panel mtl mbx mhm pam brm bg-brand-4\">\n" +
            "        <h2 class=\"man\">{{exampleTitle}}</h2>\n" +
            "        <p class=\"mbn\">{{exampleDescription}}</p>\n" +
            "        <div class=\"dn db-m db-l\">\n" +
            "          <h3>Components</h3>\n" +
            "          <ul class=\"sg-component-links list-plain man pan f5 fw-normal dn db-m db-l\">\n" +
            "            <li ng-repeat='component in exampleComponents'>\n" +
            "              {{component.label}}\n" +
            "            </li>\n" +
            "          </ul>\n" +
            "        </div>\n" +
            "      </div>\n" +
            "\n" +
            "      <div class=\"dn db-l mhx\">\n" +
            "        <h3>Phone model:</h3>\n" +
            "        <fieldset class=\"no-border\">\n" +
            "          <input name=\"phone_type\" type=\"radio\" ng-model='phoneType' value=\"iphone\" id=\"phone_type_1\" class=\"radio radio--default radio--states-1 brc mrs bg-secondary-btn sq-22 a-mid dib\">\n" +
            "          <label class=\"f4 text-color-1\" for=\"phone_type_1\">iPhone</label>\n" +
            "        </fieldset>\n" +
            "        <fieldset class=\"no-border\">\n" +
            "          <input name=\"phone_type\" type=\"radio\" ng-model='phoneType' value=\"htc\" id=\"phone_type_2\" class=\"radio radio--default radio--states-1 brc mrs bg-secondary-btn sq-22 a-mid dib\">\n" +
            "          <label class=\"f4 text-color-1\" for=\"phone_type_2\">HTC One</label>\n" +
            "        </fieldset>\n" +
            "      </div>\n" +
            "    </section>\n" +
            "\n" +
            "    <section class=\"pos-rel grid-cell sg-exampleScreen mbx\">\n" +
            "      <section class=\"sg-{{phoneType}}\">\n" +
            "\n" +
            "        <!-- #Record Home -->\n" +
            "        <sg-example-container-default-header ng-if=\"currentExample == 'recordHome'\">\n" +
            "          <s1-anchor-dark title=\"James Bakersfield\" description=\"CEO | Trinidad Corp. | (635) 519-3762\" icon=\"contact\" ></s1-anchor-dark>\n" +
            "\n" +
            "          <ul class=\"list-horizontal tc man mvs pan\">\n" +
            "            <li class=\"sq-14 lh-14 a-mid\"><a href=\"javascript:void(0)\" class=\"sq-7 bg-10 brc ig_2 js-indicator-1\" title=\"Page 1\"><span class=\"tha\">Page 1</span></a></li>\n" +
            "            <li class=\"sq-14 lh-14 a-mid\"><a href=\"javascript:void(0)\" class=\"sq-7 bg-9 brc is_4 js-indicator-2\" title=\"Page 2\"><span class=\"tha\">Page 2</span></a></li>\n" +
            "            <li class=\"sq-14 lh-14 a-mid\"><a href=\"javascript:void(0)\" class=\"sq-7 bg-9 brc is_4 js-indicator-3\" title=\"Page 3\"><span class=\"tha\">Page 3</span></a></li>\n" +
            "          </ul>\n" +
            "\n" +
            "          <div class=\"sg-carouselof3 sg-show-page-1\">\n" +
            "\n" +
            "            <div class=\"sg-carousel-page sg-page-1\">\n" +
            "              <div class=\"mhm\">\n" +
            "                <s1-button-secondary-default label=\"Follow\"></s1-button-secondary-default>\n" +
            "              </div>\n" +
            "              <s1-feed-item-default timestamp=\"28 minutes ago\" likes=\"2 likes\" comments=\"4 comments\" body=\"Feedback from everyone else is welcome also! Please let me know what you think. I am desperate for your approval and appreciation. Shower me with love and affection. Fishing for compliments here.\" actor=\"Jenny Hancock\" actorImage=\"http://placekitten.com/45/45\" ></s1-feed-item-default>\n" +
            "              <s1-feed-item-with-payload></s1-feed-item-with-payload>\n" +
            "              <s1-feed-item-default timestamp=\"28 minutes ago\" likes=\"2 likes\" comments=\"4 comments\" body=\"Feedback from everyone else is welcome also! Please let me know what you think. I am desperate for your approval and appreciation. Shower me with love and affection. Fishing for compliments here.\" actor=\"Jenny Hancock\" actorImage=\"http://placekitten.com/45/45\" ></s1-feed-item-default>\n" +
            "              <s1-feed-item-with-payload></s1-feed-item-with-payload>\n" +
            "            </div>\n" +
            "            <div class=\"sg-carousel-page sg-page-2\">\n" +
            "              <s1-card-related-list class=\"mtn\"></s1-card-related-list>\n" +
            "              <s1-card-related-list></s1-card-related-list>\n" +
            "              <s1-card-related-list></s1-card-related-list>\n" +
            "              <s1-card-related-list></s1-card-related-list>\n" +
            "              <s1-card-related-list></s1-card-related-list>\n" +
            "            </div>\n" +
            "            <div class=\"sg-carousel-page sg-page-3\">\n" +
            "              <div class=\"mhm mbm\">\n" +
            "                <button class=\"btn bg-secondary-btn btn--secondary pvs phx fr mlm brm border border--2\"><span class=\"text-color-4 icon-utility-down f3 fw-semibold\"></span></button>\n" +
            "                <div class=\"size-fill\">\n" +
            "                  <button class=\"btn bg-secondary-btn btn--secondary pvs size-full brm border border--2 text-color-4 f3 fw-semibold\">Edit</button>\n" +
            "                </div>\n" +
            "              </div>\n" +
            "              <s1-list-with-labels></s1-list-with-labels>\n" +
            "            </div>\n" +
            "          </div>\n" +
            "        </sg-example-container-default-header>\n" +
            "\n" +
            "        <!-- #Feed -->\n" +
            "        <sg-example-container-default-header ng-if=\"currentExample == 'feed'\">\n" +
            "          <s1-feed-item-default timestamp=\"3 minutes ago\" likes=\"1 like\" comments=\"2 comments\" body=\"Feedback from everyone else is welcome also! Please let me know what you think. I am desperate for your approval and appreciation. Shower me with love and affection. Fishing for compliments here.\" actor=\"Jenny Hancock\" actorImage=\"http://placekitten.com/45/45\"></s1-feed-item-default>\n" +
            "          <s1-feed-item-default timestamp=\"13 minutes ago\" likes=\"2 likes\" comments=\"5 comments\" body=\"Feedback from everyone else is welcome also! Please let me know what you think. I am desperate for your approval and appreciation. Shower me with love and affection. Fishing for compliments here.\" actor=\"Jenny Hancock\" actorImage=\"http://placekitten.com/45/45\">\n" +
            "            <s1-feed-payload-primary class=\"mhm mbm\"></s1-feed-payload-primary>\n" +
            "          </s1-feed-item-default>\n" +
            "          <s1-feed-item-default timestamp=\"26 minutes ago\" likes=\"4 likes\" comments=\"3 comments\" body=\"Feedback from everyone else is welcome also! Please let me know what you think. I am desperate for your approval and appreciation. Shower me with love and affection. Fishing for compliments here.\" actor=\"Jenny Hancock\" actorImage=\"http://placekitten.com/45/45\"></s1-feed-item-default>\n" +
            "          <s1-feed-item-default timestamp=\"38 minutes ago\" likes=\"5 likes\" comments=\"4 comments\" body=\"Feedback from everyone else is welcome also! Please let me know what you think. I am desperate for your approval and appreciation. Shower me with love and affection. Fishing for compliments here.\" actor=\"Jenny Hancock\" actorImage=\"http://placekitten.com/45/45\"></s1-feed-item-default>\n" +
            "          <s1-feed-item-default timestamp=\"41 minutes ago\" likes=\"3 likes\" comments=\"4 comments\" body=\"Feedback from everyone else is welcome also! Please let me know what you think. I am desperate for your approval and appreciation. Shower me with love and affection. Fishing for compliments here.\" actor=\"Jenny Hancock\" actorImage=\"http://placekitten.com/45/45\">\n" +
            "            <s1-feed-payload-primary class=\"mhm mbm\"></s1-feed-payload-primary>\n" +
            "          </s1-feed-item-default>\n" +
            "          <s1-feed-item-default timestamp=\"2 hours ago\" likes=\"1 like\" comments=\"1 comment\" body=\"Feedback from everyone else is welcome also! Please let me know what you think. I am desperate for your approval and appreciation. Shower me with love and affection. Fishing for compliments here.\" actor=\"Jenny Hancock\" actorImage=\"http://placekitten.com/45/45\"></s1-feed-item-default>\n" +
            "        </sg-example-container-default-header>\n" +
            "\n" +
            "        <!-- #Feed Drill-in -->\n" +
            "        <sg-example-container ng-if=\"currentExample == 'feeddrillin'\">\n" +
            "\t\t\t\t\t<section class=\"sg-phone--header ht-44 clear\">\n" +
            "\t\t\t\t\t\t<s1-header-primary-default notifications=\"4\" icon=\"back\" on-stage-left=\"stageLeftHandler(event)\" on-notifications=\"notificationsHandler(event)\" ></s1-header-primary-default>\n" +
            "\t\t\t\t\t</section>\n" +
            "\t\t\t\t\t<section class=\"sg-phone--content clear\">\n" +
            "\t\t\t\t\t\t<s1-feed-item-on-drill-in></s1-feed-item-on-drill-in>\n" +
            "\t\t\t\t\t\t<s1-feed-comment-default></s1-feed-comment-default>\n" +
            "\t\t\t\t\t\t<s1-feed-comment-with-payload></s1-feed-comment-with-payload>\n" +
            "\t\t\t\t\t\t<s1-feed-comment-default></s1-feed-comment-default>\n" +
            "\t\t\t\t\t</section>\n" +
            "        </sg-example-container>\n" +
            "\n" +
            "        <!-- #Stage Left -->\n" +
            "        <sg-example-container ng-if=\"currentExample == 'stageleft'\">\n" +
            "\n" +
            "          <!-- stage-left (staged component) -->\n" +
            "          <section class=\"sg-phone--stage-left\">\n" +
            "            <article class=\"sg-phone--content clear\">\n" +
            "              <s1-staged-navigation-stage-left></s1-staged-navigation-stage-left>\n" +
            "            </article>\n" +
            "          </section>\n" +
            "        </sg-example-container>\n" +
            "\n" +
            "        <!-- #Notifications -->\n" +
            "        <sg-example-container ng-if=\"currentExample == 'notifications'\">\n" +
            "\n" +
            "          <!-- stage-right (staged component) -->\n" +
            "          <section class=\"sg-phone--stage-right\">\n" +
            "            <article class=\"sg-phone--content clear\">\n" +
            "\t\t\t\t\t\t\t<s1-staged-navigation-notifications class=\"ht-100p\"></s1-staged-navigation-notifications>\n" +
            "            </article>\n" +
            "          </section>\n" +
            "        </sg-example-container>\n" +
            "\n" +
            "        <!-- #Search (Global) -->\n" +
            "\t\t\t\t<sg-example-container ng-if=\"currentExample == 'searchglobal'\">\n" +
            "\t\t\t\t\t<section class=\"sg-phone--header ht-44 clear\">\n" +
            "\t\t\t\t\t\t<s1-header-primary-search placeholder=\"Search Salesforce\" ></s1-header-primary-search>\n" +
            "\t\t\t\t\t</section>\n" +
            "\t\t\t\t\t<section class=\"sg-phone--content clear\">\n" +
            "\t\t\t\t\t\t<section class=\"border-bottom border--3 clear\">\n" +
            "\t\t\t\t\t\t\t<s1-anchor-light-no-background label=\"10 results\" title=\"Accounts\" icon=\"account\" on-new=\"newHandler(event)\" ></s1-anchor-light-no-background>\n" +
            "\t\t\t\t\t\t\t<s1-card-account class=\"mtn\" title=\"United Partners, Inc.\" detail1=\"San Francisco, CA\" detail2=\"Enterprise Customer\" on-select=\"selectHandler(event)\" ></s1-card-account>\n" +
            "\t\t\t\t\t\t\t<s1-card-account title=\"United Partners, Inc.\" detail1=\"San Francisco, CA\" detail2=\"Enterprise Customer\" on-select=\"selectHandler(event)\" ></s1-card-account>\n" +
            "\t\t\t\t\t\t\t<s1-card-account title=\"United Partners, Inc.\" detail1=\"San Francisco, CA\" detail2=\"Enterprise Customer\" on-select=\"selectHandler(event)\" ></s1-card-account>\n" +
            "\t\t\t\t\t\t\t<a href=\"javascript:void(0)\" title=\"More\" class=\"fr mbm mhm\">\n" +
            "\t\t\t\t\t\t\t\t<span class=\"fl text-color-2 f5\">More Accounts (7)</span>\n" +
            "\t\t\t\t\t\t\t\t<span class=\"lh-16 fl mls f6 text-color-2 icon-utility-right\"></span>\n" +
            "\t\t\t\t\t\t\t</a>\n" +
            "\t\t\t\t\t\t</section>\n" +
            "\t\t\t\t\t\t<section class=\"border-bottom border--3 clear\">\n" +
            "\t\t\t\t\t\t\t<s1-anchor-light-no-background label=\"1 result\" title=\"Leads\" icon=\"lead\" on-new=\"newHandler(event)\" ></s1-anchor-light-no-background>\n" +
            "\t\t\t\t\t\t\t<s1-card-contact class=\"mtn\" icon=\"lead\" title=\"Jonathan Perilla-Jones\" detail1=\"Director of Consumer Sales\" detail2=\"United Partners\" detail3=\"415-432-5456\" on-select=\"selectHandler(event)\" ></s1-card-contact>\n" +
            "\t\t\t\t\t\t</section>\n" +
            "\t\t\t\t\t\t<section class=\"border-bottom border--3 clear\">\n" +
            "\t\t\t\t\t\t\t<s1-anchor-light-no-background label=\"6 results\" title=\"Opportunities\" icon=\"opportunity\" on-new=\"newHandler(event)\" ></s1-anchor-light-no-background>\n" +
            "\t\t\t\t\t\t\t<s1-card-opportunity class=\"mtn\" title=\"Mobile Platform Licenses (450)\" detail1=\"Negotiation/Review\" detail2=\"United Partners\" detail3=\"11,875\" detail4=\"7/25/13\" on-select=\"selectHandler(event)\" ></s1-card-opportunity>\n" +
            "\t\t\t\t\t\t\t<s1-card-opportunity title=\"Mobile Platform Licenses (450)\" detail1=\"Negotiation/Review\" detail2=\"United Partners\" detail3=\"11,875\" detail4=\"7/25/13\" on-select=\"selectHandler(event)\" ></s1-card-opportunity>\n" +
            "\t\t\t\t\t\t\t<s1-card-opportunity title=\"Mobile Platform Licenses (450)\" detail1=\"Negotiation/Review\" detail2=\"United Partners\" detail3=\"11,875\" detail4=\"7/25/13\" on-select=\"selectHandler(event)\" ></s1-card-opportunity>\n" +
            "\t\t\t\t\t\t\t<a href=\"javascript:void(0)\" title=\"More\" class=\"fr mbm mhm\">\n" +
            "\t\t\t\t\t\t\t\t<span class=\"fl text-color-2 f5\">More Opportunities (3)</span>\n" +
            "\t\t\t\t\t\t\t\t<span class=\"lh-16 fl mls f6 text-color-2 icon-utility-right\"></span>\n" +
            "\t\t\t\t\t\t\t</a>\n" +
            "\t\t\t\t\t\t</section>\n" +
            "\t\t\t\t\t</section>\n" +
            "\t\t\t\t</sg-example-container>\n" +
            "\n" +
            "        <!-- #Search (Scoped) -->\n" +
            "\t\t\t\t<sg-example-container ng-if=\"currentExample == 'searchscoped'\">\n" +
            "\t\t\t\t\t<section class=\"sg-phone--header ht-44 clear\">\n" +
            "\t\t\t\t\t\t<s1-header-primary-search placeholder=\"Search Accounts\" ></s1-header-primary-search>\n" +
            "\t\t\t\t\t</section>\n" +
            "\t\t\t\t\t<section class=\"sg-phone--content clear\">\n" +
            "\t\t\t\t\t\t<s1-anchor-light-default label=\"recent\" title=\"Accounts\" icon=\"account\" on-new=\"newHandler(event)\" ></s1-anchor-light-default>\n" +
            "\t\t\t\t\t\t<s1-list-item-container>\n" +
            "\t\t\t\t\t\t\t<s1-list-item-with-icon ng-repeat=\"item in searchScopedList1\" text=\"{{item.text}}\"></s1-list-item-with-icon>\n" +
            "\t\t\t\t\t\t\t<s1-list-item-default ng-repeat=\"item in searchScopedList2\" text=\"{{item.text}}\"></s1-list-item-default>\n" +
            "\t\t\t\t\t\t</s1-list-item-container>\n" +
            "\t\t\t\t\t</section>\n" +
            "\t\t\t\t</sg-example-container>\n" +
            "\n" +
            "        <!-- #Full Create -->\n" +
            "        <sg-example-container ng-if=\"currentExample == 'fullcreate'\">\n" +
            "          <section class=\"sg-phone--header ht-44 clear\">\n" +
            "            <s1-header-primary-modal button-left=\"Cancel\" button-right=\"Submit\" title=\"New Contact\" ></s1-header-primary-modal>\n" +
            "          </section>\n" +
            "          <section class=\"sg-phone--content clear pam\">\n" +
            "            <s1-picklist-label-outside value=\"Mr.\" label=\"Salutation\" ></s1-picklist-label-outside>\n" +
            "            <s1-text-input-with-label label=\"First Name\" placeholder=\"\" value=\"\" ></s1-text-input-with-label>\n" +
            "            <s1-text-input-with-label label=\"Last Name\" placeholder=\"\" value=\"\" ></s1-text-input-with-label>\n" +
            "            <s1-lookup-with-label label=\"Account\" placeholder=\"Choose Account...\" value=\"\" ></s1-lookup-with-label>\n" +
            "            <s1-text-input-with-label label=\"Phone Number\" placeholder=\"\" value=\"\" ></s1-text-input-with-label>\n" +
            "            <s1-text-input-with-label label=\"E-mail Address\" placeholder=\"\" value=\"\" ></s1-text-input-with-label>\n" +
            "            <s1-picklist-label-outside value=\"Primary\" label=\"Contact Role\" ></s1-picklist-label-outside>\n" +
            "          </section>\n" +
            "        </sg-example-container>\n" +
            "\n" +
            "        <!-- #Related List Drill-in -->\n" +
            "        <sg-example-container ng-if=\"currentExample == 'relatedlistdrillin'\">\n" +
            "\t\t\t\t\t<section class=\"sg-phone--header ht-44 clear\">\n" +
            "\t\t\t\t\t\t<s1-header-primary-default notifications=\"4\" icon=\"back\" on-stage-left=\"stageLeftHandler(event)\" on-notifications=\"notificationsHandler(event)\" ></s1-header-primary-default>\n" +
            "\t\t\t\t\t</section>\n" +
            "\t\t\t\t\t<section class=\"sg-phone--content clear\">\n" +
            "\t\t\t\t\t\t<h1 class=\"text-color-1 f2 mam\">Contacts</h1>\n" +
            "\t\t\t\t\t\t<s1-button-groups label=\"New\" ></s1-button-groups>\n" +
            "\t\t\t\t\t\t<s1-card-contact icon=\"contact\" title=\"Jonathan Perilla-Jones\" detail1=\"Director of Consumer Sales\" detail2=\"United Partners\" detail3=\"(415) 432-5456\" on-select=\"selectHandler(event)\" ></s1-card-contact>\n" +
            "\t\t\t\t\t\t<s1-card-contact icon=\"contact\" title=\"Jonathan Perilla-Jones\" detail1=\"Director of Consumer Sales\" detail2=\"United Partners\" detail3=\"(415) 432-5456\" on-select=\"selectHandler(event)\" ></s1-card-contact>\n" +
            "\t\t\t\t\t\t<s1-card-contact icon=\"contact\" title=\"Jonathan Perilla-Jones\" detail1=\"Director of Consumer Sales\" detail2=\"United Partners\" detail3=\"(415) 432-5456\" on-select=\"selectHandler(event)\" ></s1-card-contact>\n" +
            "\t\t\t\t\t\t<s1-card-contact icon=\"contact\" title=\"Jonathan Perilla-Jones\" detail1=\"Director of Consumer Sales\" detail2=\"United Partners\" detail3=\"(415) 432-5456\" on-select=\"selectHandler(event)\" ></s1-card-contact>\n" +
            "\t\t\t\t\t\t<s1-card-contact icon=\"contact\" title=\"Jonathan Perilla-Jones\" detail1=\"Director of Consumer Sales\" detail2=\"United Partners\" detail3=\"(415) 432-5456\" on-select=\"selectHandler(event)\" ></s1-card-contact>\n" +
            "\t\t\t\t\t\t<s1-card-contact icon=\"contact\" title=\"Jonathan Perilla-Jones\" detail1=\"Director of Consumer Sales\" detail2=\"United Partners\" detail3=\"(415) 432-5456\" on-select=\"selectHandler(event)\" ></s1-card-contact>\n" +
            "\t\t\t\t\t</section>\n" +
            "        </sg-example-container>\n" +
            "\n" +
            "        <!-- #List View -->\n" +
            "\t\t\t\t<sg-example-container ng-if=\"currentExample == 'listview'\">\n" +
            "\t\t\t\t\t<section class=\"sg-phone--header ht-44 clear\">\n" +
            "\t\t\t\t\t\t<s1-header-primary-default notifications=\"4\" icon=\"back\" on-stage-left=\"stageLeftHandler(event)\" on-notifications=\"notificationsHandler(event)\" ></s1-header-primary-default>\n" +
            "\t\t\t\t\t</section>\n" +
            "\t\t\t\t\t<section class=\"sg-phone--content clear\">\n" +
            "\t\t\t\t\t\t\t<s1-anchor-light-no-background label=\"8 Opportunities\" title=\"Opportunities\" icon=\"opportunity\" on-new=\"newHandler(event)\" ></s1-anchor-light-no-background>\n" +
            "\t\t\t\t\t\t\t<s1-card-opportunity class=\"mtn\" title=\"Mobile Platform Licenses (450)\" detail1=\"Negotiation/Review\" detail2=\"United Partners\" detail3=\"11,875\" detail4=\"7/25/13\" on-select=\"selectHandler(event)\" ></s1-card-opportunity>\n" +
            "\t\t\t\t\t\t\t<s1-card-opportunity title=\"Mobile Platform Licenses (450)\" detail1=\"Negotiation/Review\" detail2=\"United Partners\" detail3=\"11,875\" detail4=\"7/25/13\" on-select=\"selectHandler(event)\" ></s1-card-opportunity>\n" +
            "\t\t\t\t\t\t\t<s1-card-opportunity title=\"Mobile Platform Licenses (450)\" detail1=\"Negotiation/Review\" detail2=\"United Partners\" detail3=\"11,875\" detail4=\"7/25/13\" on-select=\"selectHandler(event)\" ></s1-card-opportunity>\n" +
            "\t\t\t\t\t\t\t<s1-card-opportunity title=\"Mobile Platform Licenses (450)\" detail1=\"Negotiation/Review\" detail2=\"United Partners\" detail3=\"11,875\" detail4=\"7/25/13\" on-select=\"selectHandler(event)\" ></s1-card-opportunity>\n" +
            "\t\t\t\t\t\t\t<s1-card-opportunity title=\"Mobile Platform Licenses (450)\" detail1=\"Negotiation/Review\" detail2=\"United Partners\" detail3=\"11,875\" detail4=\"7/25/13\" on-select=\"selectHandler(event)\" ></s1-card-opportunity>\n" +
            "\t\t\t\t\t\t\t<s1-card-opportunity title=\"Mobile Platform Licenses (450)\" detail1=\"Negotiation/Review\" detail2=\"United Partners\" detail3=\"11,875\" detail4=\"7/25/13\" on-select=\"selectHandler(event)\" ></s1-card-opportunity>\n" +
            "\t\t\t\t\t\t\t<s1-card-opportunity title=\"Mobile Platform Licenses (450)\" detail1=\"Negotiation/Review\" detail2=\"United Partners\" detail3=\"11,875\" detail4=\"7/25/13\" on-select=\"selectHandler(event)\" ></s1-card-opportunity>\n" +
            "\t\t\t\t\t\t\t<s1-card-opportunity title=\"Mobile Platform Licenses (450)\" detail1=\"Negotiation/Review\" detail2=\"United Partners\" detail3=\"11,875\" detail4=\"7/25/13\" on-select=\"selectHandler(event)\" ></s1-card-opportunity>\n" +
            "\t\t\t\t\t</section>\n" +
            "\t\t\t\t</sg-example-container>\n" +
            "\n" +
            "        <!-- #MDP Launcher -->\n" +
            "        <sg-example-container ng-if=\"currentExample == 'mdplauncher'\">\n" +
            "\t\t\t\t\t<!-- The pushed back screen -->\n" +
            "\t\t\t\t\t<div class=\"bg-black\">\n" +
            "\t\t\t\t\t\t<article class=\"sg-phone--pushed-back\">\n" +
            "\t\t\t\t\t\t\t<section class=\"sg-phone--header ht-44 clear\">\n" +
            "\t\t\t\t\t\t\t\t<s1-header-primary-default notifications=\"4\" icon=\"back\" on-stage-left=\"stageLeftHandler(event)\" on-notifications=\"notificationsHandler(event)\" ></s1-header-primary-default>\n" +
            "\t\t\t\t\t\t\t</section>\n" +
            "\t\t\t\t\t\t\t<section class=\"sg-phone--content clear\">\n" +
            "\t\t\t\t\t\t\t\t\t<s1-anchor-light-no-background label=\"8 Opportunities\" title=\"Opportunities\" icon=\"opportunity\" on-new=\"newHandler(event)\" ></s1-anchor-light-no-background>\n" +
            "\t\t\t\t\t\t\t\t\t<s1-card-opportunity class=\"mtn\" title=\"Mobile Platform Licenses (450)\" detail1=\"Negotiation/Review\" detail2=\"United Partners\" detail3=\"11,875\" detail4=\"7/25/13\" on-select=\"selectHandler(event)\" ></s1-card-opportunity>\n" +
            "\t\t\t\t\t\t\t\t\t<s1-card-opportunity title=\"Mobile Platform Licenses (450)\" detail1=\"Negotiation/Review\" detail2=\"United Partners\" detail3=\"11,875\" detail4=\"7/25/13\" on-select=\"selectHandler(event)\" ></s1-card-opportunity>\n" +
            "\t\t\t\t\t\t\t</section>\n" +
            "\t\t\t\t\t\t</article>\n" +
            "\t\t\t\t\t</div>\n" +
            "\t\t\t\t\t<!-- The MDP launcher -->\n" +
            "\t\t\t\t\t<div class=\"sg-phone--mdp\">\n" +
            "\t\t\t\t\t\t<s1-m-d-p-launcher-default></s1-m-d-p-launcher-default>\n" +
            "\t\t\t\t\t</div>\n" +
            "        </sg-example-container>\n" +
            "\n" +
            "        <!-- #Post Publisher -->\n" +
            "        <sg-example-container ng-if=\"currentExample == 'postpublisher'\">\n" +
            "          <section class=\"sg-phone--header ht-44 clear\">\n" +
            "            <s1-header-primary-modal button-left=\"Cancel\" button-right=\"Post\" title=\"New Post\"></s1-header-primary-modal>\n" +
            "          </section>\n" +
            "          <section class=\"sg-phone--content pam clear\">\n" +
            "            <s1-textarea-with-buttons></s1-textarea-with-buttons>\n" +
            "          </section>\n" +
            "        </sg-example-container>\n" +
            "\n" +
            "        <!-- #Record Publisher -->\n" +
            "        <sg-example-container ng-if=\"currentExample == 'recordpublisher'\">\n" +
            "          <section class=\"sg-phone--header ht-44 clear\">\n" +
            "            <s1-header-primary-modal button-left=\"Cancel\" button-right=\"Submit\" title=\"New Group\"></s1-header-primary-modal>\n" +
            "          </section>\n" +
            "          <section class=\"sg-phone--content pam clear\">\n" +
            "            <s1-text-input-default placeholder=\"Name\" value=\"\" ></s1-text-input-default>\n" +
            "            <s1-textarea-default placeholder=\"Description\" class=\"mbm db\"></s1-textarea-default>\n" +
            "            <s1-checkbox label=\"Private\"></s1-checkbox>\n" +
            "          </section>\n" +
            "        </sg-example-container>\n" +
            "\n" +
            "        <!-- #Sort Filter Modal -->\n" +
            "        <sg-example-container ng-if=\"currentExample == 'sortfilter'\">\n" +
            "          <section class=\"sg-phone--header ht-44 clear\">\n" +
            "            <s1-header-primary-modal button-left=\"Cancel\" button-right=\"Apply\" title=\"Sort\"></s1-header-primary-modal>\n" +
            "          </section>\n" +
            "          <section class=\"sg-phone--content clear\">\n" +
            "\t\t\t\t\t\t<ul class=\"list-plain fw-normal bg-2 man pan\" ng-transclude>\n" +
            "\t\t\t\t\t\t\t<li class=\"list-plain active--list-1 pam text-color-1 f4 border-bottom border--3\">Account Name</li>\n" +
            "\t\t\t\t\t\t\t<li class=\"list-plain active--list-1 pam text-color-1 f4 border-bottom border--3\">City</li>\n" +
            "\t\t\t\t\t\t\t<li class=\"list-plain active--list-1 pam text-color-1 f4 border-bottom border--3\">\n" +
            "\t\t\t\t\t\t\t\tCuisine\n" +
            "\t\t\t\t\t\t\t\t<article class=\"dib fr phs ht-20 bg-1 br-20\">\n" +
            "\t\t\t\t\t\t\t\t\t<span class=\"dib rotate-90 f-10 lh-20 text-blue icon-utility-back\"></span>\n" +
            "\t\t\t\t\t\t\t\t\t<span class=\"mlxs f-12 lh-20 text-color-1\">A-Z</span>\n" +
            "\t\t\t\t\t\t\t\t</article>\n" +
            "\t\t\t\t\t\t\t</li>\n" +
            "\t\t\t\t\t\t\t<li class=\"list-plain active--list-1 pam text-color-1 f4 border-bottom border--3\">Distance</li>\n" +
            "\t\t\t\t\t\t</ul>\n" +
            "          </section>\n" +
            "        </sg-example-container>\n" +
            "\n" +
            "        <!-- #Files List -->\n" +
            "        <sg-example-container-default-header ng-if=\"currentExample == 'fileslist'\">\n" +
            "          <section class=\"sg-phone--content clear\">\n" +
            "            <section class=\"border-bottom border--3 clear\">\n" +
            "              <a href=\"javascript:void(0)\" title=\"More\" class=\"db ht-44 mhm mts\">\n" +
            "                <span class=\"dib lh-44 f2 text-color-1\">\n" +
            "                  <strong>My Files</strong>\n" +
            "                </span>\n" +
            "                <span class=\"dib lh-44 mls f6 text-color-1 icon-utility-down\"></span>\n" +
            "              </a>\n" +
            "            </section>\n" +
            "            <section class=\"pam border-bottom border--3 clear\">\n" +
            "              <s1-button-secondary-default label=\"Add...\"></s1-button-secondary-default>\n" +
            "            </section>\n" +
            "            <s1-list-flag-objects class=\"border-bottom border--3\"></s1-list-flag-objects>\n" +
            "            <s1-list-flag-objects\n" +
            "              first-title=\"My peripheral serial numbers\" first-sub-one=\"Aug 12, 2013 &#x2022; 347KB &#x2022; xlsx\"\n" +
            "              second-title=\"Sönke's code to study\" first-sub-one=\"Sep 9, 2013 &#x2022; 98KB &#x2022; coffee\"\n" +
            "              third-title=\"Record home (final)\" first-sub-one=\"Sep 3, 2013 &#x2022; 23MB &#x2022; psd\"\n" +
            "              forth-title=\"All Salesforce icons\" first-sub-one=\"Aug 22, 2013 &#x2022; 236KB &#x2022; ai\">\n" +
            "            </s1-list-flag-objects>\n" +
            "          </section>\n" +
            "        </sg-example-container-default-header>\n" +
            "\n" +
            "        <!-- #File Preview -->\n" +
            "        <sg-example-container ng-if=\"currentExample == 'filepreview'\">\n" +
            "          (add stuff)\n" +
            "        </sg-example-container>\n" +
            "\n" +
            "        <!-- #Task List -->\n" +
            "        <sg-example-container ng-if=\"currentExample == 'tasklist'\">\n" +
            "          (add stuff)\n" +
            "        </sg-example-container>\n" +
            "\n" +
            "        <!-- #Child Browser -->\n" +
            "        <sg-example-container ng-if=\"currentExample == 'childbrowser'\">\n" +
            "          (add stuff)\n" +
            "        </sg-example-container>\n" +
            "\n" +
            "        <!-- #Login Screen -->\n" +
            "        <sg-example-container ng-if=\"currentExample == 'loginscreen'\">\n" +
            "          (add stuff)\n" +
            "        </sg-example-container>\n" +
            "\n" +
            "      </section>\n" +
            "    </section>\n" +
            "\n" +
            "  </div>\n" +
            "</div>\n"
    );

    $templateCache.put("sgNav.html",
            "<nav role=\"navigation\">\n" +
            "\n" +
            "  <div id=\"sg-nav\" class=\"sg-nav bg-5 clear\">\n" +
            "    <h1 class=\"fl man mls\">\n" +
            "      <a href=\"/\" title=\"Salesforce1\" class=\"dib pam\">\n" +
            "        <span class=\"text-color-5\">Salesforce1</span>\n" +
            "      </a>\n" +
            "    </h1>\n" +
            "\n" +
            "    <!-- Desktop menu -->\n" +
            "    <ul class=\"dn db-m db-l list-horizontal fr mrs\">\n" +
            "      <li ng-repeat=\"nav in navItems\" ng-click=\"selectNav(nav)\">\n" +
            "        <a href=\"javascript:void(0);\"\n" +
            "           ng-if=\"nav.visible\"\n" +
            "           id=\"{{nav.id}}\"\n" +
            "           data-role=\"{{nav.role}}\"\n" +
            "           ng-class=\"{'sg-nav-selected': nav.id == selectedNav}\"\n" +
            "           class=\"navItem pvl phm f3\">\n" +
            "            <span class=\"text-color-5 fw-medium\">{{nav.title}}</span>\n" +
            "        </a>\n" +
            "      </li>\n" +
            "    </ul>\n" +
            "\n" +
            "    <!-- Mobile open/close -->\n" +
            "    <a href=\"javascript:void(0)\"\n" +
            "      title=\"Open menu\"\n" +
            "      ng-click=\"openModal()\"\n" +
            "      ng-show=\"navOpenIs\"\n" +
            "      class=\"db dn-ns fr mrs pvl phm f3\">\n" +
            "      <span class=\"text-color-5 fw-medium\">Menu</span>\n" +
            "    </a>\n" +
            "    <a href=\"javascript:void(0)\"\n" +
            "      title=\"Close menu\"\n" +
            "      ng-click=\"closeModal()\"\n" +
            "      ng-show=\"navCloseIs\"\n" +
            "      class=\"db dn-ns fr mrs pvl phm f3\">\n" +
            "      <span class=\"text-color-5 fw-medium\">Close</span>\n" +
            "    </a>\n" +
            "  </div>\n" +
            "\n" +
            "  <!-- Mobile menu -->\n" +
            "  <ul class=\"list-plain pan man dn dn-l pos-abs z-modal sg-nav-mobile flag--body bg-4\" ng-class='{\"db\": navIs}'>\n" +
            "    <li ng-repeat=\"nav in navItems\"\n" +
            "      ng-click=\"selectNav(nav)\"\n" +
            "      class=\"active--list-2\">\n" +
            "      <a href=\"javascript:void(0)\"\n" +
            "        ng-if=\"nav.visible\"\n" +
            "        id=\"{{nav.id}}\"\n" +
            "        data-role=\"{{nav.role}}\"\n" +
            "        ng-click=\"closeModal()\"\n" +
            "        ng-class=\"{'sg-nav-selected': nav.id == selectedNav}\"\n" +
            "        class=\"db navItem pvm phx f3 border-bottom border--6\">\n" +
            "        <span class=\"text-color-5 fw-medium\">{{nav.title}}</span>\n" +
            "      </a>\n" +
            "    </li>\n" +
            "  </ul>\n" +
            "\n" +
            "</nav>\n"
    );

    $templateCache.put("sgProductStyleguide.html",
            "<div>\n" +
            "\n" +
            "  <!-- Guidelines -->\n" +
            "  <section id=\"sg-guidelines\" class=\"bg-sct-med pbxl\">\n" +
            "\n" +
            "    <!-- Modal -->\n" +
            "    <article class=\"dn dn-l pos-abs opacity-0 sg-modal-mobile mtx z-modal sg-modalIntroAni\" ng-class='{\"db\": isGuidelineModal}'>\n" +
            "      <a href=\"javascript:void(0)\" title=\"Close\" class=\"dib fr ptm pbm plm\" ng-click=\"hideGuidelineModal()\">\n" +
            "        <span class=\"db icon-utility-close f2 wht\"></span>\n" +
            "      </a>\n" +
            "      <div class=\"cr bg-1 brm pts phl pbm\">\n" +
            "        <div class=\"sg-v-ttl\">{{guidelineModalAnnotation.title}}</div>\n" +
            "        <div class=\"sg-v-dsc\">{{guidelineModalAnnotation.body}}</div>\n" +
            "      </div>\n" +
            "    </article>\n" +
            "\n" +
            "    <!-- Overlay -->\n" +
            "    <article class=\"dn dn-l pos-abs corner-tl bg-6-80p flag--body ht-full z-overlay sg-overlayIntroAni\"\n" +
            "      ng-class='{\"db\": isGuidelineModal}'\n" +
            "      ng-click=\"hideGuidelineModal()\">\n" +
            "    </article>\n" +
            "\n" +
            "    <!-- Carousel cycle -->\n" +
            "    <section class=\"mw-16 center clear\">\n" +
            "      <a href=\"javascript:void(0)\"\n" +
            "        ng-click=\"prevGuideline()\"\n" +
            "        class=\"sg-arrow sg-arrow--l fl\">\n" +
            "        <div class=\"sg-arrow--fnt icon-utility-left\"></div>\n" +
            "      </a>\n" +
            "      <a href=\"javascript:void(0)\"\n" +
            "        ng-click=\"nextGuideline()\"\n" +
            "        class=\"sg-arrow sg-arrow--r fr\">\n" +
            "        <div class=\"sg-arrow--fnt icon-utility-right\"></div>\n" +
            "      </a>\n" +
            "      <h1 class=\"sg-h1 man\">{{guidelines.title}}</h1>\n" +
            "    </section>\n" +
            "\n" +
            "    <!-- Carousel -->\n" +
            "    <section class=\"grid flag--body sg-v-carousel {{guidelines.slide}} center\">\n" +
            "\n" +
            "      <!-- Left annotations, desktop -->\n" +
            "      <article class=\"grid-cell sg-v-side dn db-l sg-v\">\n" +
            "        <div ng-repeat=\"la in guidelines.leftAnnotations\" class=\"dn db-l pos-rel {{la.class}}\">\n" +
            "          <div class=\"sg-v-lne sg-v-lne--l pos-rel\"></div>\n" +
            "          <div class=\"sg-v-ttl\">{{la.title}}</div>\n" +
            "          <div class=\"sg-v-dsc\">{{la.body}}</div>\n" +
            "        </div>\n" +
            "      </article>\n" +
            "\n" +
            "      <!-- Screens and (+) callouts -->\n" +
            "      <article class=\"grid-cell sg-v-middle\">\n" +
            "        <div class=\"pos-rel sg-v-frame bg-1\">\n" +
            "          <a href=\"javascript:void(0)\"\n" +
            "            ng-click=\"showGuidelineModal('1')\"\n" +
            "            class=\"dib dn-l pos-rel sg-v-btn sg-v-btn--1\">\n" +
            "            <div class=\"text-color-5 mtm tc fw-normal f1 icon-utility-add\"></div>\n" +
            "          </a>\n" +
            "          <a href=\"javascript:void(0)\"\n" +
            "            ng-click=\"showGuidelineModal('2')\"\n" +
            "            class=\"dib dn-l pos-rel sg-v-btn sg-v-btn--2\">\n" +
            "            <div class=\"text-color-5 mtm tc fw-normal f1 icon-utility-add\"></div>\n" +
            "          </a>\n" +
            "          <a href=\"javascript:void(0)\"\n" +
            "            ng-click=\"showGuidelineModal('3')\"\n" +
            "            class=\"dib dn-l pos-rel sg-v-btn sg-v-btn--3\">\n" +
            "            <div class=\"text-color-5 mtm tc fw-normal f1 icon-utility-add\"></div>\n" +
            "          </a>\n" +
            "          <div class=\"sg-v-frame-inner\">\n" +
            "            <img ng-src=\"{{guidelines.src}}\">\n" +
            "          </div>\n" +
            "        </div>\n" +
            "      </article>\n" +
            "\n" +
            "      <!-- Right annotations, desktop -->\n" +
            "      <article class=\"grid-cell sg-v-side dn db-l sg-v\">\n" +
            "        <div ng-repeat=\"ra in guidelines.rightAnnotations\" class=\"dn db-l pos-rel {{ra.class}}\">\n" +
            "          <div class=\"sg-v-lne sg-v-lne--r pos-rel\"></div>\n" +
            "          <div class=\"sg-v-ttl\">{{ra.title}}</div>\n" +
            "          <div class=\"sg-v-dsc\">{{ra.body}}</div>\n" +
            "        </div>\n" +
            "      </article>\n" +
            "\n" +
            "    </section>\n" +
            "\n" +
            "  </section>\n" +
            "\n" +
            "\n" +
            "\n" +
            "  <!-- Colors, @see src/config/style.json -->\n" +
            "  <section id=\"sg-colors\" class=\"grid pos-rel bg-sct-drk ptxl\">\n" +
            "\n" +
            "    <!-- Title / subtitle -->\n" +
            "    <header class=\"mbx tc\">\n" +
            "      <h1 class=\"sg-h1 mtn\">Color</h1>\n" +
            "    </header>\n" +
            "\n" +
            "    <!-- Download swatch -->\n" +
            "    <ul class=\"dn db-l mbx list-horizontal man pan tc\">\n" +
            "      <li>\n" +
            "        <a href=\"javascript:void(0)\"\n" +
            "          class=\"sg-options-link pam f2 icon-utility-download\"\n" +
            "          title=\"Download Color Swatches\"\n" +
            "          aria-hidden=\"true\"\n" +
            "          ng-click=\"downloadColorSwatches()\"\n" +
            "          data-section=\"{{set.id}}\">\n" +
            "        </a>\n" +
            "      </li>\n" +
            "    </ul>\n" +
            "\n" +
            "    <article ng-repeat=\"color in colors\" class=\"grid-cell plxl prxl pbxl\">\n" +
            "\n" +
            "      <!-- Subtitle -->\n" +
            "      <header class=\"mbx tc\">\n" +
            "        <h2 class=\"sg-h2 mw-32 center\">{{color.sub}}</h2>\n" +
            "      </header>\n" +
            "\n" +
            "      <!-- Swatch callout -->\n" +
            "      <div class=\"grid-cell grid-cell--center tc\">\n" +
            "        <div class=\"dib brs {{c.swatchClass}} mvs mhs {{c.className}}\" ng-repeat=\"c in color.colors\">\n" +
            "          <p class=\"pos-rel bg-1 man pvl phs sg-swatch-bg sg-text-meta tc caps border-top border--4\">\n" +
            "            <span class=\"fw-semibold\">{{c.label}}</span>\n" +
            "            <br>{{c.value}}</p>\n" +
            "        </div>\n" +
            "      </div>\n" +
            "\n" +
            "    </article>\n" +
            "  </section>\n" +
            "\n" +
            "\n" +
            "  <!-- Typography -->\n" +
            "  <section id=\"sg-typography\" class=\"bg-sct-med paxl\">\n" +
            "\n" +
            "    <header class=\"mbx tc\">\n" +
            "      <h1 class=\"sg-h1 mtn\">Typography</h1>\n" +
            "      <h2 class=\"sg-h2 mw-32 center\">Good typography adds personality to an application, and can help set tone in the absence of visual elements. Salesforce uses <b>Proxima Nova Soft</b> to create a friendly and inviting environment. <a href=\"http://www.myfonts.com/fonts/marksimonson/proxima-nova-soft\" title=\"Get Proxima Nova Soft\">Proxima Nova Soft</a> was designed by Mark Simonson in 2011 as a rounded version of Proxima Nova.</h2>\n" +
            "    </header>\n" +
            "    \n" +
            "    <!-- Weights -->\n" +
            "    <article class=\"grid-cell grid-cell--center mbxx tc\">\n" +
            "      <div class=\"dib brs sg-swatch--m mvs mhsx bg-1\">\n" +
            "        <h1 class=\"f-40 fw-normal man ptxx pbx\">Aa</h1>\n" +
            "        <p class=\"pos-rel bg-3 man pvx phs sg-weight-bg sg-text-meta fw-semibold tc caps\">Regular</p>\n" +
            "      </div>\n" +
            "      <div class=\"dib brs sg-swatch--m mvs mhsx bg-1\">\n" +
            "        <h1 class=\"f-40 fw-medium man ptxx pbx\">Aa</h1>\n" +
            "        <p class=\"pos-rel bg-3 man pvx phs sg-weight-bg sg-text-meta fw-semibold tc caps\">Medium</p>\n" +
            "      </div>\n" +
            "      <div class=\"dib brs sg-swatch--m mvs mhsx bg-1\">\n" +
            "        <h1 class=\"f-40 fw-semibold man ptxx pbx\">Aa</h1>\n" +
            "        <p class=\"pos-rel bg-3 man pvx phs sg-weight-bg sg-text-meta fw-semibold tc caps\">Semibold</p>\n" +
            "      </div>\n" +
            "      <div class=\"dib brs sg-swatch--m mvs mhsx bg-1\">\n" +
            "        <h1 class=\"f-40 fw-bold man ptxx pbx\">Aa</h1>\n" +
            "        <p class=\"pos-rel bg-3 man pvx phs sg-weight-bg sg-text-meta fw-semibold tc caps\">Bold</p>\n" +
            "      </div>\n" +
            "    </article>\n" +
            "\n" +
            "    <!-- Scale -->\n" +
            "    <article class=\"tc\">\n" +
            "      <h2 class=\"f3 fw-semibold mbn\">22px</h2>\n" +
            "      <p class=\"f1 mtn mbx\">The quick brown fox jumps over the lazy dog.</p>\n" +
            "      <h2 class=\"f3 fw-semibold mbn\">18px</h2>\n" +
            "      <p class=\"f2 mtn mbx\">The quick brown fox jumps over the lazy dog.</p>\n" +
            "      <h2 class=\"f3 fw-semibold mbn\">16px</h2>\n" +
            "      <p class=\"f3 mtn mbx\">The quick brown fox jumps over the lazy dog.</p>\n" +
            "      <h2 class=\"f3 fw-semibold mbn\">15px</h2>\n" +
            "      <p class=\"f4 mtn mbx\">The quick brown fox jumps over the lazy dog.</p>\n" +
            "      <h2 class=\"f3 fw-semibold mbn\">14px</h2>\n" +
            "      <p class=\"f5 mtn mbx\">The quick brown fox jumps over the lazy dog.</p>\n" +
            "      <h2 class=\"f3 fw-semibold mbn\">13px</h2>\n" +
            "      <p class=\"f6 mtn mbx\">The quick brown fox jumps over the lazy dog.</p>\n" +
            "    </article>\n" +
            "\n" +
            "  </section>\n" +
            "\n" +
            "\n" +
            "\n" +
            "  <section id=\"sg-icons\">\n" +
            "\n" +
            "    <div ng-repeat=\"set in iconSets\" id=\"{{set.id}}\" class=\"grid {{set.bgClass}} paxl\">\n" +
            "\n" +
            "      <header class=\"grid-cell mbx tc\">\n" +
            "        <h1 class=\"sg-h1 mtn\">{{set.label}}</h1>\n" +
            "        <h2 class=\"sg-h2 mw-32 center\">{{set.description}}</h2>\n" +
            "      </header>\n" +
            "      <article class=\"dn db-l mbx\">\n" +
            "        <ul class=\"list-horizontal man pan tc\">\n" +
            "          <li>\n" +
            "            <a href=\"javascript:void(0)\"\n" +
            "              class=\"sg-options-link ss-sun pam f2\"\n" +
            "              ng-click=\"toggleBackground(set.id)\"\n" +
            "              title=\"Toggle Background\"\n" +
            "              aria-hidden=\"true\"\n" +
            "              data-section=\"{{set.id}}\">\n" +
            "            </a>\n" +
            "          </li>\n" +
            "          <li>\n" +
            "            <a href=\"javascript:void(0)\"\n" +
            "              class=\"sg-options-link icon-utility-download pam f2\"\n" +
            "              ng-click=\"download(set.id)\"\n" +
            "              title=\"Download Icons\"\n" +
            "              aria-hidden=\"true\"\n" +
            "              data-section=\"{{set.id}}\">\n" +
            "            </a>\n" +
            "          </li>\n" +
            "        </ul>\n" +
            "      </article>\n" +
            "\n" +
            "      <article class=\"grid-cell grid-cell--center tc\">\n" +
            "\n" +
            "        <!-- This renders for standard and custom icons -->\n" +
            "        <div ng-if=\"set.isClass\">\n" +
            "          <div ng-repeat=\"file in set.files\" class=\"sg-icon dib\">\n" +
            "            <div class=\"sg-icon-art center {{file.class}}\" title=\"{{file.label}}\"></div>\n" +
            "            <p class=\"tc mts mbl caps text-truncate\" title=\"{{file.label}}\">\n" +
            "              <strong>{{file.label}}</strong>\n" +
            "            </p>\n" +
            "          </div>\n" +
            "        </div>\n" +
            "\n" +
            "        <!-- This renders for the icon font -->\n" +
            "        <div ng-if=\"set.isIconFont\">\n" +
            "          <div ng-repeat=\"file in set.files\" class=\"sg-icon dib\">\n" +
            "            <div class=\"sg-icon-art sg-icn--fnt center tc {{file.class}}\" title=\"{{file.label}}\"></div>\n" +
            "            <p class=\"tc mts mbl caps text-truncate\" title=\"{{file.label}}\">\n" +
            "              <strong>{{file.label}}</strong>\n" +
            "            </p>\n" +
            "          </div>\n" +
            "        </div>\n" +
            "\n" +
            "        <!-- This renders for file icons -->\n" +
            "        <div ng-if=\"set.isFile\">\n" +
            "          <div ng-repeat=\"file in set.files\" class=\"sg-icon dib\">\n" +
            "            <div class=\"sg-icon-art sg-icn--doc pos-rel center\">\n" +
            "              <img class=\"pos-rel center\" src=\"{{file.src}}\" title=\"{{file.label}}\">\n" +
            "            </div>\n" +
            "            <p class=\"tc mts mbl caps text-truncate\" title=\"{{file.label}}\">\n" +
            "              <strong>{{file.label}}</strong>\n" +
            "            </p>\n" +
            "          </div>\n" +
            "        </div>\n" +
            "\n" +
            "      </article>\n" +
            "\n" +
            "    </div>\n" +
            "\n" +
            "  </section>\n" +
            "\n" +
            "  <section id=\"sg-resources\" class=\"grid pos-rel bg-sct-med-drk\">\n" +
            "    <article class=\"grid-cell grid-cell--center tc\">\n" +
            "      <a href=\"assets/S1AppGuidelines.pdf\" title=\"Download Guidelines\" target=\"_blank\" class=\"sg-dwn brm db\">\n" +
            "        <img class=\"grayscale\" src=\"assets/icons/doctype/pdf_60.png\" title=\"Pdf\">\n" +
            "        <p class=\"tc mts caps\">Download Guidelines</p>\n" +
            "      </a>\n" +
            "    </article>\n" +
            "  </section>\n" +
            "\n" +
            "</div>\n"
    );

    $templateCache.put("sgSandbox.html",
            "<section class=\"mam\">\n" +
            "Sandbox  \n" +
            "</section>\n"
    );

    $templateCache.put("sgSubnav.html",
            "<div id=\"sg-subnav\" class=\"dn db-ns bg-1 border-top border--4 clear\">\n" +
            "\t<ul class=\"list-horizontal fr mrl\">\n" +
            "\t\t<li ng-repeat=\"nav in subnavItems\" ng-click=\"selectSubnav(nav)\">\n" +
            "\t\t\t<a href=\"javascript:void(0)\" class=\"pvl phm f5\">{{nav.title}}</a>\n" +
            "\t\t</li>\n" +
            "\t</ul>\n" +
            "</div>\n"
    );

    $templateCache.put("component/s1AnchorDark.html",
            "<header class=\"bg-anchor tc ptm\">\n" +
            "  <div class=\"icon icon--d icon--{{anchordarkicon || 'contact'}} sq-60\"></div>\n" +
            "  <h1 class=\"f1 text-color-5 man\">\n" +
            "    {{anchordarktitle || 'James Bakersfield'}}\n" +
            "  </h1>\n" +
            "  <h2 class=\"f3 text-color-5 opacity-40 man pbm\">\n" +
            "    {{anchordarkdescription || 'CEO | Trinidad Corp. | (635) 519-3762'}}\n" +
            "  </h2>\n" +
            "  <ul class=\"list-horizontal grid bg-5 ht-44 f2\" role=\"menubar\">\n" +
            "    <li class=\"size-1of3 grid-cell lh-44 tc\">\n" +
            "      <a href=\"javascript: void(0)\" title=\"Email\" class=\"ptxs\" role=\"menuitem\">\n" +
            "        <span class=\"icon-utility-email sq-20 text-color-5 active-dim\"></span>\n" +
            "        <span class=\"tha\">email</span>\n" +
            "      </a>\n" +
            "    </li>\n" +
            "    <li class=\"size-1of3 grid-cell lh-44 tc\">\n" +
            "      <a href=\"javascript: void(0)\" title=\"Call\" class=\"ptxs\" role=\"menuitem\">\n" +
            "        <span class=\"icon-utility-call sq-20 text-color-5 active-dim\"></span>\n" +
            "        <span class=\"tha\">call</span>\n" +
            "      </a>\n" +
            "    </li>\n" +
            "    <li class=\"size-1of3 grid-cell lh-44 tc\">\n" +
            "      <a href=\"javascript: void(0)\" title=\"Map\" class=\"ptxs\" role=\"menuitem\">\n" +
            "        <span class=\"icon-utility-location sq-20 text-color-5 active-dim\"></span>\n" +
            "        <span class=\"tha\">map</span>\n" +
            "      </a>\n" +
            "    </li>\n" +
            "  </ul>\n" +
            "</header>"
    );

    $templateCache.put("component/s1AnchorLightDefault.html",
            "<header class=\"bg-1 border-bottom border--3\">\n" +
            "  <div class=\"icon icon--{{anchorlighticon || 'opportunity'}} brs bgs-100 a-mid mhm sq-30\"></div>\n" +
            "  <h1 class=\"dib thin a-mid\">\n" +
            "    <span class=\"db f6 lower\">\n" +
            "      {{anchorlightlabel || 'recent'}}\n" +
            "    </span>\n" +
            "    <span class=\"db f3 text-color-1\">\n" +
            "      {{anchorlighttitle || 'Opportunities'}}\n" +
            "    </span>\n" +
            "  </h1>\n" +
            "  <button class=\"btn btn--secondary bg-secondary-btn brm pvs phm border border--3 fr mrm mvm text-color-4 f4 fw-semibold\">\n" +
            "      {{anchorlightbuttonlabel || 'New'}}\n" +
            "  </button>\n" +
            "</header>"
    );

    $templateCache.put("component/s1AnchorLightLabelonBottom.html",
            "<header class=\"bg-1 border-bottom border--3\">\n" +
            "  <div class=\"icon icon--{{anchorlightbottomicon || 'account'}} brs bgs-100 a-mid mhm sq-30\"></div>\n" +
            "  <h1 class=\"dib thin a-mid\">\n" +
            "    <span class=\"db f3 text-color-1\">\n" +
            "      {{anchorlightbottomtitle || 'Accounts'}}\n" +
            "    </span>\n" +
            "    <span class=\"db f6 lower\">\n" +
            "      {{anchorlightbottomlabel || '14 results'}}\n" +
            "    </span>\n" +
            "  </h1>\n" +
            "  <button class=\"btn btn--secondary bg-secondary-btn brm pvs phm border border--3 fr mrm mvm text-color-4 f4 fw-semibold\">\n" +
            "      {{anchorlightbuttonbottomlabel || 'New'}}\n" +
            "  </button>\n" +
            "</header>"
    );

    $templateCache.put("component/s1AnchorLightNoBackground.html",
            "<header class=\"bg-2\">\n" +
            "  <div class=\"icon icon--{{anchorlightnobgicon || 'lead'}} brs bgs-100 a-mid mhm sq-30\"></div>\n" +
            "  <h1 class=\"dib thin a-mid\">\n" +
            "    <span class=\"db f3 text-color-1\">\n" +
            "      {{anchorlightnobgtitle || 'Leads'}}\n" +
            "    </span>\n" +
            "    <span class=\"db f6 lower\">\n" +
            "      {{anchorlightnobglabel || '10 results'}}\n" +
            "    </span>\n" +
            "  </h1>\n" +
            "</header>"
    );

    $templateCache.put("component/s1AvatarAttending.html",
            "<div class=\"pos-rel sq-30\">\n" +
            "  <img src=\"{{avatarfollowingimage}}\" width=\"30\" height=\"30\" alt=\"gt\" class=\"brm\">\n" +
            "  <img src=\"assets/icons/feed/checkmark_badge.png\" class=\"avatar-badge pos-abs\" alt=\"following\">\n" +
            "</div>"
    );

    $templateCache.put("component/s1AvatarDefault.html",
        "<img src=\"{{avatarimage || 'https://s3.amazonaws.com/uifaces/faces/twitter/gt/128.jpg'}}\" width=\"45\" height=\"45\" alt=\"gt\" class=\"brm\">"
    );

    $templateCache.put("component/s1ButtonGroups.html",
            "    <div class=\"phm\">\n" +
            "        <button class=\"btn bg-secondary-btn btn--secondary pvs phx fr mlm brm border border--3\">\n" +
            "            <span class=\"text-color-4 icon-utility-down f3 fw-semibold\"></span>\n" +
            "        </button>\n" +
            "        <div class=\"size-fill\">\n" +
            "            <button class=\"btn bg-secondary-btn btn--secondary pvs size-full brm border border--3\">\n" +
            "                <span class=\"text-color-4 f3 fw-semibold\">{{buttongrouplabel || 'New'}}</span>\n" +
            "            </button>\n" +
            "        </div>\n" +
            "    </div>"
    );

    $templateCache.put("component/s1ButtonPrimaryDefault.html",
            "<button class=\"btn bg-primary-btn btn--primary pvs size-full brm no-border\">\n" +
            "  <span class=\"text-color-5 f3 fw-semibold\">{{buttonprimarylabel || 'Primary Button'}}</span>\n" +
            "</button>"
    );

    $templateCache.put("component/s1ButtonPrimaryDisabled.html",
            "<button disabled class=\"btn bg-primary-btn btn--primary pvs size-full brm no-border\">\n" +
            "  <span class=\"text-color-5 f3 fw-semibold\">Primary Button</span>\n" +
            "</button>"
    );

    $templateCache.put("component/s1ButtonSecondaryDefault.html",
            "<button class=\"btn bg-secondary-btn btn--secondary pvs size-full brm border border--3\">\n" +
            "  <span class=\"text-color-4 f3 fw-semibold\">{{buttonsecondarylabel || 'Secondary Button'}}</span>\n" +
            "</button>"
    );

    $templateCache.put("component/s1ButtonSecondaryDisabled.html",
            "<button disabled class=\"btn bg-secondary-btn btn--secondary pvs size-full brm border border--3\">\n" +
            "  <span class=\"text-color-4 f3 fw-semibold\">Secondary Button</span>\n" +
            "</button>"
    );

    $templateCache.put("component/s1ButtonTertiary.html",
            "<a href=\"javascript:void(0)\" title=\"Like\" name=\"like\" class=\"f5 fl\">\n" +
            "  <span class=\"dib mrs icon-utility-like f4\"></span>\n" +
            "  Liked\n" +
            "</a>"
    );

    $templateCache.put("component/s1Calendar.html",
            "<table class=\"fixed-table\">\n" +
            "  <caption class=\"bg-2 phm ptm pbs tc\">\n" +
            "    <a class=\"fl\" title=\"Left\">\n" +
            "      <span class=\"text-color-2 f4 lh-20 icon-utility-left\"></span>\n" +
            "    </a>\n" +
            "    <a class=\"fr\" title=\"Right\">\n" +
            "      <span class=\"text-color-2 f4 lh-20 icon-utility-right\"></span>\n" +
            "    </a>\n" +
            "    <h1 class=\"text-color-1 dib man fw-bold f3\">March 2014</h1>\n" +
            "  </caption>\n" +
            "  <thead class=\"bg-2 text-color-2 caps f6\">\n" +
            "    <tr>\n" +
            "      <th class=\"fw-normal pbs tc\">Sun</th>\n" +
            "      <th class=\"fw-normal pbs tc\">Mon</th>\n" +
            "      <th class=\"fw-normal pbs tc\">Tue</th>\n" +
            "      <th class=\"fw-normal pbs tc\">Wed</th>\n" +
            "      <th class=\"fw-normal pbs tc\">Thu</th>\n" +
            "      <th class=\"fw-normal pbs tc\">Fri</th>\n" +
            "      <th class=\"fw-normal pbs tc\">Sat</th>\n" +
            "    </tr>\n" +
            "  </thead>\n" +
            "  <tbody class=\"bg-1 f2 tc\">\n" +
            "    <tr class=\"cal-row\">\n" +
            "      <td class=\"cal-cell cal-cell--top pvm fw-normal text-color-2 bg-3\">24</td>\n" +
            "      <td class=\"cal-cell cal-cell--top pvm fw-normal text-color-2 bg-3\">25</td>\n" +
            "      <td class=\"cal-cell cal-cell--top pvm fw-normal text-color-2 bg-3\">26</td>\n" +
            "      <td class=\"cal-cell cal-cell--top pvm fw-normal text-color-2 bg-3\">27</td>\n" +
            "      <td class=\"cal-cell cal-cell--top pvm fw-normal text-color-2 bg-3\">28</td>\n" +
            "      <td class=\"cal-cell cal-cell--top pvm text-color-1\">1</td>\n" +
            "      <td class=\"cal-cell cal-cell--top pvm text-color-1\">2</td>\n" +
            "    </tr>\n" +
            "    <tr class=\"cal-row\">\n" +
            "      <td class=\"cal-cell pvm text-color-1\">3</td>\n" +
            "      <td class=\"cal-cell pvm text-color-1\">4</td>\n" +
            "      <td class=\"cal-cell pvm text-color-1\">5</td>\n" +
            "      <td class=\"cal-cell pvm text-color-1\">6</td>\n" +
            "      <td class=\"cal-cell pvm text-color-1\">7</td>\n" +
            "      <td class=\"cal-cell pvm text-color-1\">8</td>\n" +
            "      <td class=\"cal-cell pvm text-color-1\">9</td>\n" +
            "    </tr>\n" +
            "    <tr class=\"cal-row\">\n" +
            "      <td class=\"cal-cell pvm text-color-1\">10</td>\n" +
            "      <td class=\"cal-cell pvm text-color-1\">11</td>\n" +
            "      <td class=\"cal-cell pvm text-color-1\">12</td>\n" +
            "      <td class=\"cal-cell pvm text-color-1\">13</td>\n" +
            "      <td class=\"cal-cell pvm text-color-1\">14</td>\n" +
            "      <td class=\"cal-cell pvm text-color-1\">15</td>\n" +
            "      <td class=\"cal-cell pvm text-color-1\">16</td>\n" +
            "    </tr>\n" +
            "    <tr class=\"cal-row\">\n" +
            "      <td class=\"cal-cell pvm text-color-1\">17</td>\n" +
            "      <td class=\"cal-cell pvm text-color-1\">18</td>\n" +
            "      <td class=\"cal-cell pvm text-color-1\">19</td>\n" +
            "      <td class=\"cal-cell pvm text-color-1\">20</td>\n" +
            "      <td class=\"cal-cell pvm text-color-1\">21</td>\n" +
            "      <td class=\"cal-cell pvm text-color-1\">22</td>\n" +
            "      <td class=\"cal-cell pvm text-color-1\">23</td>\n" +
            "    </tr>\n" +
            "    <tr class=\"cal-row\">\n" +
            "      <td class=\"cal-cell pvm text-color-1\">24</td>\n" +
            "      <td class=\"cal-cell pvm text-color-1\">25</td>\n" +
            "      <td class=\"cal-cell cal-cell--selected pvm bg-primary-btn wht\">26</td>\n" +
            "      <td class=\"cal-cell pvm text-color-1\">27</td>\n" +
            "      <td class=\"cal-cell pvm text-color-1\">28</td>\n" +
            "      <td class=\"cal-cell pvm text-color-1\">29</td>\n" +
            "      <td class=\"cal-cell pvm text-color-1\">30</td>\n" +
            "    </tr>\n" +
            "    <tr class=\"cal-row\">\n" +
            "      <td class=\"cal-cell cal-cell--bot pvm text-color-1\">31</td>\n" +
            "      <td class=\"cal-cell cal-cell--bot pvm fw-normal text-color-2 bg-3\">1</td>\n" +
            "      <td class=\"cal-cell cal-cell--bot pvm fw-normal text-color-2 bg-3\">2</td>\n" +
            "      <td class=\"cal-cell cal-cell--bot pvm fw-normal text-color-2 bg-3\">3</td>\n" +
            "      <td class=\"cal-cell cal-cell--bot pvm fw-normal text-color-2 bg-3\">4</td>\n" +
            "      <td class=\"cal-cell cal-cell--bot pvm fw-normal text-color-2 bg-3\">5</td>\n" +
            "      <td class=\"cal-cell cal-cell--bot pvm fw-normal text-color-2 bg-3\">6</td>\n" +
            "    </tr>\n" +
            "  </tbody>\n" +
            "</table>"
    );

    $templateCache.put("component/s1CardAccount.html",
            "<article class=\"mam bg-1 border border--3 pam brm\">\n" +
            "        <h1 class=\"man f3 text-color-1 fw-semibold\">\n" +
            "            {{accountcardtitle || 'United Partners, Inc.'}}\n" +
            "        </h1>\n" +
            "  <ul class=\"list-plain man pan\">\n" +
            "    <li class=\"f5 text-color-2\">{{accountcarddetail1 || 'San Francisco, CA'}}</li>\n" +
            "    <li class=\"f5 text-color-2\">{{accountcarddetail2 || 'Enterprise Customer'}}</li>\n" +
            "  </ul>\n" +
            "</article>"
    );

    $templateCache.put("component/s1CardCase.html",
            "<article class=\"mam bg-1 border border--3 pam brm\">\n" +
            "        <h1 class=\"mtn mbs f3 text-color-1 fw-semibold\">\n" +
            "            {{casecardtitle || 'SSO login issue on mobile'}}\n" +
            "        </h1>\n" +
            "  <ul class=\"clear list-plain man pan\">\n" +
            "    <li class=\"fl f5 text-color-2\">{{casecarddetail1 || 'Medium'}} &#8226; {{casecarddetail2 || 'New'}}</li>\n" +
            "    <li class=\"fr f5 text-color-2\">#{{casecarddetail3 || '00001015'}}</li>\n" +
            "  </ul>\n" +
            "</article>"
    );

    $templateCache.put("component/s1CardChatter.html",
            "<article class=\"mam bg-1 border border--3 pam brm\">\n" +
            "  <div class=\"flag\">\n" +
            "    <div class=\"flag--image prm\">\n" +
            "                <div class=\"icon icon--{{chattercardicon || 'avatar'}} brs bgs-100 a-mid sq-30\"></div>\n" +
            "    </div>\n" +
            "    <div class=\"flag--body\">\n" +
            "      <h1 class=\"man f3 text-color-1 fw-semibold\">\n" +
            "        {{chattercardtitle || 'John Miller'}}\n" +
            "      </h1>\n" +
            "                <p class=\"man f5 text-color-2\">{{chattercarddetail1 || 'Chief Architect'}}</li>\n" +
            "    </div>\n" +
            "  </div>\n" +
            "</article>"
    );

    $templateCache.put("component/s1CardContact.html",
            "<article class=\"mam bg-1 border border--3 pam brm\">\n" +
            "  <div class=\"mbs flag flag--rev\">\n" +
            "    <div class=\"flag--body\">\n" +
            "      <h1 class=\"man f3 text-color-1 fw-semibold\">\n" +
            "        {{contactcardtitle || 'Jonathan Perilla-Jones'}}\n" +
            "      </h1>\n" +
            "    </div>\n" +
            "    <div class=\"flag--image prm\">\n" +
            "                <div class=\"icon icon--{{contactcardicon || 'contact'}} brs bgs-100 a-mid sq-30\"></div>\n" +
            "    </div>\n" +
            "  </div>\n" +
            "  <ul class=\"list-plain man pan\">\n" +
            "    <li class=\"f5 text-color-2\">{{contactcarddetail1 || 'Director of Consumer Sales'}}</li>\n" +
            "    <li class=\"f5 text-color-2\">{{contactcarddetail2 || 'United Partners'}}</li>\n" +
            "    <li class=\"f5 text-color-2\">{{contactcarddetail3 || '(415) 432-5456'}}</li>\n" +
            "  </ul>\n" +
            "</article>"
    );

    $templateCache.put("component/s1CardCustomObject.html",
            "<article class=\"mam bg-1 border border--3 pam brm\">\n" +
            "        <h1 class=\"mtn mbs f3 text-color-1 fw-semibold\">\n" +
            "            {{customcardtitle || 'W-1534215'}}\n" +
            "        </h1>\n" +
            "  <dl class=\"clear list-plain man pan\">\n" +
            "            <dt class=\"fl wid-third text-truncate f5 text-color-2\">{{customcardlabel1 || 'Record Type'}}</dt>\n" +
            "    <dd class=\"man plm wid-twothird fl text-truncate f5 text-color-1\">{{customcarddetail1 || 'Bug'}}</dd>\n" +
            "            <dt class=\"cl wid-third fl text-truncate f5 text-color-2\">{{customcardlabel2 || 'Subject'}}</dt>\n" +
            "    <dd class=\"man plm wid-twothird fl text-truncate f5 text-color-1\">{{customcarddetail2 || '186 Splits Blitz: Opportunity'}}</dd>\n" +
            "            <dt class=\"cl wid-third fl text-truncate f5 text-color-2\">{{customcardlabel3 || 'Status'}}</dt>\n" +
            "    <dd class=\"man plm wid-twothird fl text-truncate f5 text-color-1\">{{customcarddetail3 || 'New'}}</dd>\n" +
            "            <dt class=\"cl wid-third fl text-truncate f5 text-color-2\">{{customcardlabel4 || 'Priority'}}</dt>\n" +
            "    <dd class=\"man plm wid-twothird fl text-truncate f5 text-color-1\">{{customcarddetail4 || 'P1'}}</dd>\n" +
            "  </dl>\n" +
            "</article>"
    );

    $templateCache.put("component/s1CardEvent.html",
            "<article class=\"mam bg-1 border border--3 pam brm\">\n" +
            "        <time datetime=\"10:00\" class=\"f1 text-color-1 dib mrs\">{{eventcardtime || '10am'}}</time>\n" +
            "        <span class=\"f6 text-color-2 mbs dib\">{{eventcardduration || '1 hour'}}</span>\n" +
            "        <h1 class=\"man f3 text-color-1 fw-semibold\">\n" +
            "            <a href=\"javascript:void(0)\">\n" +
            "                {{eventcardtitle || 'Green Dot Media Product Demo'}}\n" +
            "            </a>\n" +
            "        </h1>\n" +
            "        <p class=\"mtn mbm f4 text-color-2 text-truncate\">\n" +
            "            {{eventcarddetail1 || '1565 Saint Peters Street, San Francisco CA'}}\n" +
            "        </p>\n" +
            "        <hr class=\"hr hr--2\">\n" +
            "  <ul class=\"list-plain man pan\">\n" +
            "    <li class=\"text-truncate f5 text-color-2\">{{eventcarddetail2 || 'Jason Brenamen from Durable Materials'}}</li>\n" +
            "    <li class=\"text-truncate f5 text-color-2\">{{eventcarddetail3 || 'Your colleague Sally J. and 3 others'}}</li>\n" +
            "  </ul>\n" +
            "</article>"
    );

    $templateCache.put("component/s1CardFile.html",
            "<article class=\"mam bg-1 border border--3 pam brm\">\n" +
            "  <div class=\"flag flag--top\">\n" +
            "    <div class=\"flag--image prm\">\n" +
            "                <img class=\"ht-30\" src=\"assets/icons/doctype/{{filecardicon || 'pdf'}}_120.png\">\n" +
            "    </div>\n" +
            "    <div class=\"flag--body\">\n" +
            "      <h1 class=\"man f3 text-color-1 fw-semibold\">\n" +
            "        {{filecardtitle || 'Q4 First Call Template'}}\n" +
            "      </h1>\n" +
            "                <ul class=\"list-plain man pan\">\n" +
            "                    <li class=\"f5 text-color-2\">{{filecarddetail1 || 'Yuri Sebata-Dempster'}}</li>\n" +
            "                    <li class=\"dib f5 text-color-2\">{{filecarddetail2 || 'Sep 23, 2011'}} &#8226; </li>\n" +
            "                    <li class=\"dib f5 text-color-2\">{{filecarddetail3 || '23MB'}} &#8226; </li>\n" +
            "                    <li class=\"dib f5 text-color-2\">{{filecarddetail4 || 'pdf'}}</li>\n" +
            "                </ul>\n" +
            "    </div>\n" +
            "  </div>\n" +
            "</article>"
    );

    $templateCache.put("component/s1CardListheader.html",
            "<article class=\"mam bg-1 border border--3 brm\">\n" +
            "  <header class=\"pam ht-44 clear\">\n" +
            "    <h1 class=\"fl man fw-normal f5 text-color-1\">{{cardlistlabel}}</h1>\n" +
            "    <a href=\"javascript:void(0)\" title=\"More\" class=\"fr\">\n" +
            "      <span class=\"fl f5\">More</span>\n" +
            "      <span class=\"fl lh-20 mlxs f6 text-color-3 icon-utility-right\"></span>\n" +
            "    </a>\n" +
            "  </header>\n" +
            "</article>"
    );

    $templateCache.put("component/s1CardOpportunity.html",
            "<article class=\"mam bg-1 border border--3 pam brm\">\n" +
            "        <h1 class=\"man f3 text-color-1 fw-semibold\">\n" +
            "            {{opptycardtitle || 'Mobile Platform Licenses (450)'}}\n" +
            "        </h1>\n" +
            "  <ul class=\"clear list-plain man pan\">\n" +
            "    <li class=\"mbs f5 text-color-2\">{{opptycarddetail1 || 'Negotiation/Review'}} &#8226; {{opptycarddetail2 || 'United Partners'}}</li>\n" +
            "    <li class=\"fl f3 text-color-1\">${{opptycarddetail3 || '11,875'}}</li>\n" +
            "    <li class=\"fr f3 text-color-1\">{{opptycarddetail4 || '7/25/13'}}</li>\n" +
            "  </ul>\n" +
            "</article>"
    );

    $templateCache.put("component/s1CardRelatedList.html",
            "<article class=\"mam bg-1 border border--3 brm\">\n" +
            "  <header class=\"clear pam border-bottom border--5\">\n" +
            "    <h1 class=\"fl man fw-normal f5 text-color-1\">Contacts</h1>\n" +
            "    <a href=\"javascript:void(0)\" title=\"More\" class=\"fr\">\n" +
            "      <span class=\"fl f5 text-color-1\">More</span>\n" +
            "      <span class=\"lh-16 fl mls f6 text-color-3 icon-utility-right\"></span>\n" +
            "    </a>\n" +
            "  </header>\n" +
            "  <ul class=\"man pan list-plain\">\n" +
            "    <li class=\"pam border-bottom border--5\">\n" +
            "      <div class=\"mbs flag flag--rev\">\n" +
            "        <div class=\"flag--body\">\n" +
            "          <span class=\"f3 text-color-1 fw-semibold\">Jonathan Perilla-Jones</span>\n" +
            "        </div>\n" +
            "        <div class=\"flag--image prm\">\n" +
            "                        <div class=\"icon icon--contact brs bgs-100 a-mid sq-30\"></div>\n" +
            "        </div>\n" +
            "      </div>\n" +
            "      <ul class=\"list-plain man pan\">\n" +
            "        <li class=\"f5 text-color-2\">Director of Consumer Sales</li>\n" +
            "        <li class=\"f5 text-color-2\">United Partners</li>\n" +
            "        <li class=\"f5 text-color-2\">(415)432-5456</li>\n" +
            "      </ul>\n" +
            "    </li>\n" +
            "    <li class=\"pam border-bottom border--5\">\n" +
            "      <div class=\"mbs flag flag--rev\">\n" +
            "        <div class=\"flag--body\">\n" +
            "          <span class=\"f3 text-color-1 fw-semibold\">Jonathan Perilla-Jones</span>\n" +
            "        </div>\n" +
            "        <div class=\"flag--image prm\">\n" +
            "                        <div class=\"icon icon--contact brs bgs-100 a-mid sq-30\"></div>\n" +
            "        </div>\n" +
            "      </div>\n" +
            "      <ul class=\"list-plain man pan\">\n" +
            "        <li class=\"f5 text-color-2\">Director of Consumer Sales</li>\n" +
            "        <li class=\"f5 text-color-2\">United Partners</li>\n" +
            "        <li class=\"f5 text-color-2\">(415)432-5456</li>\n" +
            "      </ul>\n" +
            "    </li>\n" +
            "    <li class=\"pam\">\n" +
            "      <div class=\"mbs flag flag--rev\">\n" +
            "        <div class=\"flag--body\">\n" +
            "          <span class=\"f3 text-color-1 fw-semibold\">Jonathan Perilla-Jones</span>\n" +
            "        </div>\n" +
            "        <div class=\"flag--image prm\">\n" +
            "                        <div class=\"icon icon--contact brs bgs-100 a-mid sq-30\"></div>\n" +
            "        </div>\n" +
            "      </div>\n" +
            "      <ul class=\"list-plain man pan\">\n" +
            "        <li class=\"f5 text-color-2\">Director of Consumer Sales</li>\n" +
            "        <li class=\"f5 text-color-2\">United Partners</li>\n" +
            "        <li class=\"f5 text-color-2\">(415)432-5456</li>\n" +
            "      </ul>\n" +
            "    </li>\n" +
            "  </ul>\n" +
            "</article>"
    );

    $templateCache.put("component/s1CardTask.html",
            "<article class=\"mam bg-1 border border--3 pam brm\">\n" +
            "        <div class=\"flag flag--top\">\n" +
            "            <div class=\"prm flag--image\">\n" +
            "                <input\n" +
            "                    class=\"checkbox checkbox--default checkbox--states-1 brm bg-secondary-btn sq-22 a-mid dib\"\n" +
            "                    type=\"checkbox\"\n" +
            "                    id=\"task-1\">\n" +
            "            </div>\n" +
            "            <div class=\"flag--body\">\n" +
            "                <label for=\"task-1\">\n" +
            "                    <h1 class=\"dib man f3 text-color-1\">\n" +
            "                        {{taskcardtitle || 'Final Decision'}}\n" +
            "                    </h1>\n" +
            "                    <ul class=\"clear list-plain man pan\">\n" +
            "                        <li class=\"f5 text-truncate text-color-2\">{{taskcarddetail1 || 'United Partners'}}</li>\n" +
            "                        <li class=\"f5 text-truncate text-color-2\">{{taskcarddetail2 || 'Allison Nishida'}}</li>\n" +
            "                    </ul>\n" +
            "                </label>\n" +
            "            </div>\n" +
            "            <div class=\"prn plm flag--image\">\n" +
            "                <time datetime=\"2009-02-21\" class=\"f6 text-color-2\">{{taskcarddetail3 || 'Feb 21'}}</time>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "</article>"
    );

    $templateCache.put("component/s1Checkbox.html",
            "<section>\n" +
            "  <article class=\"mbm db\">\n" +
            "    <input type=\"checkbox\" class=\"checkbox checkbox--default checkbox--states-1 brm mrs bg-secondary-btn sq-22 a-mid dib\" id=\"checkbox-1a\" checked>\n" +
            "    <label class=\"f4 text-color-1\" for=\"checkbox-1a\">{{checkboxlabel || 'Filter 1'}}</label>\n" +
            "  </article>\n" +
            "  <article class=\"db\">\n" +
            "    <input type=\"checkbox\" class=\"checkbox checkbox--default checkbox--states-1 brm mrs bg-secondary-btn sq-22 a-mid dib\" id=\"checkbox-2a\">\n" +
            "    <label class=\"f4 text-color-1\" for=\"checkbox-2a\">{{checkboxlabel}}</label>\n" +
            "  </article>\n" +
            "</section>"
    );

    $templateCache.put("component/s1CheckboxDisabled.html",
            "<section>\n" +
            "  <article class=\"mbm db\">\n" +
            "    <input type=\"checkbox\" class=\"checkbox checkbox--default checkbox--states-1 brm mrs bg-secondary-btn sq-22 a-mid clear dib\" id=\"checkbox-1b\" checked>\n" +
            "    <label class=\"f4 text-color-1\" for=\"checkbox-1b\">Filter 2</label>\n" +
            "  </article>\n" +
            "  <article class=\"db\">\n" +
            "    <input type=\"checkbox\" class=\"checkbox checkbox--default checkbox--states-1 brm mrs bg-secondary-btn sq-22 a-mid clear dib\" id=\"checkbox-2b\" disabled>\n" +
            "    <label class=\"f4 text-color-1\" for=\"checkbox-2b\">Filter 2 (Disabled)</label>\n" +
            "  </article>\n" +
            "</section>"
    );

    $templateCache.put("component/s1CommentPublisherDefault.html",
            "<footer class=\"border-top border--3 bg-generic-1 ht-44 \" role=\"group\">\n" +
            "  <a href=\"javascript:void(0)\" title=\"close\" class=\"btn--secondary brm border bg-secondary-btn border--transparent fl mts mls ht-30 phs\">\n" +
            "    <span class=\"text-color-4 f4 icon-utility-adduser lh-30\"></span>\n" +
            "  </a>\n" +
            "  <a href=\"javascript:void(0)\" title=\"close\" class=\"btn--primary brm border bg-primary-btn border--transparent fr mts mrs ht-30 phs\">\n" +
            "    <span class=\"wht fw-semibold f5 lh-30\">Send</span>\n" +
            "  </a>\n" +
            "  <div class=\"pos-rel size-fill phs pvs\">\n" +
            "    <label class=\"label--icon-r-sm icon-utility-attach f6\">\n" +
            "      <span class=\"dn\">URL</span>\n" +
            "    </label>\n" +
            "    <input\n" +
            "      type=\"text\"\n" +
            "      name=\"default\"\n" +
            "      placeholder=\"Write a comment...\"\n" +
            "      class=\"size-full phs ht-30 input input--white input--ph-1 input--focus-1\">\n" +
            "  </div>\n" +
            "</footer>"
    );

    $templateCache.put("component/s1CommentPublisherWithWarning.html",
            "<p class=\"border-top border-bottom border--3 bg-generic-1 pas man f6 text-color-1\">\n" +
            "    This is an example of a warning message that appears inside the composer screen.\n" +
            "</p>\n" +
            "<footer class=\"ht-44 bg-generic-1\" role=\"group\">\n" +
            "  <a href=\"javascript:void(0)\" title=\"close\" class=\"btn--secondary brm border bg-secondary-btn border--transparent fl mts mls ht-30 phs\">\n" +
            "    <span class=\"text-color-4 f4 icon-utility-adduser lh-30\"></span>\n" +
            "  </a>\n" +
            "  <a href=\"javascript:void(0)\" title=\"close\" class=\"btn--primary brm border bg-primary-btn border--transparent fr mts mrs ht-30 phs\">\n" +
            "    <span class=\"wht fw-semibold f5 lh-30\">Send</span>\n" +
            "  </a>\n" +
            "  <div class=\"pos-rel size-fill phs pvs\">\n" +
            "    <label class=\"label--icon-r-sm icon-utility-attach f6\">\n" +
            "      <span class=\"dn\">URL</span>\n" +
            "    </label>\n" +
            "    <input\n" +
            "      type=\"text\"\n" +
            "      name=\"default\"\n" +
            "      placeholder=\"Write a comment...\"\n" +
            "      class=\"size-full phs ht-30 input input--white input--ph-1 input--focus-1\">\n" +
            "  </div>\n" +
            "</footer>"
    );

    $templateCache.put("component/s1DropDownDefault.html",
            "<ul class=\"list-plain man pan brm bg-1 border border--3\">\n" +
            "  <li class=\"brtopm active--list-3 pam border-bottom border--5\">\n" +
            "    <span class=\"f4 text-color-1\">{{dropdowndefaultitem1 || 'James Kenney'}}</span>\n" +
            "  </li>\n" +
            "  <li class=\"active--list-3 pam border-bottom border--5\">\n" +
            "    <span class=\"f4 text-color-1\">{{dropdowndefaultitem2 || 'Khaya Cohen'}}</span>\n" +
            "  </li>\n" +
            "  <li class=\"active--list-3 pam border-bottom border--5\">\n" +
            "    <span class=\"f4 text-color-1\">{{dropdowndefaultitem3 || 'Scott Hoying'}}</span>\n" +
            "  </li>\n" +
            "  <li class=\"active--list-3 pam border-bottom border--5\">\n" +
            "    <span class=\"f4 text-color-1\">{{dropdowndefaultitem4 || 'Mitchell Grassi'}}</span>\n" +
            "  </li>\n" +
            "  <li class=\"active--list-3 pam border-bottom border--5\">\n" +
            "    <span class=\"f4 text-color-1\">{{dropdowndefaultitem5 || 'Avi Kaplan'}}</span>\n" +
            "  </li>\n" +
            "  <li class=\"brbotm active--list-3 pam\">\n" +
            "    <span class=\"f4 text-color-1\">{{dropdowndefaultitem6 || 'Kevin Olusula'}}</span>\n" +
            "  </li>\n" +
            "</ul>"
    );

    $templateCache.put("component/s1DropDownWithPhoto.html",
            "<ul class=\"man pan brm bg-1 border border--3\">\n" +
            "  <li class=\"brtopm db active--list-3 pam border-bottom border--5\">\n" +
            "    <div class=\"flag\">\n" +
            "      <div class=\"flag--image prm\">\n" +
            "        <img src=\"{{dropdownwithphotoimage || 'https://s3.amazonaws.com/uifaces/faces/twitter/gt/128.jpg'}}\" class=\"brm\" alt=\"gt\" width=\"25\" height=\"25\">\n" +
            "      </div>\n" +
            "      <div class=\"flag--body\">\n" +
            "        <span class=\"f4 text-color-1\">{{dropdownwithphotoitem1 || 'James Kenney'}}</span>\n" +
            "      </div>\n" +
            "    </div>\n" +
            "  </li>\n" +
            "  <li class=\"db active--list-3 pam border-bottom border--5\">\n" +
            "    <div class=\"flag\">\n" +
            "      <div class=\"flag--image prm\">\n" +
            "        <img src=\"{{dropdownwithphotoimage}}\" class=\"brm\" alt=\"gt\" width=\"25\" height=\"25\">\n" +
            "      </div>\n" +
            "      <div class=\"flag--body\">\n" +
            "        <span class=\"f4 text-color-1\">{{dropdownwithphotoitem2 || 'Khaya Cohen'}}</span>\n" +
            "      </div>\n" +
            "    </div>\n" +
            "  </li>\n" +
            "  <li class=\"db active--list-3 pam border-bottom border--5\">\n" +
            "    <div class=\"flag\">\n" +
            "      <div class=\"flag--image prm\">\n" +
            "        <img src=\"{{dropdownwithphotoimage}}\" class=\"brm\" alt=\"gt\" width=\"25\" height=\"25\">\n" +
            "      </div>\n" +
            "      <div class=\"flag--body\">\n" +
            "        <span class=\"f4 text-color-1\">{{dropdownwithphotoitem3 || 'Scott Hoying'}}</span>\n" +
            "      </div>\n" +
            "    </div>\n" +
            "  </li>\n" +
            "  <li class=\"db active--list-3 pam border-bottom border--5\">\n" +
            "    <div class=\"flag\">\n" +
            "      <div class=\"flag--image prm\">\n" +
            "        <img src=\"{{dropdownwithphotoimage}}\" class=\"brm\" alt=\"gt\" width=\"25\" height=\"25\">\n" +
            "      </div>\n" +
            "      <div class=\"flag--body\">\n" +
            "        <span class=\"f4 text-color-1\">{{dropdownwithphotoitem4 || 'Mitchell Grassi'}}</span>\n" +
            "      </div>\n" +
            "    </div>\n" +
            "  </li>\n" +
            "  <li class=\"db active--list-3 pam border-bottom border--5\">\n" +
            "    <div class=\"flag\">\n" +
            "      <div class=\"flag--image prm\">\n" +
            "        <img src=\"{{dropdownwithphotoimage}}\" class=\"brm\" alt=\"gt\" width=\"25\" height=\"25\">\n" +
            "      </div>\n" +
            "      <div class=\"flag--body\">\n" +
            "        <span class=\"f4 text-color-1\">{{dropdownwithphotoitem5 || 'Avi Kaplan'}}</span>\n" +
            "      </div>\n" +
            "    </div>\n" +
            "  </li>\n" +
            "  <li class=\"brbotm db active--list-3 pam\">\n" +
            "    <div class=\"flag\">\n" +
            "      <div class=\"flag--image prm\">\n" +
            "        <img src=\"{{dropdownwithphotoimage}}\" class=\"brm\" alt=\"gt\" width=\"25\" height=\"25\">\n" +
            "      </div>\n" +
            "      <div class=\"flag--body\">\n" +
            "        <span class=\"f4 text-color-1\">{{dropdownwithphotoitem6 || 'Kevin Olusula'}}</span>\n" +
            "      </div>\n" +
            "    </div>\n" +
            "  </li>\n" +
            "</ul>"
    );

    $templateCache.put("component/s1FeedCommentDefault.html",
            "<article class=\"pam\">\n" +
            "  <div class=\"flag\">\n" +
            "    <div class=\"flag--image prm\">\n" +
            "      <img src=\"https://s3.amazonaws.com/uifaces/faces/twitter/gt/128.jpg\" width=\"30\" height=\"30\" alt=\"gt\" class=\"brm\">\n" +
            "    </div>\n" +
            "    <div class=\"flag--body\">\n" +
            "      <a href=\"javascript:void(0)\" name=\"actor\" title=\"Geoff Teehan\" class=\"fw-semibold f3 db\">Geoff Teehan</a>\n" +
            "      <time class=\"db f6 text-color-2\" datetime=\"2013-11-13\">29 minutes ago</time>\n" +
            "    </div>\n" +
            "  </div>\n" +
            "  <p class=\"mvm f4 text-color-1\">\n" +
            "    Feedback from everyone else is welcome also!\n" +
            "    Please let me know what you think.\n" +
            "    I am desperate for your approval and appreciation.\n" +
            "    Shower me with love and affection. Fishing for compliments here.\n" +
            "  </p>\n" +
            "  <footer class=\"clear pbm border-bottom border--3\">\n" +
            "    <a href=\"javascript:void(0)\" name=\"Unlike\" title=\"Unlike\" class=\"f5 fl\">Unlike</a>\n" +
            "    <span class=\"f5 fr\">3 likes</span>\n" +
            "  </footer>\n" +
            "</article>"
    );

    $templateCache.put("component/s1FeedCommentWithModifier.html",
            "<article class=\"pam\">\n" +
            "  <div class=\"flag\">\n" +
            "    <div class=\"flag--image prm\">\n" +
            "      <img src=\"https://s3.amazonaws.com/uifaces/faces/twitter/gt/128.jpg\" width=\"30\" height=\"30\" alt=\"gt\" class=\"brm\">\n" +
            "    </div>\n" +
            "    <div class=\"flag--body\">\n" +
            "      <a href=\"javascript:void(0)\" name=\"actor\" title=\"Geoff Teehan\" class=\"fw-semibold f3 db\">Geoff Teehan</a>\n" +
            "      <time class=\"db f6 text-color-2\" datetime=\"2013-11-13\">29 minutes ago</time>\n" +
            "    </div>\n" +
            "  </div>\n" +
            "        <div class=\"mbs mtm flag\">\n" +
            "            <div class=\"flag--image\">\n" +
            "                <span class=\"text-success icon-utility-success f4 mrs\"></span>\n" +
            "            </div>\n" +
            "            <div class=\"flag--body\">\n" +
            "                <span class=\"f6 text-color-2\">Best answer chosen by author</span>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "  <p class=\"mvm f4 text-color-1\">\n" +
            "    Feedback from everyone else is welcome also!\n" +
            "    Please let me know what you think.\n" +
            "    I am desperate for your approval and appreciation.\n" +
            "    Shower me with love and affection. Fishing for compliments here.\n" +
            "  </p>\n" +
            "  <footer class=\"clear pbm border-bottom border--3\">\n" +
            "    <a href=\"javascript:void(0)\" name=\"Unlike\" title=\"Unlike\" class=\"f5 fl\">Unlike</a>\n" +
            "    <span class=\"f5 fr\">3 likes</span>\n" +
            "  </footer>\n" +
            "</article>"
    );

    $templateCache.put("component/s1FeedCommentWithPayload.html",
            "<article class=\"pam\">\n" +
            "  <div class=\"flag\">\n" +
            "    <div class=\"flag--image prm\">\n" +
            "      <img src=\"https://s3.amazonaws.com/uifaces/faces/twitter/gt/128.jpg\" width=\"30\" height=\"30\" alt=\"gt\" class=\"brm\">\n" +
            "    </div>\n" +
            "    <div class=\"flag--body\">\n" +
            "      <a href=\"javascript:void(0)\" name=\"actor\" title=\"Geoff Teehan\" class=\"fw-semibold f3 db\">\n" +
            "        Geoff Teehan\n" +
            "      </a>\n" +
            "      <time class=\"db f6 text-color-2\" datetime=\"2013-11-13\">\n" +
            "        29 minutes ago\n" +
            "      </time>\n" +
            "    </div>\n" +
            "  </div>\n" +
            "  <p class=\"mvm f4 text-color-1\">\n" +
            "    Feedback from everyone else is welcome also!\n" +
            "    Please let me know what you think.\n" +
            "    I am desperate for your approval and appreciation.\n" +
            "    Shower me with love and affection. Fishing for compliments here.\n" +
            "  </p>\n" +
            "  <article class=\"brm border border--3 bg-3 pam\">\n" +
            "    <div class=\"flag\">\n" +
            "      <div class=\"flag--image prm\">\n" +
            "        <img src=\"assets/icons/doctype/excel_120.png\" class=\"ht-30\" alt=\"excel\">\n" +
            "      </div>\n" +
            "      <div class=\"flag--body\">\n" +
            "        <span class=\"f4 text-color-1 db\">photo.pdf</span>\n" +
            "        <span class=\"db f5 text-color-2\">1.2 MB</span>\n" +
            "      </div>\n" +
            "    </div>\n" +
            "  </article>\n" +
            "  <footer class=\"clear pvm border-bottom border--3\">\n" +
            "    <a href=\"javascript:void(0)\" name=\"like\" title=\"Unlike\" class=\"f5 fl\">\n" +
            "      Unlike\n" +
            "    </a>\n" +
            "    <span class=\"f5 fr\">3 likes</span>\n" +
            "  </footer>\n" +
            "</article>"
    );

    $templateCache.put("component/s1FeedItemDefault.html",
            "<article class=\"mam bg-1 brm border border--3\">\n" +
            "  <div class=\"flag pam\">\n" +
            "    <div class=\"flag--image prm\">\n" +
            "      <img src=\"{{feeditemactorimage || 'https://s3.amazonaws.com/uifaces/faces/twitter/gt/128.jpg'}}\" width=\"45\" height=\"45\" alt=\"gt\" class=\"brm\">\n" +
            "    </div>\n" +
            "    <div class=\"flag--body\">\n" +
            "      <a href=\"javascript:void(0)\" name=\"actor\" title=\"{{feeditemactor || 'Geoff Teehan'}}\" class=\"fw-semibold f3 db\">\n" +
            "        {{feeditemactor}}\n" +
            "      </a>\n" +
            "      <time class=\"db f6 text-color-2\" datetime=\"2013-11-13\">\n" +
            "        {{feeditemtimestamp || '28 minutes ago'}}\n" +
            "      </time>\n" +
            "    </div>\n" +
            "  </div>\n" +
            "  <p class=\"phm mtn fw-normal f4 text-color-1\">\n" +
            "    {{feeditembody || 'Feedback from everyone else is welcome also! Please let me know what you think. I am desperate for your approval and appreciation. Shower me with love and affection. Fishing for compliments here.'}}\n" +
            "  </p>\n" +
            "  <div ng-transclude></div>\n" +
            "  <footer class=\"clear pvm phm border-top border--5\">\n" +
            "    <a href=\"javascript:void(0)\" name=\"like\" title=\"Liked\" class=\"f5 fl\">\n" +
            "      <span class=\"dib mrs icon-utility-like f4\"></span>\n" +
            "      Liked\n" +
            "    </a>\n" +
            "    <span class=\"f5 fr mlm\">{{feeditemcomments || '4 comments'}}</span>\n" +
            "    <span class=\"f5 fr\">{{feeditemlikes || '2 likes'}}</span>\n" +
            "  </footer>\n" +
            "</article>"
    );

    $templateCache.put("component/s1FeedItemOnDrillIn.html",
            "<article class=\"bg-1 border-bottom border--3 pos-rel ptm phm\">\n" +
            "  <img src=\"assets/icons/feed/favoritepost.png\" alt=\"favorite\" class=\"sq-30 pos-abs corner-tr\">\n" +
            "  <a href=\"javascript:void(0)\" class=\"active-dim pos-abs pax f5 corner-tr\">\n" +
            "    <span class=\"icon-utility-down text-color-1\"></span>\n" +
            "  </a>\n" +
            "  <div class=\"flag\">\n" +
            "    <div class=\"flag--image prm\">\n" +
            "      <img src=\"https://s3.amazonaws.com/uifaces/faces/twitter/gt/128.jpg\" width=\"45\" height=\"45\" alt=\"gt\" class=\"brm\">\n" +
            "    </div>\n" +
            "    <div class=\"flag--body\">\n" +
            "      <a href=\"javascript:void(0)\" name=\"actor\" title=\"Geoff Teehan\" class=\"fw-semibold f3 db\">\n" +
            "        Geoff Teehan\n" +
            "      </a>\n" +
            "      <time class=\"db f6 text-color-2\" datetime=\"2013-11-13\">29 minutes ago</time>\n" +
            "    </div>\n" +
            "  </div>\n" +
            "  <p class=\"mvm fw-normal f4 text-color-1\">\n" +
            "    Feedback from everyone else is welcome also! Please let me know what you think. I am desperate for your approval and appreciation. Shower me with love and affection. Fishing for compliments here.\n" +
            "  </p>\n" +
            "  <footer class=\"clear pvm border-top border--5\">\n" +
            "    <a href=\"javascript:void(0)\" name=\"like\" title=\"Like\" class=\"f5 fl\">\n" +
            "      <span class=\"text-color-2 dib mrs icon-utility-like f4\"></span>\n" +
            "      <span class=\"text-color-2\">Like</span>\n" +
            "    </a>\n" +
            "    <span class=\"f5 fr\">3 people like this</span>\n" +
            "  </footer>\n" +
            "</article>"
    );

    $templateCache.put("component/s1FeedItemWithPayload.html",
            "<article class=\"mam bg-1 brm border border--3\">\n" +
            "  <div class=\"flag pam\">\n" +
            "    <div class=\"flag--image prm\">\n" +
            "      <img src=\"https://s3.amazonaws.com/uifaces/faces/twitter/gt/128.jpg\" width=\"45\" height=\"45\" alt=\"gt\" class=\"brm\">\n" +
            "    </div>\n" +
            "    <div class=\"flag--body\">\n" +
            "      <a href=\"javascript:void(0)\" name=\"actor\" title=\"Geoff Teehan\" class=\"fw-semibold f3 db\">\n" +
            "        Geoff Teehan\n" +
            "      </a>\n" +
            "      <time class=\"db f6 text-color-2\" datetime=\"2013-11-13\">29 minutes ago</time>\n" +
            "    </div>\n" +
            "  </div>\n" +
            "  <p class=\"phm mtn fw-normal f4 text-color-1\">\n" +
            "    Feedback from everyone else is welcome also! Please let me know what you think. I am desperate for your approval and appreciation. Shower me with love and affection. Fishing for compliments here.\n" +
            "  </p>\n" +
            "  <article class=\"mhm brm mbm border border--3 bg-3 pam\">\n" +
            "    <div class=\"flag\">\n" +
            "      <div class=\"flag--image prm\">\n" +
            "        <img src=\"assets/icons/doctype/excel_120.png\" class=\"ht-30\" alt=\"excel\">\n" +
            "      </div>\n" +
            "      <div class=\"flag--body\">\n" +
            "        <span class=\"f4 text-color-1 db\">photo.pdf</span>\n" +
            "        <span class=\"db f5 text-color-2\">1.2 MB</span>\n" +
            "      </div>\n" +
            "    </div>\n" +
            "  </article>\n" +
            "  <footer class=\"clear pvm phm border-top border--5\">\n" +
            "    <a href=\"javascript:void(0)\" name=\"like\" title=\"Like\" class=\"f5 fl\">\n" +
            "      <span class=\"text-color-2 dib mrs icon-utility-like f4\"></span>\n" +
            "      <span class=\"text-color-2\">Like</span>\n" +
            "    </a>\n" +
            "    <span class=\"f5 fr mlm\">5 comments</span>\n" +
            "    <span class=\"f5 fr\">3 likes</span>\n" +
            "  </footer>\n" +
            "</article>"
    );

    $templateCache.put("component/s1FeedPayloadCompound.html",
            "<article class=\"o-hidden brm border border--3\">\n" +
            "  <div class=\"flag pam bg-3 border-bottom border--8\">\n" +
            "    <div class=\"flag--image prm\">\n" +
            "      <img src=\"assets/icons/standard_bg/opportunity_120.png\" class=\"sq-30\" alt=\"thanks\">\n" +
            "    </div>\n" +
            "    <div class=\"flag--body\">\n" +
            "      <span class=\"f4 text-color-1 db\">United Partners - 3k*</span>\n" +
            "    </div>\n" +
            "  </div>\n" +
            "  <div class=\"tc pam bg-1\">\n" +
            "    <a href=\"javascript:void(0)\" name=\"more\" title=\"Show more details\" class=\"dib f5\">\n" +
            "      Show more details\n" +
            "    </a>\n" +
            "  </div>\n" +
            "</article>"
    );

    $templateCache.put("component/s1FeedPayloadPrimary.html",
            "<article class=\"brm border border--3 bg-3 pam\">\n" +
            "  <div class=\"flag\">\n" +
            "    <div class=\"flag--image prm\">\n" +
            "      <img src=\"assets/icons/doctype/excel_120.png\" class=\"ht-30\" alt=\"excel\">\n" +
            "    </div>\n" +
            "    <div class=\"flag--body\">\n" +
            "      <span class=\"f4 text-color-1 db\">photo.pdf</span>\n" +
            "      <span class=\"db f5 text-color-2\">1.2 MB</span>\n" +
            "    </div>\n" +
            "  </div>\n" +
            "</article>"
    );

    $templateCache.put("component/s1FeedPayloadSecondary.html",
            "<article class=\"brm border border--3 bg-1 pam\">\n" +
            "  <div class=\"flag\">\n" +
            "    <div class=\"flag--image prm\">\n" +
            "      <img src=\"assets/icons/standard_bg/thanks_120.png\" class=\"sq-30\" alt=\"thanks\">\n" +
            "    </div>\n" +
            "    <div class=\"flag--body\">\n" +
            "      <span class=\"f4 text-color-1 db\">#thanks</span>\n" +
            "      <span class=\"db f5 text-color-2\">Thanks for all you do to make us great!</span>\n" +
            "    </div>\n" +
            "  </div>\n" +
            "</article>"
    );

    $templateCache.put("component/s1FilePreview.html",
            "<div class=\"mam pas bg-1 border border--3 brm\">\n" +
            "  <img src=\"http://placekitten.com/350/232\" width=\"350\" height=\"232\" alt=\"kitten\" class=\"db mw-100p ht-100p\">\n" +
            "</div>"
    );

    $templateCache.put("component/s1FooterSecondaryChildBrowser.html",
            "<footer class=\"bg-secondary-header f2 lh-44 ht-44 ig_2\" role=\"group\">\n" +
            "  <a href=\"javascript:void(0)\" title=\"left\" class=\"fl mlx\">\n" +
            "    <span class=\"a-mid icon-utility-left active--icon-2 text-color-5 \"></span>\n" +
            "  </a>\n" +
            "  <a href=\"javascript:void(0)\" title=\"right\" class=\"fl mlx\">\n" +
            "    <span class=\"a-mid icon-utility-right active--icon-2 text-color-5 \"></span>\n" +
            "  </a>\n" +
            "  <a href=\"javascript:void(0)\" title=\"refresh\" class=\"fr mrx\">\n" +
            "    <span class=\"a-mid icon-utility-refresh active--icon-2 text-color-5 \"></span>\n" +
            "  </a>\n" +
            "  <a href=\"javascript:void(0)\" title=\"share\" class=\"fr mrx\">\n" +
            "    <span class=\"a-mid icon-utility-share active--icon-2 text-color-5 \"></span>\n" +
            "  </a>\n" +
            "</footer>"
    );

    $templateCache.put("component/s1FooterSecondaryFilePreview.html",
            "<footer class=\"bg-secondary-header tc f2 lh-44 ht-44 ig_2\" role=\"group\">\n" +
            "  <a href=\"javascript:void(0)\" title=\"share\" class=\"fl mlx\">\n" +
            "    <span class=\"a-mid icon-utility-socialshare active--icon-2 text-color-5 \"></span>\n" +
            "  </a>\n" +
            "  <a href=\"javascript:void(0)\" title=\"download\" class=\"dib\">\n" +
            "    <span class=\"a-mid icon-utility-download active--icon-2 text-color-5 \"></span>\n" +
            "  </a>\n" +
            "  <a href=\"javascript:void(0)\" title=\"info\" class=\"fr mrx\">\n" +
            "    <span class=\"a-mid icon-utility-down active--icon-2 text-color-5 \"></span>\n" +
            "  </a>\n" +
            "</footer>"
    );

    $templateCache.put("component/s1HeaderPrimaryDefault.html",
            "<header class=\"bg-global-header ht-44\" role=\"group\">\n" +
            "  <ul class=\"fl man pan list-horizontal ht-44\">\n" +
            "    <li class=\"pos-rel fl ht-44\">\n" +
            "      <a href=\"javascript:void(0)\" title=\"Navigation\" class=\"phm ht-44 pam\">\n" +
            "        <span class=\"icon-utility-{{headerprimarylefticon || 'rows'}} active--icon-1 text-color-5 \"></span>\n" +
            "        <span class=\"tha\">Navigation</span>\n" +
            "      </a>\n" +
            "    </li>\n" +
            "  </ul>\n" +
            "  <ul class=\"fr man pan list-horizontal ht-44\">\n" +
            "    <li class=\"pos-rel fl ht-44\">\n" +
            "      <a href=\"javascript:void(0)\" title=\"Notifications\" class=\"phm ht-44 pam\">\n" +
            "        <span class=\"icon-utility-notification active--icon-1 text-color-5 notifications\"\n" +
            "          data-notification-count=\"{{headerprimarynotifications || '4'}}\">\n" +
            "        </span>\n" +
            "        <span class=\"tha\"> Notifications</span>\n" +
            "      </a>\n" +
            "    </li>\n" +
            "  </ul>\n" +
            "</header>"
    );

    $templateCache.put("component/s1HeaderPrimaryModal.html",
            "<header class=\"bg-global-header ht-44 tc\" role=\"group\">\n" +
            "  <a href=\"javascript:void(0)\" title=\"Close\"\n" +
            "     class=\"btn--header-primary brm bg-global-header-btn fl mts mls phm ht-30 \">\n" +
            "    <span class=\"text-color-5 lh-30 f6\">{{headerprimarymodalbuttonleft || 'Close'}}</span>\n" +
            "  </a>\n" +
            "  <a href=\"javascript:void(0)\" title=\"Submit\"\n" +
            "     class=\"btn--header-primary brm bg-global-header-btn ht-30 phm pos-rel fr mts mrs\">\n" +
            "    <span class=\"text-color-5 lh-30 f6\">{{headerprimarymodalbuttonright || 'Submit'}}</span>\n" +
            "  </a>\n" +
            "  <span class=\"text-color-5 dib lh-44 fw-semibold f3\">{{headerprimarymodaltitle || 'New Contact'}}</span>\n" +
            "</header>"
    );

    $templateCache.put("component/s1HeaderPrimarySearch.html",
            "<header class=\"bg-global-header ht-44 \" role=\"group\">\n" +
            "  <a href=\"javascript:void(0)\" title=\"Back\" class=\"db mtm fl mlm\">\n" +
            "    <span class=\"icon-utility-back active--icon-1 text-color-5\"></span>\n" +
            "  </a>\n" +
            "  <div class=\"pos-rel size-fill prs plm pvs\">\n" +
            "    <label>\n" +
            "      <span class=\"dn\">Search</span>\n" +
            "    </label>\n" +
            "    <input type=\"text\"\n" +
            "           name=\"default\"\n" +
            "           placeholder=\"{{headerprimarysearchplaceholder || 'Search Salesforce'}}\"\n" +
            "           class=\"size-full phs ht-30 input input--header-primary input--ph-2 input--focus-2\">\n" +
            "  </div>\n" +
            "</header>"
    );

    $templateCache.put("component/s1HeaderSecondaryChildBrowser.html",
            "<header class=\"bg-secondary-header ht-44 \" role=\"group\">\n" +
            "  <a href=\"javascript:void(0)\"\n" +
            "     title=\"close\"\n" +
            "     class=\"btn--header-secondary brm bg-secondary-header-btn fr mts mrs ht-30 phm \">\n" +
            "    <span class=\"text-color-5 f6 lh-30\">Close</span>\n" +
            "  </a>\n" +
            "  <div class=\"pos-rel size-fill phs pvs\">\n" +
            "    <label>\n" +
            "      <span class=\"dn\">URL</span>\n" +
            "    </label>\n" +
            "    <input type=\"text\"\n" +
            "           name=\"default\"\n" +
            "           value=\"http://www.salesforce.com\"\n" +
            "           class=\"size-full phs ht-30 input input--header-secondary input--ph-1 input--focus-1\">\n" +
            "  </div>\n" +
            "</header>"
    );

    $templateCache.put("component/s1HeaderSecondaryFilePreview.html",
            "<header class=\"bg-secondary-header ht-44 \" role=\"group\">\n" +
            "  <a href=\"javascript:void(0)\" title=\"close\"\n" +
            "     class=\"btn--header-secondary brm bg-secondary-header-btn fl mts mls ht-30 phm \">\n" +
            "    <span class=\"text-color-5 f6 lh-30\">Close</span>\n" +
            "  </a>\n" +
            "  <a href=\"javascript:void(0)\" title=\"info\" class=\"fr mtm mrm\">\n" +
            "    <span class=\"icon-utility-info active--icon-2 text-color-5 \"></span>\n" +
            "  </a>\n" +
            "</header>"
    );

    $templateCache.put("component/s1IndicatorDotsDarkBackground.html",
            "<ul class=\"list-horizontal tc bg-5 mln pln\">\n" +
            "  <li class=\"sq-14 lh-14 a-mid\">\n" +
            "    <a href=\"javascript:void(0)\" class=\"sq-7 bg-10 brc \" title=\"Page 1\">\n" +
            "      <span class=\"tha\">Page 1</span>\n" +
            "    </a>\n" +
            "  </li>\n" +
            "  <li class=\"sq-14 lh-14 a-mid\">\n" +
            "    <a href=\"javascript:void(0)\" class=\"sq-7 bg-11 brc \" title=\"Page 2\">\n" +
            "      <span class=\"tha\">Page 2</span>\n" +
            "    </a>\n" +
            "  </li>\n" +
            "  <li class=\"sq-14 lh-14 a-mid\">\n" +
            "    <a href=\"javascript:void(0)\" class=\"sq-7 bg-11 brc \" title=\"Page 3\">\n" +
            "      <span class=\"tha\">Page 3</span>\n" +
            "    </a>\n" +
            "  </li>\n" +
            "</ul>"
    );

    $templateCache.put("component/s1IndicatorDotsLightBackground.html",
            "<ul class=\"list-horizontal tc mln pln\">\n" +
            "  <li class=\"sq-14 lh-14 a-mid\">\n" +
            "    <a href=\"javascript:void(0)\" class=\"sq-7 bg-10 brc \" title=\"Page 1\">\n" +
            "      <span class=\"tha\">Page 1</span>\n" +
            "    </a>\n" +
            "  </li>\n" +
            "  <li class=\"sq-14 lh-14 a-mid\">\n" +
            "    <a href=\"javascript:void(0)\" class=\"sq-7 bg-9 brc \" title=\"Page 2\">\n" +
            "      <span class=\"tha\">Page 2</span>\n" +
            "    </a>\n" +
            "  </li>\n" +
            "  <li class=\"sq-14 lh-14 a-mid\">\n" +
            "    <a href=\"javascript:void(0)\" class=\"sq-7 bg-9 brc \" title=\"Page 3\">\n" +
            "      <span class=\"tha\">Page 3</span>\n" +
            "    </a>\n" +
            "  </li>\n" +
            "</ul>"
    );

    $templateCache.put("component/s1ListFlagObjects.html",
            "<ul class=\"fw-normal man pan\">\n" +
            "  <li class=\"flag flag--top active--list-1 pam border-bottom border--3\">\n" +
            "    <div class=\"flag--image prm\">\n" +
            "      <img src=\"assets/icons/doctype/excel_120.png\" class=\"ht-30\" alt=\"excel\">\n" +
            "    </div>\n" +
            "    <div class=\"flag--body\">\n" +
            "      <span class=\"db text-color-1 f4\">{{s1listflagobjectsfirsttitle || 'Exported Reports'}}</span>\n" +
            "      <span class=\"db text-color-2 f6\">{{s1listflagobjectsfirstmetaone || 'Oct 19, 2013 &#x2022; 457KB &#x2022; xlsx'}}</span>\n" +
            "      <span class=\"db text-color-2 f6\">{{s1listflagobjectsfirstmetatwo || ''}}</span>\n" +
            "    </div>\n" +
            "  </li>\n" +
            "  <li class=\"flag flag--top active--list-1 pam border-bottom border--3\">\n" +
            "    <div class=\"flag--image prm\">\n" +
            "      <img src=\"assets/icons/doctype/html_120.png\" class=\"ht-30\" alt=\"html\">\n" +
            "    </div>\n" +
            "    <div class=\"flag--body\">\n" +
            "      <span class=\"db text-color-1 f4\">{{s1listflagobjectssecondtitle || 'Code plugins to review'}}</span>\n" +
            "      <span class=\"db text-color-2 f6\">{{s1listflagobjectssecondmetaone || 'Oct 12, 2013 &#x2022; 123KB &#x2022; js'}}</span>\n" +
            "      <span class=\"db text-color-2 f6\">{{s1listflagobjectssecondmetatwo || ''}}</span>\n" +
            "    </div>\n" +
            "  </li>\n" +
            "  <li class=\"flag flag--top active--list-1 pam border-bottom border--3\">\n" +
            "    <div class=\"flag--image prm\">\n" +
            "      <img src=\"assets/icons/doctype/psd_120.png\" class=\"ht-30\" alt=\"psd\">\n" +
            "    </div>\n" +
            "    <div class=\"flag--body\">\n" +
            "      <span class=\"db text-color-1 f4\">{{s1listflagobjectsthirdtitle || 'Login screen concepts'}}</span>\n" +
            "      <span class=\"db text-color-2 f6\">{{s1listflagobjectsthirdmetaone || 'Oct 31, 2013 &#x2022; 1.3MB &#x2022; psd'}}</span>\n" +
            "      <span class=\"db text-color-2 f6\">{{s1listflagobjectsthirdmetatwo || ''}}</span>\n" +
            "    </div>\n" +
            "  </li>\n" +
            "  <li class=\"flag flag--top active--list-1 pam\">\n" +
            "    <div class=\"flag--image prm\">\n" +
            "      <img src=\"assets/icons/doctype/ai_120.png\" class=\"ht-30\" alt=\"ai\">\n" +
            "    </div>\n" +
            "    <div class=\"flag--body\">\n" +
            "      <span class=\"db text-color-1 f4\">{{s1listflagobjectsforthtitle || 'Logo concepts (approved)'}}</span>\n" +
            "      <span class=\"db text-color-2 f6\">{{s1listflagobjectsforthmetaone || 'Oct 11, 2013 &#x2022; 235KB &#x2022; ai'}}</span>\n" +
            "      <span class=\"db text-color-2 f6\">{{s1listflagobjectsforthmetatwo || ''}}</span>\n" +
            "    </div>\n" +
            "  </li>\n" +
            "</ul>"
    );

    $templateCache.put("component/s1ListItemAccount.html",
            "    <li class=\"flag flag--top pam\">\n" +
            "        <h1 class=\"man f3 text-color-1 fw-semibold\">\n" +
            "            {{listitemaccounttitle || 'United Partners, Inc.'}}\n" +
            "        </h1>\n" +
            "  <ul class=\"list-plain man pan\">\n" +
            "    <li class=\"f5 text-color-2\">{{listitemaccountdetail1 || 'San Francisco, CA'}}</li>\n" +
            "    <li class=\"f5 text-color-2\">{{listitemaccountdetail2 || 'Enterprise Customer'}}</li>\n" +
            "  </ul>\n" +
            "    </li>"
    );

    $templateCache.put("component/s1ListItemCase.html",
            "    <li class=\"flag flag--top pam\">\n" +
            "        <h1 class=\"mtn mbs f3 text-color-1 fw-semibold\">\n" +
            "            {{listitemcasetitle || 'SSO login issue on mobile'}}\n" +
            "        </h1>\n" +
            "  <ul class=\"clear list-plain man pan\">\n" +
            "    <li class=\"fl f5 text-color-2\">{{listitemcasedetail1 || 'Medium'}} &#8226; {{listitemcasedetail2 || 'New'}}</li>\n" +
            "    <li class=\"fr f5 text-color-2\">#{{listitemcasedetail3 || '00001015'}}</li>\n" +
            "  </ul>\n" +
            "    </li>"
    );

    $templateCache.put("component/s1ListItemContact.html",
            "    <li class=\"flag flag--top pam\">\n" +
            "  <div class=\"mbs flag flag--rev\">\n" +
            "    <div class=\"flag--body\">\n" +
            "      <h1 class=\"man f3 text-color-1 fw-semibold\">\n" +
            "        {{listitemcontacttitle || 'Jonathan Perilla-Jones'}}\n" +
            "      </h1>\n" +
            "    </div>\n" +
            "    <div class=\"flag--image prm\">\n" +
            "                <div class=\"icon icon--{{listitemcontacticon || 'contact'}} brs bgs-100 a-mid sq-30\"></div>\n" +
            "    </div>\n" +
            "  </div>\n" +
            "  <ul class=\"list-plain man pan\">\n" +
            "    <li class=\"f5 text-color-2\">{{listitemcontactdetail1 || 'Director of Consumer Sales'}}</li>\n" +
            "    <li class=\"f5 text-color-2\">{{listitemcontactdetail2 || 'United Partners'}}</li>\n" +
            "    <li class=\"f5 text-color-2\">{{listitemcontactdetail3 || '(415) 432-5456'}}</li>\n" +
            "  </ul>\n" +
            "    </li>"
    );

    $templateCache.put("component/s1ListItemContainer.html",
            "<ul class=\"list-plain fw-normal bg-2 man pan\" ng-transclude>\n" +
            "</ul>"
    );

    $templateCache.put("component/s1ListItemCustomObject.html",
            "    <li class=\"flag flag--top pam\">\n" +
            "        <h1 class=\"mtn mbs f3 text-color-1 fw-semibold\">\n" +
            "            {{listitemcustomtitle || 'W-1534215'}}\n" +
            "        </h1>\n" +
            "  <dl class=\"clear list-plain man pan\">\n" +
            "            <dt class=\"fl wid-third text-truncate f5 text-color-2\">{{listitemcustomlabel1 || 'Record Type'}}</dt>\n" +
            "    <dd class=\"man plm wid-twothird fl text-truncate f5 text-color-1\">{{listitemcustomdetail1 || 'Bug'}}</dd>\n" +
            "            <dt class=\"cl wid-third fl text-truncate f5 text-color-2\">{{listitemcustomlabel2 || 'Subject'}}</dt>\n" +
            "    <dd class=\"man plm wid-twothird fl text-truncate f5 text-color-1\">{{listitemcustomdetail2 || '186 Splits Blitz: Opportunity'}}</dd>\n" +
            "            <dt class=\"cl wid-third fl text-truncate f5 text-color-2\">{{listitemcustomlabel3 || 'Status'}}</dt>\n" +
            "    <dd class=\"man plm wid-twothird fl text-truncate f5 text-color-1\">{{listitemcustomdetail3 || 'New'}}</dd>\n" +
            "            <dt class=\"cl wid-third fl text-truncate f5 text-color-2\">{{listitemcustomlabel4 || 'Priority'}}</dt>\n" +
            "    <dd class=\"man plm wid-twothird fl text-truncate f5 text-color-1\">{{listitemcustomdetail4 || 'P1'}}</dd>\n" +
            "  </dl>\n" +
            "    </li>"
    );

    $templateCache.put("component/s1ListItemDefault.html",
        "  <li class=\"list-plain active--list-1 pam text-color-1 f4 border-bottom border--3\">{{listitemdefaulttitle || 'List Item'}}</li>"
    );

    $templateCache.put("component/s1ListItemEvent.html",
            "    <li class=\"flag flag--top pam\">\n" +
            "        <time datetime=\"10:00\" class=\"f1 text-color-2 dib mrs\">{{listitemeventtime || '11am'}}</time>\n" +
            "        <span class=\"f6 text-color-2 mbs dib\">{{listitemeventduration || '2 hours'}}</span>\n" +
            "        <h1 class=\"man f3 text-color-1 fw-semibold\">\n" +
            "            <a href=\"javascript:void(0)\">\n" +
            "                {{listitemeventtitle || 'United Partners Kick Off'}}\n" +
            "            </a>\n" +
            "        </h1>\n" +
            "        <p class=\"mtn mbm f4 text-color-2 text-truncate\">\n" +
            "            {{listitemeventdetail1 || '1 Market Street'}}\n" +
            "        </p>\n" +
            "        <hr class=\"hr hr--2\">\n" +
            "  <ul class=\"list-plain man pan\">\n" +
            "    <li class=\"text-truncate f5 text-color-2\">{{listitemeventdetail2 || 'Jon Amos from United Partners'}}</li>\n" +
            "    <li class=\"text-truncate f5 text-color-2\">{{listitemeventdetail3 || 'Your colleague John S. and 2 others'}}</li>\n" +
            "  </ul>\n" +
            "</li>"
    );

    $templateCache.put("component/s1ListItemFile.html",
            "    <li class=\"flag flag--top pam\">\n" +
            "  <div class=\"flag flag--top\">\n" +
            "    <div class=\"flag--image prm\">\n" +
            "                <img class=\"ht-30\" src=\"assets/icons/doctype/{{listitemfileicon || 'pdf'}}_120.png\">\n" +
            "    </div>\n" +
            "    <div class=\"flag--body\">\n" +
            "      <h1 class=\"man f3 text-color-1 fw-semibold\">\n" +
            "        {{listitemfiletitle || 'Q4 First Call Template'}}\n" +
            "      </h1>\n" +
            "                <ul class=\"list-plain man pan\">\n" +
            "                    <li class=\"f5 text-color-2\">{{listitemfiledetail1 || 'Yuri Sebata-Dempster'}}</li>\n" +
            "                    <li class=\"dib f5 text-color-2\">{{listitemfiledetail2 || 'Sep 23, 2011'}} &#8226; </li>\n" +
            "                    <li class=\"dib f5 text-color-2\">{{listitemfiledetail3 || '23MB'}} &#8226; </li>\n" +
            "                    <li class=\"dib f5 text-color-2\">{{listitemfiledetail4 || 'pdf'}}</li>\n" +
            "                </ul>\n" +
            "    </div>\n" +
            "  </div>\n" +
            "    </li>"
    );

    $templateCache.put("component/s1ListItemFlagObjects.html",
            "    <li class=\"flag flag--top active--list-1 pam border-bottom border--3\">\n" +
            "        <div class=\"flag--image prm\">\n" +
            "            <img src=\"{{listitemflagimg || 'assets/icons/doctype/excel_120.png'}}\" class=\"ht-30\" alt=\"excel\">\n" +
            "        </div>\n" +
            "        <div class=\"flag--body\">\n" +
            "            <span class=\"db text-color-1 f4\">{{listitemflagtitle || 'List Item'}}</span>\n" +
            "            <span class=\"db text-color-2 f6\">{{listitemflagmeta1 || 'Metadata 1'}}</span>\n" +
            "            <span class=\"db text-color-2 f6\">{{listitemflagmeta2 || 'Metadata 2'}}</span>\n" +
            "        </div>\n" +
            "    </li>"
    );

    $templateCache.put("component/s1ListItemOpportunity.html",
            "    <li class=\"flag flag--top pam\">\n" +
            "        <h1 class=\"man f3 text-color-1 fw-semibold\">\n" +
            "            {{listitemopptytitle || 'Mobile Platform Licenses (450)'}}\n" +
            "        </h1>\n" +
            "  <ul class=\"clear list-plain man pan\">\n" +
            "    <li class=\"mbs f5 text-color-2\">{{listitemopptydetail1 || 'Negotiation/Review'}} &#8226; {{listitemopptydetail2 || 'United Partners'}}</li>\n" +
            "    <li class=\"fl f3 text-color-1\">${{listitemopptydetail3 || '11,875'}}</li>\n" +
            "    <li class=\"fr f3 text-color-1\">{{listitemopptydetail4 || '7/25/13'}}</li>\n" +
            "  </ul>\n" +
            "    </li>"
    );

    $templateCache.put("component/s1ListItemTask.html",
            "    <li class=\"flag flag--top pam\">\n" +
            "        <div class=\"prm flag--image\">\n" +
            "            <input\n" +
            "                class=\"checkbox checkbox--default checkbox--states-1 brm bg-secondary-btn sq-22 a-mid dib\"\n" +
            "                type=\"checkbox\"\n" +
            "                id=\"filter-1\">\n" +
            "        </div>\n" +
            "        <div class=\"flag--body\">\n" +
            "            <label for=\"filter-1\">\n" +
            "                <h1 class=\"dib man f3 text-color-1\">\n" +
            "                    {{listitemtasktitle || 'Final Decision'}}\n" +
            "                </h1>\n" +
            "                <ul class=\"clear list-plain man pan\">\n" +
            "                    <li class=\"f5 text-truncate text-color-2\">{{listitemtaskdetail1 || 'United Partners'}}</li>\n" +
            "                    <li class=\"f5 text-truncate text-color-2\">{{listitemtaskdetail2 || 'Allison Nishida'}}</li>\n" +
            "                </ul>\n" +
            "            </label>\n" +
            "        </div>\n" +
            "        <div class=\"prn plm flag--image\">\n" +
            "            <time datetime=\"2009-02-21\" class=\"f6 text-color-2\">{{listitemtaskdetail3 || 'Feb 21'}}</time>\n" +
            "        </div>\n" +
            "    </li>"
    );

    $templateCache.put("component/s1ListItemWithIcon.html",
            "    <li class=\"flag flag--top active--list-1 pam border-bottom border--3\">\n" +
            "        <div class=\"flag--image prm\">\n" +
            "            <span class=\"icon-utility-{{listitemiconicon || 'list'}} text-color-3\"></span>\n" +
            "        </div>\n" +
            "        <div class=\"flag--body\">\n" +
            "            <span class=\"db text-color-1 f4\">{{listitemicontitle || 'List Item'}}</span>\n" +
            "        </div>\n" +
            "    </li>"
    );

    $templateCache.put("component/s1ListItemWithLabel.html",
            "    <li class=\"list-plain active--list-1 pam border-bottom border--3\">\n" +
            "        <span class=\"db text-color-1 f4\">{{listitemlabeltitle || 'List Item'}}</span>\n" +
            "        <span class=\"db text-color-2 f6\">{{listitemlabelmeta || 'Label'}}</span>\n" +
            "    </li>"
    );

    $templateCache.put("component/s1ListSingleLineofText.html",
            "<ul class=\"list-plain fw-normal man pan\">\n" +
            "  <li class=\"active--list-1 pam text-color-1 f4 border-bottom border--3\">List Item 1</li>\n" +
            "  <li class=\"active--list-1 pam text-color-1 f4 border-bottom border--3\">List Item 2</li>\n" +
            "  <li class=\"active--list-1 pam text-color-1 f4 border-bottom border--3\">List Item 3</li>\n" +
            "  <li class=\"active--list-1 pam text-color-1 f4\">List Item 4</li>\n" +
            "</ul>"
    );

    $templateCache.put("component/s1ListWithLabels.html",
            "<ul class=\"list-plain fw-normal man pan\">\n" +
            "  <li class=\"active--list-1 pam border-bottom border--3\">\n" +
            "    <span class=\"db text-color-1 f4\">List Item 1</span>\n" +
            "    <span class=\"db text-color-2 f6\">Label 1</span>\n" +
            "  </li>\n" +
            "  <li class=\"active--list-1 pam border-bottom border--3\">\n" +
            "    <span class=\"db text-color-1 f4\">List Item 2</span>\n" +
            "    <span class=\"db text-color-2 f6\">Label 1</span>\n" +
            "  </li>\n" +
            "  <li class=\"active--list-1 pam border-bottom border--3\">\n" +
            "    <span class=\"db text-color-1 f4\">List Item 3</span>\n" +
            "    <span class=\"db text-color-2 f6\">Label 1</span>\n" +
            "  </li>\n" +
            "  <li class=\"active--list-1 pam\">\n" +
            "    <span class=\"db text-color-1 f4\">List Item 4</span>\n" +
            "    <span class=\"db text-color-2 f6\">Label 1</span>\n" +
            "  </li>\n" +
            "</ul>"
    );

    $templateCache.put("component/s1LookupDefault.html",
            "<div class=\"mbm pos-rel\">\n" +
            "  <label class=\"size-full icon-utility-search pos-abs text-color-3 label--lookup\">\n" +
            "    <span class=\"tha\">Lookup</span>\n" +
            "  </label>\n" +
            "  <input type=\"text\" name=\"default\" placeholder=\"Lookup\" class=\"size-full ht-44 plm prx pvm input input--default input--ph-1 input--focus-1\">\n" +
            "</div>"
    );

    $templateCache.put("component/s1LookupError.html",
            "<div class=\"mbm pos-rel\">\n" +
            "  <label class=\"size-full icon-utility-search pos-abs text-color-3 label--lookup\">\n" +
            "    <span class=\"tha\">Lookup</span>\n" +
            "  </label>\n" +
            "  <input\n" +
            "    type=\"text\"\n" +
            "    name=\"default\"\n" +
            "    placeholder=\"Lookup\"\n" +
            "    class=\"size-full ht-44 plm prx pvm input input--error input--ph-error input--focus-1\">\n" +
            "</div>\n" +
            "<p class=\"text-color-2 f6\">\n" +
            "  <span class=\"text-error fw-semibold f6\">Error:</span>\n" +
            "  This field is required.\n" +
            "</p>"
    );

    $templateCache.put("component/s1LookupWithLabel.html",
            "<label class=\"mbm db pos-rel\">\n" +
            "  <span class=\"db mbs f5 text-color-2\">{{lookupwithlabellabel || 'Label'}}</span>\n" +
            "  <span class=\"size-full icon-utility-search pos-abs text-color-3 label--lookup\"></span>\n" +
            "  <input type=\"text\" name=\"default\" value=\"{{lookupwithlabelvalue || ''}}\" placeholder=\"{{lookupwithlabelplaceholder || 'Lookup'}}\" class=\"size-full ht-44 plm prx pvm input input--default input--ph-1 input--focus-1\">\n" +
            "</label>"
    );

    $templateCache.put("component/s1MDPButton.html",
            "<button class=\"bg-global-header sq-44 brm dropglow-1 no-border dib pan\">\n" +
            "  <span class=\"lh-44 wht f2 icon-utility-add\"></span>\n" +
            "</button>"
    );

    $templateCache.put("component/s1MDPLauncherDefault.html",
            "<div class=\"pos-rel ht-100p mht-568 w-100p bg-6-80p\">\n" +
            "  <section class=\"pos-abs corner-br\">\n" +
            "    <article class=\"bg-4 brtopm mdp-launcher ht-430\">\n" +
            "      <ul class=\"tc fixed-table man pan ht-third\">\n" +
            "        <li class=\"active--list-2 a-mid dtc border-bottom border-right border--6\">\n" +
            "          <img src=\"{{mdplaunchericontl || 'assets/icons/standard_bg/post_120.png'}}\" alt=\"post\" class=\"sq-60 dib\">\n" +
            "          <br>\n" +
            "          <span class=\"dib mtm f5 wht fw-normal\">{{mdplauncherlabeltl || 'Share Post'}}</span>\n" +
            "        </li>\n" +
            "        <li class=\"active--list-2 a-mid dtc border-bottom border--6\">\n" +
            "          <img src=\"assets/icons/standard_bg/photo_120.png\" alt=\"post\" class=\"sq-60 dib\">\n" +
            "          <br>\n" +
            "          <span class=\"dib mtm f5 wht fw-normal\">Share Photo</span>\n" +
            "        </li>\n" +
            "      </ul>\n" +
            "      <ul class=\"tc fixed-table man pan ht-third\">\n" +
            "        <li class=\"active--list-2 a-mid dtc border-bottom border-right border--6\">\n" +
            "          <img src=\"assets/icons/standard_bg/file_120.png\" alt=\"post\" class=\"sq-60 dib\">\n" +
            "          <br>\n" +
            "          <span class=\"dib mtm f5 wht fw-normal\">Share File</span>\n" +
            "        </li>\n" +
            "        <li class=\"active--list-2 a-mid dtc border-bottom border--6\">\n" +
            "          <img src=\"assets/icons/standard_bg/opportunity_120.png\" alt=\"post\" class=\"sq-60 dib\">\n" +
            "          <br>\n" +
            "          <span class=\"dib mtm f5 wht fw-normal\">New Opportunity</span>\n" +
            "        </li>\n" +
            "      </ul>\n" +
            "      <ul class=\"tc fixed-table man pan ht-third\">\n" +
            "        <li class=\"active--list-2 a-mid dtc border-bottom border-right border--6\">\n" +
            "          <img src=\"assets/icons/standard_bg/contact_120.png\" alt=\"post\" class=\"sq-60 dib\">\n" +
            "          <br>\n" +
            "          <span class=\"dib mtm f5 wht fw-normal\">New Contact</span>\n" +
            "        </li>\n" +
            "        <li class=\"active--list-2 a-mid dtc border-bottom border--6\">\n" +
            "          <img src=\"assets/icons/standard_bg/lead_120.png\" alt=\"post\" class=\"sq-60 dib\">\n" +
            "          <br>\n" +
            "          <span class=\"dib mtm f5 wht fw-normal\">New Lead</span>\n" +
            "        </li>\n" +
            "      </ul>\n" +
            "    </article>\n" +
            "    <article class=\"carousel-dots fixed-table\">\n" +
            "      <ul class=\"pos-rel dtc a-mid man pvn ht-75 list-horizontal tc bg-5 pln\">\n" +
            "        <li class=\"sq-14 lh-14 \">\n" +
            "          <a href=\"javascript:void(0)\" class=\"sq-7 bg-10 brc \" title=\"Page 1\">\n" +
            "            <span class=\"tha\">Page 1</span>\n" +
            "          </a>\n" +
            "        </li>\n" +
            "        <li class=\"sq-14 lh-14 \">\n" +
            "          <a href=\"javascript:void(0)\" class=\"sq-7 bg-11 brc \" title=\"Page 2\">\n" +
            "            <span class=\"tha\">Page 2</span>\n" +
            "          </a>\n" +
            "        </li>\n" +
            "        <li class=\"sq-14 lh-14 \">\n" +
            "          <a href=\"javascript:void(0)\" class=\"sq-7 bg-11 brc \" title=\"Page 3\">\n" +
            "            <span class=\"tha\">Page 3</span>\n" +
            "          </a>\n" +
            "        </li>\n" +
            "        <span class=\"wht carousel-close icon-utility-close f1 pos-abs\"></span>\n" +
            "      </ul>\n" +
            "    </article>\n" +
            "  </section>\n" +
            "</div>"
    );

    $templateCache.put("component/s1MDPLauncherOverflow.html",
            "<div class=\"bg-4 brtopm ht-450\">\n" +
            "  <ul class=\"list-plain pan man f5 wht\">\n" +
            "    <li class=\"active--list-2 brtopm pam border-bottom border--6\">Create a case on the opportunity on my feed</li>\n" +
            "    <li class=\"active--list-2 pam border-bottom border--6\">New feed on the status change</li>\n" +
            "    <li class=\"active--list-2 pam border-bottom border--6\">Create task on a thanks poll</li>\n" +
            "    <li class=\"active--list-2 pam border-bottom border--6\">Post a file on the first feed of the year</li>\n" +
            "    <li class=\"active--list-2 pam border-bottom border--6\">Dangle a unicorn above my head</li>\n" +
            "    <li class=\"active--list-2 pam border-bottom border--6\">Do an action</li>\n" +
            "    <li class=\"active--list-2 pam border-bottom border--6\">Make a gingerbread house for all my contacts</li>\n" +
            "    <li class=\"active--list-2 pam border-bottom border--6\">Deliver pizza to my office</li>\n" +
            "    <li class=\"active--list-2 pam border-bottom border--6\">Thank the pizza guy</li>\n" +
            "    <li class=\"active--list-2 pam border-bottom border--6\">Apologize to my wife for being late</li>\n" +
            "  </ul>\n" +
            "</div>\n" +
            "<div class=\"carousel-dots fixed-table\">\n" +
            "  <ul class=\"pos-rel dtc a-mid man pvn ht-75 list-horizontal tc bg-5 pln\">\n" +
            "    <li class=\"sq-14 lh-14 \">\n" +
            "      <a href=\"javascript:void(0)\" class=\"sq-7 bg-10 brc \" title=\"Page 1\">\n" +
            "        <span class=\"tha\">Page 1</span>\n" +
            "      </a>\n" +
            "    </li>\n" +
            "    <li class=\"sq-14 lh-14 \">\n" +
            "      <a href=\"javascript:void(0)\" class=\"sq-7 bg-11 brc \" title=\"Page 2\">\n" +
            "        <span class=\"tha\">Page 2</span>\n" +
            "      </a>\n" +
            "    </li>\n" +
            "    <li class=\"sq-14 lh-14 \">\n" +
            "      <a href=\"javascript:void(0)\" class=\"sq-7 bg-11 brc \" title=\"Page 3\">\n" +
            "        <span class=\"tha\">Page 3</span>\n" +
            "      </a>\n" +
            "    </li>\n" +
            "    <span class=\"wht carousel-close icon-utility-close f1 pos-abs\"></span>\n" +
            "  </ul>\n" +
            "</div>"
    );

    $templateCache.put("component/s1ModalDialogButtonsOnly.html",
            "<a href=\"javascript:void(0)\" name=\"close\" title=\"close\" class=\"db tr size-full pbm\">\n" +
            "  <span class=\"db icon-utility-close f2 wht\"></span>\n" +
            "</a>\n" +
            "<div class=\"bg-1 brm pam pos-rel tc\">\n" +
            "  <button class=\"btn bg-secondary-btn btn--secondary pvs size-full brm border border--3 mbm\">\n" +
            "    <span class=\"text-color-4 f3 fw-semibold\">Secondary Button</span>\n" +
            "  </button>\n" +
            "  <button class=\"btn bg-secondary-btn btn--secondary pvs size-full brm border border--3 mbm\">\n" +
            "    <span class=\"text-color-4 f3 fw-semibold\">Secondary Button</span>\n" +
            "  </button>\n" +
            "  <button class=\"btn bg-secondary-btn btn--secondary pvs size-full brm border border--3\">\n" +
            "    <span class=\"text-color-4 f3 fw-semibold\">Secondary Button</span>\n" +
            "  </button>\n" +
            "</div>"
    );

    $templateCache.put("component/s1ModalDialogWithcheckbox.html",
            "<a href=\"javascript:void(0)\" name=\"close\" title=\"close\" class=\"db tr size-full pbm\">\n" +
            "  <span class=\"db icon-utility-close f2 wht\"></span>\n" +
            "</a>\n" +
            "<div class=\"bg-1 brm pam pos-rel tc clear\">\n" +
            "  <span class=\"icon-utility-warning text-warning icon1 dib mbm\"></span>\n" +
            "  <p class=\"mtn text-color-1 f4\">\n" +
            "    <strong>Strong text!</strong> Detail text and lots of unicorns and rainbows.\n" +
            "  </p>\n" +
            "  <button class=\"btn bg-secondary-btn btn--secondary pvs size-full brm border border--3 mbm\">\n" +
            "    <span class=\"text-color-4 f3 fw-semibold\">Secondary Button</span>\n" +
            "  </button>\n" +
            "  <button class=\"btn bg-secondary-btn btn--secondary pvs size-full brm border border--3\">\n" +
            "    <span class=\"text-color-4 f3 fw-semibold\">Secondary Button</span>\n" +
            "  </button>\n" +
            "  <div class=\"mtm fl\">\n" +
            "    <input type=\"checkbox\" id=\"modal-1\"\n" +
            "           class=\"checkbox checkbox--default checkbox--states-1 brm mrs bg-secondary-btn sq-22 a-mid dib\">\n" +
            "    <label class=\"f5 text-color-1\" for=\"modal-1\">\n" +
            "      Check this if you never want to see this modal again\n" +
            "    </label>\n" +
            "  </div>\n" +
            "</div>"
    );

    $templateCache.put("component/s1ModalDialogWithicon.html",
            "<a href=\"javascript:void(0)\" name=\"close\" title=\"close\" class=\"db tr size-full pbm\">\n" +
            "  <span class=\"db icon-utility-close f2 wht\"></span>\n" +
            "</a>\n" +
            "<div class=\"bg-1 brm pam pos-rel tc\">\n" +
            "  <span class=\"icon-utility-warning text-warning icon1 dib mbm\"></span>\n" +
            "  <p class=\"mtn text-color-1 f4\">\n" +
            "    <strong>Strong text!</strong> Detail text and lots of unicorns and rainbows.\n" +
            "  </p>\n" +
            "  <button class=\"btn bg-secondary-btn btn--secondary pvs size-full brm border border--3 mbm\">\n" +
            "    <span class=\"text-color-4 f3 fw-semibold\">Secondary Button</span>\n" +
            "  </button>\n" +
            "  <button class=\"btn bg-secondary-btn btn--secondary pvs size-full brm border border--3\">\n" +
            "    <span class=\"text-color-4 f3 fw-semibold\">Secondary Button</span>\n" +
            "  </button>\n" +
            "</div>"
    );

    $templateCache.put("component/s1ModalDialogWithtext.html",
            "<a href=\"javascript:void(0)\" name=\"close\" title=\"close\" class=\"db tr size-full pbm\">\n" +
            "  <span class=\"db icon-utility-close f2 wht\"></span>\n" +
            "</a>\n" +
            "<div class=\"bg-1 brm pam pos-rel tc\">\n" +
            "  <p class=\"mtn text-color-1 f4\">\n" +
            "    <strong>Strong text!</strong> Detail text and lots of unicorns and rainbows.\n" +
            "  </p>\n" +
            "  <button class=\"btn bg-secondary-btn btn--secondary pvs size-full brm border border--3 mbm\">\n" +
            "    <span class=\"text-color-4 f3 fw-semibold\">Secondary Button</span>\n" +
            "  </button>\n" +
            "  <button class=\"btn bg-secondary-btn btn--secondary pvs size-full brm border border--3\">\n" +
            "    <span class=\"text-color-4 f3 fw-semibold\">Secondary Button</span>\n" +
            "  </button>\n" +
            "</div>"
    );

    $templateCache.put("component/s1ModalSortFilterMultisection.html",
            "<a href=\"javascript:void(0)\" title=\"close\" name=\"close\" class=\"db tr size-full pbm\">\n" +
            "  <span class=\"db icon-utility-close f2 wht\"></span>\n" +
            "</a>\n" +
            "<div class=\"bg-1 brm pos-rel clear\" role=\"group\">\n" +
            "  <h1 class=\"text-color-2 fw-semibold f4 dib mam\">\n" +
            "    Filter and Sort\n" +
            "  </h1>\n" +
            "  <h2 class=\"text-color-2 f6 caps bg-2 dib size-full fw-normal phm pvs mvn\">\n" +
            "    Label\n" +
            "  </h2>\n" +
            "  <ul class=\"text-color-1 phm f4 man\">\n" +
            "    <li class=\"db pvm border-bottom border--8\">\n" +
            "      Value 1\n" +
            "      <span class=\"icon-utility-check fr text-blue\"></span>\n" +
            "    </li>\n" +
            "    <li class=\"db pvm\">\n" +
            "      Value 2\n" +
            "    </li>\n" +
            "  </ul>\n" +
            "  <h2 class=\"text-color-2 f6 caps bg-2 dib size-full fw-normal phm pvs mvn\">\n" +
            "    Label\n" +
            "  </h2>\n" +
            "  <ul class=\"text-color-1 phm f4 man\">\n" +
            "    <li class=\"db pvm border-bottom border--8\">\n" +
            "      Value 1\n" +
            "      <span class=\"icon-utility-check fr text-blue\"></span>\n" +
            "    </li>\n" +
            "    <li class=\"db pvm\">\n" +
            "      Value 2\n" +
            "    </li>\n" +
            "  </ul>\n" +
            "</div>"
    );

    $templateCache.put("component/s1ModalSortFilterOnesection.html",
            "<a href=\"javascript:void(0)\" title=\"close\" name=\"close\" class=\"db tr size-full pbm\">\n" +
            "  <span class=\"db icon-utility-close f2 wht\"></span>\n" +
            "</a>\n" +
            "<div class=\"bg-1 brm pos-rel clear\" role=\"group\">\n" +
            "  <ul class=\"text-color-1 phm f4 man\">\n" +
            "    <li class=\"db pvm border-bottom border--8\">\n" +
            "      Value 1\n" +
            "      <span class=\"icon-utility-check fr text-blue\"></span>\n" +
            "    </li>\n" +
            "    <li class=\"db pvm\">\n" +
            "      Value 2\n" +
            "    </li>\n" +
            "  </ul>\n" +
            "</div>"
    );

    $templateCache.put("component/s1PageLevelErrors.html",
            "<section class=\"bg-7 border-bottom border--3\">\n" +
            "  <div class=\"flag\">\n" +
            "    <div class=\"flag--image phm\">\n" +
            "      <span class=\"text-error icon-utility-error\"></span>\n" +
            "    </div>\n" +
            "    <div class=\"flag--body\">\n" +
            "      <h1 class=\"mvm fw-semibold text-color-1 f4\">\n" +
            "        Looks like there's a problem\n" +
            "      </h1>\n" +
            "    </div>\n" +
            "  </div>\n" +
            "  <p class=\"mhm mtn f6 text-color-1\">\n" +
            "    Review the errors below. If the problem can't be fixed, go to the full site.\n" +
            "  </p>\n" +
            "  <p class=\"mhm mtm f6 text-color-1\">\n" +
            "    This is a page level error example.\n" +
            "  </p>\n" +
            "</section>"
    );

    $templateCache.put("component/s1PercentageIndicatorBar.html",
            "<div class=\"size-full bg-1 paxs border border--3 brl\">\n" +
            "  <div class=\"size-2of3 ht-7 bg-global-header brm\"></div>\n" +
            "</div>"
    );

    $templateCache.put("component/s1PicklistDefault.html",
            "<div class=\"mbm pos-rel\">\n" +
            "  <span class=\"label--icon-r icon-utility-right size-full lh-14 text-color-3\"></span>\n" +
            "  <a href=\"javascript:void(0)\"\n" +
            "     name=\"picklist\"\n" +
            "     title=\"Picklist Value\"\n" +
            "     class=\"size-full ht-44 lh-14 plm prx pvm bg-secondary-btn input input--picklist\">\n" +
            "    <label class=\"dib mrs f5 text-color-2\">{{picklistdefaultlabel || 'Label'}}</label><span class=\"text-color-1 dib\">{{picklistdefaultvalue || 'Picklist Value'}}</span>\n" +
            "  </a>\n" +
            "</div>"
    );

    $templateCache.put("component/s1PicklistError.html",
            "<div class=\"pos-rel\">\n" +
            "  <span class=\"label--icon-r icon-utility-right size-full lh-14 text-color-3\"></span>\n" +
            "  <a\n" +
            "    href=\"javascript:void(0)\"\n" +
            "    name=\"picklist\"\n" +
            "    title=\"Picklist Value\"\n" +
            "    class=\"size-full plm prx pvm bg-secondary-btn input input--picklist-error\">\n" +
            "    <label class=\"dib mrs f5 text-color-2\">{{picklisterrorlabel || 'Label'}}</label><span class=\"text-color-1 dib\">{{picklisterrorvalue || 'Picklist Value'}}</span>\n" +
            "  </a>\n" +
            "</div>\n" +
            "<p class=\"mbm text-color-2 f6\"><span class=\"text-error fw-semibold f6\">Error:</span> This field is required.</p>"
    );

    $templateCache.put("component/s1PicklistLabelOutside.html",
            "<div class=\"mbm pos-rel\">\n" +
            "  <label class=\"dib mbs f5 text-color-2 size-full\">{{picklistoutsidelabellabel || 'Label'}}</label>\n" +
            "  <span class=\"label--icon-r-out icon-utility-right size-full lh-14 text-color-3\"></span>\n" +
            "  <a\n" +
            "    href=\"javascript:void(0)\"\n" +
            "    name=\"picklist\"\n" +
            "    title=\"Picklist Value\"\n" +
            "    class=\"size-full ht-44 lh-14 plm prx pvm bg-secondary-btn input input--picklist\">\n" +
            "    <span class=\"text-color-1 dib\">{{picklistlabeloutsidevalue || 'Picklist Value'}}</span>\n" +
            "  </a>\n" +
            "</div>"
    );

    $templateCache.put("component/s1ProgressSpinnerDefault.html",
            "<div class=\"tc\">\n" +
            "  <img src=\"assets/loading-gray.gif\" alt=\"loading\" class=\"sq-20 dib\">\n" +
            "</div>"
    );

    $templateCache.put("component/s1ProgressSpinnerModal.html",
            "<div class=\"tc brm bg-6-80p text-color-5 sq-100\">\n" +
            "  <img src=\"assets/loading-white.gif\" alt=\"loading\" class=\"sq-35 mtl mbs dib\">\n" +
            "  <span class=\"db f4\">Loading</span>\n" +
            "</div>"
    );

    $templateCache.put("component/s1RadioButton.html",
            "<form>\n" +
            "  <div class=\"mbm db\">\n" +
            "    <input type=\"radio\" class=\"radio radio--default radio--states-1 brc mrs bg-secondary-btn sq-22 a-mid dib\" name=\"filter\" value=\"filter-1\" id=\"filter-1\" checked>\n" +
            "    <label class=\"f4 text-color-1\" for=\"filter-1\">Filter 1</label>\n" +
            "  </div>\n" +
            "\n" +
            "  <div class=\"mbm db\">\n" +
            "    <input type=\"radio\" class=\"radio radio--default radio--states-1 brc mrs bg-secondary-btn sq-22 a-mid clear dib\" name=\"filter\" value=\"filter-2\" id=\"filter-2\">\n" +
            "    <label class=\"f4 text-color-1\" for=\"filter-2\">Filter 2</label>\n" +
            "  </div>\n" +
            "\n" +
            "  <div class=\"mbm db\">\n" +
            "    <input type=\"radio\" disabled class=\"radio radio--default radio--states-1 brc mrs bg-secondary-btn sq-22 a-mid clear dib\" name=\"filter\" value=\"filter-3\" id=\"filter-3\">\n" +
            "    <label class=\"f4 text-color-1\" for=\"filter-3\">Filter 3 (disabled)</label>\n" +
            "  </div>\n" +
            "</form>"
    );

    $templateCache.put("component/s1SearchWidgetDefault.html",
            "<header class=\"bg-generic-1 ht-44 border-bottom border--3 lh-44\" role=\"group\">\n" +
            "  <div class=\"pos-rel size-fill phs pvs\">\n" +
            "    <label class=\"icon-utility-search pos-abs label--search\">\n" +
            "      <span class=\"tha\">URL</span>\n" +
            "    </label>\n" +
            "    <input type=\"text\" name=\"default\" placeholder=\"{{searchwidgetplaceholder || 'Search the feed'}}\"\n" +
            "           class=\"size-full plx prs ht-30 input input--white input--ph-1 input--focus-1\">\n" +
            "  </div>\n" +
            "</header>"
    );

    $templateCache.put("component/s1SearchWidgetWithsortfilter.html",
            "<header class=\"bg-generic-1 ht-44 border-bottom border--3 lh-44\" role=\"group\">\n" +
            "  <a href=\"javascript:void(0)\" title=\"info\" class=\"fr mhm\">\n" +
            "    <span class=\"active-dim icon-utility-filter f2 a-mid text-color-4\"></span>\n" +
            "  </a>\n" +
            "  <div class=\"pos-rel size-fill pls pvs\">\n" +
            "    <label class=\"icon-utility-search pos-abs label--search\">\n" +
            "      <span class=\"tha\">URL</span>\n" +
            "    </label>\n" +
            "    <input type=\"text\" name=\"default\" placeholder=\"{{searchwidgetsortfilterplaceholder || 'Search the feed'}}\" class=\"size-full plx prs ht-30 input input--white input--ph-1 input--focus-1\">\n" +
            "  </div>\n" +
            "</header>"
    );

    $templateCache.put("component/s1SortFilter.html",
            "<article class=\"dib fr phs ht-20 bg-1 br-20\">\n" +
            "  <span class=\"dib rotate-90 f-10 lh-20 text-blue icon-utility-back\"></span>\n" +
            "  <span class=\"mlxs f-12 lh-20 text-color-1\">{{sortfilterplaceholderdefault || 'A-Z'}}</span>\n" +
            "</article>"
    );

    $templateCache.put("component/s1StagedNavigationNotifications.html",
            "<section class=\"bg-5 stage-frame\">\n" +
            "  <div class=\"status-bar\"></div>\n" +
            "    <img src=\"assets/stage-right-shim.png\" class=\"stage-right-shim\" alt=\"\">\n" +
            "  <div class=\"stage-right border-left border--6 scrollable\">\n" +
            "    <header class=\"tc pvm border-bottom border--7\">\n" +
            "      <h1 class=\"man fw-semibold f2 text-color-5\">Notifications</h1>\n" +
            "    </header>\n" +
            "    <ul class=\"pan man bg-4\">\n" +
            "      <li class=\"flag pam active--list-2 border-bottom border--6\">\n" +
            "        <div class=\"dt a-top prm\">\n" +
            "          <img src=\"https://s3.amazonaws.com/uifaces/faces/twitter/gt/128.jpg\" width=\"45\" class=\"brm\" alt=\"feed\">\n" +
            "        </div>\n" +
            "        <div class=\"flag--body\">\n" +
            "          <p class=\"f4 text-color-5 man\">\n" +
            "            Janice Walters commented on your post.\n" +
            "          </p>\n" +
            "          <p class=\"f6 text-color-3 man\">\n" +
            "            15 minutes ago\n" +
            "          </p>\n" +
            "        </div>\n" +
            "      </li>\n" +
            "      <li class=\"flag pam active--list-2 border-bottom border--6\">\n" +
            "        <div class=\"dt a-top prm\">\n" +
            "          <img src=\"https://s3.amazonaws.com/uifaces/faces/twitter/gt/128.jpg\" width=\"45\" class=\"brm\" alt=\"feed\">\n" +
            "        </div>\n" +
            "        <div class=\"flag--body\">\n" +
            "          <p class=\"f4 text-color-5 man\">\n" +
            "            Kirsten Smith commented on your post.\n" +
            "          </p>\n" +
            "          <p class=\"f6 text-color-3 man\">\n" +
            "            29 minutes ago\n" +
            "          </p>\n" +
            "        </div>\n" +
            "      </li>\n" +
            "      <li class=\"flag pam active--list-2 border-bottom border--7\">\n" +
            "        <div class=\"dt a-top prm\">\n" +
            "          <img src=\"https://s3.amazonaws.com/uifaces/faces/twitter/gt/128.jpg\" width=\"45\" class=\"brm\" alt=\"feed\">\n" +
            "        </div>\n" +
            "        <div class=\"flag--body\">\n" +
            "          <p class=\"f4 text-color-5 man\">\n" +
            "            James Potter commented on a post on your wall.\n" +
            "          </p>\n" +
            "          <p class=\"f6 text-color-3 man\">\n" +
            "            54 minutes ago\n" +
            "          </p>\n" +
            "        </div>\n" +
            "      </li>\n" +
            "    </ul>\n" +
            "    <ul class=\"pan man\">\n" +
            "      <li class=\"flag pam active--list-2 border-bottom border--7\">\n" +
            "        <div class=\"dt a-top prm\">\n" +
            "          <img src=\"https://s3.amazonaws.com/uifaces/faces/twitter/gt/128.jpg\" width=\"45\" class=\"brm\" alt=\"feed\">\n" +
            "        </div>\n" +
            "        <div class=\"flag--body\">\n" +
            "          <p class=\"f4 text-color-5 man\">\n" +
            "            Patty Charles commented on your post.\n" +
            "          </p>\n" +
            "          <p class=\"f6 text-color-3 man\">\n" +
            "            3 hours ago\n" +
            "          </p>\n" +
            "        </div>\n" +
            "      </li>\n" +
            "      <li class=\"flag pam active--list-2 border-bottom border--7\">\n" +
            "        <div class=\"dt a-top prm\">\n" +
            "          <img src=\"https://s3.amazonaws.com/uifaces/faces/twitter/gt/128.jpg\" width=\"45\" class=\"brm\" alt=\"feed\">\n" +
            "        </div>\n" +
            "        <div class=\"flag--body\">\n" +
            "          <p class=\"f4 text-color-5 man\">\n" +
            "            Lorelei Chan commented on your post.\n" +
            "          </p>\n" +
            "          <p class=\"f6 text-color-3 man\">\n" +
            "            3 hours ago\n" +
            "          </p>\n" +
            "        </div>\n" +
            "      </li>\n" +
            "      <li class=\"flag pam active--list-2 border-bottom border--7\">\n" +
            "        <div class=\"dt a-top prm\">\n" +
            "          <img src=\"https://s3.amazonaws.com/uifaces/faces/twitter/gt/128.jpg\" width=\"45\" class=\"brm\" alt=\"feed\">\n" +
            "        </div>\n" +
            "        <div class=\"flag--body\">\n" +
            "          <p class=\"f4 text-color-5 man\">\n" +
            "            Janice Walters commented on your post.\n" +
            "          </p>\n" +
            "          <p class=\"f6 text-color-3 man\">\n" +
            "            3 hours ago\n" +
            "          </p>\n" +
            "        </div>\n" +
            "      </li>\n" +
            "      <li class=\"flag pam active--list-2 border-bottom border--7\">\n" +
            "        <div class=\"dt a-top prm\">\n" +
            "          <img src=\"https://s3.amazonaws.com/uifaces/faces/twitter/gt/128.jpg\" width=\"45\" class=\"brm\" alt=\"feed\">\n" +
            "        </div>\n" +
            "        <div class=\"flag--body\">\n" +
            "          <p class=\"f4 text-color-5 man\">\n" +
            "            Kirsten Smith commented on your post.\n" +
            "          </p>\n" +
            "          <p class=\"f6 text-color-3 man\">\n" +
            "            3 hours ago\n" +
            "          </p>\n" +
            "        </div>\n" +
            "      </li>\n" +
            "      <li class=\"flag pam active--list-2 border-bottom border--7\">\n" +
            "        <div class=\"dt a-top prm\">\n" +
            "          <img src=\"https://s3.amazonaws.com/uifaces/faces/twitter/gt/128.jpg\" width=\"45\" class=\"brm\" alt=\"feed\">\n" +
            "        </div>\n" +
            "        <div class=\"flag--body\">\n" +
            "          <p class=\"f4 text-color-5 man\">\n" +
            "            Lorelei Chan commented on your post.\n" +
            "          </p>\n" +
            "          <p class=\"f6 text-color-3 man\">\n" +
            "            3 hours ago\n" +
            "          </p>\n" +
            "        </div>\n" +
            "      </li>\n" +
            "      <li class=\"flag pam active--list-2 border-bottom border--7\">\n" +
            "        <div class=\"dt a-top prm\">\n" +
            "          <img src=\"https://s3.amazonaws.com/uifaces/faces/twitter/gt/128.jpg\" width=\"45\" class=\"brm\" alt=\"feed\">\n" +
            "        </div>\n" +
            "        <div class=\"flag--body\">\n" +
            "          <p class=\"f4 text-color-5 man\">\n" +
            "            Janice Walters commented on your post.\n" +
            "          </p>\n" +
            "          <p class=\"f6 text-color-3 man\">\n" +
            "            3 hours ago\n" +
            "          </p>\n" +
            "        </div>\n" +
            "      </li>\n" +
            "      <li class=\"flag pam active--list-2 border-bottom border--7\">\n" +
            "        <div class=\"dt a-top prm\">\n" +
            "          <img src=\"https://s3.amazonaws.com/uifaces/faces/twitter/gt/128.jpg\" width=\"45\" class=\"brm\" alt=\"feed\">\n" +
            "        </div>\n" +
            "        <div class=\"flag--body\">\n" +
            "          <p class=\"f4 text-color-5 man\">\n" +
            "            Kirsten Smith commented on your post.\n" +
            "          </p>\n" +
            "          <p class=\"f6 text-color-3 man\">\n" +
            "            3 hours ago\n" +
            "          </p>\n" +
            "        </div>\n" +
            "      </li>\n" +
            "    </ul>\n" +
            "  </div>\n" +
            "</section>"
    );

    $templateCache.put("component/s1StagedNavigationStageLeft.html",
            "<nav role=\"navigation\" class=\"stage-frame bg-5 o-hidden\">\n" +
            "  <div class=\"status-bar\"></div>\n" +
            "  <img src=\"assets/stage-left-shim.png\" class=\"stage-left-shim\" alt=\"\">\n" +
            "  <div class=\"stage-left border-right border--6 scrollable\">\n" +
            "\n" +
            "    <article class=\"db pos-rel bg-5 z-15\">\n" +
            "      <a href=\"javascript:void(0)\" class=\"db flag pam\">\n" +
            "        <div class=\"dtc a-top\">\n" +
            "          <img src=\"https://s3.amazonaws.com/uifaces/faces/twitter/gt/128.jpg\" class=\"fl icon bgs-100 sq-45 brm\">\n" +
            "        </div>\n" +
            "        <div class=\"flag--body plm clear\">\n" +
            "          <div class=\"fl\">\n" +
            "            <span class=\"mbsx text-color-5 f4\">The Dude</span><br>\n" +
            "            <span class=\"text-color-5 opacity-40 f6\">internal.org</span>\n" +
            "          </div>\n" +
            "          <div class=\"fr mtxs sq-30 bra bg-20 tc\">\n" +
            "            <span class=\"db pos-rel pts f5 ss-standard-navigatedown text-color-5\"></span>\n" +
            "          </div>\n" +
            "        </div>\n" +
            "      </a>\n" +
            "    </article>\n" +
            "\n" +
            "    <section class=\"pos-rel z-12\">\n" +
            "      <ul class=\"list-plain pan man f3 text-color-5\">\n" +
            "        <li id=\"search\" class=\"bg-4 pam\">\n" +
            "          <a href=\"javascript:void(0)\" class=\"size-full pas brm bg-5 active--search\">\n" +
            "            <span class=\"mrs text-color-5 opacity-40 f6 icon-utility-search\"></span>\n" +
            "            <span class=\"text-color-5 opacity-40 f4\">Search Salesforce</span>\n" +
            "          </a>\n" +
            "        </li>\n" +
            "        <li class=\"size-full bg-4 border-top border--6\">\n" +
            "          <a href=\"javascript:void(0)\" class=\"pos-rel size-full plm ptm pbm clear\">\n" +
            "            <span class=\"fl icon icon--feed bgs-100 mrm sq-30 brs\"></span>\n" +
            "            <span class=\"fl f3 text-color-5 db lh-30\">Feed</span>\n" +
            "            <span class=\"pos-abs corner-tr mrl lh-58 icon-utility-rows text-color-13\"></span>\n" +
            "          </a>\n" +
            "        </li>\n" +
            "        <li class=\"size-full bg-4 border-top border--6\">\n" +
            "          <a href=\"javascript:void(0)\" class=\"pos-rel size-full plm ptm pbm clear\">\n" +
            "            <span class=\"fl icon icon--account bgs-100 mrm sq-30 brs\"></span>\n" +
            "            <span class=\"fl f3 text-color-5 db lh-30\">Accounts</span>\n" +
            "            <span class=\"pos-abs corner-tr mrl lh-58 icon-utility-rows text-color-13\"></span>\n" +
            "          </a>\n" +
            "        </li>\n" +
            "        <li class=\"size-full bg-4 border-top border--6\">\n" +
            "          <a href=\"javascript:void(0)\" class=\"pos-rel size-full plm ptm pbm clear\">\n" +
            "            <span class=\"fl icon icon--contact bgs-100 mrm sq-30 brs\"></span>\n" +
            "            <span class=\"fl f3 text-color-5 db lh-30\">Contacts</span>\n" +
            "            <span class=\"pos-abs corner-tr mrl lh-58 icon-utility-rows text-color-13\"></span>\n" +
            "          </a>\n" +
            "        </li>\n" +
            "        <li class=\"size-full bg-4 border-top border--6\">\n" +
            "          <a href=\"javascript:void(0)\" class=\"pos-rel size-full plm ptm pbm clear\">\n" +
            "            <span class=\"fl icon icon--opportunity bgs-100 mrm sq-30 brs\"></span>\n" +
            "            <span class=\"fl f3 text-color-5 db lh-30\">Opportunities</span>\n" +
            "            <span class=\"pos-abs corner-tr mrl lh-58 icon-utility-rows text-color-13\"></span>\n" +
            "          </a>\n" +
            "        </li>\n" +
            "        <li class=\"size-full bg-4 border-top border--6\">\n" +
            "          <a href=\"javascript:void(0)\" class=\"pos-rel size-full plm ptm pbm clear\">\n" +
            "            <span class=\"fl icon icon--groups bgs-100 mrm sq-30 brs\"></span>\n" +
            "            <span class=\"fl f3 text-color-5 db lh-30\">Groups</span>\n" +
            "            <span class=\"pos-abs corner-tr mrl lh-58 icon-utility-rows text-color-13\"></span>\n" +
            "          </a>\n" +
            "        </li>\n" +
            "        <li class=\"size-full bg-4 border-top border--6\">\n" +
            "          <a href=\"javascript:void(0)\" class=\"pos-rel size-full plm ptm pbm clear\">\n" +
            "            <span class=\"fl icon icon--people bgs-100 mrm sq-30 brs\"></span>\n" +
            "            <span class=\"fl f3 text-color-5 db lh-30\">People</span>\n" +
            "            <span class=\"pos-abs corner-tr mrl lh-58 icon-utility-rows text-color-13\"></span>\n" +
            "          </a>\n" +
            "        </li>\n" +
            "        <li class=\"size-full bg-4 border-top border--6\">\n" +
            "          <a href=\"javascript:void(0)\" class=\"pos-rel size-full plm ptm pbm clear\">\n" +
            "            <span class=\"fl icon icon--dashboard bgs-100 mrm sq-30 brs\"></span>\n" +
            "            <span class=\"fl f3 text-color-5 db lh-30\">Dashboards</span>\n" +
            "            <span class=\"pos-abs corner-tr mrl lh-58 icon-utility-rows text-color-13\"></span>\n" +
            "          </a>\n" +
            "        </li>\n" +
            "        <li class=\"size-full bg-4 border-top border--6\">\n" +
            "          <a href=\"javascript:void(0)\" class=\"size-full pam\" title=\"More\">\n" +
            "            <span class=\"dib sq-30 fl tc ptxs mrm f2 text-color-5 opacity-40 ss-standard-ellipsis\"></span>\n" +
            "            <span class=\"f3 text-color-5 lh-30\">More</span>\n" +
            "          </a>\n" +
            "        </li>\n" +
            "      </ul>\n" +
            "      <hr class=\"man ht-30 size-full bg-5\">\n" +
            "      <ul class=\"pan man f3 text-color-5\">\n" +
            "        <li id=\"exchange\" class=\"flag bg-4\">\n" +
            "          <a href=\"javascript:void(0)\" class=\"size-full pam\" title=\"store\">\n" +
            "            <span class=\"dib sq-30 fl tc ptxs mrm f2 text-color-5 opacity-40 ss-pika-cart\"></span>\n" +
            "            <span class=\"f3 text-color-5 lh-30\">Store</span>\n" +
            "          </a>\n" +
            "        </li>\n" +
            "        <li id=\"settings\" class=\"size-full bg-4 border-top border--6\">\n" +
            "          <a href=\"javascript:void(0)\" class=\"size-full pam\" title=\"Settings\">\n" +
            "            <span class=\"dib sq-30 fl tc ptxs mrm f2 text-color-5 opacity-40 icon-utility-settings\"></span>\n" +
            "            <span class=\"f3 text-color-5 lh-30\">Settings</span>\n" +
            "          </a>\n" +
            "        </li>\n" +
            "        <li class=\"size-full bg-4 border-top border--6\">\n" +
            "          <a href=\"javascript:void(0)\" class=\"size-full pam\" title=\"Offline\" ng-click=\"isOffline()\">\n" +
            "            <span class=\"dib sq-30 fl tc ptxs mrm f2 text-color-5 opacity-40 ss-standard-downloadcloud\"></span>\n" +
            "            <span class=\"flag--body f3 text-color-5 lh-14\">Offline<br>\n" +
            "              <span class=\"text-color-5 opacity-40 f6\">Synced: &nbsp;2 days ago</span>\n" +
            "            </span>\n" +
            "          </a>\n" +
            "        </li>\n" +
            "        <li id=\"help\" class=\"size-full bg-4 border-top border--6\">\n" +
            "          <a href=\"javascript:void(0)\" class=\"size-full pam\" title=\"Help\">\n" +
            "            <span class=\"dib sq-30 fl tc ptxs mrm f2 text-color-5 opacity-40 icon-utility-help\"></span>\n" +
            "            <span class=\"f3 text-color-5 lh-30\">Help</span>\n" +
            "          </a>\n" +
            "        </li>\n" +
            "        <li id=\"logout\" class=\"size-full bg-4 border-top border--6\">\n" +
            "          <a href=\"javascript:void(0)\" class=\"size-full pam\" title=\"Logout\">\n" +
            "            <span class=\"dib sq-30 fl tc ptxs mrm f2 text-color-5 opacity-40 icon-utility-logout\"></span>\n" +
            "            <span class=\"f3 text-color-5 lh-30\">Logout</span>\n" +
            "          </a>\n" +
            "        </li>\n" +
            "      </ul>\n" +
            "    </section>\n" +
            "  </div>\n" +
            "</nav>"
    );

    $templateCache.put("component/s1TextInputDefault.html",
            "<label>\n" +
            "  <span class=\"tha\">Default</span>\n" +
            "  <input type=\"text\" name=\"default\" value=\"{{textinputvalue || ''}}\" placeholder=\"{{textinputplaceholder || 'Default'}}\" class=\"mbm size-full phm pvm input input--default input--ph-1 input--focus-1\">\n" +
            "</label>"
    );

    $templateCache.put("component/s1TextInputDisabled.html",
            "<label>\n" +
            "  <span class=\"tha\">Default</span>\n" +
            "  <input disabled type=\"text\" name=\"default\" value=\"{{textinputvalue}}\" placeholder=\"{{textinputplaceholder}}\" class=\"mbm size-full phm pvm input input--disabled-1 no-border\">\n" +
            "</label>"
    );

    $templateCache.put("component/s1TextInputError.html",
            "<label>\n" +
            "  <span class=\"tha\">Default</span>\n" +
            "  <input type=\"text\" name=\"default\" placeholder=\"Error Input\" class=\"size-full phm pvm input input--error input--ph-error input--focus-1\">\n" +
            "</label>\n" +
            "<p class=\"mbm text-color-2 f6\"><span class=\"text-error fw-semibold f6\">Error:</span> This field is required.</p>"
    );

    $templateCache.put("component/s1TextInputSearchInput.html",
            "<div class=\"mbm pos-rel\">\n" +
            "  <label class=\"icon-utility-search pos-abs text-color-3 label--search\">\n" +
            "    <span class=\"tha\">Search</span>\n" +
            "  </label>\n" +
            "  <input type=\"text\" name=\"default\" placeholder=\"Search Salesforce\" class=\"size-full plx prm pvs input input--default input--ph-1 input--focus-1\">\n" +
            "</div>"
    );

    $templateCache.put("component/s1TextInputWithFixedText.html",
            "<div class=\"mbm pos-rel\">\n" +
            "  <label class=\"pos-abs size-full text-color-3 label--fixedtext\" data-fixedtext=\"%\">\n" +
            "    <span class=\"tha\">Percentage</span>\n" +
            "  </label>\n" +
            "  <input type=\"text\" name=\"default\" placeholder=\"Percentage\" class=\"size-full prx plm pvm input input--default input--ph-1 input--focus-1\">\n" +
            "</div>"
    );

    $templateCache.put("component/s1TextInputWithLabel.html",
            "<label>\n" +
            "  <span class=\"db mbs f5 text-color-2\">{{textinputwithlabellabel || 'Label'}}</span>\n" +
            "  <input type=\"text\" name=\"default\" value=\"{{textinputwithlabelvalue || ''}}\" placeholder=\"{{textinputwithlabelplaceholder || ''}}\" class=\"mbm size-full phm pvm input input--default input--ph-1 input--focus-1\">\n" +
            "</label>"
    );

    $templateCache.put("component/s1TextareaDefault.html",
            "<label>\n" +
            "  <span class=\"tha\">Default</span>\n" +
            "  <textarea name=\"default\" placeholder=\"{{textareadefaultplaceholder || 'Default textarea'}}\" class=\"size-full phm pvm textarea textarea--default textarea--ph-1 textarea--focus-1\"></textarea>\n" +
            "</label>"
    );

    $templateCache.put("component/s1TextareaError.html",
            "<label>\n" +
            "  <span class=\"tha\">Error</span>\n" +
            "  <textarea name=\"default\" placeholder=\"{{textareaerrorplaceholder || 'Default textarea'}}\" class=\"size-full phm pvm textarea textarea--error textarea--ph-error textarea--focus-1\"></textarea>\n" +
            "</label>\n" +
            "<p class=\"text-color-2 f6\"><span class=\"text-error fw-semibold f6\">Error:</span> This field is required.</p>"
    );

    $templateCache.put("component/s1TextareaWithButtons.html",
            "<article>\n" +
            "  <label>\n" +
            "    <span class=\"tha\">Default</span>\n" +
            "    <textarea\n" +
            "      name=\"default\"\n" +
            "      placeholder=\"Textarea with buttons\"\n" +
            "      class=\"brtopm size-full phm pvm textarea textarea--default textarea--ph-1 textarea--focus-1\"></textarea>\n" +
            "  </label>\n" +
            "  <button class=\"btn bg-secondary-btn btn--secondary pvm phn size-1of2 brbotm-l border-bottom border-sides border-top-none border--2 fl\">\n" +
            "    <span class=\"icon-utility-adduser text-color-4 f1\"></span>\n" +
            "  </button>\n" +
            "  <button class=\"btn bg-secondary-btn btn--secondary pvm phn size-1of2 brbotm-r border-bottom border-right border-top-none border-left-none border--2\">\n" +
            "    <span class=\"text-color-4 f1 icon-utility-attach\"></span>\n" +
            "  </button>\n" +
            "</article>"
    );

    $templateCache.put("component/s1TextareaWithButtonsandError.html",
            "<article>\n" +
            "  <label>\n" +
            "    <span class=\"tha\">Error</span>\n" +
            "    <textarea\n" +
            "      name=\"default\"\n" +
            "      placeholder=\"Textarea with buttons\"\n" +
            "      class=\"brtopm size-full phm pvm textarea textarea--error textarea--ph-error textarea--focus-1\"></textarea>\n" +
            "  </label>\n" +
            "  <button class=\"btn bg-secondary-btn btn--secondary pvm size-1of2 brbotm-l border-bottom border-sides border-top-none border--2 fl\">\n" +
            "    <span class=\"icon-utility-adduser text-color-4 f1\"></span>\n" +
            "  </button>\n" +
            "  <button class=\"btn bg-secondary-btn btn--secondary pvm size-1of2 brbotm-r border-bottom border-right border-top-none border-left-none border--2\">\n" +
            "    <span class=\"text-color-4 f1 icon-utility-attach\"></span>\n" +
            "  </button>\n" +
            "  <p class=\"text-color-2 f6 clear\"><span class=\"text-error fw-semibold f6\">Error:</span> This field is required.</p>\n" +
            "</article>"
    );

    $templateCache.put("component/s1ToastNotification.html",
            "<div class=\"flag pam border-bottom border--3 bg-2-95p\">\n" +
            "  <div class=\"flag--image prm\">\n" +
            "    <span class=\"f1 icon-utility-warning text-warning\"></span>\n" +
            "  </div>\n" +
            "  <div class=\"flag--body\">\n" +
            "    <p class=\"man f4 text-color-1\">\n" +
            "      <strong>Oh noez!</strong>\n" +
            "      Something may or may not have gone wrong.\n" +
            "    </p>\n" +
            "  </div>\n" +
            "</div>"
    );

    $templateCache.put("component/s1ViewPicker.html",
            "    <section class=\"clear\">\n" +
            "        <a href=\"javascript:void(0)\" title=\"More\" class=\"db ht-44 mhm mts\">\n" +
            "            <span class=\"dib lh-44 f2 text-color-1\">\n" +
            "                <strong>My Files</strong>\n" +
            "            </span>\n" +
            "            <span class=\"dib lh-44 mls f6 text-color-1 icon-utility-down\"></span>\n" +
            "        </a>\n" +
            "    </section>"
    );

    $templateCache.put("custom/s1IndicatorDots.html",
            "<ul class=\"list-horizontal tc mln pln\" ng-class=\"{'bg-5': !indicatorDotsLight}\">\n" +
            "  <li ng-repeat=\"item in items\" class=\"sq-14 lh-14 a-mid\">\n" +
            "    <a href=\"javascript:void(0)\"\n" +
            "        ng-class=\"{\n" +
            "          'bg-10': indicatorDotsCurrent == $index,\n" +
            "          'bg-11': indicatorDotsCurrent != $index && indicatorDotsLight,\n" +
            "          'bg-9': indicatorDotsCurrent != $index && !indicatorDotsLight,\n" +
            "          'dropglow-1': indicatorDotsCurrent == $index,\n" +
            "          'ig_2': indicatorDotsCurrent == $index,\n" +
            "          'is_4': indicatorDotsCurrent != $index\n" +
            "        }\"\n" +
            "       class=\"sq-7 brc\"\n" +
            "       title=\"Page 1\">\n" +
            "      <span class=\"tha\">Page 1</span>\n" +
            "    </a>\n" +
            "  </li>\n" +
            "</ul>"
    );

}]);
