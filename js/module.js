;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
    var appController;

    appController = function($scope, $element, $http, localyticsService) {
        var $componentNav, $content, $main, $subnav, $window, KEY_DEV, KEY_PUBLIC, KEY_STAGING, apiKey, componentNavIsFixed, componentNavTop, currentSubNav, isContentMargined, location, port, scrollToSection, subnavAnchors, subnavTop,
            _this = this;
        KEY_DEV = '13ea3acd3fdf562d29c2e97-3a65e2e0-53b1-11e3-96d1-009c5fda0a25';
        KEY_STAGING = '6e0ee68ca4f693ab3f6daff-2e61904a-53b1-11e3-96d1-009c5fda0a25';
        KEY_PUBLIC = '0005fc019efef8a2badd162-217c3cfa-53b1-11e3-96d1-009c5fda0a25';
        apiKey = KEY_DEV;
        location = window.location;
        port = window.location.port ? ':' + window.location.port : '';
        window.location.origin = window.location.protocol + "//" + window.location.hostname + port;
        if (location.origin.indexOf('staging-sfdc-styleguide') !== -1) {
            apiKey = KEY_STAGING;
        } else if (location.origin.indexOf('sfdc-styleguide') !== -1) {
            apiKey = KEY_PUBLIC;
        }
        localyticsService.init(apiKey);
        console.log("new appController");
        $window = $(window);
        $main = $('#sg-main');
        $content = $('#sg-content');
        $subnav = null;
        subnavTop = 0;
        $componentNav = null;
        $scope.phoneType = "iphone";
        $scope.navOpenIs = true;
        $scope.navCloseIs = false;
        $scope.openModal = function() {
            $scope.navIs = true;
            $scope.navOpenIs = false;
            return $scope.navCloseIs = true;
        };
        $scope.closeModal = function() {
            $scope.navIs = false;
            $scope.navOpenIs = true;
            return $scope.navCloseIs = false;
        };
        scrollToSection = function(id) {
            var offset, section;
            section = $("section[id='" + id + "']");
            if (section.length === 0) {
                return console.log("Unknown section Id: " + id);
            } else {
                offset = section.offset().top;
                return $("body,html,document").animate({
                    scrollTop: offset
                });
            }
        };
        componentNavTop = void 0;
        componentNavIsFixed = false;
        subnavAnchors = [];
        currentSubNav = null;
        isContentMargined = false;
        $window.scroll(function(event) {
            var aTag, i, offset, scrollTop, st, _i, _len, _results;
            scrollTop = $window.scrollTop();
            if (subnavAnchors.length > 0) {
                _results = [];
                for (i = _i = 0, _len = subnavAnchors.length; _i < _len; i = ++_i) {
                    aTag = subnavAnchors[i];
                    st = document.body.scrollTop;
                    offset = aTag.offset().top - 80;
                    if (st < offset) {
                        if (i !== 0) {
                            aTag = subnavAnchors[i - 1];
                        }
                        if (aTag[0].name !== currentSubNav) {
                            $("#" + currentSubNav).removeClass('sg-subnav-selected');
                            currentSubNav = aTag[0].name;
                            $("#" + currentSubNav).addClass('sg-subnav-selected');
                        }
                        break;
                    } else {
                        _results.push(void 0);
                    }
                }
                return _results;
            }
        });
        return $http.get('/authenticated').success(function(result) {
            var isAuthenticated;
            console.log("authenticated: " + result.authenticated);
            isAuthenticated = result.authenticated;
            return $http.get('config/nav.json').success(function(navConfig) {
                var id, nav, _i, _len, _ref, _results;
                $subnav = $("#sg-subnav");
                subnavTop = $subnav.offset().top;
                $scope.navItems = navConfig.navItems;
                setTimeout(function() {
                    var tags;
                    if (isAuthenticated) {
                        tags = $("a[data-role='unauthenticated']");
                    } else {
                        tags = $("a[data-role='authenticated']");
                    }
                    return tags.hide();
                }, 0);
                $scope.selectSubnav = function(nav) {
                    console.log("selectSubnav: " + nav.id);
                    return scrollToSection(nav.id);
                };
                $scope.selectNav = function(nav, init) {
                    var id, memorizenNamedAnchors,
                        _this = this;
                    if (init == null) {
                        init = false;
                    }
                    console.log("selectNav " + JSON.stringify(nav));
                    $scope.selectedNav = nav.id;
                    $scope.title = nav.title;
                    $scope.subtitle = nav.subtitle;
                    $scope.subnavItems = nav.subnav;
                    id = nav.id;
                    if (!init && id !== 'guidelines') {
                        if (window.history.pushState) {
                            window.history.pushState(null, null, "?id=" + id);
                        } else {
                            return window.location.href = window.location.origin + ("?id=" + id);
                        }
                    }
                    $content.empty();
                    $content.removeClass("sg-icons-dark");
                    subnavAnchors = [];
                    memorizenNamedAnchors = function() {
                        var aTag, subnavItem, _i, _len, _ref, _results;
                        if ($scope.subnavItems != null) {
                            _ref = $scope.subnavItems;
                            _results = [];
                            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                                subnavItem = _ref[_i];
                                aTag = $("a[name='" + subnavItem.id + "']");
                                _results.push(subnavAnchors.push(aTag));
                            }
                            return _results;
                        }
                    };
                    $scope.currentNav = id;
                    switch (id) {
                        case 'style':
                            localyticsService.tagScreen('style');
                            return $http.get('config/icons.json').success(function(iconJSON) {
                                var doctype, file, set, _i, _j, _len, _len1, _ref, _ref1;
                                doctype = iconJSON.doctype;
                                _ref = iconJSON.sets;
                                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                                    set = _ref[_i];
                                    if (set.isFile != null) {
                                        _ref1 = set.files;
                                        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                                            file = _ref1[_j];
                                            file.src = "" + set.path + "/" + file.src;
                                        }
                                    }
                                }
                                $scope.iconSets = iconJSON.sets;
                                return $http.get('config/style.json').success(function(json) {
                                    var currentGuideline;
                                    $scope.guidelines = json.guidelines[0];
                                    $scope.colors = json.colors;
                                    console.log("iconsSets " + $scope.iconSets.length);
                                    currentGuideline = 0;
                                    $scope.isGuidelineModal = false;
                                    $scope.hideGuidelineModal = function() {
                                        return $scope.isGuidelineModal = false;
                                    };
                                    $scope.showGuidelineModal = function(letter) {
                                        var a, annotations, c, classes, g, l, _k, _len2, _results;
                                        console.log("guidelineModal " + letter);
                                        g = json.guidelines[currentGuideline];
                                        annotations = g.leftAnnotations.concat(g.rightAnnotations);
                                        _results = [];
                                        for (_k = 0, _len2 = annotations.length; _k < _len2; _k++) {
                                            a = annotations[_k];
                                            console.log("classes " + a["class"]);
                                            classes = a["class"].split(' ');
                                            _results.push((function() {
                                                var _l, _len3, _results1;
                                                _results1 = [];
                                                for (_l = 0, _len3 = classes.length; _l < _len3; _l++) {
                                                    c = classes[_l];
                                                    if (c.indexOf('sg-v--') === 0) {
                                                        l = c.charAt(c.length - 1);
                                                        if (l === letter) {
                                                            console.log("found " + a.title);
                                                            $scope.guidelineModalAnnotation = a;
                                                            $scope.isGuidelineModal = true;
                                                            break;
                                                        } else {
                                                            _results1.push(void 0);
                                                        }
                                                    } else {
                                                        _results1.push(void 0);
                                                    }
                                                }
                                                return _results1;
                                            })());
                                        }
                                        return _results;
                                    };
                                    $scope.downloadGuidelines = function() {
                                        localyticsService.tagEvent('download', {
                                            name: 'guidelines'
                                        });
                                        location.href = "";
                                        return open("assets/S1AppGuidelines.pdf");
                                    };
                                    $scope.download = function(id) {
                                        console.log('download ' + id);
                                        localyticsService.tagEvent('download', {
                                            name: id
                                        });
                                        return location.href = "download/" + id;
                                    };
                                    $scope.downloadColorSwatches = function() {
                                        localyticsService.tagEvent('download', {
                                            name: 'swatches'
                                        });
                                        return location.href = "assets/SF1-Swatches.aco";
                                    };
                                    $scope.toggleBackground = function(id) {
                                        localyticsService.tagEvent('toggleBackground', {
                                            section: id
                                        });
                                        return $element.find("#" + id).toggleClass("bg-sct-med bg-sct-drk");
                                    };
                                    $scope.prevGuideline = function() {
                                        localyticsService.tagEvent('guidelines', {
                                            action: 'prev'
                                        });
                                        currentGuideline = currentGuideline > 0 ? currentGuideline - 1 : json.guidelines.length - 1;
                                        return $scope.guidelines = json.guidelines[currentGuideline];
                                    };
                                    return $scope.nextGuideline = function() {
                                        localyticsService.tagEvent('guidelines', {
                                            action: 'next'
                                        });
                                        currentGuideline = currentGuideline < json.guidelines.length - 1 ? currentGuideline + 1 : 0;
                                        return $scope.guidelines = json.guidelines[currentGuideline];
                                    };
                                });
                            });
                        case 'components':
                        case 'proto':
                        case 'isv':
                            localyticsService.tagScreen(id);
                            return $content.load("" + id + ".html", function() {
                                $componentNav = $('.sg-col-nav');
                                componentNavTop = $componentNav.length > 0 ? $componentNav.offset().top : null;
                                window.location.hash = window.location.hash + "_";
                                return window.location.hash = window.location.hash.replace("_", "");
                            });
                        case 'examples':
                            localyticsService.tagScreen(id);
                            $scope.searchScopedList1 = [
                                {
                                    text: 'My Accounts'
                                }, {
                                    text: 'Accounts in the Midwest'
                                }, {
                                    text: 'Recently Viewed Accounts'
                                }, {
                                    text: 'SF Accounts'
                                }
                            ];
                            $scope.searchScopedList2 = [
                                {
                                    text: 'United Partners'
                                }, {
                                    text: 'Johnson Cornmeal'
                                }, {
                                    text: 'Electric Generals'
                                }, {
                                    text: 'Sprite Inc.'
                                }, {
                                    text: 'Acme Incorporated'
                                }, {
                                    text: 'Cypress Grove Chevre'
                                }, {
                                    text: 'Quaker'
                                }, {
                                    text: 'Johnson & Johnson'
                                }, {
                                    text: 'Anthropologie'
                                }, {
                                    text: 'Expedia.com'
                                }, {
                                    text: 'Crate & Barrel'
                                }, {
                                    text: 'Sprite Inc.'
                                }, {
                                    text: 'Acme Incorporated'
                                }, {
                                    text: 'Cypress Grove Chevre'
                                }, {
                                    text: 'Quaker'
                                }, {
                                    text: 'Johnson & Johnson'
                                }
                            ];
                            $scope.showExample = function(id) {
                                var example, _i, _len, _ref, _results;
                                console.log("showExample " + id);
                                $scope.currentExample = id;
                                _ref = $scope.examples;
                                _results = [];
                                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                                    example = _ref[_i];
                                    if (example.id === id) {
                                        console.log("found example");
                                        $scope.exampleTitle = example.title;
                                        $scope.exampleDescription = example.description;
                                        _results.push($scope.exampleComponents = example.components);
                                    } else {
                                        _results.push(void 0);
                                    }
                                }
                                return _results;
                            };
                            return $http.get('config/examples.json').success(function(json) {
                                console.log('JSON');
                                $scope.examples = json.examples;
                                return $scope.showExample(json.examples[0].id);
                            });
                        case 'login':
                        case 'logout':
                            localyticsService.tagEvent(id);
                            return location.href = "/" + id;
                        case 'sandbox':
                            break;
                        default:
                            throw new Error("Unknown Navigation Id: " + id);
                    }
                };
                if (location.search === '') {
                    return $scope.selectNav(navConfig.navItems[0], true);
                } else {
                    id = location.search.substr(1).split('=')[1];
                    _ref = navConfig.navItems;
                    _results = [];
                    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                        nav = _ref[_i];
                        if (nav.id === id) {
                            _results.push($scope.selectNav(nav, true));
                        } else {
                            _results.push(void 0);
                        }
                    }
                    return _results;
                }
            });
        });
    };

    appController.$inject = ['$scope', '$element', '$http', 'localyticsService'];

    module.exports = appController;


},{}],2:[function(require,module,exports){
    var examplesController;

    examplesController = function($scope) {
        return console.log('examplesController');
    };

    examplesController.$inject = ['$scope'];

    module.exports = examplesController;


},{}],3:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1AnchorDark.html',
            replace: true,
            scope: {
                anchordarktitle: '@title',
                anchordarkdescription: '@description',
                anchordarkicon: '@icon'
            },
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],4:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1AnchorLightDefault.html',
            replace: true,
            scope: {
                anchorlightlabel: '@label',
                anchorlighttitle: '@title',
                anchorlighticon: '@icon',
                anchorlightbuttonlabel: '@button',
                onNew: '&'
            },
            link: function($scope, $element, $attrs) {
                var eventHandler, isTouchDevice, tapping;
                isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
                eventHandler = function(event) {
                    var func;
                    if ($attrs.onNew === void 0) {
                        return console.log("Warning: No event listener for onNew");
                    }
                    func = $scope.onNew;
                    if (typeof func === 'function') {
                        return $scope.$apply(function() {
                            return func(event);
                        });
                    } else {
                        return console.log("Error: onNew needs to be a function.");
                    }
                };
                if (event === 'click' && isTouchDevice()) {
                    tapping = false;
                    $element.bind('touchstart', function(event) {
                        return tapping = true;
                    });
                    $element.bind('touchmove', function(event) {
                        return tapping = false;
                    });
                    return $element.bind('touchend', function(event) {
                        var func;
                        if (tapping) {
                            event.stopPropagation();
                            if ($attrs.onNew === void 0) {
                                return console.log("Warning: No event listener for onNew");
                            }
                            func = $scope.onNew;
                            if (typeof func === 'function') {
                                return $scope.$apply(function() {
                                    return func(event);
                                });
                            } else {
                                return console.log("Error: onNew needs to be a function.");
                            }
                        }
                    });
                } else {
                    return $element.on("click", ".btn", eventHandler);
                }
            }
        };
    };


},{}],5:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1AnchorLightLabelonBottom.html',
            replace: true,
            scope: {
                anchorlightbottomlabel: '@label',
                anchorlightbottomtitle: '@title',
                anchorlightbottomicon: '@icon',
                anchorlightbuttonbottomlabel: '@button',
                onNew: '&'
            },
            link: function($scope, $element, $attrs) {
                var eventHandler, isTouchDevice, tapping;
                isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
                eventHandler = function(event) {
                    var func;
                    if ($attrs.onNew === void 0) {
                        return console.log("Warning: No event listener for onNew");
                    }
                    func = $scope.onNew;
                    if (typeof func === 'function') {
                        return $scope.$apply(function() {
                            return func(event);
                        });
                    } else {
                        return console.log("Error: onNew needs to be a function.");
                    }
                };
                if (event === 'click' && isTouchDevice()) {
                    tapping = false;
                    $element.bind('touchstart', function(event) {
                        return tapping = true;
                    });
                    $element.bind('touchmove', function(event) {
                        return tapping = false;
                    });
                    return $element.bind('touchend', function(event) {
                        var func;
                        if (tapping) {
                            event.stopPropagation();
                            if ($attrs.onNew === void 0) {
                                return console.log("Warning: No event listener for onNew");
                            }
                            func = $scope.onNew;
                            if (typeof func === 'function') {
                                return $scope.$apply(function() {
                                    return func(event);
                                });
                            } else {
                                return console.log("Error: onNew needs to be a function.");
                            }
                        }
                    });
                } else {
                    return $element.on("click", ".btn", eventHandler);
                }
            }
        };
    };


},{}],6:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1AnchorLightNoBackground.html',
            replace: true,
            scope: {
                anchorlightnobglabel: '@label',
                anchorlightnobgtitle: '@title',
                anchorlightnobgicon: '@icon',
                onNew: '&'
            },
            link: function($scope, $element, $attrs) {
                var eventHandler, isTouchDevice, tapping;
                isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
                eventHandler = function(event) {
                    var func;
                    if ($attrs.onNew === void 0) {
                        return console.log("Warning: No event listener for onNew");
                    }
                    func = $scope.onNew;
                    if (typeof func === 'function') {
                        return $scope.$apply(function() {
                            return func(event);
                        });
                    } else {
                        return console.log("Error: onNew needs to be a function.");
                    }
                };
                if (event === 'click' && isTouchDevice()) {
                    tapping = false;
                    $element.bind('touchstart', function(event) {
                        return tapping = true;
                    });
                    $element.bind('touchmove', function(event) {
                        return tapping = false;
                    });
                    return $element.bind('touchend', function(event) {
                        var func;
                        if (tapping) {
                            event.stopPropagation();
                            if ($attrs.onNew === void 0) {
                                return console.log("Warning: No event listener for onNew");
                            }
                            func = $scope.onNew;
                            if (typeof func === 'function') {
                                return $scope.$apply(function() {
                                    return func(event);
                                });
                            } else {
                                return console.log("Error: onNew needs to be a function.");
                            }
                        }
                    });
                } else {
                    return $element.on("click", ".btn", eventHandler);
                }
            }
        };
    };


},{}],7:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1AvatarAttending.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],8:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1AvatarDefault.html',
            replace: true,
            scope: {
                avatarimage: '@src'
            },
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],9:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ButtonGroups.html',
            replace: true,
            scope: {
                buttongrouplabel: '@label'
            },
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],10:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ButtonPrimaryDefault.html',
            replace: true,
            scope: {
                buttonprimarylabel: '@label',
                onSelect: '&'
            },
            link: function($scope, $element, $attrs) {
                var eventHandler, isTouchDevice, tapping;
                isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
                eventHandler = function(event) {
                    var func;
                    if ($attrs.onSelect === void 0) {
                        return console.log("Warning: No event listener for onSelect");
                    }
                    func = $scope.onSelect;
                    if (typeof func === 'function') {
                        return $scope.$apply(function() {
                            return func(event);
                        });
                    } else {
                        return console.log("Error: onSelect needs to be a function.");
                    }
                };
                if (event === 'click' && isTouchDevice()) {
                    tapping = false;
                    $element.bind('touchstart', function(event) {
                        return tapping = true;
                    });
                    $element.bind('touchmove', function(event) {
                        return tapping = false;
                    });
                    return $element.bind('touchend', function(event) {
                        var func;
                        if (tapping) {
                            event.stopPropagation();
                            if ($attrs.onSelect === void 0) {
                                return console.log("Warning: No event listener for onSelect");
                            }
                            func = $scope.onSelect;
                            if (typeof func === 'function') {
                                return $scope.$apply(function() {
                                    return func(event);
                                });
                            } else {
                                return console.log("Error: onSelect needs to be a function.");
                            }
                        }
                    });
                } else {
                    return $element.on("click", eventHandler);
                }
            }
        };
    };


},{}],11:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ButtonPrimaryDisabled.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],12:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ButtonSecondaryDefault.html',
            replace: true,
            scope: {
                buttonsecondarylabel: '@label'
            },
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],13:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ButtonSecondaryDisabled.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],14:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ButtonTertiary.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],15:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1Calendar.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],16:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1CardAccount.html',
            replace: true,
            scope: {
                accountcardtitle: '@title',
                accountcarddetail1: '@detail1',
                accountcarddetail2: '@detail2',
                onSelect: '&'
            },
            link: function($scope, $element, $attrs) {
                var eventHandler, isTouchDevice, tapping;
                isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
                eventHandler = function(event) {
                    var func;
                    if ($attrs.onSelect === void 0) {
                        return console.log("Warning: No event listener for onSelect");
                    }
                    func = $scope.onSelect;
                    if (typeof func === 'function') {
                        return $scope.$apply(function() {
                            return func(event);
                        });
                    } else {
                        return console.log("Error: onSelect needs to be a function.");
                    }
                };
                if (event === 'click' && isTouchDevice()) {
                    tapping = false;
                    $element.bind('touchstart', function(event) {
                        return tapping = true;
                    });
                    $element.bind('touchmove', function(event) {
                        return tapping = false;
                    });
                    return $element.bind('touchend', function(event) {
                        var func;
                        if (tapping) {
                            event.stopPropagation();
                            if ($attrs.onSelect === void 0) {
                                return console.log("Warning: No event listener for onSelect");
                            }
                            func = $scope.onSelect;
                            if (typeof func === 'function') {
                                return $scope.$apply(function() {
                                    return func(event);
                                });
                            } else {
                                return console.log("Error: onSelect needs to be a function.");
                            }
                        }
                    });
                } else {
                    return $element.on("click", eventHandler);
                }
            }
        };
    };


},{}],17:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1CardCase.html',
            replace: true,
            scope: {
                casecardtitle: '@title',
                casecarddetail1: '@detail1',
                casecarddetail2: '@detail2',
                casecarddetail3: '@detail3',
                onSelect: '&'
            },
            link: function($scope, $element, $attrs) {
                var eventHandler, isTouchDevice, tapping;
                isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
                eventHandler = function(event) {
                    var func;
                    if ($attrs.onSelect === void 0) {
                        return console.log("Warning: No event listener for onSelect");
                    }
                    func = $scope.onSelect;
                    if (typeof func === 'function') {
                        return $scope.$apply(function() {
                            return func(event);
                        });
                    } else {
                        return console.log("Error: onSelect needs to be a function.");
                    }
                };
                if (event === 'click' && isTouchDevice()) {
                    tapping = false;
                    $element.bind('touchstart', function(event) {
                        return tapping = true;
                    });
                    $element.bind('touchmove', function(event) {
                        return tapping = false;
                    });
                    return $element.bind('touchend', function(event) {
                        var func;
                        if (tapping) {
                            event.stopPropagation();
                            if ($attrs.onSelect === void 0) {
                                return console.log("Warning: No event listener for onSelect");
                            }
                            func = $scope.onSelect;
                            if (typeof func === 'function') {
                                return $scope.$apply(function() {
                                    return func(event);
                                });
                            } else {
                                return console.log("Error: onSelect needs to be a function.");
                            }
                        }
                    });
                } else {
                    return $element.on("click", eventHandler);
                }
            }
        };
    };


},{}],18:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1CardChatter.html',
            replace: true,
            scope: {
                chattercardtitle: '@title',
                chattercardicon: '@icon',
                chattercarddetail1: '@detail1',
                onSelect: '&'
            },
            link: function($scope, $element, $attrs) {
                var eventHandler, isTouchDevice, tapping;
                isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
                eventHandler = function(event) {
                    var func;
                    if ($attrs.onSelect === void 0) {
                        return console.log("Warning: No event listener for onSelect");
                    }
                    func = $scope.onSelect;
                    if (typeof func === 'function') {
                        return $scope.$apply(function() {
                            return func(event);
                        });
                    } else {
                        return console.log("Error: onSelect needs to be a function.");
                    }
                };
                if (event === 'click' && isTouchDevice()) {
                    tapping = false;
                    $element.bind('touchstart', function(event) {
                        return tapping = true;
                    });
                    $element.bind('touchmove', function(event) {
                        return tapping = false;
                    });
                    return $element.bind('touchend', function(event) {
                        var func;
                        if (tapping) {
                            event.stopPropagation();
                            if ($attrs.onSelect === void 0) {
                                return console.log("Warning: No event listener for onSelect");
                            }
                            func = $scope.onSelect;
                            if (typeof func === 'function') {
                                return $scope.$apply(function() {
                                    return func(event);
                                });
                            } else {
                                return console.log("Error: onSelect needs to be a function.");
                            }
                        }
                    });
                } else {
                    return $element.on("click", eventHandler);
                }
            }
        };
    };


},{}],19:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1CardContact.html',
            replace: true,
            scope: {
                contactcardicon: '@icon',
                contactcardtitle: '@title',
                contactcarddetail1: '@detail1',
                contactcarddetail2: '@detail2',
                contactcarddetail3: '@detail3',
                onSelect: '&'
            },
            link: function($scope, $element, $attrs) {
                var eventHandler, isTouchDevice, tapping;
                isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
                eventHandler = function(event) {
                    var func;
                    if ($attrs.onSelect === void 0) {
                        return console.log("Warning: No event listener for onSelect");
                    }
                    func = $scope.onSelect;
                    if (typeof func === 'function') {
                        return $scope.$apply(function() {
                            return func(event);
                        });
                    } else {
                        return console.log("Error: onSelect needs to be a function.");
                    }
                };
                if (event === 'click' && isTouchDevice()) {
                    tapping = false;
                    $element.bind('touchstart', function(event) {
                        return tapping = true;
                    });
                    $element.bind('touchmove', function(event) {
                        return tapping = false;
                    });
                    return $element.bind('touchend', function(event) {
                        var func;
                        if (tapping) {
                            event.stopPropagation();
                            if ($attrs.onSelect === void 0) {
                                return console.log("Warning: No event listener for onSelect");
                            }
                            func = $scope.onSelect;
                            if (typeof func === 'function') {
                                return $scope.$apply(function() {
                                    return func(event);
                                });
                            } else {
                                return console.log("Error: onSelect needs to be a function.");
                            }
                        }
                    });
                } else {
                    return $element.on("click", eventHandler);
                }
            }
        };
    };


},{}],20:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1CardCustomObject.html',
            replace: true,
            scope: {
                customcardtitle: '@title',
                customcardlabel1: '@label1',
                customcardlabel2: '@label2',
                customcardlabel3: '@label3',
                customcardlabel4: '@label4',
                customcarddetail1: '@detail1',
                customcarddetail2: '@detail2',
                customcarddetail3: '@detail3',
                customcarddetail4: '@detail4',
                onSelect: '&'
            },
            link: function($scope, $element, $attrs) {
                var eventHandler, isTouchDevice, tapping;
                isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
                eventHandler = function(event) {
                    var func;
                    if ($attrs.onSelect === void 0) {
                        return console.log("Warning: No event listener for onSelect");
                    }
                    func = $scope.onSelect;
                    if (typeof func === 'function') {
                        return $scope.$apply(function() {
                            return func(event);
                        });
                    } else {
                        return console.log("Error: onSelect needs to be a function.");
                    }
                };
                if (event === 'click' && isTouchDevice()) {
                    tapping = false;
                    $element.bind('touchstart', function(event) {
                        return tapping = true;
                    });
                    $element.bind('touchmove', function(event) {
                        return tapping = false;
                    });
                    return $element.bind('touchend', function(event) {
                        var func;
                        if (tapping) {
                            event.stopPropagation();
                            if ($attrs.onSelect === void 0) {
                                return console.log("Warning: No event listener for onSelect");
                            }
                            func = $scope.onSelect;
                            if (typeof func === 'function') {
                                return $scope.$apply(function() {
                                    return func(event);
                                });
                            } else {
                                return console.log("Error: onSelect needs to be a function.");
                            }
                        }
                    });
                } else {
                    return $element.on("click", eventHandler);
                }
            }
        };
    };


},{}],21:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1CardEvent.html',
            replace: true,
            scope: {
                eventcardtime: '@time',
                eventcardduration: '@duration',
                eventcardtitle: '@title',
                eventcarddetail1: '@detail1',
                eventcarddetail2: '@detail2',
                eventcarddetail3: '@detail3',
                onSelect: '&'
            },
            link: function($scope, $element, $attrs) {
                var eventHandler, isTouchDevice, tapping;
                isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
                eventHandler = function(event) {
                    var func;
                    if ($attrs.onSelect === void 0) {
                        return console.log("Warning: No event listener for onSelect");
                    }
                    func = $scope.onSelect;
                    if (typeof func === 'function') {
                        return $scope.$apply(function() {
                            return func(event);
                        });
                    } else {
                        return console.log("Error: onSelect needs to be a function.");
                    }
                };
                if (event === 'click' && isTouchDevice()) {
                    tapping = false;
                    $element.bind('touchstart', function(event) {
                        return tapping = true;
                    });
                    $element.bind('touchmove', function(event) {
                        return tapping = false;
                    });
                    return $element.bind('touchend', function(event) {
                        var func;
                        if (tapping) {
                            event.stopPropagation();
                            if ($attrs.onSelect === void 0) {
                                return console.log("Warning: No event listener for onSelect");
                            }
                            func = $scope.onSelect;
                            if (typeof func === 'function') {
                                return $scope.$apply(function() {
                                    return func(event);
                                });
                            } else {
                                return console.log("Error: onSelect needs to be a function.");
                            }
                        }
                    });
                } else {
                    return $element.on("click", eventHandler);
                }
            }
        };
    };


},{}],22:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1CardFile.html',
            replace: true,
            scope: {
                filecardtitle: '@title',
                filecardicon: '@filetype',
                filecarddetail1: '@detail1',
                filecarddetail2: '@detail2',
                filecarddetail3: '@detail3',
                filecarddetail4: '@detail4',
                onSelect: '&'
            },
            link: function($scope, $element, $attrs) {
                var eventHandler, isTouchDevice, tapping;
                isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
                eventHandler = function(event) {
                    var func;
                    if ($attrs.onSelect === void 0) {
                        return console.log("Warning: No event listener for onSelect");
                    }
                    func = $scope.onSelect;
                    if (typeof func === 'function') {
                        return $scope.$apply(function() {
                            return func(event);
                        });
                    } else {
                        return console.log("Error: onSelect needs to be a function.");
                    }
                };
                if (event === 'click' && isTouchDevice()) {
                    tapping = false;
                    $element.bind('touchstart', function(event) {
                        return tapping = true;
                    });
                    $element.bind('touchmove', function(event) {
                        return tapping = false;
                    });
                    return $element.bind('touchend', function(event) {
                        var func;
                        if (tapping) {
                            event.stopPropagation();
                            if ($attrs.onSelect === void 0) {
                                return console.log("Warning: No event listener for onSelect");
                            }
                            func = $scope.onSelect;
                            if (typeof func === 'function') {
                                return $scope.$apply(function() {
                                    return func(event);
                                });
                            } else {
                                return console.log("Error: onSelect needs to be a function.");
                            }
                        }
                    });
                } else {
                    return $element.on("click", eventHandler);
                }
            }
        };
    };


},{}],23:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1CardListheader.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],24:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1CardOpportunity.html',
            replace: true,
            scope: {
                opptycardtitle: '@title',
                opptycarddetail1: '@detail1',
                opptycarddetail2: '@detail2',
                opptycarddetail3: '@detail3',
                opptycarddetail4: '@detail4',
                onSelect: '&'
            },
            link: function($scope, $element, $attrs) {
                var eventHandler, isTouchDevice, tapping;
                isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
                eventHandler = function(event) {
                    var func;
                    if ($attrs.onSelect === void 0) {
                        return console.log("Warning: No event listener for onSelect");
                    }
                    func = $scope.onSelect;
                    if (typeof func === 'function') {
                        return $scope.$apply(function() {
                            return func(event);
                        });
                    } else {
                        return console.log("Error: onSelect needs to be a function.");
                    }
                };
                if (event === 'click' && isTouchDevice()) {
                    tapping = false;
                    $element.bind('touchstart', function(event) {
                        return tapping = true;
                    });
                    $element.bind('touchmove', function(event) {
                        return tapping = false;
                    });
                    return $element.bind('touchend', function(event) {
                        var func;
                        if (tapping) {
                            event.stopPropagation();
                            if ($attrs.onSelect === void 0) {
                                return console.log("Warning: No event listener for onSelect");
                            }
                            func = $scope.onSelect;
                            if (typeof func === 'function') {
                                return $scope.$apply(function() {
                                    return func(event);
                                });
                            } else {
                                return console.log("Error: onSelect needs to be a function.");
                            }
                        }
                    });
                } else {
                    return $element.on("click", eventHandler);
                }
            }
        };
    };


},{}],25:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1CardRelatedList.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],26:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1CardTask.html',
            replace: true,
            scope: {
                taskcardtitle: '@title',
                taskcarddetail1: '@detail1',
                taskcarddetail2: '@detail2',
                taskcarddetail3: '@date',
                onSelect: '&'
            },
            link: function($scope, $element, $attrs) {
                var eventHandler, isTouchDevice, tapping;
                isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
                eventHandler = function(event) {
                    var func;
                    if ($attrs.onSelect === void 0) {
                        return console.log("Warning: No event listener for onSelect");
                    }
                    func = $scope.onSelect;
                    if (typeof func === 'function') {
                        return $scope.$apply(function() {
                            return func(event);
                        });
                    } else {
                        return console.log("Error: onSelect needs to be a function.");
                    }
                };
                if (event === 'click' && isTouchDevice()) {
                    tapping = false;
                    $element.bind('touchstart', function(event) {
                        return tapping = true;
                    });
                    $element.bind('touchmove', function(event) {
                        return tapping = false;
                    });
                    return $element.bind('touchend', function(event) {
                        var func;
                        if (tapping) {
                            event.stopPropagation();
                            if ($attrs.onSelect === void 0) {
                                return console.log("Warning: No event listener for onSelect");
                            }
                            func = $scope.onSelect;
                            if (typeof func === 'function') {
                                return $scope.$apply(function() {
                                    return func(event);
                                });
                            } else {
                                return console.log("Error: onSelect needs to be a function.");
                            }
                        }
                    });
                } else {
                    return $element.on("click", eventHandler);
                }
            }
        };
    };


},{}],27:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1Checkbox.html',
            replace: true,
            scope: {
                checkboxLabel: '@label',
                checkboxChecked: '@checked'
            },
            link: function($scope, $element, $attrs) {
                return $scope.$watch('checkboxChecked', function(newValue, oldValue) {
                    if (newValue) {
                        if (newValue === "true") {
                            return $element.find('input').attr('checked', newValue);
                        } else {
                            return $element.find('input').removeAttr('checked');
                        }
                    }
                });
            }
        };
    };


},{}],28:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1CheckboxDisabled.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],29:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1CommentPublisherDefault.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],30:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1CommentPublisherWithWarning.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],31:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1DropDownDefault.html',
            replace: true,
            transclude: true,
            scope: {
                dropdowndefaultitem1: '@item1',
                dropdowndefaultitem2: '@item2',
                dropdowndefaultitem3: '@item3',
                dropdowndefaultitem4: '@item4',
                dropdowndefaultitem5: '@item5',
                dropdowndefaultitem6: '@item6',
                onSelect: '&'
            },
            link: function($scope, $element, $attrs) {
                var eventHandler, isTouchDevice, tapping;
                isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
                eventHandler = function(event) {
                    var func;
                    if ($attrs.onSelect === void 0) {
                        return console.log("Warning: No event listener for onSelect");
                    }
                    func = $scope.onSelect;
                    if (typeof func === 'function') {
                        return $scope.$apply(function() {
                            return func(event);
                        });
                    } else {
                        return console.log("Error: onSelect needs to be a function.");
                    }
                };
                if (event === 'click' && isTouchDevice()) {
                    tapping = false;
                    $element.bind('touchstart', function(event) {
                        return tapping = true;
                    });
                    $element.bind('touchmove', function(event) {
                        return tapping = false;
                    });
                    return $element.bind('touchend', function(event) {
                        var func;
                        if (tapping) {
                            event.stopPropagation();
                            if ($attrs.onSelect === void 0) {
                                return console.log("Warning: No event listener for onSelect");
                            }
                            func = $scope.onSelect;
                            if (typeof func === 'function') {
                                return $scope.$apply(function() {
                                    return func(event);
                                });
                            } else {
                                return console.log("Error: onSelect needs to be a function.");
                            }
                        }
                    });
                } else {
                    return $element.on("click", eventHandler);
                }
            }
        };
    };


},{}],32:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1DropDownWithPhoto.html',
            replace: true,
            transclude: true,
            scope: {
                dropdownwithphotoitem1: '@item1',
                dropdownwithphotoitem2: '@item2',
                dropdownwithphotoitem3: '@item3',
                dropdownwithphotoitem4: '@item4',
                dropdownwithphotoitem5: '@item5',
                dropdownwithphotoitem6: '@item6',
                dropdownwithphotoimage: '@image1',
                onSelect: '&'
            },
            link: function($scope, $element, $attrs) {
                var eventHandler, isTouchDevice, tapping;
                isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
                eventHandler = function(event) {
                    var func;
                    if ($attrs.onSelect === void 0) {
                        return console.log("Warning: No event listener for onSelect");
                    }
                    func = $scope.onSelect;
                    if (typeof func === 'function') {
                        return $scope.$apply(function() {
                            return func(event);
                        });
                    } else {
                        return console.log("Error: onSelect needs to be a function.");
                    }
                };
                if (event === 'click' && isTouchDevice()) {
                    tapping = false;
                    $element.bind('touchstart', function(event) {
                        return tapping = true;
                    });
                    $element.bind('touchmove', function(event) {
                        return tapping = false;
                    });
                    return $element.bind('touchend', function(event) {
                        var func;
                        if (tapping) {
                            event.stopPropagation();
                            if ($attrs.onSelect === void 0) {
                                return console.log("Warning: No event listener for onSelect");
                            }
                            func = $scope.onSelect;
                            if (typeof func === 'function') {
                                return $scope.$apply(function() {
                                    return func(event);
                                });
                            } else {
                                return console.log("Error: onSelect needs to be a function.");
                            }
                        }
                    });
                } else {
                    return $element.on("click", eventHandler);
                }
            }
        };
    };


},{}],33:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1FeedCommentDefault.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],34:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1FeedCommentWithModifier.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],35:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1FeedCommentWithPayload.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],36:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1FeedItemDefault.html',
            replace: true,
            transclude: true,
            scope: {
                feeditemtimestamp: '@timestamp',
                feeditemlikes: '@likes',
                feeditemcomments: '@comments',
                feeditembody: '@body',
                feeditemactor: '@actor',
                feeditemactorimage: '@actorImage'
            },
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],37:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1FeedItemOnDrillIn.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],38:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1FeedItemWithPayload.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],39:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1FeedPayloadCompound.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],40:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1FeedPayloadPrimary.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],41:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1FeedPayloadSecondary.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],42:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1FilePreview.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],43:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1FooterSecondaryChildBrowser.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],44:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1FooterSecondaryFilePreview.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],45:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1HeaderPrimaryDefault.html',
            replace: true,
            scope: {
                headerprimarynotifications: '@notifications',
                headerprimarylefticon: '@icon',
                onStageLeft: '&',
                onNotifications: '&'
            },
            link: function($scope, $element, $attrs) {
                var eventHandler, isTouchDevice, tapping;
                isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
                eventHandler = function(event) {
                    var func;
                    if ($attrs.onStageLeft === void 0) {
                        return console.log("Warning: No event listener for onStageLeft");
                    }
                    func = $scope.onStageLeft;
                    if (typeof func === 'function') {
                        return $scope.$apply(function() {
                            return func(event);
                        });
                    } else {
                        return console.log("Error: onStageLeft needs to be a function.");
                    }
                };
                if (event === 'click' && isTouchDevice()) {
                    tapping = false;
                    $element.bind('touchstart', function(event) {
                        return tapping = true;
                    });
                    $element.bind('touchmove', function(event) {
                        return tapping = false;
                    });
                    $element.bind('touchend', function(event) {
                        var func;
                        if (tapping) {
                            event.stopPropagation();
                            if ($attrs.onStageLeft === void 0) {
                                return console.log("Warning: No event listener for onStageLeft");
                            }
                            func = $scope.onStageLeft;
                            if (typeof func === 'function') {
                                return $scope.$apply(function() {
                                    return func(event);
                                });
                            } else {
                                return console.log("Error: onStageLeft needs to be a function.");
                            }
                        }
                    });
                } else {
                    $element.on("click", ".icon-utility-rows", eventHandler);
                }
                eventHandler = function(event) {
                    var func;
                    if ($attrs.onNotifications === void 0) {
                        return console.log("Warning: No event listener for onNotifications");
                    }
                    func = $scope.onNotifications;
                    if (typeof func === 'function') {
                        return $scope.$apply(function() {
                            return func(event);
                        });
                    } else {
                        return console.log("Error: onNotifications needs to be a function.");
                    }
                };
                if (event === 'click' && isTouchDevice()) {
                    tapping = false;
                    $element.bind('touchstart', function(event) {
                        return tapping = true;
                    });
                    $element.bind('touchmove', function(event) {
                        return tapping = false;
                    });
                    return $element.bind('touchend', function(event) {
                        var func;
                        if (tapping) {
                            event.stopPropagation();
                            if ($attrs.onNotifications === void 0) {
                                return console.log("Warning: No event listener for onNotifications");
                            }
                            func = $scope.onNotifications;
                            if (typeof func === 'function') {
                                return $scope.$apply(function() {
                                    return func(event);
                                });
                            } else {
                                return console.log("Error: onNotifications needs to be a function.");
                            }
                        }
                    });
                } else {
                    return $element.on("click", ".icon-utility-notification", eventHandler);
                }
            }
        };
    };


},{}],46:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1HeaderPrimaryModal.html',
            replace: true,
            scope: {
                headerprimarymodalbuttonleft: '@buttonLeft',
                headerprimarymodalbuttonright: '@buttonRight',
                headerprimarymodaltitle: '@title'
            },
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],47:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1HeaderPrimarySearch.html',
            replace: true,
            scope: {
                headerprimarysearchplaceholder: '@placeholder'
            },
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],48:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1HeaderSecondaryChildBrowser.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],49:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1HeaderSecondaryFilePreview.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],50:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1IndicatorDotsDarkBackground.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],51:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1IndicatorDotsLightBackground.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],52:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ListFlagObjects.html',
            replace: true,
            scope: {
                s1listflagobjectsfirsttitle: '@firstTitle',
                s1listflagobjectsfirstmetaone: '@firstSubOne',
                s1listflagobjectsfirstmetatwo: '@firstSubTwo',
                s1listflagobjectssecondtitle: '@secondTitle',
                s1listflagobjectssecondmetaone: '@secondSubOne',
                s1listflagobjectssecondmetatwo: '@secondSubTwo',
                s1listflagobjectsthirdtitle: '@thirdTitle',
                s1listflagobjectsthirdmetaone: '@thirdSubOne',
                s1listflagobjectsthirdmetatwo: '@thirdSubTwo',
                s1listflagobjectsforthtitle: '@forthTitle',
                s1listflagobjectsforthmetaone: '@forthSubOne',
                s1listflagobjectsforthmetatwo: '@forthSubTwo'
            },
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],53:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ListItemAccount.html',
            replace: true,
            scope: {
                listitemaccounttitle: '@title',
                listitemaccountdetail1: '@detail1',
                listitemaccountdetail2: '@detail2',
                onSelect: '&'
            },
            link: function($scope, $element, $attrs) {
                var eventHandler, isTouchDevice, tapping;
                isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
                eventHandler = function(event) {
                    var func;
                    if ($attrs.onSelect === void 0) {
                        return console.log("Warning: No event listener for onSelect");
                    }
                    func = $scope.onSelect;
                    if (typeof func === 'function') {
                        return $scope.$apply(function() {
                            return func(event);
                        });
                    } else {
                        return console.log("Error: onSelect needs to be a function.");
                    }
                };
                if (event === 'click' && isTouchDevice()) {
                    tapping = false;
                    $element.bind('touchstart', function(event) {
                        return tapping = true;
                    });
                    $element.bind('touchmove', function(event) {
                        return tapping = false;
                    });
                    return $element.bind('touchend', function(event) {
                        var func;
                        if (tapping) {
                            event.stopPropagation();
                            if ($attrs.onSelect === void 0) {
                                return console.log("Warning: No event listener for onSelect");
                            }
                            func = $scope.onSelect;
                            if (typeof func === 'function') {
                                return $scope.$apply(function() {
                                    return func(event);
                                });
                            } else {
                                return console.log("Error: onSelect needs to be a function.");
                            }
                        }
                    });
                } else {
                    return $element.on("click", eventHandler);
                }
            }
        };
    };


},{}],54:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ListItemCase.html',
            replace: true,
            scope: {
                listitemcasetitle: '@title',
                listitemcasedetail1: '@detail1',
                listitemcasedetail2: '@detail2',
                listitemcasedetail3: '@detail3',
                onSelect: '&'
            },
            link: function($scope, $element, $attrs) {
                var eventHandler, isTouchDevice, tapping;
                isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
                eventHandler = function(event) {
                    var func;
                    if ($attrs.onSelect === void 0) {
                        return console.log("Warning: No event listener for onSelect");
                    }
                    func = $scope.onSelect;
                    if (typeof func === 'function') {
                        return $scope.$apply(function() {
                            return func(event);
                        });
                    } else {
                        return console.log("Error: onSelect needs to be a function.");
                    }
                };
                if (event === 'click' && isTouchDevice()) {
                    tapping = false;
                    $element.bind('touchstart', function(event) {
                        return tapping = true;
                    });
                    $element.bind('touchmove', function(event) {
                        return tapping = false;
                    });
                    return $element.bind('touchend', function(event) {
                        var func;
                        if (tapping) {
                            event.stopPropagation();
                            if ($attrs.onSelect === void 0) {
                                return console.log("Warning: No event listener for onSelect");
                            }
                            func = $scope.onSelect;
                            if (typeof func === 'function') {
                                return $scope.$apply(function() {
                                    return func(event);
                                });
                            } else {
                                return console.log("Error: onSelect needs to be a function.");
                            }
                        }
                    });
                } else {
                    return $element.on("click", eventHandler);
                }
            }
        };
    };


},{}],55:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ListItemContact.html',
            replace: true,
            scope: {
                listitemcontacticon: '@icon',
                listitemcontacttitle: '@title',
                listitemcontactdetail1: '@detail1',
                listitemcontactdetail2: '@detail2',
                listitemcontactdetail3: '@detail3',
                onSelect: '&'
            },
            link: function($scope, $element, $attrs) {
                var eventHandler, isTouchDevice, tapping;
                isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
                eventHandler = function(event) {
                    var func;
                    if ($attrs.onSelect === void 0) {
                        return console.log("Warning: No event listener for onSelect");
                    }
                    func = $scope.onSelect;
                    if (typeof func === 'function') {
                        return $scope.$apply(function() {
                            return func(event);
                        });
                    } else {
                        return console.log("Error: onSelect needs to be a function.");
                    }
                };
                if (event === 'click' && isTouchDevice()) {
                    tapping = false;
                    $element.bind('touchstart', function(event) {
                        return tapping = true;
                    });
                    $element.bind('touchmove', function(event) {
                        return tapping = false;
                    });
                    return $element.bind('touchend', function(event) {
                        var func;
                        if (tapping) {
                            event.stopPropagation();
                            if ($attrs.onSelect === void 0) {
                                return console.log("Warning: No event listener for onSelect");
                            }
                            func = $scope.onSelect;
                            if (typeof func === 'function') {
                                return $scope.$apply(function() {
                                    return func(event);
                                });
                            } else {
                                return console.log("Error: onSelect needs to be a function.");
                            }
                        }
                    });
                } else {
                    return $element.on("click", eventHandler);
                }
            }
        };
    };


},{}],56:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ListItemContainer.html',
            replace: true,
            transclude: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],57:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ListItemCustomObject.html',
            replace: true,
            scope: {
                listitemcustomtitle: '@title',
                listitemcustomlabel1: '@label1',
                listitemcustomlabel2: '@label2',
                listitemcustomlabel3: '@label3',
                listitemcustomlabel4: '@label4',
                listitemcustomdetail1: '@detail1',
                listitemcustomdetail2: '@detail2',
                listitemcustomdetail3: '@detail3',
                listitemcustomdetail4: '@detail4',
                onSelect: '&'
            },
            link: function($scope, $element, $attrs) {
                var eventHandler, isTouchDevice, tapping;
                isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
                eventHandler = function(event) {
                    var func;
                    if ($attrs.onSelect === void 0) {
                        return console.log("Warning: No event listener for onSelect");
                    }
                    func = $scope.onSelect;
                    if (typeof func === 'function') {
                        return $scope.$apply(function() {
                            return func(event);
                        });
                    } else {
                        return console.log("Error: onSelect needs to be a function.");
                    }
                };
                if (event === 'click' && isTouchDevice()) {
                    tapping = false;
                    $element.bind('touchstart', function(event) {
                        return tapping = true;
                    });
                    $element.bind('touchmove', function(event) {
                        return tapping = false;
                    });
                    return $element.bind('touchend', function(event) {
                        var func;
                        if (tapping) {
                            event.stopPropagation();
                            if ($attrs.onSelect === void 0) {
                                return console.log("Warning: No event listener for onSelect");
                            }
                            func = $scope.onSelect;
                            if (typeof func === 'function') {
                                return $scope.$apply(function() {
                                    return func(event);
                                });
                            } else {
                                return console.log("Error: onSelect needs to be a function.");
                            }
                        }
                    });
                } else {
                    return $element.on("click", eventHandler);
                }
            }
        };
    };


},{}],58:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ListItemDefault.html',
            replace: true,
            scope: {
                listitemdefaulttitle: '@text'
            },
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],59:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ListItemEvent.html',
            replace: true,
            scope: {
                listitemeventtime: '@time',
                listitemeventduration: '@duration',
                listitemeventtitle: '@title',
                listitemeventdetail1: '@detail1',
                listitemeventdetail2: '@detail2',
                listitemeventdetail3: '@detail3',
                onSelect: '&'
            },
            link: function($scope, $element, $attrs) {
                var eventHandler, isTouchDevice, tapping;
                isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
                eventHandler = function(event) {
                    var func;
                    if ($attrs.onSelect === void 0) {
                        return console.log("Warning: No event listener for onSelect");
                    }
                    func = $scope.onSelect;
                    if (typeof func === 'function') {
                        return $scope.$apply(function() {
                            return func(event);
                        });
                    } else {
                        return console.log("Error: onSelect needs to be a function.");
                    }
                };
                if (event === 'click' && isTouchDevice()) {
                    tapping = false;
                    $element.bind('touchstart', function(event) {
                        return tapping = true;
                    });
                    $element.bind('touchmove', function(event) {
                        return tapping = false;
                    });
                    return $element.bind('touchend', function(event) {
                        var func;
                        if (tapping) {
                            event.stopPropagation();
                            if ($attrs.onSelect === void 0) {
                                return console.log("Warning: No event listener for onSelect");
                            }
                            func = $scope.onSelect;
                            if (typeof func === 'function') {
                                return $scope.$apply(function() {
                                    return func(event);
                                });
                            } else {
                                return console.log("Error: onSelect needs to be a function.");
                            }
                        }
                    });
                } else {
                    return $element.on("click", eventHandler);
                }
            }
        };
    };


},{}],60:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ListItemFile.html',
            replace: true,
            scope: {
                listitemfiletitle: '@title',
                listitemfileicon: '@filetype',
                listitemfiledetail1: '@detail1',
                listitemfiledetail2: '@detail2',
                listitemfiledetail3: '@detail3',
                listitemfiledetail4: '@detail4',
                onSelect: '&'
            },
            link: function($scope, $element, $attrs) {
                var eventHandler, isTouchDevice, tapping;
                isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
                eventHandler = function(event) {
                    var func;
                    if ($attrs.onSelect === void 0) {
                        return console.log("Warning: No event listener for onSelect");
                    }
                    func = $scope.onSelect;
                    if (typeof func === 'function') {
                        return $scope.$apply(function() {
                            return func(event);
                        });
                    } else {
                        return console.log("Error: onSelect needs to be a function.");
                    }
                };
                if (event === 'click' && isTouchDevice()) {
                    tapping = false;
                    $element.bind('touchstart', function(event) {
                        return tapping = true;
                    });
                    $element.bind('touchmove', function(event) {
                        return tapping = false;
                    });
                    return $element.bind('touchend', function(event) {
                        var func;
                        if (tapping) {
                            event.stopPropagation();
                            if ($attrs.onSelect === void 0) {
                                return console.log("Warning: No event listener for onSelect");
                            }
                            func = $scope.onSelect;
                            if (typeof func === 'function') {
                                return $scope.$apply(function() {
                                    return func(event);
                                });
                            } else {
                                return console.log("Error: onSelect needs to be a function.");
                            }
                        }
                    });
                } else {
                    return $element.on("click", eventHandler);
                }
            }
        };
    };


},{}],61:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ListItemFlagObjects.html',
            replace: true,
            scope: {
                listitemflagimg: '@img',
                listitemflagtitle: '@title',
                listitemflagmeta1: '@meta1',
                listitemflagmeta2: '@meta2'
            },
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],62:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ListItemOpportunity.html',
            replace: true,
            scope: {
                listitemopptytitle: '@title',
                listitemopptydetail1: '@detail1',
                listitemopptydetail2: '@detail2',
                listitemopptydetail3: '@detail3',
                listitemopptydetail4: '@detail4',
                onSelect: '&'
            },
            link: function($scope, $element, $attrs) {
                var eventHandler, isTouchDevice, tapping;
                isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
                eventHandler = function(event) {
                    var func;
                    if ($attrs.onSelect === void 0) {
                        return console.log("Warning: No event listener for onSelect");
                    }
                    func = $scope.onSelect;
                    if (typeof func === 'function') {
                        return $scope.$apply(function() {
                            return func(event);
                        });
                    } else {
                        return console.log("Error: onSelect needs to be a function.");
                    }
                };
                if (event === 'click' && isTouchDevice()) {
                    tapping = false;
                    $element.bind('touchstart', function(event) {
                        return tapping = true;
                    });
                    $element.bind('touchmove', function(event) {
                        return tapping = false;
                    });
                    return $element.bind('touchend', function(event) {
                        var func;
                        if (tapping) {
                            event.stopPropagation();
                            if ($attrs.onSelect === void 0) {
                                return console.log("Warning: No event listener for onSelect");
                            }
                            func = $scope.onSelect;
                            if (typeof func === 'function') {
                                return $scope.$apply(function() {
                                    return func(event);
                                });
                            } else {
                                return console.log("Error: onSelect needs to be a function.");
                            }
                        }
                    });
                } else {
                    return $element.on("click", eventHandler);
                }
            }
        };
    };


},{}],63:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ListItemTask.html',
            replace: true,
            scope: {
                listitemtasktitle: '@title',
                listitemtaskdetail1: '@detail1',
                listitemtaskdetail2: '@detail2',
                listitemtaskdetail3: '@date',
                onSelect: '&'
            },
            link: function($scope, $element, $attrs) {
                var eventHandler, isTouchDevice, tapping;
                isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
                eventHandler = function(event) {
                    var func;
                    if ($attrs.onSelect === void 0) {
                        return console.log("Warning: No event listener for onSelect");
                    }
                    func = $scope.onSelect;
                    if (typeof func === 'function') {
                        return $scope.$apply(function() {
                            return func(event);
                        });
                    } else {
                        return console.log("Error: onSelect needs to be a function.");
                    }
                };
                if (event === 'click' && isTouchDevice()) {
                    tapping = false;
                    $element.bind('touchstart', function(event) {
                        return tapping = true;
                    });
                    $element.bind('touchmove', function(event) {
                        return tapping = false;
                    });
                    return $element.bind('touchend', function(event) {
                        var func;
                        if (tapping) {
                            event.stopPropagation();
                            if ($attrs.onSelect === void 0) {
                                return console.log("Warning: No event listener for onSelect");
                            }
                            func = $scope.onSelect;
                            if (typeof func === 'function') {
                                return $scope.$apply(function() {
                                    return func(event);
                                });
                            } else {
                                return console.log("Error: onSelect needs to be a function.");
                            }
                        }
                    });
                } else {
                    return $element.on("click", eventHandler);
                }
            }
        };
    };


},{}],64:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ListItemWithIcon.html',
            replace: true,
            scope: {
                listitemicontitle: '@text',
                listitemiconicon: '@icon'
            },
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],65:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ListItemWithLabel.html',
            replace: true,
            scope: {
                listitemlabeltitle: '@title',
                listitemlabelmeta: '@label'
            },
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],66:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ListSingleLineofText.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],67:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ListWithLabels.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],68:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1LookupDefault.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],69:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1LookupError.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],70:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1LookupWithLabel.html',
            replace: true,
            scope: {
                lookupwithlabellabel: '@label',
                lookupwithlabelplaceholder: '@placeholder',
                lookupwithlabelvalue: '@value'
            },
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],71:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1MDPButton.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],72:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1MDPLauncherDefault.html',
            replace: true,
            scope: {
                mdplauncherlabeltl: '@labelTL',
                mdplaunchericontl: '@iconTL'
            },
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],73:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1MDPLauncherOverflow.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],74:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ModalDialogButtonsOnly.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],75:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ModalDialogWithcheckbox.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],76:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ModalDialogWithicon.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],77:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ModalDialogWithtext.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],78:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ModalSortFilterMultisection.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],79:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ModalSortFilterOnesection.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],80:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1PageLevelErrors.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],81:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1PercentageIndicatorBar.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],82:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1PicklistDefault.html',
            replace: true,
            scope: {
                picklistdefaultvalue: '@value',
                picklistdefaultlabel: '@label'
            },
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],83:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1PicklistError.html',
            replace: true,
            scope: {
                picklisterrorvalue: '@value',
                picklisterrorlabel: '@label'
            },
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],84:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1PicklistLabelOutside.html',
            replace: true,
            scope: {
                picklistlabeloutsidevalue: '@value',
                picklistoutsidelabellabel: '@label'
            },
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],85:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ProgressSpinnerDefault.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],86:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ProgressSpinnerModal.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],87:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1RadioButton.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],88:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1SearchWidgetDefault.html',
            replace: true,
            scope: {
                searchwidgetplaceholder: '@value'
            },
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],89:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1SearchWidgetWithsortfilter.html',
            replace: true,
            scope: {
                searchwidgetsortfilterplaceholder: '@placeholder'
            },
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],90:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1SortFilter.html',
            replace: true,
            scope: {
                sortfilterplaceholderdefault: '@default',
                sortfilterplaceholderalternate: '@alternate'
            },
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],91:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1StagedNavigationNotifications.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],92:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1StagedNavigationStageLeft.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],93:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1TextInputDefault.html',
            replace: true,
            scope: {
                textinputplaceholder: '@placeholder',
                textinputvalue: '@value'
            },
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],94:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1TextInputDisabled.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],95:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1TextInputError.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],96:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1TextInputSearchInput.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],97:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1TextInputWithFixedText.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],98:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1TextInputWithLabel.html',
            replace: true,
            scope: {
                textinputwithlabellabel: '@label',
                textinputwithlabelplaceholder: '@placeholder',
                textinputwithlabelvalue: '@value'
            },
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],99:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1TextareaDefault.html',
            replace: true,
            scope: {
                textareadefaultplaceholder: '@placeholder'
            },
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],100:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1TextareaError.html',
            replace: true,
            scope: {
                textareaerrorplaceholder: '@placeholder'
            },
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],101:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1TextareaWithButtons.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],102:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1TextareaWithButtonsandError.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],103:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ToastNotification.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],104:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'component/s1ViewPicker.html',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var isTouchDevice;
                return isTouchDevice = function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window;
                };
            }
        };
    };


},{}],105:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'sgExampleContainer.html',
            transclude: true,
            replace: true,
            link: function(scope, element, attrs) {}
        };
    };


},{}],106:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'sgExampleContainerDefaultHeader.html',
            transclude: true,
            replace: true,
            link: function(scope, element, attrs) {}
        };
    };


},{}],107:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'sgExamples.html',
            replace: true,
            link: function(scope, element, attrs) {}
        };
    };


},{}],108:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'sgNav.html',
            replace: true,
            link: function(scope, element, attrs) {}
        };
    };


},{}],109:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'sgProductStyleguide.html',
            replace: true,
            link: function(scope, element, attrs) {}
        };
    };


},{}],110:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'sgSandbox.html',
            replace: true,
            link: function(scope, element, attrs) {}
        };
    };


},{}],111:[function(require,module,exports){
    module.exports = function() {
        return {
            restrict: 'E',
            templateUrl: 'sgSubnav.html',
            replace: true,
            link: function(scope, element, attrs) {}
        };
    };


},{}],112:[function(require,module,exports){
    angular.module('app.directives', ['app.directives']);

    angular.module('app.directives').directive('s1AnchorDark', require('./directive/component/s1AnchorDark.coffee'));

    angular.module('app.directives').directive('s1AnchorLightDefault', require('./directive/component/s1AnchorLightDefault.coffee'));

    angular.module('app.directives').directive('s1AnchorLightLabelonBottom', require('./directive/component/s1AnchorLightLabelonBottom.coffee'));

    angular.module('app.directives').directive('s1AnchorLightNoBackground', require('./directive/component/s1AnchorLightNoBackground.coffee'));

    angular.module('app.directives').directive('s1AvatarDefault', require('./directive/component/s1AvatarDefault.coffee'));

    angular.module('app.directives').directive('s1AvatarAttending', require('./directive/component/s1AvatarAttending.coffee'));

    angular.module('app.directives').directive('s1ButtonPrimaryDefault', require('./directive/component/s1ButtonPrimaryDefault.coffee'));

    angular.module('app.directives').directive('s1ButtonPrimaryDisabled', require('./directive/component/s1ButtonPrimaryDisabled.coffee'));

    angular.module('app.directives').directive('s1ButtonSecondaryDefault', require('./directive/component/s1ButtonSecondaryDefault.coffee'));

    angular.module('app.directives').directive('s1ButtonSecondaryDisabled', require('./directive/component/s1ButtonSecondaryDisabled.coffee'));

    angular.module('app.directives').directive('s1ButtonGroups', require('./directive/component/s1ButtonGroups.coffee'));

    angular.module('app.directives').directive('s1ButtonTertiary', require('./directive/component/s1ButtonTertiary.coffee'));

    angular.module('app.directives').directive('s1Calendar', require('./directive/component/s1Calendar.coffee'));

    angular.module('app.directives').directive('s1CardRelatedList', require('./directive/component/s1CardRelatedList.coffee'));

    angular.module('app.directives').directive('s1CardAccount', require('./directive/component/s1CardAccount.coffee'));

    angular.module('app.directives').directive('s1CardCase', require('./directive/component/s1CardCase.coffee'));

    angular.module('app.directives').directive('s1CardChatter', require('./directive/component/s1CardChatter.coffee'));

    angular.module('app.directives').directive('s1CardContact', require('./directive/component/s1CardContact.coffee'));

    angular.module('app.directives').directive('s1CardFile', require('./directive/component/s1CardFile.coffee'));

    angular.module('app.directives').directive('s1CardOpportunity', require('./directive/component/s1CardOpportunity.coffee'));

    angular.module('app.directives').directive('s1CardCustomObject', require('./directive/component/s1CardCustomObject.coffee'));

    angular.module('app.directives').directive('s1CardTask', require('./directive/component/s1CardTask.coffee'));

    angular.module('app.directives').directive('s1CardEvent', require('./directive/component/s1CardEvent.coffee'));

    angular.module('app.directives').directive('s1CardListheader', require('./directive/component/s1CardListheader.coffee'));

    angular.module('app.directives').directive('s1Checkbox', require('./directive/component/s1Checkbox.coffee'));

    angular.module('app.directives').directive('s1CheckboxDisabled', require('./directive/component/s1CheckboxDisabled.coffee'));

    angular.module('app.directives').directive('s1CommentPublisherDefault', require('./directive/component/s1CommentPublisherDefault.coffee'));

    angular.module('app.directives').directive('s1CommentPublisherWithWarning', require('./directive/component/s1CommentPublisherWithWarning.coffee'));

    angular.module('app.directives').directive('s1DropDownDefault', require('./directive/component/s1DropDownDefault.coffee'));

    angular.module('app.directives').directive('s1DropDownWithPhoto', require('./directive/component/s1DropDownWithPhoto.coffee'));

    angular.module('app.directives').directive('s1FeedCommentDefault', require('./directive/component/s1FeedCommentDefault.coffee'));

    angular.module('app.directives').directive('s1FeedCommentWithPayload', require('./directive/component/s1FeedCommentWithPayload.coffee'));

    angular.module('app.directives').directive('s1FeedCommentWithModifier', require('./directive/component/s1FeedCommentWithModifier.coffee'));

    angular.module('app.directives').directive('s1FeedItemDefault', require('./directive/component/s1FeedItemDefault.coffee'));

    angular.module('app.directives').directive('s1FeedItemWithPayload', require('./directive/component/s1FeedItemWithPayload.coffee'));

    angular.module('app.directives').directive('s1FeedItemOnDrillIn', require('./directive/component/s1FeedItemOnDrillIn.coffee'));

    angular.module('app.directives').directive('s1FeedPayloadPrimary', require('./directive/component/s1FeedPayloadPrimary.coffee'));

    angular.module('app.directives').directive('s1FeedPayloadSecondary', require('./directive/component/s1FeedPayloadSecondary.coffee'));

    angular.module('app.directives').directive('s1FeedPayloadCompound', require('./directive/component/s1FeedPayloadCompound.coffee'));

    angular.module('app.directives').directive('s1FilePreview', require('./directive/component/s1FilePreview.coffee'));

    angular.module('app.directives').directive('s1FooterSecondaryFilePreview', require('./directive/component/s1FooterSecondaryFilePreview.coffee'));

    angular.module('app.directives').directive('s1FooterSecondaryChildBrowser', require('./directive/component/s1FooterSecondaryChildBrowser.coffee'));

    angular.module('app.directives').directive('s1HeaderPrimaryDefault', require('./directive/component/s1HeaderPrimaryDefault.coffee'));

    angular.module('app.directives').directive('s1HeaderPrimarySearch', require('./directive/component/s1HeaderPrimarySearch.coffee'));

    angular.module('app.directives').directive('s1HeaderPrimaryModal', require('./directive/component/s1HeaderPrimaryModal.coffee'));

    angular.module('app.directives').directive('s1HeaderSecondaryFilePreview', require('./directive/component/s1HeaderSecondaryFilePreview.coffee'));

    angular.module('app.directives').directive('s1HeaderSecondaryChildBrowser', require('./directive/component/s1HeaderSecondaryChildBrowser.coffee'));

    angular.module('app.directives').directive('s1IndicatorDotsLightBackground', require('./directive/component/s1IndicatorDotsLightBackground.coffee'));

    angular.module('app.directives').directive('s1IndicatorDotsDarkBackground', require('./directive/component/s1IndicatorDotsDarkBackground.coffee'));

    angular.module('app.directives').directive('s1ListSingleLineofText', require('./directive/component/s1ListSingleLineofText.coffee'));

    angular.module('app.directives').directive('s1ListWithLabels', require('./directive/component/s1ListWithLabels.coffee'));

    angular.module('app.directives').directive('s1ListFlagObjects', require('./directive/component/s1ListFlagObjects.coffee'));

    angular.module('app.directives').directive('s1ListItemDefault', require('./directive/component/s1ListItemDefault.coffee'));

    angular.module('app.directives').directive('s1ListItemWithIcon', require('./directive/component/s1ListItemWithIcon.coffee'));

    angular.module('app.directives').directive('s1ListItemWithLabel', require('./directive/component/s1ListItemWithLabel.coffee'));

    angular.module('app.directives').directive('s1ListItemFlagObjects', require('./directive/component/s1ListItemFlagObjects.coffee'));

    angular.module('app.directives').directive('s1ListItemContainer', require('./directive/component/s1ListItemContainer.coffee'));

    angular.module('app.directives').directive('s1ListItemTask', require('./directive/component/s1ListItemTask.coffee'));

    angular.module('app.directives').directive('s1ListItemEvent', require('./directive/component/s1ListItemEvent.coffee'));

    angular.module('app.directives').directive('s1ListItemAccount', require('./directive/component/s1ListItemAccount.coffee'));

    angular.module('app.directives').directive('s1ListItemCase', require('./directive/component/s1ListItemCase.coffee'));

    angular.module('app.directives').directive('s1ListItemContact', require('./directive/component/s1ListItemContact.coffee'));

    angular.module('app.directives').directive('s1ListItemFile', require('./directive/component/s1ListItemFile.coffee'));

    angular.module('app.directives').directive('s1ListItemOpportunity', require('./directive/component/s1ListItemOpportunity.coffee'));

    angular.module('app.directives').directive('s1ListItemCustomObject', require('./directive/component/s1ListItemCustomObject.coffee'));

    angular.module('app.directives').directive('s1LookupDefault', require('./directive/component/s1LookupDefault.coffee'));

    angular.module('app.directives').directive('s1LookupError', require('./directive/component/s1LookupError.coffee'));

    angular.module('app.directives').directive('s1LookupWithLabel', require('./directive/component/s1LookupWithLabel.coffee'));

    angular.module('app.directives').directive('s1MDPButton', require('./directive/component/s1MDPButton.coffee'));

    angular.module('app.directives').directive('s1MDPLauncherDefault', require('./directive/component/s1MDPLauncherDefault.coffee'));

    angular.module('app.directives').directive('s1MDPLauncherOverflow', require('./directive/component/s1MDPLauncherOverflow.coffee'));

    angular.module('app.directives').directive('s1ModalDialogButtonsOnly', require('./directive/component/s1ModalDialogButtonsOnly.coffee'));

    angular.module('app.directives').directive('s1ModalDialogWithtext', require('./directive/component/s1ModalDialogWithtext.coffee'));

    angular.module('app.directives').directive('s1ModalDialogWithicon', require('./directive/component/s1ModalDialogWithicon.coffee'));

    angular.module('app.directives').directive('s1ModalDialogWithcheckbox', require('./directive/component/s1ModalDialogWithcheckbox.coffee'));

    angular.module('app.directives').directive('s1ModalSortFilterOnesection', require('./directive/component/s1ModalSortFilterOnesection.coffee'));

    angular.module('app.directives').directive('s1ModalSortFilterMultisection', require('./directive/component/s1ModalSortFilterMultisection.coffee'));

    angular.module('app.directives').directive('s1SortFilter', require('./directive/component/s1SortFilter.coffee'));

    angular.module('app.directives').directive('s1PageLevelErrors', require('./directive/component/s1PageLevelErrors.coffee'));

    angular.module('app.directives').directive('s1PercentageIndicatorBar', require('./directive/component/s1PercentageIndicatorBar.coffee'));

    angular.module('app.directives').directive('s1PicklistDefault', require('./directive/component/s1PicklistDefault.coffee'));

    angular.module('app.directives').directive('s1PicklistError', require('./directive/component/s1PicklistError.coffee'));

    angular.module('app.directives').directive('s1PicklistLabelOutside', require('./directive/component/s1PicklistLabelOutside.coffee'));

    angular.module('app.directives').directive('s1ProgressSpinnerDefault', require('./directive/component/s1ProgressSpinnerDefault.coffee'));

    angular.module('app.directives').directive('s1ProgressSpinnerModal', require('./directive/component/s1ProgressSpinnerModal.coffee'));

    angular.module('app.directives').directive('s1RadioButton', require('./directive/component/s1RadioButton.coffee'));

    angular.module('app.directives').directive('s1SearchWidgetDefault', require('./directive/component/s1SearchWidgetDefault.coffee'));

    angular.module('app.directives').directive('s1SearchWidgetWithsortfilter', require('./directive/component/s1SearchWidgetWithsortfilter.coffee'));

    angular.module('app.directives').directive('s1StagedNavigationStageLeft', require('./directive/component/s1StagedNavigationStageLeft.coffee'));

    angular.module('app.directives').directive('s1StagedNavigationNotifications', require('./directive/component/s1StagedNavigationNotifications.coffee'));

    angular.module('app.directives').directive('s1TextareaDefault', require('./directive/component/s1TextareaDefault.coffee'));

    angular.module('app.directives').directive('s1TextareaError', require('./directive/component/s1TextareaError.coffee'));

    angular.module('app.directives').directive('s1TextareaWithButtons', require('./directive/component/s1TextareaWithButtons.coffee'));

    angular.module('app.directives').directive('s1TextareaWithButtonsandError', require('./directive/component/s1TextareaWithButtonsandError.coffee'));

    angular.module('app.directives').directive('s1TextInputDefault', require('./directive/component/s1TextInputDefault.coffee'));

    angular.module('app.directives').directive('s1TextInputDisabled', require('./directive/component/s1TextInputDisabled.coffee'));

    angular.module('app.directives').directive('s1TextInputError', require('./directive/component/s1TextInputError.coffee'));

    angular.module('app.directives').directive('s1TextInputWithLabel', require('./directive/component/s1TextInputWithLabel.coffee'));

    angular.module('app.directives').directive('s1TextInputSearchInput', require('./directive/component/s1TextInputSearchInput.coffee'));

    angular.module('app.directives').directive('s1TextInputWithFixedText', require('./directive/component/s1TextInputWithFixedText.coffee'));

    angular.module('app.directives').directive('s1ToastNotification', require('./directive/component/s1ToastNotification.coffee'));

    angular.module('app.directives').directive('s1ViewPicker', require('./directive/component/s1ViewPicker.coffee'));


},{"./directive/component/s1AnchorDark.coffee":3,"./directive/component/s1AnchorLightDefault.coffee":4,"./directive/component/s1AnchorLightLabelonBottom.coffee":5,"./directive/component/s1AnchorLightNoBackground.coffee":6,"./directive/component/s1AvatarAttending.coffee":7,"./directive/component/s1AvatarDefault.coffee":8,"./directive/component/s1ButtonGroups.coffee":9,"./directive/component/s1ButtonPrimaryDefault.coffee":10,"./directive/component/s1ButtonPrimaryDisabled.coffee":11,"./directive/component/s1ButtonSecondaryDefault.coffee":12,"./directive/component/s1ButtonSecondaryDisabled.coffee":13,"./directive/component/s1ButtonTertiary.coffee":14,"./directive/component/s1Calendar.coffee":15,"./directive/component/s1CardAccount.coffee":16,"./directive/component/s1CardCase.coffee":17,"./directive/component/s1CardChatter.coffee":18,"./directive/component/s1CardContact.coffee":19,"./directive/component/s1CardCustomObject.coffee":20,"./directive/component/s1CardEvent.coffee":21,"./directive/component/s1CardFile.coffee":22,"./directive/component/s1CardListheader.coffee":23,"./directive/component/s1CardOpportunity.coffee":24,"./directive/component/s1CardRelatedList.coffee":25,"./directive/component/s1CardTask.coffee":26,"./directive/component/s1Checkbox.coffee":27,"./directive/component/s1CheckboxDisabled.coffee":28,"./directive/component/s1CommentPublisherDefault.coffee":29,"./directive/component/s1CommentPublisherWithWarning.coffee":30,"./directive/component/s1DropDownDefault.coffee":31,"./directive/component/s1DropDownWithPhoto.coffee":32,"./directive/component/s1FeedCommentDefault.coffee":33,"./directive/component/s1FeedCommentWithModifier.coffee":34,"./directive/component/s1FeedCommentWithPayload.coffee":35,"./directive/component/s1FeedItemDefault.coffee":36,"./directive/component/s1FeedItemOnDrillIn.coffee":37,"./directive/component/s1FeedItemWithPayload.coffee":38,"./directive/component/s1FeedPayloadCompound.coffee":39,"./directive/component/s1FeedPayloadPrimary.coffee":40,"./directive/component/s1FeedPayloadSecondary.coffee":41,"./directive/component/s1FilePreview.coffee":42,"./directive/component/s1FooterSecondaryChildBrowser.coffee":43,"./directive/component/s1FooterSecondaryFilePreview.coffee":44,"./directive/component/s1HeaderPrimaryDefault.coffee":45,"./directive/component/s1HeaderPrimaryModal.coffee":46,"./directive/component/s1HeaderPrimarySearch.coffee":47,"./directive/component/s1HeaderSecondaryChildBrowser.coffee":48,"./directive/component/s1HeaderSecondaryFilePreview.coffee":49,"./directive/component/s1IndicatorDotsDarkBackground.coffee":50,"./directive/component/s1IndicatorDotsLightBackground.coffee":51,"./directive/component/s1ListFlagObjects.coffee":52,"./directive/component/s1ListItemAccount.coffee":53,"./directive/component/s1ListItemCase.coffee":54,"./directive/component/s1ListItemContact.coffee":55,"./directive/component/s1ListItemContainer.coffee":56,"./directive/component/s1ListItemCustomObject.coffee":57,"./directive/component/s1ListItemDefault.coffee":58,"./directive/component/s1ListItemEvent.coffee":59,"./directive/component/s1ListItemFile.coffee":60,"./directive/component/s1ListItemFlagObjects.coffee":61,"./directive/component/s1ListItemOpportunity.coffee":62,"./directive/component/s1ListItemTask.coffee":63,"./directive/component/s1ListItemWithIcon.coffee":64,"./directive/component/s1ListItemWithLabel.coffee":65,"./directive/component/s1ListSingleLineofText.coffee":66,"./directive/component/s1ListWithLabels.coffee":67,"./directive/component/s1LookupDefault.coffee":68,"./directive/component/s1LookupError.coffee":69,"./directive/component/s1LookupWithLabel.coffee":70,"./directive/component/s1MDPButton.coffee":71,"./directive/component/s1MDPLauncherDefault.coffee":72,"./directive/component/s1MDPLauncherOverflow.coffee":73,"./directive/component/s1ModalDialogButtonsOnly.coffee":74,"./directive/component/s1ModalDialogWithcheckbox.coffee":75,"./directive/component/s1ModalDialogWithicon.coffee":76,"./directive/component/s1ModalDialogWithtext.coffee":77,"./directive/component/s1ModalSortFilterMultisection.coffee":78,"./directive/component/s1ModalSortFilterOnesection.coffee":79,"./directive/component/s1PageLevelErrors.coffee":80,"./directive/component/s1PercentageIndicatorBar.coffee":81,"./directive/component/s1PicklistDefault.coffee":82,"./directive/component/s1PicklistError.coffee":83,"./directive/component/s1PicklistLabelOutside.coffee":84,"./directive/component/s1ProgressSpinnerDefault.coffee":85,"./directive/component/s1ProgressSpinnerModal.coffee":86,"./directive/component/s1RadioButton.coffee":87,"./directive/component/s1SearchWidgetDefault.coffee":88,"./directive/component/s1SearchWidgetWithsortfilter.coffee":89,"./directive/component/s1SortFilter.coffee":90,"./directive/component/s1StagedNavigationNotifications.coffee":91,"./directive/component/s1StagedNavigationStageLeft.coffee":92,"./directive/component/s1TextInputDefault.coffee":93,"./directive/component/s1TextInputDisabled.coffee":94,"./directive/component/s1TextInputError.coffee":95,"./directive/component/s1TextInputSearchInput.coffee":96,"./directive/component/s1TextInputWithFixedText.coffee":97,"./directive/component/s1TextInputWithLabel.coffee":98,"./directive/component/s1TextareaDefault.coffee":99,"./directive/component/s1TextareaError.coffee":100,"./directive/component/s1TextareaWithButtons.coffee":101,"./directive/component/s1TextareaWithButtonsandError.coffee":102,"./directive/component/s1ToastNotification.coffee":103,"./directive/component/s1ViewPicker.coffee":104}],113:[function(require,module,exports){
    var myApp;

    require('./directives.coffee');

    myApp = angular.module('app', ['app.directives']);

    myApp.controller('appController', require('./controller/appController.coffee'));

    myApp.controller('examplesController', require('./controller/examplesController.coffee'));

    myApp.directive('sgNav', require('./directive/sgNav.coffee'));

    myApp.directive('sgSubnav', require('./directive/sgSubnav.coffee'));

    myApp.directive('sgProductStyleguide', require('./directive/sgProductStyleguide.coffee'));

    myApp.directive('sgExamples', require('./directive/sgExamples.coffee'));

    myApp.directive('sgSandbox', require('./directive/sgSandbox.coffee'));

    myApp.directive('sgExampleContainer', require('./directive/sgExampleContainer.coffee'));

    myApp.directive('sgExampleContainerDefaultHeader', require('./directive/sgExampleContainerDefaultHeader.coffee'));

    myApp.service('localyticsService', require('./service/localyticsService.coffee'));


},{"./controller/appController.coffee":1,"./controller/examplesController.coffee":2,"./directive/sgExampleContainer.coffee":105,"./directive/sgExampleContainerDefaultHeader.coffee":106,"./directive/sgExamples.coffee":107,"./directive/sgNav.coffee":108,"./directive/sgProductStyleguide.coffee":109,"./directive/sgSandbox.coffee":110,"./directive/sgSubnav.coffee":111,"./directives.coffee":112,"./service/localyticsService.coffee":114}],114:[function(require,module,exports){
    module.exports = function() {
        return {
            init: function(apiKey) {
                console.log("init locaytics " + apiKey);
                this.localyticsSession = LocalyticsSession(apiKey, {
                    logger: true
                });
                this.localyticsSession.open();
                return this.localyticsSession.upload();
            },
            tagEvent: function(eventName, attributes) {
                if (attributes === void 0) {
                    console.log("tagEvent " + eventName);
                    return this.localyticsSession.tagEvent(eventName);
                } else {
                    console.log("tagEvent " + eventName + " (" + JSON.stringify(attributes) + ")");
                    return this.localyticsSession.tagEvent(eventName, attributes);
                }
            },
            tagScreen: function(screenName) {
                console.log("tagScreen " + screenName);
                return this.localyticsSession.tagScreen(screenName);
            }
        };
    };


},{}]},{},[113])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2NvbnRyb2xsZXIvYXBwQ29udHJvbGxlci5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2NvbnRyb2xsZXIvZXhhbXBsZXNDb250cm9sbGVyLmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMUFuY2hvckRhcmsuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxQW5jaG9yTGlnaHREZWZhdWx0LmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMUFuY2hvckxpZ2h0TGFiZWxvbkJvdHRvbS5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9jb21wb25lbnQvczFBbmNob3JMaWdodE5vQmFja2dyb3VuZC5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9jb21wb25lbnQvczFBdmF0YXJBdHRlbmRpbmcuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxQXZhdGFyRGVmYXVsdC5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9jb21wb25lbnQvczFCdXR0b25Hcm91cHMuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxQnV0dG9uUHJpbWFyeURlZmF1bHQuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxQnV0dG9uUHJpbWFyeURpc2FibGVkLmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMUJ1dHRvblNlY29uZGFyeURlZmF1bHQuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxQnV0dG9uU2Vjb25kYXJ5RGlzYWJsZWQuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxQnV0dG9uVGVydGlhcnkuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxQ2FsZW5kYXIuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxQ2FyZEFjY291bnQuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxQ2FyZENhc2UuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxQ2FyZENoYXR0ZXIuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxQ2FyZENvbnRhY3QuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxQ2FyZEN1c3RvbU9iamVjdC5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9jb21wb25lbnQvczFDYXJkRXZlbnQuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxQ2FyZEZpbGUuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxQ2FyZExpc3RoZWFkZXIuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxQ2FyZE9wcG9ydHVuaXR5LmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMUNhcmRSZWxhdGVkTGlzdC5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9jb21wb25lbnQvczFDYXJkVGFzay5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9jb21wb25lbnQvczFDaGVja2JveC5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9jb21wb25lbnQvczFDaGVja2JveERpc2FibGVkLmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMUNvbW1lbnRQdWJsaXNoZXJEZWZhdWx0LmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMUNvbW1lbnRQdWJsaXNoZXJXaXRoV2FybmluZy5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9jb21wb25lbnQvczFEcm9wRG93bkRlZmF1bHQuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxRHJvcERvd25XaXRoUGhvdG8uY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxRmVlZENvbW1lbnREZWZhdWx0LmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMUZlZWRDb21tZW50V2l0aE1vZGlmaWVyLmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMUZlZWRDb21tZW50V2l0aFBheWxvYWQuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxRmVlZEl0ZW1EZWZhdWx0LmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMUZlZWRJdGVtT25EcmlsbEluLmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMUZlZWRJdGVtV2l0aFBheWxvYWQuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxRmVlZFBheWxvYWRDb21wb3VuZC5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9jb21wb25lbnQvczFGZWVkUGF5bG9hZFByaW1hcnkuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxRmVlZFBheWxvYWRTZWNvbmRhcnkuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxRmlsZVByZXZpZXcuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxRm9vdGVyU2Vjb25kYXJ5Q2hpbGRCcm93c2VyLmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMUZvb3RlclNlY29uZGFyeUZpbGVQcmV2aWV3LmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMUhlYWRlclByaW1hcnlEZWZhdWx0LmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMUhlYWRlclByaW1hcnlNb2RhbC5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9jb21wb25lbnQvczFIZWFkZXJQcmltYXJ5U2VhcmNoLmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMUhlYWRlclNlY29uZGFyeUNoaWxkQnJvd3Nlci5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9jb21wb25lbnQvczFIZWFkZXJTZWNvbmRhcnlGaWxlUHJldmlldy5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9jb21wb25lbnQvczFJbmRpY2F0b3JEb3RzRGFya0JhY2tncm91bmQuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxSW5kaWNhdG9yRG90c0xpZ2h0QmFja2dyb3VuZC5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9jb21wb25lbnQvczFMaXN0RmxhZ09iamVjdHMuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxTGlzdEl0ZW1BY2NvdW50LmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMUxpc3RJdGVtQ2FzZS5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9jb21wb25lbnQvczFMaXN0SXRlbUNvbnRhY3QuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxTGlzdEl0ZW1Db250YWluZXIuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxTGlzdEl0ZW1DdXN0b21PYmplY3QuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxTGlzdEl0ZW1EZWZhdWx0LmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMUxpc3RJdGVtRXZlbnQuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxTGlzdEl0ZW1GaWxlLmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMUxpc3RJdGVtRmxhZ09iamVjdHMuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxTGlzdEl0ZW1PcHBvcnR1bml0eS5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9jb21wb25lbnQvczFMaXN0SXRlbVRhc2suY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxTGlzdEl0ZW1XaXRoSWNvbi5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9jb21wb25lbnQvczFMaXN0SXRlbVdpdGhMYWJlbC5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9jb21wb25lbnQvczFMaXN0U2luZ2xlTGluZW9mVGV4dC5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9jb21wb25lbnQvczFMaXN0V2l0aExhYmVscy5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9jb21wb25lbnQvczFMb29rdXBEZWZhdWx0LmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMUxvb2t1cEVycm9yLmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMUxvb2t1cFdpdGhMYWJlbC5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9jb21wb25lbnQvczFNRFBCdXR0b24uY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxTURQTGF1bmNoZXJEZWZhdWx0LmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMU1EUExhdW5jaGVyT3ZlcmZsb3cuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxTW9kYWxEaWFsb2dCdXR0b25zT25seS5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9jb21wb25lbnQvczFNb2RhbERpYWxvZ1dpdGhjaGVja2JveC5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9jb21wb25lbnQvczFNb2RhbERpYWxvZ1dpdGhpY29uLmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMU1vZGFsRGlhbG9nV2l0aHRleHQuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxTW9kYWxTb3J0RmlsdGVyTXVsdGlzZWN0aW9uLmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMU1vZGFsU29ydEZpbHRlck9uZXNlY3Rpb24uY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxUGFnZUxldmVsRXJyb3JzLmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMVBlcmNlbnRhZ2VJbmRpY2F0b3JCYXIuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxUGlja2xpc3REZWZhdWx0LmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMVBpY2tsaXN0RXJyb3IuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxUGlja2xpc3RMYWJlbE91dHNpZGUuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxUHJvZ3Jlc3NTcGlubmVyRGVmYXVsdC5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9jb21wb25lbnQvczFQcm9ncmVzc1NwaW5uZXJNb2RhbC5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9jb21wb25lbnQvczFSYWRpb0J1dHRvbi5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9jb21wb25lbnQvczFTZWFyY2hXaWRnZXREZWZhdWx0LmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMVNlYXJjaFdpZGdldFdpdGhzb3J0ZmlsdGVyLmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMVNvcnRGaWx0ZXIuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxU3RhZ2VkTmF2aWdhdGlvbk5vdGlmaWNhdGlvbnMuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxU3RhZ2VkTmF2aWdhdGlvblN0YWdlTGVmdC5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9jb21wb25lbnQvczFUZXh0SW5wdXREZWZhdWx0LmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMVRleHRJbnB1dERpc2FibGVkLmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMVRleHRJbnB1dEVycm9yLmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMVRleHRJbnB1dFNlYXJjaElucHV0LmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMVRleHRJbnB1dFdpdGhGaXhlZFRleHQuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxVGV4dElucHV0V2l0aExhYmVsLmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMVRleHRhcmVhRGVmYXVsdC5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9jb21wb25lbnQvczFUZXh0YXJlYUVycm9yLmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMVRleHRhcmVhV2l0aEJ1dHRvbnMuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvY29tcG9uZW50L3MxVGV4dGFyZWFXaXRoQnV0dG9uc2FuZEVycm9yLmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMVRvYXN0Tm90aWZpY2F0aW9uLmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL2NvbXBvbmVudC9zMVZpZXdQaWNrZXIuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvc2dFeGFtcGxlQ29udGFpbmVyLmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL3NnRXhhbXBsZUNvbnRhaW5lckRlZmF1bHRIZWFkZXIuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9kaXJlY3RpdmUvc2dFeGFtcGxlcy5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9zZ05hdi5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9zZ1Byb2R1Y3RTdHlsZWd1aWRlLmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvZGlyZWN0aXZlL3NnU2FuZGJveC5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZS9zZ1N1Ym5hdi5jb2ZmZWUiLCIvdG1wL2J1aWxkXzIxYzgzMTdkLWJhYzEtNDliZi1hZWM5LWJiNjkyOTJmNzMwNi9zcmMvY29mZmVlL2RpcmVjdGl2ZXMuY29mZmVlIiwiL3RtcC9idWlsZF8yMWM4MzE3ZC1iYWMxLTQ5YmYtYWVjOS1iYjY5MjkyZjczMDYvc3JjL2NvZmZlZS9tYWluLmNvZmZlZSIsIi90bXAvYnVpbGRfMjFjODMxN2QtYmFjMS00OWJmLWFlYzktYmI2OTI5MmY3MzA2L3NyYy9jb2ZmZWUvc2VydmljZS9sb2NhbHl0aWNzU2VydmljZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsU0FBQTs7QUFBQSxDQUFBLENBQXlCLENBQVQsRUFBQSxDQUFBLEVBQUEsQ0FBQyxJQUFqQixJQUFnQjtDQUVkLEtBQUEsdU5BQUE7S0FBQSxPQUFBO0NBQUEsQ0FBQSxDQUFVLElBQVYsdURBQUE7Q0FBQSxDQUNBLENBQWMsUUFBZCxtREFEQTtDQUFBLENBRUEsQ0FBYSxPQUFiLG9EQUZBO0NBQUEsQ0FJQSxDQUFTLEdBQVQsQ0FKQTtDQUFBLENBS0EsQ0FBVyxHQUFNLEVBQWpCO0NBTEEsQ0FPQSxDQUFVLENBQVYsRUFBZ0IsRUFBUztDQVB6QixDQVFBLENBQXlCLENBQUEsRUFBbkIsRUFBUztBQUM2QyxDQUE1RCxDQUFBLEVBQUcsQ0FBd0QsQ0FBekMsQ0FBZixDQUFRLGlCQUFSO0NBQ0QsRUFBUyxDQUFULEVBQUEsS0FBQTtBQUN1RCxDQUF4QyxH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QUFDOUIsQ0FYQSxDQVc2QixHQUF4QixFQUF3QixFQUE3QixFQUFBLG1CQUE2Qjs7QUFDN0IsQ0FaQSxDQVlzQyxHQUFqQyxFQUFpQyxFQUF0QyxXQUFBLG1CQUFzQzs7QUFDdEMsQ0FiQSxDQWFtRCxHQUE5QyxFQUE4QyxFQUFuRCx3QkFBQSxtQkFBbUQ7O0FBRW5ELENBZkEsQ0FlbUMsR0FBOUIsRUFBTCxZQUFBLGlCQUFtQzs7OztBQ2ZuQyxDQUFPLEVBQVUsR0FBWCxDQUFOLEVBQWlCO1NBQ2Y7Q0FBQSxDQUFNLENBQUEsQ0FBTixFQUFNLEdBQUM7Q0FDTCxFQUFBLEdBQUEsQ0FBTyxVQUFLO0NBQVosQ0FDK0MsQ0FBMUIsQ0FBcEIsRUFBRCxXQUFBO0NBQStDLENBQVEsRUFBUixFQUFDLEVBQUE7Q0FEaEQsT0FDcUI7Q0FEckIsR0FFQyxFQUFELFdBQWtCO0NBQ2pCLEdBQUEsRUFBRCxPQUFBLElBQWtCO0NBSnBCLElBQU07Q0FBTixDQU1VLENBQUEsQ0FBVixJQUFBLENBQVcsQ0FBRDtDQUNSLEdBQUcsQ0FBYyxDQUFqQixJQUFHO0NBQ0QsRUFBQSxJQUFPLENBQVAsQ0FBQSxFQUFZO0NBQ1gsR0FBQSxJQUFELENBQUEsTUFBQSxFQUFrQjtNQUZwQixFQUFBO0NBSUUsRUFBQSxDQUFZLEdBQUwsQ0FBUCxDQUFZLENBQWlDLENBQWpDO0NBQ1gsQ0FBc0MsRUFBdEMsSUFBRCxDQUFBLENBQUEsS0FBQSxFQUFrQjtRQU5aO0NBTlYsSUFNVTtDQU5WLENBY1csQ0FBQSxDQUFYLEtBQUEsQ0FBVztDQUNULEVBQUEsR0FBQSxDQUFPLEdBQVAsRUFBWTtDQUNYLEdBQUEsS0FBRCxDQUFBLEdBQUEsSUFBa0I7Q0FoQnBCLElBY1c7Q0FmSTtDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiYXBwQ29udHJvbGxlciA9ICgkc2NvcGUsICRlbGVtZW50LCAkaHR0cCwgbG9jYWx5dGljc1NlcnZpY2UpIC0+XG5cbiAgS0VZX0RFViA9ICcxM2VhM2FjZDNmZGY1NjJkMjljMmU5Ny0zYTY1ZTJlMC01M2IxLTExZTMtOTZkMS0wMDljNWZkYTBhMjUnXG4gIEtFWV9TVEFHSU5HID0gJzZlMGVlNjhjYTRmNjkzYWIzZjZkYWZmLTJlNjE5MDRhLTUzYjEtMTFlMy05NmQxLTAwOWM1ZmRhMGEyNSdcbiAgS0VZX1BVQkxJQyA9ICcwMDA1ZmMwMTllZmVmOGEyYmFkZDE2Mi0yMTdjM2NmYS01M2IxLTExZTMtOTZkMS0wMDljNWZkYTBhMjUnXG5cbiAgYXBpS2V5ID0gS0VZX0RFVlxuICBsb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbjtcblxuICBwb3J0ID0gaWYgd2luZG93LmxvY2F0aW9uLnBvcnQgdGhlbiAnOicgKyB3aW5kb3cubG9jYXRpb24ucG9ydCBlbHNlICcnXG4gIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgKyBwb3J0XG4gIGlmIGxvY2F0aW9uLm9yaWdpbi5pbmRleE9mKCdzdGFnaW5nLXNmZGMtc3R5bGVndWlkZScpIGlzbnQgLTFcbiAgICBhcGlLZXkgPSBLRVlfU1RBR0lOR1xuICBlbHNlIGlmIGxvY2F0aW9uLm9yaWdpbi5pbmRleE9mKCdzZmRjLXN0eWxlZ3VpZGUnKSBpc250IC0xXG4gICAgYXBpS2V5ID0gS0VZX1BVQkxJQ1xuXG4gIGxvY2FseXRpY3NTZXJ2aWNlLmluaXQgYXBpS2V5XG5cbiAgY29uc29sZS5sb2cgXCJuZXcgYXBwQ29udHJvbGxlclwiXG5cbiAgIyBMb29rdXAgRE9NIG5vZGVzXG4gICR3aW5kb3cgPSAkIHdpbmRvd1xuICAkbWFpbiA9ICQgJyNzZy1tYWluJ1xuICAkY29udGVudCA9ICQgJyNzZy1jb250ZW50J1xuICAkc3VibmF2ID0gbnVsbFxuICBzdWJuYXZUb3AgPSAwXG4gICRjb21wb25lbnROYXYgPSBudWxsXG5cbiAgIyBFeGFtcGxlc1xuICAkc2NvcGUucGhvbmVUeXBlID0gXCJpcGhvbmVcIlxuXG4gICMgTW9iaWxlIG5hdiBvcGVuL2Nsb3NlXG4gICRzY29wZS5uYXZPcGVuSXMgPSB0cnVlXG4gICRzY29wZS5uYXZDbG9zZUlzID0gZmFsc2VcblxuICAkc2NvcGUub3Blbk1vZGFsID0gLT5cbiAgICAkc2NvcGUubmF2SXMgPSB0cnVlXG4gICAgJHNjb3BlLm5hdk9wZW5JcyA9IGZhbHNlXG4gICAgJHNjb3BlLm5hdkNsb3NlSXMgPSB0cnVlXG5cbiAgJHNjb3BlLmNsb3NlTW9kYWwgPSAtPlxuICAgICRzY29wZS5uYXZJcyA9IGZhbHNlXG4gICAgJHNjb3BlLm5hdk9wZW5JcyA9IHRydWVcbiAgICAkc2NvcGUubmF2Q2xvc2VJcyA9IGZhbHNlXG5cbiAgc2Nyb2xsVG9TZWN0aW9uID0gKGlkKSAtPlxuICAgIHNlY3Rpb24gPSAkIFwic2VjdGlvbltpZD0nI3tpZH0nXVwiXG4gICAgaWYgc2VjdGlvbi5sZW5ndGggaXMgMFxuICAgICAgY29uc29sZS5sb2cgXCJVbmtub3duIHNlY3Rpb24gSWQ6ICN7aWR9XCJcbiAgICBlbHNlXG4gICAgICBvZmZzZXQgPSBzZWN0aW9uLm9mZnNldCgpLnRvcFxuXG4gICAgICAjIGZvciBjcm9zcyBicm93c2VyIHN1cHBvcnQgd2UgbmVlZCB0byB1c2UgYm9keSwgaHRtbCBhbmQgZG9jdW1lbnRcbiAgICAgICMgQHNlZSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS80MTY1MDk0XG4gICAgICAkKFwiYm9keSxodG1sLGRvY3VtZW50XCIpLmFuaW1hdGVcbiAgICAgICAgc2Nyb2xsVG9wOiBvZmZzZXRcblxuICAjc3VibmF2VG9wID0gJHN1Ym5hdi5vZmZzZXQoKS50b3BcbiAgY29tcG9uZW50TmF2VG9wID0gdW5kZWZpbmVkXG4gIGNvbXBvbmVudE5hdklzRml4ZWQgPSBmYWxzZVxuXG4gIHN1Ym5hdkFuY2hvcnMgPSBbXVxuICBjdXJyZW50U3ViTmF2ID0gbnVsbFxuXG4gIGlzQ29udGVudE1hcmdpbmVkID0gZmFsc2VcblxuICAkd2luZG93LnNjcm9sbCAoZXZlbnQpIC0+XG4gICAgc2Nyb2xsVG9wID0gJHdpbmRvdy5zY3JvbGxUb3AoKVxuXG4gICAgaWYgc3VibmF2QW5jaG9ycy5sZW5ndGggPiAwXG4gICAgICAjY29uc29sZS5sb2cgXCJzZWxlY3QgcmlnaHQgc3VibmF2XCJcblxuICAgICAgZm9yIGFUYWcsIGkgaW4gc3VibmF2QW5jaG9yc1xuICAgICAgICBzdCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wXG4gICAgICAgIG9mZnNldCA9IGFUYWcub2Zmc2V0KCkudG9wIC0gODBcbiAgICAgICAgaWYgc3QgPCBvZmZzZXRcbiAgICAgICAgICBpZiBpIGlzbnQgMFxuICAgICAgICAgICAgYVRhZyA9IHN1Ym5hdkFuY2hvcnNbaS0xXVxuICAgICAgICAgICNjb25zb2xlLmxvZyAncmlnaHQgYW5jaG9yICcgKyBhVGFnWzBdLm5hbWUgKyBcIiBjdXJyZW50IFwiICsgY3VycmVudFN1Yk5hdlxuICAgICAgICAgIGlmIGFUYWdbMF0ubmFtZSBpc250IGN1cnJlbnRTdWJOYXZcbiAgICAgICAgICAgICQoXCIjI3tjdXJyZW50U3ViTmF2fVwiKS5yZW1vdmVDbGFzcyAnc2ctc3VibmF2LXNlbGVjdGVkJ1xuICAgICAgICAgICAgY3VycmVudFN1Yk5hdiA9IGFUYWdbMF0ubmFtZVxuICAgICAgICAgICAgJChcIiMje2N1cnJlbnRTdWJOYXZ9XCIpLmFkZENsYXNzICdzZy1zdWJuYXYtc2VsZWN0ZWQnXG4gICAgICAgICAgYnJlYWtcblxuICAkaHR0cC5nZXQoJy9hdXRoZW50aWNhdGVkJykuc3VjY2VzcyAocmVzdWx0KSA9PlxuICAgIGNvbnNvbGUubG9nIFwiYXV0aGVudGljYXRlZDogI3tyZXN1bHQuYXV0aGVudGljYXRlZH1cIlxuXG4gICAgaXNBdXRoZW50aWNhdGVkID0gcmVzdWx0LmF1dGhlbnRpY2F0ZWRcblxuXG4gICAgJGh0dHAuZ2V0KCdjb25maWcvbmF2Lmpzb24nKS5zdWNjZXNzIChuYXZDb25maWcpID0+XG5cbiAgICAgICRzdWJuYXYgPSAkIFwiI3NnLXN1Ym5hdlwiXG4gICAgICBzdWJuYXZUb3AgPSAkc3VibmF2Lm9mZnNldCgpLnRvcFxuXG4gICAgICAkc2NvcGUubmF2SXRlbXMgPSBuYXZDb25maWcubmF2SXRlbXNcblxuICAgICAgc2V0VGltZW91dCAtPlxuICAgICAgICBpZiBpc0F1dGhlbnRpY2F0ZWRcbiAgICAgICAgICB0YWdzID0gJCBcImFbZGF0YS1yb2xlPSd1bmF1dGhlbnRpY2F0ZWQnXVwiXG4gICAgICAgIGVsc2VcbiAgICAgICAgICB0YWdzID0gJCBcImFbZGF0YS1yb2xlPSdhdXRoZW50aWNhdGVkJ11cIlxuICAgICAgICB0YWdzLmhpZGUoKVxuICAgICAgLCAwXG5cbiAgICAgICRzY29wZS5zZWxlY3RTdWJuYXYgPSAobmF2KSAtPlxuICAgICAgICBjb25zb2xlLmxvZyBcInNlbGVjdFN1Ym5hdjogI3tuYXYuaWR9XCJcbiAgICAgICAgc2Nyb2xsVG9TZWN0aW9uIG5hdi5pZFxuXG4gICAgICAkc2NvcGUuc2VsZWN0TmF2ID0gKG5hdiwgaW5pdCA9IGZhbHNlKSAtPlxuICAgICAgICBjb25zb2xlLmxvZyBcInNlbGVjdE5hdiBcIiArIEpTT04uc3RyaW5naWZ5KG5hdilcblxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWROYXYgPSBuYXYuaWRcbiAgICAgICAgJHNjb3BlLnRpdGxlID0gbmF2LnRpdGxlXG4gICAgICAgICRzY29wZS5zdWJ0aXRsZSA9IG5hdi5zdWJ0aXRsZVxuICAgICAgICAkc2NvcGUuc3VibmF2SXRlbXMgPSBuYXYuc3VibmF2XG5cbiAgICAgICAgaWQgPSBuYXYuaWRcblxuICAgICAgICAjIHdoZW4gbmF2IGlzIHNlbGVjZXRlZCBzdG9yZSBzdGF0ZSAocmVmYWN0b3IgdG91IG5nUm91dGUpXG4gICAgICAgICMgYW5kIGNsb3NlIG1lbnVcbiAgICAgICAgaWYgbm90IGluaXQgYW5kIGlkIGlzbnQgJ2d1aWRlbGluZXMnXG4gICAgICAgICAgaWYgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlXG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUgbnVsbCwgbnVsbCwgXCI/aWQ9I3tpZH1cIlxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyBcIj9pZD0je2lkfVwiXG5cbiAgICAgICAgIyBDbGVhciBzdWJuYXYgYW5kIGNvbnRlbnRcblxuICAgICAgICAkY29udGVudC5lbXB0eSgpXG5cbiAgICAgICAgIyBpbiBjYXNlIGljb24gYmcgd2FzIHNldFxuICAgICAgICAkY29udGVudC5yZW1vdmVDbGFzcyBcInNnLWljb25zLWRhcmtcIlxuXG4gICAgICAgIHN1Ym5hdkFuY2hvcnMgPSBbXVxuXG4gICAgICAgIG1lbW9yaXplbk5hbWVkQW5jaG9ycyA9IC0+XG4gICAgICAgICAgaWYgJHNjb3BlLnN1Ym5hdkl0ZW1zP1xuICAgICAgICAgICAgZm9yIHN1Ym5hdkl0ZW0gaW4gJHNjb3BlLnN1Ym5hdkl0ZW1zXG4gICAgICAgICAgICAgIGFUYWcgPSAkIFwiYVtuYW1lPScje3N1Ym5hdkl0ZW0uaWR9J11cIlxuICAgICAgICAgICAgICAjY29uc29sZS5sb2cgXCJzdWJuYXYgYW5jaG9yIFwiICsgc3VibmF2SXRlbS5pZFxuICAgICAgICAgICAgICBzdWJuYXZBbmNob3JzLnB1c2ggYVRhZ1xuXG4gICAgICAgICRzY29wZS5jdXJyZW50TmF2ID0gaWRcblxuICAgICAgICBzd2l0Y2ggaWRcblxuICAgICAgICAgIHdoZW4gJ3N0eWxlJ1xuICAgICAgICAgICAgbG9jYWx5dGljc1NlcnZpY2UudGFnU2NyZWVuICdzdHlsZSdcbiAgICAgICAgICAgICRodHRwLmdldCgnY29uZmlnL2ljb25zLmpzb24nKS5zdWNjZXNzIChpY29uSlNPTikgPT5cbiAgICAgICAgICAgICAgZG9jdHlwZSA9IGljb25KU09OLmRvY3R5cGVcbiAgICAgICAgICAgICAgZm9yIHNldCBpbiBpY29uSlNPTi5zZXRzXG4gICAgICAgICAgICAgICAgaWYgc2V0LmlzRmlsZT9cbiAgICAgICAgICAgICAgICAgIGZvciBmaWxlIGluIHNldC5maWxlc1xuICAgICAgICAgICAgICAgICAgICBmaWxlLnNyYyA9IFwiI3tzZXQucGF0aH0vI3tmaWxlLnNyY31cIlxuXG4gICAgICAgICAgICAgICRzY29wZS5pY29uU2V0cyA9IGljb25KU09OLnNldHNcblxuICAgICAgICAgICAgICAkaHR0cC5nZXQoJ2NvbmZpZy9zdHlsZS5qc29uJykuc3VjY2VzcyAoanNvbikgPT5cblxuICAgICAgICAgICAgICAgICRzY29wZS5ndWlkZWxpbmVzID0ganNvbi5ndWlkZWxpbmVzWzBdXG4gICAgICAgICAgICAgICAgJHNjb3BlLmNvbG9ycyA9IGpzb24uY29sb3JzXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cgXCJpY29uc1NldHMgXCIgKyAkc2NvcGUuaWNvblNldHMubGVuZ3RoXG5cbiAgICAgICAgICAgICAgICBjdXJyZW50R3VpZGVsaW5lID0gMFxuXG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzR3VpZGVsaW5lTW9kYWwgPSBmYWxzZVxuXG4gICAgICAgICAgICAgICAgJHNjb3BlLmhpZGVHdWlkZWxpbmVNb2RhbCA9IC0+ICRzY29wZS5pc0d1aWRlbGluZU1vZGFsID0gZmFsc2VcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2hvd0d1aWRlbGluZU1vZGFsID0gKGxldHRlcikgLT5cbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nIFwiZ3VpZGVsaW5lTW9kYWwgI3tsZXR0ZXJ9XCJcblxuICAgICAgICAgICAgICAgICAgZyA9IGpzb24uZ3VpZGVsaW5lc1tjdXJyZW50R3VpZGVsaW5lXVxuICAgICAgICAgICAgICAgICAgYW5ub3RhdGlvbnMgPSBnLmxlZnRBbm5vdGF0aW9ucy5jb25jYXQgZy5yaWdodEFubm90YXRpb25zXG4gICAgICAgICAgICAgICAgICBmb3IgYSBpbiBhbm5vdGF0aW9uc1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyBcImNsYXNzZXMgXCIgKyBhLmNsYXNzXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMgPSBhLmNsYXNzLnNwbGl0ICcgJ1xuICAgICAgICAgICAgICAgICAgICBmb3IgYyBpbiBjbGFzc2VzXG4gICAgICAgICAgICAgICAgICAgICAgaWYgYy5pbmRleE9mKCdzZy12LS0nKSBpcyAwXG4gICAgICAgICAgICAgICAgICAgICAgICBsID0gYy5jaGFyQXQoYy5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgbCBpcyBsZXR0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cgXCJmb3VuZCBcIiArIGEudGl0bGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmd1aWRlbGluZU1vZGFsQW5ub3RhdGlvbiA9IGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmlzR3VpZGVsaW5lTW9kYWwgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuZG93bmxvYWRHdWlkZWxpbmVzID0gLT5cbiAgICAgICAgICAgICAgICAgIGxvY2FseXRpY3NTZXJ2aWNlLnRhZ0V2ZW50ICdkb3dubG9hZCcsIHtuYW1lOiAnZ3VpZGVsaW5lcyd9XG4gICAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gXCJcIlxuICAgICAgICAgICAgICAgICAgb3BlbiBcImFzc2V0cy9TMUFwcEd1aWRlbGluZXMucGRmXCJcblxuICAgICAgICAgICAgICAgICRzY29wZS5kb3dubG9hZCA9IChpZCkgLT5cbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nICdkb3dubG9hZCAnICsgaWRcbiAgICAgICAgICAgICAgICAgIGxvY2FseXRpY3NTZXJ2aWNlLnRhZ0V2ZW50ICdkb3dubG9hZCcsIHtuYW1lOiBpZH1cbiAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBcImRvd25sb2FkLyN7aWR9XCJcblxuICAgICAgICAgICAgICAgICRzY29wZS5kb3dubG9hZENvbG9yU3dhdGNoZXMgPSAtPlxuICAgICAgICAgICAgICAgICAgbG9jYWx5dGljc1NlcnZpY2UudGFnRXZlbnQgJ2Rvd25sb2FkJywge25hbWU6ICdzd2F0Y2hlcyd9XG4gICAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gXCJhc3NldHMvU0YxLVN3YXRjaGVzLmFjb1wiXG5cbiAgICAgICAgICAgICAgICAkc2NvcGUudG9nZ2xlQmFja2dyb3VuZCA9IChpZCkgLT5cbiAgICAgICAgICAgICAgICAgIGxvY2FseXRpY3NTZXJ2aWNlLnRhZ0V2ZW50ICd0b2dnbGVCYWNrZ3JvdW5kJywge3NlY3Rpb246IGlkfVxuICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuZmluZChcIiMje2lkfVwiKS50b2dnbGVDbGFzcyBcImJnLXNjdC1tZWQgYmctc2N0LWRya1wiXG5cbiAgICAgICAgICAgICAgICAkc2NvcGUucHJldkd1aWRlbGluZSA9IC0+XG4gICAgICAgICAgICAgICAgICBsb2NhbHl0aWNzU2VydmljZS50YWdFdmVudCAnZ3VpZGVsaW5lcycsIHthY3Rpb246ICdwcmV2J31cbiAgICAgICAgICAgICAgICAgIGN1cnJlbnRHdWlkZWxpbmUgPSBpZiBjdXJyZW50R3VpZGVsaW5lID4gMCB0aGVuIGN1cnJlbnRHdWlkZWxpbmUgLSAxIGVsc2UganNvbi5ndWlkZWxpbmVzLmxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgICAgICRzY29wZS5ndWlkZWxpbmVzID0ganNvbi5ndWlkZWxpbmVzW2N1cnJlbnRHdWlkZWxpbmVdXG5cbiAgICAgICAgICAgICAgICAkc2NvcGUubmV4dEd1aWRlbGluZSA9IC0+XG4gICAgICAgICAgICAgICAgICBsb2NhbHl0aWNzU2VydmljZS50YWdFdmVudCAnZ3VpZGVsaW5lcycsIHthY3Rpb246ICduZXh0J31cbiAgICAgICAgICAgICAgICAgIGN1cnJlbnRHdWlkZWxpbmUgPSBpZiBjdXJyZW50R3VpZGVsaW5lIDwganNvbi5ndWlkZWxpbmVzLmxlbmd0aCAtIDEgdGhlbiBjdXJyZW50R3VpZGVsaW5lICsgMSBlbHNlIDBcbiAgICAgICAgICAgICAgICAgICRzY29wZS5ndWlkZWxpbmVzID0ganNvbi5ndWlkZWxpbmVzW2N1cnJlbnRHdWlkZWxpbmVdXG5cbiAgICAgICAgICB3aGVuICdjb21wb25lbnRzJywgJ3Byb3RvJywgJ2lzdidcbiAgICAgICAgICAgIGxvY2FseXRpY3NTZXJ2aWNlLnRhZ1NjcmVlbiBpZFxuICAgICAgICAgICAgJGNvbnRlbnQubG9hZCBcIiN7aWR9Lmh0bWxcIiwgKCkgLT5cbiAgICAgICAgICAgICAgJGNvbXBvbmVudE5hdiA9ICQgJy5zZy1jb2wtbmF2J1xuICAgICAgICAgICAgICBjb21wb25lbnROYXZUb3AgPSBpZiAkY29tcG9uZW50TmF2Lmxlbmd0aCA+IDAgdGhlbiAkY29tcG9uZW50TmF2Lm9mZnNldCgpLnRvcCBlbHNlIG51bGxcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaCArIFwiX1wiXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2gucmVwbGFjZShcIl9cIiwgXCJcIilcblxuICAgICAgICAgIHdoZW4gJ2V4YW1wbGVzJ1xuICAgICAgICAgICAgbG9jYWx5dGljc1NlcnZpY2UudGFnU2NyZWVuIGlkXG4gICAgICAgICAgICAkc2NvcGUuc2VhcmNoU2NvcGVkTGlzdDEgPSBbXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTXkgQWNjb3VudHMnfVxuICAgICAgICAgICAgICB7dGV4dDogJ0FjY291bnRzIGluIHRoZSBNaWR3ZXN0J31cbiAgICAgICAgICAgICAge3RleHQ6ICdSZWNlbnRseSBWaWV3ZWQgQWNjb3VudHMnfVxuICAgICAgICAgICAgICB7dGV4dDogJ1NGIEFjY291bnRzJ31cbiAgICAgICAgICAgIF1cblxuICAgICAgICAgICAgJHNjb3BlLnNlYXJjaFNjb3BlZExpc3QyID0gW1xuICAgICAgICAgICAgICB7dGV4dDogJ1VuaXRlZCBQYXJ0bmVycyd9XG4gICAgICAgICAgICAgIHt0ZXh0OiAnSm9obnNvbiBDb3JubWVhbCd9XG4gICAgICAgICAgICAgIHt0ZXh0OiAnRWxlY3RyaWMgR2VuZXJhbHMnfVxuICAgICAgICAgICAgICB7dGV4dDogJ1Nwcml0ZSBJbmMuJ31cbiAgICAgICAgICAgICAge3RleHQ6ICdBY21lIEluY29ycG9yYXRlZCd9XG4gICAgICAgICAgICAgIHt0ZXh0OiAnQ3lwcmVzcyBHcm92ZSBDaGV2cmUnfVxuICAgICAgICAgICAgICB7dGV4dDogJ1F1YWtlcid9XG4gICAgICAgICAgICAgIHt0ZXh0OiAnSm9obnNvbiAmIEpvaG5zb24nfVxuICAgICAgICAgICAgICB7dGV4dDogJ0FudGhyb3BvbG9naWUnfVxuICAgICAgICAgICAgICB7dGV4dDogJ0V4cGVkaWEuY29tJ31cbiAgICAgICAgICAgICAge3RleHQ6ICdDcmF0ZSAmIEJhcnJlbCd9XG4gICAgICAgICAgICAgIHt0ZXh0OiAnU3ByaXRlIEluYy4nfVxuICAgICAgICAgICAgICB7dGV4dDogJ0FjbWUgSW5jb3Jwb3JhdGVkJ31cbiAgICAgICAgICAgICAge3RleHQ6ICdDeXByZXNzIEdyb3ZlIENoZXZyZSd9XG4gICAgICAgICAgICAgIHt0ZXh0OiAnUXVha2VyJ31cbiAgICAgICAgICAgICAge3RleHQ6ICdKb2huc29uICYgSm9obnNvbid9XG4gICAgICAgICAgICBdXG5cbiAgICAgICAgICAgICRzY29wZS5zaG93RXhhbXBsZSA9IChpZCkgLT5cbiAgICAgICAgICAgICAgY29uc29sZS5sb2cgXCJzaG93RXhhbXBsZSAje2lkfVwiXG4gICAgICAgICAgICAgICRzY29wZS5jdXJyZW50RXhhbXBsZSA9IGlkXG4gICAgICAgICAgICAgIGZvciBleGFtcGxlIGluICRzY29wZS5leGFtcGxlc1xuICAgICAgICAgICAgICAgIGlmIGV4YW1wbGUuaWQgaXMgaWRcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nIFwiZm91bmQgZXhhbXBsZVwiXG4gICAgICAgICAgICAgICAgICAkc2NvcGUuZXhhbXBsZVRpdGxlID0gZXhhbXBsZS50aXRsZVxuICAgICAgICAgICAgICAgICAgJHNjb3BlLmV4YW1wbGVEZXNjcmlwdGlvbiA9IGV4YW1wbGUuZGVzY3JpcHRpb25cbiAgICAgICAgICAgICAgICAgICRzY29wZS5leGFtcGxlQ29tcG9uZW50cyA9IGV4YW1wbGUuY29tcG9uZW50c1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJ2NvbmZpZy9leGFtcGxlcy5qc29uJykuc3VjY2VzcyAoanNvbikgPT5cbiAgICAgICAgICAgICAgY29uc29sZS5sb2cgJ0pTT04nXG4gICAgICAgICAgICAgICRzY29wZS5leGFtcGxlcyA9IGpzb24uZXhhbXBsZXNcbiAgICAgICAgICAgICAgJHNjb3BlLnNob3dFeGFtcGxlIGpzb24uZXhhbXBsZXNbMF0uaWRcblxuICAgICAgICAgIHdoZW4gJ2xvZ2luJywgJ2xvZ291dCdcbiAgICAgICAgICAgIGxvY2FseXRpY3NTZXJ2aWNlLnRhZ0V2ZW50IGlkXG4gICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gXCIvI3tpZH1cIlxuXG4gICAgICAgICAgd2hlbiAnc2FuZGJveCdcblxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvciBcIlVua25vd24gTmF2aWdhdGlvbiBJZDogI3tpZH1cIlxuXG5cbiAgICAgICMgSWYgbm8gc2VhcmNoIGlzIGZvdW5kIHNob3cgZmlyc3QgbmF2aWdhdGlvbiBvcHRpb25cbiAgICAgIGlmIGxvY2F0aW9uLnNlYXJjaCBpcyAnJ1xuICAgICAgICAkc2NvcGUuc2VsZWN0TmF2IG5hdkNvbmZpZy5uYXZJdGVtc1swXSwgdHJ1ZVxuICAgICAgIyBVc2UgdGhlIGxvY2F0aW9uIHNlYXJjaCB2YWx1ZVxuICAgICAgZWxzZVxuICAgICAgICBpZCA9IGxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSkuc3BsaXQoJz0nKVsxXVxuICAgICAgICBmb3IgbmF2IGluIG5hdkNvbmZpZy5uYXZJdGVtc1xuICAgICAgICAgIGlmIG5hdi5pZCBpcyBpZFxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdE5hdiBuYXYsIHRydWVcblxuYXBwQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGVsZW1lbnQnLCAnJGh0dHAnLCAnbG9jYWx5dGljc1NlcnZpY2UnXVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFwcENvbnRyb2xsZXJcbiIsImV4YW1wbGVzQ29udHJvbGxlciA9ICgkc2NvcGUpIC0+XG5cbiAgY29uc29sZS5sb2cgJ2V4YW1wbGVzQ29udHJvbGxlcidcblxuZXhhbXBsZXNDb250cm9sbGVyLiRpbmplY3QgPSBbXG4gICckc2NvcGUnXG5dXG5cbm1vZHVsZS5leHBvcnRzID0gZXhhbXBsZXNDb250cm9sbGVyIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUFuY2hvckRhcmsuaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICAgIGFuY2hvcmRhcmt0aXRsZTogJ0B0aXRsZSdcbiAgXG4gICAgYW5jaG9yZGFya2Rlc2NyaXB0aW9uOiAnQGRlc2NyaXB0aW9uJ1xuICBcbiAgICBhbmNob3JkYXJraWNvbjogJ0BpY29uJ1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUFuY2hvckxpZ2h0RGVmYXVsdC5odG1sJ1xuICByZXBsYWNlIDogdHJ1ZVxuICBcbiAgc2NvcGU6IHtcbiAgXG4gICAgYW5jaG9ybGlnaHRsYWJlbDogJ0BsYWJlbCdcbiAgXG4gICAgYW5jaG9ybGlnaHR0aXRsZTogJ0B0aXRsZSdcbiAgXG4gICAgYW5jaG9ybGlnaHRpY29uOiAnQGljb24nXG4gIFxuICAgIGFuY2hvcmxpZ2h0YnV0dG9ubGFiZWw6ICdAYnV0dG9uJ1xuICBcbiAgXG4gICAgb25OZXc6ICcmJ1xuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICBcblxuICAgIGV2ZW50SGFuZGxlciA9IChldmVudCkgLT5cbiAgICAgIGlmICRhdHRycy5vbk5ldyBpcyB1bmRlZmluZWRcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKFwiV2FybmluZzogTm8gZXZlbnQgbGlzdGVuZXIgZm9yIG9uTmV3XCIpXG4gICAgICBcbiAgICAgIGZ1bmMgPSAkc2NvcGUub25OZXdcbiAgICAgIGlmKHR5cGVvZiBmdW5jIGlzICdmdW5jdGlvbicpXG4gICAgICAgICRzY29wZS4kYXBwbHkgLT5cbiAgICAgICAgICBmdW5jKGV2ZW50KVxuICAgICAgZWxzZVxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBvbk5ldyBuZWVkcyB0byBiZSBhIGZ1bmN0aW9uLlwiKVxuXG4gICAgXG4gICAgaWYgZXZlbnQgaXMgJ2NsaWNrJyBhbmQgaXNUb3VjaERldmljZSgpXG5cbiAgICAgIHRhcHBpbmcgPSBmYWxzZVxuICAgICAgJGVsZW1lbnQuYmluZCAndG91Y2hzdGFydCcsIChldmVudCkgLT5cbiAgICAgICAgdGFwcGluZyA9IHRydWVcbiAgICAgICRlbGVtZW50LmJpbmQgJ3RvdWNobW92ZScsIChldmVudCkgLT5cbiAgICAgICAgdGFwcGluZyA9IGZhbHNlXG4gICAgICAkZWxlbWVudC5iaW5kICd0b3VjaGVuZCcsIChldmVudCkgLT5cbiAgICAgICAgaWYgdGFwcGluZ1xuICAgICAgICAgICMgcHJldmVudCBldmVudCBidWJibGluZyB0byBhbGxvdyBpbm5lciB0YXAgdGFyZ2V0XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgICAgICAgIGlmICRhdHRycy5vbk5ldyBpcyB1bmRlZmluZWRcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhcIldhcm5pbmc6IE5vIGV2ZW50IGxpc3RlbmVyIGZvciBvbk5ld1wiKVxuICAgICAgICAgIFxuICAgICAgICAgIGZ1bmMgPSAkc2NvcGUub25OZXdcbiAgICAgICAgICBpZih0eXBlb2YgZnVuYyBpcyAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSAtPlxuICAgICAgICAgICAgICBmdW5jKGV2ZW50KVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IG9uTmV3IG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24uXCIpXG4gICAgZWxzZVxuICAgICAgJGVsZW1lbnQub24gXCJjbGlja1wiLCBcIi5idG5cIiwgZXZlbnRIYW5kbGVyXG4gICAgXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUFuY2hvckxpZ2h0TGFiZWxvbkJvdHRvbS5odG1sJ1xuICByZXBsYWNlIDogdHJ1ZVxuICBcbiAgc2NvcGU6IHtcbiAgXG4gICAgYW5jaG9ybGlnaHRib3R0b21sYWJlbDogJ0BsYWJlbCdcbiAgXG4gICAgYW5jaG9ybGlnaHRib3R0b210aXRsZTogJ0B0aXRsZSdcbiAgXG4gICAgYW5jaG9ybGlnaHRib3R0b21pY29uOiAnQGljb24nXG4gIFxuICAgIGFuY2hvcmxpZ2h0YnV0dG9uYm90dG9tbGFiZWw6ICdAYnV0dG9uJ1xuICBcbiAgXG4gICAgb25OZXc6ICcmJ1xuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICBcblxuICAgIGV2ZW50SGFuZGxlciA9IChldmVudCkgLT5cbiAgICAgIGlmICRhdHRycy5vbk5ldyBpcyB1bmRlZmluZWRcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKFwiV2FybmluZzogTm8gZXZlbnQgbGlzdGVuZXIgZm9yIG9uTmV3XCIpXG4gICAgICBcbiAgICAgIGZ1bmMgPSAkc2NvcGUub25OZXdcbiAgICAgIGlmKHR5cGVvZiBmdW5jIGlzICdmdW5jdGlvbicpXG4gICAgICAgICRzY29wZS4kYXBwbHkgLT5cbiAgICAgICAgICBmdW5jKGV2ZW50KVxuICAgICAgZWxzZVxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBvbk5ldyBuZWVkcyB0byBiZSBhIGZ1bmN0aW9uLlwiKVxuXG4gICAgXG4gICAgaWYgZXZlbnQgaXMgJ2NsaWNrJyBhbmQgaXNUb3VjaERldmljZSgpXG5cbiAgICAgIHRhcHBpbmcgPSBmYWxzZVxuICAgICAgJGVsZW1lbnQuYmluZCAndG91Y2hzdGFydCcsIChldmVudCkgLT5cbiAgICAgICAgdGFwcGluZyA9IHRydWVcbiAgICAgICRlbGVtZW50LmJpbmQgJ3RvdWNobW92ZScsIChldmVudCkgLT5cbiAgICAgICAgdGFwcGluZyA9IGZhbHNlXG4gICAgICAkZWxlbWVudC5iaW5kICd0b3VjaGVuZCcsIChldmVudCkgLT5cbiAgICAgICAgaWYgdGFwcGluZ1xuICAgICAgICAgICMgcHJldmVudCBldmVudCBidWJibGluZyB0byBhbGxvdyBpbm5lciB0YXAgdGFyZ2V0XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgICAgICAgIGlmICRhdHRycy5vbk5ldyBpcyB1bmRlZmluZWRcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhcIldhcm5pbmc6IE5vIGV2ZW50IGxpc3RlbmVyIGZvciBvbk5ld1wiKVxuICAgICAgICAgIFxuICAgICAgICAgIGZ1bmMgPSAkc2NvcGUub25OZXdcbiAgICAgICAgICBpZih0eXBlb2YgZnVuYyBpcyAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSAtPlxuICAgICAgICAgICAgICBmdW5jKGV2ZW50KVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IG9uTmV3IG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24uXCIpXG4gICAgZWxzZVxuICAgICAgJGVsZW1lbnQub24gXCJjbGlja1wiLCBcIi5idG5cIiwgZXZlbnRIYW5kbGVyXG4gICAgXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUFuY2hvckxpZ2h0Tm9CYWNrZ3JvdW5kLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgICBhbmNob3JsaWdodG5vYmdsYWJlbDogJ0BsYWJlbCdcbiAgXG4gICAgYW5jaG9ybGlnaHRub2JndGl0bGU6ICdAdGl0bGUnXG4gIFxuICAgIGFuY2hvcmxpZ2h0bm9iZ2ljb246ICdAaWNvbidcbiAgXG4gIFxuICAgIG9uTmV3OiAnJidcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgXG5cbiAgICBldmVudEhhbmRsZXIgPSAoZXZlbnQpIC0+XG4gICAgICBpZiAkYXR0cnMub25OZXcgaXMgdW5kZWZpbmVkXG4gICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhcIldhcm5pbmc6IE5vIGV2ZW50IGxpc3RlbmVyIGZvciBvbk5ld1wiKVxuICAgICAgXG4gICAgICBmdW5jID0gJHNjb3BlLm9uTmV3XG4gICAgICBpZih0eXBlb2YgZnVuYyBpcyAnZnVuY3Rpb24nKVxuICAgICAgICAkc2NvcGUuJGFwcGx5IC0+XG4gICAgICAgICAgZnVuYyhldmVudClcbiAgICAgIGVsc2VcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogb25OZXcgbmVlZHMgdG8gYmUgYSBmdW5jdGlvbi5cIilcblxuICAgIFxuICAgIGlmIGV2ZW50IGlzICdjbGljaycgYW5kIGlzVG91Y2hEZXZpY2UoKVxuXG4gICAgICB0YXBwaW5nID0gZmFsc2VcbiAgICAgICRlbGVtZW50LmJpbmQgJ3RvdWNoc3RhcnQnLCAoZXZlbnQpIC0+XG4gICAgICAgIHRhcHBpbmcgPSB0cnVlXG4gICAgICAkZWxlbWVudC5iaW5kICd0b3VjaG1vdmUnLCAoZXZlbnQpIC0+XG4gICAgICAgIHRhcHBpbmcgPSBmYWxzZVxuICAgICAgJGVsZW1lbnQuYmluZCAndG91Y2hlbmQnLCAoZXZlbnQpIC0+XG4gICAgICAgIGlmIHRhcHBpbmdcbiAgICAgICAgICAjIHByZXZlbnQgZXZlbnQgYnViYmxpbmcgdG8gYWxsb3cgaW5uZXIgdGFwIHRhcmdldFxuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgICAgICAgICBpZiAkYXR0cnMub25OZXcgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS5sb2coXCJXYXJuaW5nOiBObyBldmVudCBsaXN0ZW5lciBmb3Igb25OZXdcIilcbiAgICAgICAgICBcbiAgICAgICAgICBmdW5jID0gJHNjb3BlLm9uTmV3XG4gICAgICAgICAgaWYodHlwZW9mIGZ1bmMgaXMgJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkgLT5cbiAgICAgICAgICAgICAgZnVuYyhldmVudClcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBvbk5ldyBuZWVkcyB0byBiZSBhIGZ1bmN0aW9uLlwiKVxuICAgIGVsc2VcbiAgICAgICRlbGVtZW50Lm9uIFwiY2xpY2tcIiwgXCIuYnRuXCIsIGV2ZW50SGFuZGxlclxuICAgIFxuICAgICIsIm1vZHVsZS5leHBvcnRzID0gLT5cbiAgcmVzdHJpY3QgOiAnRScgI2VsZW1lbnRcbiAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnQvczFBdmF0YXJBdHRlbmRpbmcuaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxQXZhdGFyRGVmYXVsdC5odG1sJ1xuICByZXBsYWNlIDogdHJ1ZVxuICBcbiAgc2NvcGU6IHtcbiAgXG4gICAgYXZhdGFyaW1hZ2U6ICdAc3JjJ1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUJ1dHRvbkdyb3Vwcy5odG1sJ1xuICByZXBsYWNlIDogdHJ1ZVxuICBcbiAgc2NvcGU6IHtcbiAgXG4gICAgYnV0dG9uZ3JvdXBsYWJlbDogJ0BsYWJlbCdcbiAgXG4gIFxuICB9XG4gIGxpbms6ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIC0+XG4gICAgaXNUb3VjaERldmljZSA9IC0+IFwib250b3VjaHN0YXJ0XCIgb2Ygd2luZG93IG9yIFwib25tc2dlc3R1cmVjaGFuZ2VcIiBvZiB3aW5kb3dcblxuICAgICIsIm1vZHVsZS5leHBvcnRzID0gLT5cbiAgcmVzdHJpY3QgOiAnRScgI2VsZW1lbnRcbiAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnQvczFCdXR0b25QcmltYXJ5RGVmYXVsdC5odG1sJ1xuICByZXBsYWNlIDogdHJ1ZVxuICBcbiAgc2NvcGU6IHtcbiAgXG4gICAgYnV0dG9ucHJpbWFyeWxhYmVsOiAnQGxhYmVsJ1xuICBcbiAgXG4gICAgb25TZWxlY3Q6ICcmJ1xuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICBcblxuICAgIGV2ZW50SGFuZGxlciA9IChldmVudCkgLT5cbiAgICAgIGlmICRhdHRycy5vblNlbGVjdCBpcyB1bmRlZmluZWRcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKFwiV2FybmluZzogTm8gZXZlbnQgbGlzdGVuZXIgZm9yIG9uU2VsZWN0XCIpXG4gICAgICBcbiAgICAgIGZ1bmMgPSAkc2NvcGUub25TZWxlY3RcbiAgICAgIGlmKHR5cGVvZiBmdW5jIGlzICdmdW5jdGlvbicpXG4gICAgICAgICRzY29wZS4kYXBwbHkgLT5cbiAgICAgICAgICBmdW5jKGV2ZW50KVxuICAgICAgZWxzZVxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBvblNlbGVjdCBuZWVkcyB0byBiZSBhIGZ1bmN0aW9uLlwiKVxuXG4gICAgXG4gICAgaWYgZXZlbnQgaXMgJ2NsaWNrJyBhbmQgaXNUb3VjaERldmljZSgpXG5cbiAgICAgIHRhcHBpbmcgPSBmYWxzZVxuICAgICAgJGVsZW1lbnQuYmluZCAndG91Y2hzdGFydCcsIChldmVudCkgLT5cbiAgICAgICAgdGFwcGluZyA9IHRydWVcbiAgICAgICRlbGVtZW50LmJpbmQgJ3RvdWNobW92ZScsIChldmVudCkgLT5cbiAgICAgICAgdGFwcGluZyA9IGZhbHNlXG4gICAgICAkZWxlbWVudC5iaW5kICd0b3VjaGVuZCcsIChldmVudCkgLT5cbiAgICAgICAgaWYgdGFwcGluZ1xuICAgICAgICAgICMgcHJldmVudCBldmVudCBidWJibGluZyB0byBhbGxvdyBpbm5lciB0YXAgdGFyZ2V0XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgICAgICAgIGlmICRhdHRycy5vblNlbGVjdCBpcyB1bmRlZmluZWRcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhcIldhcm5pbmc6IE5vIGV2ZW50IGxpc3RlbmVyIGZvciBvblNlbGVjdFwiKVxuICAgICAgICAgIFxuICAgICAgICAgIGZ1bmMgPSAkc2NvcGUub25TZWxlY3RcbiAgICAgICAgICBpZih0eXBlb2YgZnVuYyBpcyAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSAtPlxuICAgICAgICAgICAgICBmdW5jKGV2ZW50KVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IG9uU2VsZWN0IG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24uXCIpXG4gICAgZWxzZVxuICAgICAgJGVsZW1lbnQub24gXCJjbGlja1wiLCBldmVudEhhbmRsZXJcbiAgICBcbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxQnV0dG9uUHJpbWFyeURpc2FibGVkLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUJ1dHRvblNlY29uZGFyeURlZmF1bHQuaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICAgIGJ1dHRvbnNlY29uZGFyeWxhYmVsOiAnQGxhYmVsJ1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUJ1dHRvblNlY29uZGFyeURpc2FibGVkLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUJ1dHRvblRlcnRpYXJ5Lmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUNhbGVuZGFyLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUNhcmRBY2NvdW50Lmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgICBhY2NvdW50Y2FyZHRpdGxlOiAnQHRpdGxlJ1xuICBcbiAgICBhY2NvdW50Y2FyZGRldGFpbDE6ICdAZGV0YWlsMSdcbiAgXG4gICAgYWNjb3VudGNhcmRkZXRhaWwyOiAnQGRldGFpbDInXG4gIFxuICBcbiAgICBvblNlbGVjdDogJyYnXG4gIFxuICB9XG4gIGxpbms6ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIC0+XG4gICAgaXNUb3VjaERldmljZSA9IC0+IFwib250b3VjaHN0YXJ0XCIgb2Ygd2luZG93IG9yIFwib25tc2dlc3R1cmVjaGFuZ2VcIiBvZiB3aW5kb3dcblxuICAgIFxuXG4gICAgZXZlbnRIYW5kbGVyID0gKGV2ZW50KSAtPlxuICAgICAgaWYgJGF0dHJzLm9uU2VsZWN0IGlzIHVuZGVmaW5lZFxuICAgICAgICByZXR1cm4gY29uc29sZS5sb2coXCJXYXJuaW5nOiBObyBldmVudCBsaXN0ZW5lciBmb3Igb25TZWxlY3RcIilcbiAgICAgIFxuICAgICAgZnVuYyA9ICRzY29wZS5vblNlbGVjdFxuICAgICAgaWYodHlwZW9mIGZ1bmMgaXMgJ2Z1bmN0aW9uJylcbiAgICAgICAgJHNjb3BlLiRhcHBseSAtPlxuICAgICAgICAgIGZ1bmMoZXZlbnQpXG4gICAgICBlbHNlXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IG9uU2VsZWN0IG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24uXCIpXG5cbiAgICBcbiAgICBpZiBldmVudCBpcyAnY2xpY2snIGFuZCBpc1RvdWNoRGV2aWNlKClcblxuICAgICAgdGFwcGluZyA9IGZhbHNlXG4gICAgICAkZWxlbWVudC5iaW5kICd0b3VjaHN0YXJ0JywgKGV2ZW50KSAtPlxuICAgICAgICB0YXBwaW5nID0gdHJ1ZVxuICAgICAgJGVsZW1lbnQuYmluZCAndG91Y2htb3ZlJywgKGV2ZW50KSAtPlxuICAgICAgICB0YXBwaW5nID0gZmFsc2VcbiAgICAgICRlbGVtZW50LmJpbmQgJ3RvdWNoZW5kJywgKGV2ZW50KSAtPlxuICAgICAgICBpZiB0YXBwaW5nXG4gICAgICAgICAgIyBwcmV2ZW50IGV2ZW50IGJ1YmJsaW5nIHRvIGFsbG93IGlubmVyIHRhcCB0YXJnZXRcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuXG4gICAgICAgICAgaWYgJGF0dHJzLm9uU2VsZWN0IGlzIHVuZGVmaW5lZFxuICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKFwiV2FybmluZzogTm8gZXZlbnQgbGlzdGVuZXIgZm9yIG9uU2VsZWN0XCIpXG4gICAgICAgICAgXG4gICAgICAgICAgZnVuYyA9ICRzY29wZS5vblNlbGVjdFxuICAgICAgICAgIGlmKHR5cGVvZiBmdW5jIGlzICdmdW5jdGlvbicpXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5IC0+XG4gICAgICAgICAgICAgIGZ1bmMoZXZlbnQpXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogb25TZWxlY3QgbmVlZHMgdG8gYmUgYSBmdW5jdGlvbi5cIilcbiAgICBlbHNlXG4gICAgICAkZWxlbWVudC5vbiBcImNsaWNrXCIsIGV2ZW50SGFuZGxlclxuICAgIFxuICAgICIsIm1vZHVsZS5leHBvcnRzID0gLT5cbiAgcmVzdHJpY3QgOiAnRScgI2VsZW1lbnRcbiAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnQvczFDYXJkQ2FzZS5odG1sJ1xuICByZXBsYWNlIDogdHJ1ZVxuICBcbiAgc2NvcGU6IHtcbiAgXG4gICAgY2FzZWNhcmR0aXRsZTogJ0B0aXRsZSdcbiAgXG4gICAgY2FzZWNhcmRkZXRhaWwxOiAnQGRldGFpbDEnXG4gIFxuICAgIGNhc2VjYXJkZGV0YWlsMjogJ0BkZXRhaWwyJ1xuICBcbiAgICBjYXNlY2FyZGRldGFpbDM6ICdAZGV0YWlsMydcbiAgXG4gIFxuICAgIG9uU2VsZWN0OiAnJidcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgXG5cbiAgICBldmVudEhhbmRsZXIgPSAoZXZlbnQpIC0+XG4gICAgICBpZiAkYXR0cnMub25TZWxlY3QgaXMgdW5kZWZpbmVkXG4gICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhcIldhcm5pbmc6IE5vIGV2ZW50IGxpc3RlbmVyIGZvciBvblNlbGVjdFwiKVxuICAgICAgXG4gICAgICBmdW5jID0gJHNjb3BlLm9uU2VsZWN0XG4gICAgICBpZih0eXBlb2YgZnVuYyBpcyAnZnVuY3Rpb24nKVxuICAgICAgICAkc2NvcGUuJGFwcGx5IC0+XG4gICAgICAgICAgZnVuYyhldmVudClcbiAgICAgIGVsc2VcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogb25TZWxlY3QgbmVlZHMgdG8gYmUgYSBmdW5jdGlvbi5cIilcblxuICAgIFxuICAgIGlmIGV2ZW50IGlzICdjbGljaycgYW5kIGlzVG91Y2hEZXZpY2UoKVxuXG4gICAgICB0YXBwaW5nID0gZmFsc2VcbiAgICAgICRlbGVtZW50LmJpbmQgJ3RvdWNoc3RhcnQnLCAoZXZlbnQpIC0+XG4gICAgICAgIHRhcHBpbmcgPSB0cnVlXG4gICAgICAkZWxlbWVudC5iaW5kICd0b3VjaG1vdmUnLCAoZXZlbnQpIC0+XG4gICAgICAgIHRhcHBpbmcgPSBmYWxzZVxuICAgICAgJGVsZW1lbnQuYmluZCAndG91Y2hlbmQnLCAoZXZlbnQpIC0+XG4gICAgICAgIGlmIHRhcHBpbmdcbiAgICAgICAgICAjIHByZXZlbnQgZXZlbnQgYnViYmxpbmcgdG8gYWxsb3cgaW5uZXIgdGFwIHRhcmdldFxuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgICAgICAgICBpZiAkYXR0cnMub25TZWxlY3QgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS5sb2coXCJXYXJuaW5nOiBObyBldmVudCBsaXN0ZW5lciBmb3Igb25TZWxlY3RcIilcbiAgICAgICAgICBcbiAgICAgICAgICBmdW5jID0gJHNjb3BlLm9uU2VsZWN0XG4gICAgICAgICAgaWYodHlwZW9mIGZ1bmMgaXMgJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkgLT5cbiAgICAgICAgICAgICAgZnVuYyhldmVudClcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBvblNlbGVjdCBuZWVkcyB0byBiZSBhIGZ1bmN0aW9uLlwiKVxuICAgIGVsc2VcbiAgICAgICRlbGVtZW50Lm9uIFwiY2xpY2tcIiwgZXZlbnRIYW5kbGVyXG4gICAgXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUNhcmRDaGF0dGVyLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgICBjaGF0dGVyY2FyZHRpdGxlOiAnQHRpdGxlJ1xuICBcbiAgICBjaGF0dGVyY2FyZGljb246ICdAaWNvbidcbiAgXG4gICAgY2hhdHRlcmNhcmRkZXRhaWwxOiAnQGRldGFpbDEnXG4gIFxuICBcbiAgICBvblNlbGVjdDogJyYnXG4gIFxuICB9XG4gIGxpbms6ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIC0+XG4gICAgaXNUb3VjaERldmljZSA9IC0+IFwib250b3VjaHN0YXJ0XCIgb2Ygd2luZG93IG9yIFwib25tc2dlc3R1cmVjaGFuZ2VcIiBvZiB3aW5kb3dcblxuICAgIFxuXG4gICAgZXZlbnRIYW5kbGVyID0gKGV2ZW50KSAtPlxuICAgICAgaWYgJGF0dHJzLm9uU2VsZWN0IGlzIHVuZGVmaW5lZFxuICAgICAgICByZXR1cm4gY29uc29sZS5sb2coXCJXYXJuaW5nOiBObyBldmVudCBsaXN0ZW5lciBmb3Igb25TZWxlY3RcIilcbiAgICAgIFxuICAgICAgZnVuYyA9ICRzY29wZS5vblNlbGVjdFxuICAgICAgaWYodHlwZW9mIGZ1bmMgaXMgJ2Z1bmN0aW9uJylcbiAgICAgICAgJHNjb3BlLiRhcHBseSAtPlxuICAgICAgICAgIGZ1bmMoZXZlbnQpXG4gICAgICBlbHNlXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IG9uU2VsZWN0IG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24uXCIpXG5cbiAgICBcbiAgICBpZiBldmVudCBpcyAnY2xpY2snIGFuZCBpc1RvdWNoRGV2aWNlKClcblxuICAgICAgdGFwcGluZyA9IGZhbHNlXG4gICAgICAkZWxlbWVudC5iaW5kICd0b3VjaHN0YXJ0JywgKGV2ZW50KSAtPlxuICAgICAgICB0YXBwaW5nID0gdHJ1ZVxuICAgICAgJGVsZW1lbnQuYmluZCAndG91Y2htb3ZlJywgKGV2ZW50KSAtPlxuICAgICAgICB0YXBwaW5nID0gZmFsc2VcbiAgICAgICRlbGVtZW50LmJpbmQgJ3RvdWNoZW5kJywgKGV2ZW50KSAtPlxuICAgICAgICBpZiB0YXBwaW5nXG4gICAgICAgICAgIyBwcmV2ZW50IGV2ZW50IGJ1YmJsaW5nIHRvIGFsbG93IGlubmVyIHRhcCB0YXJnZXRcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuXG4gICAgICAgICAgaWYgJGF0dHJzLm9uU2VsZWN0IGlzIHVuZGVmaW5lZFxuICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKFwiV2FybmluZzogTm8gZXZlbnQgbGlzdGVuZXIgZm9yIG9uU2VsZWN0XCIpXG4gICAgICAgICAgXG4gICAgICAgICAgZnVuYyA9ICRzY29wZS5vblNlbGVjdFxuICAgICAgICAgIGlmKHR5cGVvZiBmdW5jIGlzICdmdW5jdGlvbicpXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5IC0+XG4gICAgICAgICAgICAgIGZ1bmMoZXZlbnQpXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogb25TZWxlY3QgbmVlZHMgdG8gYmUgYSBmdW5jdGlvbi5cIilcbiAgICBlbHNlXG4gICAgICAkZWxlbWVudC5vbiBcImNsaWNrXCIsIGV2ZW50SGFuZGxlclxuICAgIFxuICAgICIsIm1vZHVsZS5leHBvcnRzID0gLT5cbiAgcmVzdHJpY3QgOiAnRScgI2VsZW1lbnRcbiAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnQvczFDYXJkQ29udGFjdC5odG1sJ1xuICByZXBsYWNlIDogdHJ1ZVxuICBcbiAgc2NvcGU6IHtcbiAgXG4gICAgY29udGFjdGNhcmRpY29uOiAnQGljb24nXG4gIFxuICAgIGNvbnRhY3RjYXJkdGl0bGU6ICdAdGl0bGUnXG4gIFxuICAgIGNvbnRhY3RjYXJkZGV0YWlsMTogJ0BkZXRhaWwxJ1xuICBcbiAgICBjb250YWN0Y2FyZGRldGFpbDI6ICdAZGV0YWlsMidcbiAgXG4gICAgY29udGFjdGNhcmRkZXRhaWwzOiAnQGRldGFpbDMnXG4gIFxuICBcbiAgICBvblNlbGVjdDogJyYnXG4gIFxuICB9XG4gIGxpbms6ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIC0+XG4gICAgaXNUb3VjaERldmljZSA9IC0+IFwib250b3VjaHN0YXJ0XCIgb2Ygd2luZG93IG9yIFwib25tc2dlc3R1cmVjaGFuZ2VcIiBvZiB3aW5kb3dcblxuICAgIFxuXG4gICAgZXZlbnRIYW5kbGVyID0gKGV2ZW50KSAtPlxuICAgICAgaWYgJGF0dHJzLm9uU2VsZWN0IGlzIHVuZGVmaW5lZFxuICAgICAgICByZXR1cm4gY29uc29sZS5sb2coXCJXYXJuaW5nOiBObyBldmVudCBsaXN0ZW5lciBmb3Igb25TZWxlY3RcIilcbiAgICAgIFxuICAgICAgZnVuYyA9ICRzY29wZS5vblNlbGVjdFxuICAgICAgaWYodHlwZW9mIGZ1bmMgaXMgJ2Z1bmN0aW9uJylcbiAgICAgICAgJHNjb3BlLiRhcHBseSAtPlxuICAgICAgICAgIGZ1bmMoZXZlbnQpXG4gICAgICBlbHNlXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IG9uU2VsZWN0IG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24uXCIpXG5cbiAgICBcbiAgICBpZiBldmVudCBpcyAnY2xpY2snIGFuZCBpc1RvdWNoRGV2aWNlKClcblxuICAgICAgdGFwcGluZyA9IGZhbHNlXG4gICAgICAkZWxlbWVudC5iaW5kICd0b3VjaHN0YXJ0JywgKGV2ZW50KSAtPlxuICAgICAgICB0YXBwaW5nID0gdHJ1ZVxuICAgICAgJGVsZW1lbnQuYmluZCAndG91Y2htb3ZlJywgKGV2ZW50KSAtPlxuICAgICAgICB0YXBwaW5nID0gZmFsc2VcbiAgICAgICRlbGVtZW50LmJpbmQgJ3RvdWNoZW5kJywgKGV2ZW50KSAtPlxuICAgICAgICBpZiB0YXBwaW5nXG4gICAgICAgICAgIyBwcmV2ZW50IGV2ZW50IGJ1YmJsaW5nIHRvIGFsbG93IGlubmVyIHRhcCB0YXJnZXRcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuXG4gICAgICAgICAgaWYgJGF0dHJzLm9uU2VsZWN0IGlzIHVuZGVmaW5lZFxuICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKFwiV2FybmluZzogTm8gZXZlbnQgbGlzdGVuZXIgZm9yIG9uU2VsZWN0XCIpXG4gICAgICAgICAgXG4gICAgICAgICAgZnVuYyA9ICRzY29wZS5vblNlbGVjdFxuICAgICAgICAgIGlmKHR5cGVvZiBmdW5jIGlzICdmdW5jdGlvbicpXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5IC0+XG4gICAgICAgICAgICAgIGZ1bmMoZXZlbnQpXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogb25TZWxlY3QgbmVlZHMgdG8gYmUgYSBmdW5jdGlvbi5cIilcbiAgICBlbHNlXG4gICAgICAkZWxlbWVudC5vbiBcImNsaWNrXCIsIGV2ZW50SGFuZGxlclxuICAgIFxuICAgICIsIm1vZHVsZS5leHBvcnRzID0gLT5cbiAgcmVzdHJpY3QgOiAnRScgI2VsZW1lbnRcbiAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnQvczFDYXJkQ3VzdG9tT2JqZWN0Lmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgICBjdXN0b21jYXJkdGl0bGU6ICdAdGl0bGUnXG4gIFxuICAgIGN1c3RvbWNhcmRsYWJlbDE6ICdAbGFiZWwxJ1xuICBcbiAgICBjdXN0b21jYXJkbGFiZWwyOiAnQGxhYmVsMidcbiAgXG4gICAgY3VzdG9tY2FyZGxhYmVsMzogJ0BsYWJlbDMnXG4gIFxuICAgIGN1c3RvbWNhcmRsYWJlbDQ6ICdAbGFiZWw0J1xuICBcbiAgICBjdXN0b21jYXJkZGV0YWlsMTogJ0BkZXRhaWwxJ1xuICBcbiAgICBjdXN0b21jYXJkZGV0YWlsMjogJ0BkZXRhaWwyJ1xuICBcbiAgICBjdXN0b21jYXJkZGV0YWlsMzogJ0BkZXRhaWwzJ1xuICBcbiAgICBjdXN0b21jYXJkZGV0YWlsNDogJ0BkZXRhaWw0J1xuICBcbiAgXG4gICAgb25TZWxlY3Q6ICcmJ1xuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICBcblxuICAgIGV2ZW50SGFuZGxlciA9IChldmVudCkgLT5cbiAgICAgIGlmICRhdHRycy5vblNlbGVjdCBpcyB1bmRlZmluZWRcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKFwiV2FybmluZzogTm8gZXZlbnQgbGlzdGVuZXIgZm9yIG9uU2VsZWN0XCIpXG4gICAgICBcbiAgICAgIGZ1bmMgPSAkc2NvcGUub25TZWxlY3RcbiAgICAgIGlmKHR5cGVvZiBmdW5jIGlzICdmdW5jdGlvbicpXG4gICAgICAgICRzY29wZS4kYXBwbHkgLT5cbiAgICAgICAgICBmdW5jKGV2ZW50KVxuICAgICAgZWxzZVxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBvblNlbGVjdCBuZWVkcyB0byBiZSBhIGZ1bmN0aW9uLlwiKVxuXG4gICAgXG4gICAgaWYgZXZlbnQgaXMgJ2NsaWNrJyBhbmQgaXNUb3VjaERldmljZSgpXG5cbiAgICAgIHRhcHBpbmcgPSBmYWxzZVxuICAgICAgJGVsZW1lbnQuYmluZCAndG91Y2hzdGFydCcsIChldmVudCkgLT5cbiAgICAgICAgdGFwcGluZyA9IHRydWVcbiAgICAgICRlbGVtZW50LmJpbmQgJ3RvdWNobW92ZScsIChldmVudCkgLT5cbiAgICAgICAgdGFwcGluZyA9IGZhbHNlXG4gICAgICAkZWxlbWVudC5iaW5kICd0b3VjaGVuZCcsIChldmVudCkgLT5cbiAgICAgICAgaWYgdGFwcGluZ1xuICAgICAgICAgICMgcHJldmVudCBldmVudCBidWJibGluZyB0byBhbGxvdyBpbm5lciB0YXAgdGFyZ2V0XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgICAgICAgIGlmICRhdHRycy5vblNlbGVjdCBpcyB1bmRlZmluZWRcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhcIldhcm5pbmc6IE5vIGV2ZW50IGxpc3RlbmVyIGZvciBvblNlbGVjdFwiKVxuICAgICAgICAgIFxuICAgICAgICAgIGZ1bmMgPSAkc2NvcGUub25TZWxlY3RcbiAgICAgICAgICBpZih0eXBlb2YgZnVuYyBpcyAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSAtPlxuICAgICAgICAgICAgICBmdW5jKGV2ZW50KVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IG9uU2VsZWN0IG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24uXCIpXG4gICAgZWxzZVxuICAgICAgJGVsZW1lbnQub24gXCJjbGlja1wiLCBldmVudEhhbmRsZXJcbiAgICBcbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxQ2FyZEV2ZW50Lmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgICBldmVudGNhcmR0aW1lOiAnQHRpbWUnXG4gIFxuICAgIGV2ZW50Y2FyZGR1cmF0aW9uOiAnQGR1cmF0aW9uJ1xuICBcbiAgICBldmVudGNhcmR0aXRsZTogJ0B0aXRsZSdcbiAgXG4gICAgZXZlbnRjYXJkZGV0YWlsMTogJ0BkZXRhaWwxJ1xuICBcbiAgICBldmVudGNhcmRkZXRhaWwyOiAnQGRldGFpbDInXG4gIFxuICAgIGV2ZW50Y2FyZGRldGFpbDM6ICdAZGV0YWlsMydcbiAgXG4gIFxuICAgIG9uU2VsZWN0OiAnJidcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgXG5cbiAgICBldmVudEhhbmRsZXIgPSAoZXZlbnQpIC0+XG4gICAgICBpZiAkYXR0cnMub25TZWxlY3QgaXMgdW5kZWZpbmVkXG4gICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhcIldhcm5pbmc6IE5vIGV2ZW50IGxpc3RlbmVyIGZvciBvblNlbGVjdFwiKVxuICAgICAgXG4gICAgICBmdW5jID0gJHNjb3BlLm9uU2VsZWN0XG4gICAgICBpZih0eXBlb2YgZnVuYyBpcyAnZnVuY3Rpb24nKVxuICAgICAgICAkc2NvcGUuJGFwcGx5IC0+XG4gICAgICAgICAgZnVuYyhldmVudClcbiAgICAgIGVsc2VcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogb25TZWxlY3QgbmVlZHMgdG8gYmUgYSBmdW5jdGlvbi5cIilcblxuICAgIFxuICAgIGlmIGV2ZW50IGlzICdjbGljaycgYW5kIGlzVG91Y2hEZXZpY2UoKVxuXG4gICAgICB0YXBwaW5nID0gZmFsc2VcbiAgICAgICRlbGVtZW50LmJpbmQgJ3RvdWNoc3RhcnQnLCAoZXZlbnQpIC0+XG4gICAgICAgIHRhcHBpbmcgPSB0cnVlXG4gICAgICAkZWxlbWVudC5iaW5kICd0b3VjaG1vdmUnLCAoZXZlbnQpIC0+XG4gICAgICAgIHRhcHBpbmcgPSBmYWxzZVxuICAgICAgJGVsZW1lbnQuYmluZCAndG91Y2hlbmQnLCAoZXZlbnQpIC0+XG4gICAgICAgIGlmIHRhcHBpbmdcbiAgICAgICAgICAjIHByZXZlbnQgZXZlbnQgYnViYmxpbmcgdG8gYWxsb3cgaW5uZXIgdGFwIHRhcmdldFxuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgICAgICAgICBpZiAkYXR0cnMub25TZWxlY3QgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS5sb2coXCJXYXJuaW5nOiBObyBldmVudCBsaXN0ZW5lciBmb3Igb25TZWxlY3RcIilcbiAgICAgICAgICBcbiAgICAgICAgICBmdW5jID0gJHNjb3BlLm9uU2VsZWN0XG4gICAgICAgICAgaWYodHlwZW9mIGZ1bmMgaXMgJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkgLT5cbiAgICAgICAgICAgICAgZnVuYyhldmVudClcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBvblNlbGVjdCBuZWVkcyB0byBiZSBhIGZ1bmN0aW9uLlwiKVxuICAgIGVsc2VcbiAgICAgICRlbGVtZW50Lm9uIFwiY2xpY2tcIiwgZXZlbnRIYW5kbGVyXG4gICAgXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUNhcmRGaWxlLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgICBmaWxlY2FyZHRpdGxlOiAnQHRpdGxlJ1xuICBcbiAgICBmaWxlY2FyZGljb246ICdAZmlsZXR5cGUnXG4gIFxuICAgIGZpbGVjYXJkZGV0YWlsMTogJ0BkZXRhaWwxJ1xuICBcbiAgICBmaWxlY2FyZGRldGFpbDI6ICdAZGV0YWlsMidcbiAgXG4gICAgZmlsZWNhcmRkZXRhaWwzOiAnQGRldGFpbDMnXG4gIFxuICAgIGZpbGVjYXJkZGV0YWlsNDogJ0BkZXRhaWw0J1xuICBcbiAgXG4gICAgb25TZWxlY3Q6ICcmJ1xuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICBcblxuICAgIGV2ZW50SGFuZGxlciA9IChldmVudCkgLT5cbiAgICAgIGlmICRhdHRycy5vblNlbGVjdCBpcyB1bmRlZmluZWRcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKFwiV2FybmluZzogTm8gZXZlbnQgbGlzdGVuZXIgZm9yIG9uU2VsZWN0XCIpXG4gICAgICBcbiAgICAgIGZ1bmMgPSAkc2NvcGUub25TZWxlY3RcbiAgICAgIGlmKHR5cGVvZiBmdW5jIGlzICdmdW5jdGlvbicpXG4gICAgICAgICRzY29wZS4kYXBwbHkgLT5cbiAgICAgICAgICBmdW5jKGV2ZW50KVxuICAgICAgZWxzZVxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBvblNlbGVjdCBuZWVkcyB0byBiZSBhIGZ1bmN0aW9uLlwiKVxuXG4gICAgXG4gICAgaWYgZXZlbnQgaXMgJ2NsaWNrJyBhbmQgaXNUb3VjaERldmljZSgpXG5cbiAgICAgIHRhcHBpbmcgPSBmYWxzZVxuICAgICAgJGVsZW1lbnQuYmluZCAndG91Y2hzdGFydCcsIChldmVudCkgLT5cbiAgICAgICAgdGFwcGluZyA9IHRydWVcbiAgICAgICRlbGVtZW50LmJpbmQgJ3RvdWNobW92ZScsIChldmVudCkgLT5cbiAgICAgICAgdGFwcGluZyA9IGZhbHNlXG4gICAgICAkZWxlbWVudC5iaW5kICd0b3VjaGVuZCcsIChldmVudCkgLT5cbiAgICAgICAgaWYgdGFwcGluZ1xuICAgICAgICAgICMgcHJldmVudCBldmVudCBidWJibGluZyB0byBhbGxvdyBpbm5lciB0YXAgdGFyZ2V0XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgICAgICAgIGlmICRhdHRycy5vblNlbGVjdCBpcyB1bmRlZmluZWRcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhcIldhcm5pbmc6IE5vIGV2ZW50IGxpc3RlbmVyIGZvciBvblNlbGVjdFwiKVxuICAgICAgICAgIFxuICAgICAgICAgIGZ1bmMgPSAkc2NvcGUub25TZWxlY3RcbiAgICAgICAgICBpZih0eXBlb2YgZnVuYyBpcyAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSAtPlxuICAgICAgICAgICAgICBmdW5jKGV2ZW50KVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IG9uU2VsZWN0IG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24uXCIpXG4gICAgZWxzZVxuICAgICAgJGVsZW1lbnQub24gXCJjbGlja1wiLCBldmVudEhhbmRsZXJcbiAgICBcbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxQ2FyZExpc3RoZWFkZXIuaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxQ2FyZE9wcG9ydHVuaXR5Lmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgICBvcHB0eWNhcmR0aXRsZTogJ0B0aXRsZSdcbiAgXG4gICAgb3BwdHljYXJkZGV0YWlsMTogJ0BkZXRhaWwxJ1xuICBcbiAgICBvcHB0eWNhcmRkZXRhaWwyOiAnQGRldGFpbDInXG4gIFxuICAgIG9wcHR5Y2FyZGRldGFpbDM6ICdAZGV0YWlsMydcbiAgXG4gICAgb3BwdHljYXJkZGV0YWlsNDogJ0BkZXRhaWw0J1xuICBcbiAgXG4gICAgb25TZWxlY3Q6ICcmJ1xuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICBcblxuICAgIGV2ZW50SGFuZGxlciA9IChldmVudCkgLT5cbiAgICAgIGlmICRhdHRycy5vblNlbGVjdCBpcyB1bmRlZmluZWRcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKFwiV2FybmluZzogTm8gZXZlbnQgbGlzdGVuZXIgZm9yIG9uU2VsZWN0XCIpXG4gICAgICBcbiAgICAgIGZ1bmMgPSAkc2NvcGUub25TZWxlY3RcbiAgICAgIGlmKHR5cGVvZiBmdW5jIGlzICdmdW5jdGlvbicpXG4gICAgICAgICRzY29wZS4kYXBwbHkgLT5cbiAgICAgICAgICBmdW5jKGV2ZW50KVxuICAgICAgZWxzZVxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBvblNlbGVjdCBuZWVkcyB0byBiZSBhIGZ1bmN0aW9uLlwiKVxuXG4gICAgXG4gICAgaWYgZXZlbnQgaXMgJ2NsaWNrJyBhbmQgaXNUb3VjaERldmljZSgpXG5cbiAgICAgIHRhcHBpbmcgPSBmYWxzZVxuICAgICAgJGVsZW1lbnQuYmluZCAndG91Y2hzdGFydCcsIChldmVudCkgLT5cbiAgICAgICAgdGFwcGluZyA9IHRydWVcbiAgICAgICRlbGVtZW50LmJpbmQgJ3RvdWNobW92ZScsIChldmVudCkgLT5cbiAgICAgICAgdGFwcGluZyA9IGZhbHNlXG4gICAgICAkZWxlbWVudC5iaW5kICd0b3VjaGVuZCcsIChldmVudCkgLT5cbiAgICAgICAgaWYgdGFwcGluZ1xuICAgICAgICAgICMgcHJldmVudCBldmVudCBidWJibGluZyB0byBhbGxvdyBpbm5lciB0YXAgdGFyZ2V0XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgICAgICAgIGlmICRhdHRycy5vblNlbGVjdCBpcyB1bmRlZmluZWRcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhcIldhcm5pbmc6IE5vIGV2ZW50IGxpc3RlbmVyIGZvciBvblNlbGVjdFwiKVxuICAgICAgICAgIFxuICAgICAgICAgIGZ1bmMgPSAkc2NvcGUub25TZWxlY3RcbiAgICAgICAgICBpZih0eXBlb2YgZnVuYyBpcyAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSAtPlxuICAgICAgICAgICAgICBmdW5jKGV2ZW50KVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IG9uU2VsZWN0IG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24uXCIpXG4gICAgZWxzZVxuICAgICAgJGVsZW1lbnQub24gXCJjbGlja1wiLCBldmVudEhhbmRsZXJcbiAgICBcbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxQ2FyZFJlbGF0ZWRMaXN0Lmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUNhcmRUYXNrLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgICB0YXNrY2FyZHRpdGxlOiAnQHRpdGxlJ1xuICBcbiAgICB0YXNrY2FyZGRldGFpbDE6ICdAZGV0YWlsMSdcbiAgXG4gICAgdGFza2NhcmRkZXRhaWwyOiAnQGRldGFpbDInXG4gIFxuICAgIHRhc2tjYXJkZGV0YWlsMzogJ0BkYXRlJ1xuICBcbiAgXG4gICAgb25TZWxlY3Q6ICcmJ1xuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICBcblxuICAgIGV2ZW50SGFuZGxlciA9IChldmVudCkgLT5cbiAgICAgIGlmICRhdHRycy5vblNlbGVjdCBpcyB1bmRlZmluZWRcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKFwiV2FybmluZzogTm8gZXZlbnQgbGlzdGVuZXIgZm9yIG9uU2VsZWN0XCIpXG4gICAgICBcbiAgICAgIGZ1bmMgPSAkc2NvcGUub25TZWxlY3RcbiAgICAgIGlmKHR5cGVvZiBmdW5jIGlzICdmdW5jdGlvbicpXG4gICAgICAgICRzY29wZS4kYXBwbHkgLT5cbiAgICAgICAgICBmdW5jKGV2ZW50KVxuICAgICAgZWxzZVxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBvblNlbGVjdCBuZWVkcyB0byBiZSBhIGZ1bmN0aW9uLlwiKVxuXG4gICAgXG4gICAgaWYgZXZlbnQgaXMgJ2NsaWNrJyBhbmQgaXNUb3VjaERldmljZSgpXG5cbiAgICAgIHRhcHBpbmcgPSBmYWxzZVxuICAgICAgJGVsZW1lbnQuYmluZCAndG91Y2hzdGFydCcsIChldmVudCkgLT5cbiAgICAgICAgdGFwcGluZyA9IHRydWVcbiAgICAgICRlbGVtZW50LmJpbmQgJ3RvdWNobW92ZScsIChldmVudCkgLT5cbiAgICAgICAgdGFwcGluZyA9IGZhbHNlXG4gICAgICAkZWxlbWVudC5iaW5kICd0b3VjaGVuZCcsIChldmVudCkgLT5cbiAgICAgICAgaWYgdGFwcGluZ1xuICAgICAgICAgICMgcHJldmVudCBldmVudCBidWJibGluZyB0byBhbGxvdyBpbm5lciB0YXAgdGFyZ2V0XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgICAgICAgIGlmICRhdHRycy5vblNlbGVjdCBpcyB1bmRlZmluZWRcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhcIldhcm5pbmc6IE5vIGV2ZW50IGxpc3RlbmVyIGZvciBvblNlbGVjdFwiKVxuICAgICAgICAgIFxuICAgICAgICAgIGZ1bmMgPSAkc2NvcGUub25TZWxlY3RcbiAgICAgICAgICBpZih0eXBlb2YgZnVuYyBpcyAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSAtPlxuICAgICAgICAgICAgICBmdW5jKGV2ZW50KVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IG9uU2VsZWN0IG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24uXCIpXG4gICAgZWxzZVxuICAgICAgJGVsZW1lbnQub24gXCJjbGlja1wiLCBldmVudEhhbmRsZXJcbiAgICBcbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxQ2hlY2tib3guaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgc2NvcGU6IHtcbiAgICBjaGVja2JveExhYmVsOiAnQGxhYmVsJ1xuICAgIGNoZWNrYm94Q2hlY2tlZDogJ0BjaGVja2VkJ1xuICB9XG4gIGxpbms6ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIC0+XG4gICAgJHNjb3BlLiR3YXRjaCAnY2hlY2tib3hDaGVja2VkJywgKG5ld1ZhbHVlLCBvbGRWYWx1ZSkgLT5cbiAgICAgIGlmIG5ld1ZhbHVlXG4gICAgICAgIGlmIG5ld1ZhbHVlIGlzIFwidHJ1ZVwiXG4gICAgICAgICAgJGVsZW1lbnQuZmluZCgnaW5wdXQnKS5hdHRyICdjaGVja2VkJywgbmV3VmFsdWVcbiAgICAgICAgZWxzZVxuICAgICAgICAgICRlbGVtZW50LmZpbmQoJ2lucHV0JykucmVtb3ZlQXR0ciAnY2hlY2tlZCdcbiIsIm1vZHVsZS5leHBvcnRzID0gLT5cbiAgcmVzdHJpY3QgOiAnRScgI2VsZW1lbnRcbiAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnQvczFDaGVja2JveERpc2FibGVkLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUNvbW1lbnRQdWJsaXNoZXJEZWZhdWx0Lmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUNvbW1lbnRQdWJsaXNoZXJXaXRoV2FybmluZy5odG1sJ1xuICByZXBsYWNlIDogdHJ1ZVxuICBcbiAgc2NvcGU6IHtcbiAgXG4gIFxuICB9XG4gIGxpbms6ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIC0+XG4gICAgaXNUb3VjaERldmljZSA9IC0+IFwib250b3VjaHN0YXJ0XCIgb2Ygd2luZG93IG9yIFwib25tc2dlc3R1cmVjaGFuZ2VcIiBvZiB3aW5kb3dcblxuICAgICIsIm1vZHVsZS5leHBvcnRzID0gLT5cbiAgcmVzdHJpY3QgOiAnRScgI2VsZW1lbnRcbiAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnQvczFEcm9wRG93bkRlZmF1bHQuaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHRyYW5zY2x1ZGU6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICAgIGRyb3Bkb3duZGVmYXVsdGl0ZW0xOiAnQGl0ZW0xJ1xuICBcbiAgICBkcm9wZG93bmRlZmF1bHRpdGVtMjogJ0BpdGVtMidcbiAgXG4gICAgZHJvcGRvd25kZWZhdWx0aXRlbTM6ICdAaXRlbTMnXG4gIFxuICAgIGRyb3Bkb3duZGVmYXVsdGl0ZW00OiAnQGl0ZW00J1xuICBcbiAgICBkcm9wZG93bmRlZmF1bHRpdGVtNTogJ0BpdGVtNSdcbiAgXG4gICAgZHJvcGRvd25kZWZhdWx0aXRlbTY6ICdAaXRlbTYnXG4gIFxuICBcbiAgICBvblNlbGVjdDogJyYnXG4gIFxuICB9XG4gIGxpbms6ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIC0+XG4gICAgaXNUb3VjaERldmljZSA9IC0+IFwib250b3VjaHN0YXJ0XCIgb2Ygd2luZG93IG9yIFwib25tc2dlc3R1cmVjaGFuZ2VcIiBvZiB3aW5kb3dcblxuICAgIFxuXG4gICAgZXZlbnRIYW5kbGVyID0gKGV2ZW50KSAtPlxuICAgICAgaWYgJGF0dHJzLm9uU2VsZWN0IGlzIHVuZGVmaW5lZFxuICAgICAgICByZXR1cm4gY29uc29sZS5sb2coXCJXYXJuaW5nOiBObyBldmVudCBsaXN0ZW5lciBmb3Igb25TZWxlY3RcIilcbiAgICAgIFxuICAgICAgZnVuYyA9ICRzY29wZS5vblNlbGVjdFxuICAgICAgaWYodHlwZW9mIGZ1bmMgaXMgJ2Z1bmN0aW9uJylcbiAgICAgICAgJHNjb3BlLiRhcHBseSAtPlxuICAgICAgICAgIGZ1bmMoZXZlbnQpXG4gICAgICBlbHNlXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IG9uU2VsZWN0IG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24uXCIpXG5cbiAgICBcbiAgICBpZiBldmVudCBpcyAnY2xpY2snIGFuZCBpc1RvdWNoRGV2aWNlKClcblxuICAgICAgdGFwcGluZyA9IGZhbHNlXG4gICAgICAkZWxlbWVudC5iaW5kICd0b3VjaHN0YXJ0JywgKGV2ZW50KSAtPlxuICAgICAgICB0YXBwaW5nID0gdHJ1ZVxuICAgICAgJGVsZW1lbnQuYmluZCAndG91Y2htb3ZlJywgKGV2ZW50KSAtPlxuICAgICAgICB0YXBwaW5nID0gZmFsc2VcbiAgICAgICRlbGVtZW50LmJpbmQgJ3RvdWNoZW5kJywgKGV2ZW50KSAtPlxuICAgICAgICBpZiB0YXBwaW5nXG4gICAgICAgICAgIyBwcmV2ZW50IGV2ZW50IGJ1YmJsaW5nIHRvIGFsbG93IGlubmVyIHRhcCB0YXJnZXRcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuXG4gICAgICAgICAgaWYgJGF0dHJzLm9uU2VsZWN0IGlzIHVuZGVmaW5lZFxuICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKFwiV2FybmluZzogTm8gZXZlbnQgbGlzdGVuZXIgZm9yIG9uU2VsZWN0XCIpXG4gICAgICAgICAgXG4gICAgICAgICAgZnVuYyA9ICRzY29wZS5vblNlbGVjdFxuICAgICAgICAgIGlmKHR5cGVvZiBmdW5jIGlzICdmdW5jdGlvbicpXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5IC0+XG4gICAgICAgICAgICAgIGZ1bmMoZXZlbnQpXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogb25TZWxlY3QgbmVlZHMgdG8gYmUgYSBmdW5jdGlvbi5cIilcbiAgICBlbHNlXG4gICAgICAkZWxlbWVudC5vbiBcImNsaWNrXCIsIGV2ZW50SGFuZGxlclxuICAgIFxuICAgICIsIm1vZHVsZS5leHBvcnRzID0gLT5cbiAgcmVzdHJpY3QgOiAnRScgI2VsZW1lbnRcbiAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnQvczFEcm9wRG93bldpdGhQaG90by5odG1sJ1xuICByZXBsYWNlIDogdHJ1ZVxuICBcbiAgdHJhbnNjbHVkZTogdHJ1ZVxuICBcbiAgc2NvcGU6IHtcbiAgXG4gICAgZHJvcGRvd253aXRocGhvdG9pdGVtMTogJ0BpdGVtMSdcbiAgXG4gICAgZHJvcGRvd253aXRocGhvdG9pdGVtMjogJ0BpdGVtMidcbiAgXG4gICAgZHJvcGRvd253aXRocGhvdG9pdGVtMzogJ0BpdGVtMydcbiAgXG4gICAgZHJvcGRvd253aXRocGhvdG9pdGVtNDogJ0BpdGVtNCdcbiAgXG4gICAgZHJvcGRvd253aXRocGhvdG9pdGVtNTogJ0BpdGVtNSdcbiAgXG4gICAgZHJvcGRvd253aXRocGhvdG9pdGVtNjogJ0BpdGVtNidcbiAgXG4gICAgZHJvcGRvd253aXRocGhvdG9pbWFnZTogJ0BpbWFnZTEnXG4gIFxuICBcbiAgICBvblNlbGVjdDogJyYnXG4gIFxuICB9XG4gIGxpbms6ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIC0+XG4gICAgaXNUb3VjaERldmljZSA9IC0+IFwib250b3VjaHN0YXJ0XCIgb2Ygd2luZG93IG9yIFwib25tc2dlc3R1cmVjaGFuZ2VcIiBvZiB3aW5kb3dcblxuICAgIFxuXG4gICAgZXZlbnRIYW5kbGVyID0gKGV2ZW50KSAtPlxuICAgICAgaWYgJGF0dHJzLm9uU2VsZWN0IGlzIHVuZGVmaW5lZFxuICAgICAgICByZXR1cm4gY29uc29sZS5sb2coXCJXYXJuaW5nOiBObyBldmVudCBsaXN0ZW5lciBmb3Igb25TZWxlY3RcIilcbiAgICAgIFxuICAgICAgZnVuYyA9ICRzY29wZS5vblNlbGVjdFxuICAgICAgaWYodHlwZW9mIGZ1bmMgaXMgJ2Z1bmN0aW9uJylcbiAgICAgICAgJHNjb3BlLiRhcHBseSAtPlxuICAgICAgICAgIGZ1bmMoZXZlbnQpXG4gICAgICBlbHNlXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IG9uU2VsZWN0IG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24uXCIpXG5cbiAgICBcbiAgICBpZiBldmVudCBpcyAnY2xpY2snIGFuZCBpc1RvdWNoRGV2aWNlKClcblxuICAgICAgdGFwcGluZyA9IGZhbHNlXG4gICAgICAkZWxlbWVudC5iaW5kICd0b3VjaHN0YXJ0JywgKGV2ZW50KSAtPlxuICAgICAgICB0YXBwaW5nID0gdHJ1ZVxuICAgICAgJGVsZW1lbnQuYmluZCAndG91Y2htb3ZlJywgKGV2ZW50KSAtPlxuICAgICAgICB0YXBwaW5nID0gZmFsc2VcbiAgICAgICRlbGVtZW50LmJpbmQgJ3RvdWNoZW5kJywgKGV2ZW50KSAtPlxuICAgICAgICBpZiB0YXBwaW5nXG4gICAgICAgICAgIyBwcmV2ZW50IGV2ZW50IGJ1YmJsaW5nIHRvIGFsbG93IGlubmVyIHRhcCB0YXJnZXRcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuXG4gICAgICAgICAgaWYgJGF0dHJzLm9uU2VsZWN0IGlzIHVuZGVmaW5lZFxuICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKFwiV2FybmluZzogTm8gZXZlbnQgbGlzdGVuZXIgZm9yIG9uU2VsZWN0XCIpXG4gICAgICAgICAgXG4gICAgICAgICAgZnVuYyA9ICRzY29wZS5vblNlbGVjdFxuICAgICAgICAgIGlmKHR5cGVvZiBmdW5jIGlzICdmdW5jdGlvbicpXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5IC0+XG4gICAgICAgICAgICAgIGZ1bmMoZXZlbnQpXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogb25TZWxlY3QgbmVlZHMgdG8gYmUgYSBmdW5jdGlvbi5cIilcbiAgICBlbHNlXG4gICAgICAkZWxlbWVudC5vbiBcImNsaWNrXCIsIGV2ZW50SGFuZGxlclxuICAgIFxuICAgICIsIm1vZHVsZS5leHBvcnRzID0gLT5cbiAgcmVzdHJpY3QgOiAnRScgI2VsZW1lbnRcbiAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnQvczFGZWVkQ29tbWVudERlZmF1bHQuaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxRmVlZENvbW1lbnRXaXRoTW9kaWZpZXIuaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxRmVlZENvbW1lbnRXaXRoUGF5bG9hZC5odG1sJ1xuICByZXBsYWNlIDogdHJ1ZVxuICBcbiAgc2NvcGU6IHtcbiAgXG4gIFxuICB9XG4gIGxpbms6ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIC0+XG4gICAgaXNUb3VjaERldmljZSA9IC0+IFwib250b3VjaHN0YXJ0XCIgb2Ygd2luZG93IG9yIFwib25tc2dlc3R1cmVjaGFuZ2VcIiBvZiB3aW5kb3dcblxuICAgICIsIm1vZHVsZS5leHBvcnRzID0gLT5cbiAgcmVzdHJpY3QgOiAnRScgI2VsZW1lbnRcbiAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnQvczFGZWVkSXRlbURlZmF1bHQuaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHRyYW5zY2x1ZGU6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICAgIGZlZWRpdGVtdGltZXN0YW1wOiAnQHRpbWVzdGFtcCdcbiAgXG4gICAgZmVlZGl0ZW1saWtlczogJ0BsaWtlcydcbiAgXG4gICAgZmVlZGl0ZW1jb21tZW50czogJ0Bjb21tZW50cydcbiAgXG4gICAgZmVlZGl0ZW1ib2R5OiAnQGJvZHknXG4gIFxuICAgIGZlZWRpdGVtYWN0b3I6ICdAYWN0b3InXG4gIFxuICAgIGZlZWRpdGVtYWN0b3JpbWFnZTogJ0BhY3RvckltYWdlJ1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUZlZWRJdGVtT25EcmlsbEluLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUZlZWRJdGVtV2l0aFBheWxvYWQuaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxRmVlZFBheWxvYWRDb21wb3VuZC5odG1sJ1xuICByZXBsYWNlIDogdHJ1ZVxuICBcbiAgc2NvcGU6IHtcbiAgXG4gIFxuICB9XG4gIGxpbms6ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIC0+XG4gICAgaXNUb3VjaERldmljZSA9IC0+IFwib250b3VjaHN0YXJ0XCIgb2Ygd2luZG93IG9yIFwib25tc2dlc3R1cmVjaGFuZ2VcIiBvZiB3aW5kb3dcblxuICAgICIsIm1vZHVsZS5leHBvcnRzID0gLT5cbiAgcmVzdHJpY3QgOiAnRScgI2VsZW1lbnRcbiAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnQvczFGZWVkUGF5bG9hZFByaW1hcnkuaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxRmVlZFBheWxvYWRTZWNvbmRhcnkuaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxRmlsZVByZXZpZXcuaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxRm9vdGVyU2Vjb25kYXJ5Q2hpbGRCcm93c2VyLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUZvb3RlclNlY29uZGFyeUZpbGVQcmV2aWV3Lmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUhlYWRlclByaW1hcnlEZWZhdWx0Lmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgICBoZWFkZXJwcmltYXJ5bm90aWZpY2F0aW9uczogJ0Bub3RpZmljYXRpb25zJ1xuICBcbiAgICBoZWFkZXJwcmltYXJ5bGVmdGljb246ICdAaWNvbidcbiAgXG4gIFxuICAgIG9uU3RhZ2VMZWZ0OiAnJidcbiAgXG4gICAgb25Ob3RpZmljYXRpb25zOiAnJidcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgXG5cbiAgICBldmVudEhhbmRsZXIgPSAoZXZlbnQpIC0+XG4gICAgICBpZiAkYXR0cnMub25TdGFnZUxlZnQgaXMgdW5kZWZpbmVkXG4gICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhcIldhcm5pbmc6IE5vIGV2ZW50IGxpc3RlbmVyIGZvciBvblN0YWdlTGVmdFwiKVxuICAgICAgXG4gICAgICBmdW5jID0gJHNjb3BlLm9uU3RhZ2VMZWZ0XG4gICAgICBpZih0eXBlb2YgZnVuYyBpcyAnZnVuY3Rpb24nKVxuICAgICAgICAkc2NvcGUuJGFwcGx5IC0+XG4gICAgICAgICAgZnVuYyhldmVudClcbiAgICAgIGVsc2VcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogb25TdGFnZUxlZnQgbmVlZHMgdG8gYmUgYSBmdW5jdGlvbi5cIilcblxuICAgIFxuICAgIGlmIGV2ZW50IGlzICdjbGljaycgYW5kIGlzVG91Y2hEZXZpY2UoKVxuXG4gICAgICB0YXBwaW5nID0gZmFsc2VcbiAgICAgICRlbGVtZW50LmJpbmQgJ3RvdWNoc3RhcnQnLCAoZXZlbnQpIC0+XG4gICAgICAgIHRhcHBpbmcgPSB0cnVlXG4gICAgICAkZWxlbWVudC5iaW5kICd0b3VjaG1vdmUnLCAoZXZlbnQpIC0+XG4gICAgICAgIHRhcHBpbmcgPSBmYWxzZVxuICAgICAgJGVsZW1lbnQuYmluZCAndG91Y2hlbmQnLCAoZXZlbnQpIC0+XG4gICAgICAgIGlmIHRhcHBpbmdcbiAgICAgICAgICAjIHByZXZlbnQgZXZlbnQgYnViYmxpbmcgdG8gYWxsb3cgaW5uZXIgdGFwIHRhcmdldFxuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgICAgICAgICBpZiAkYXR0cnMub25TdGFnZUxlZnQgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS5sb2coXCJXYXJuaW5nOiBObyBldmVudCBsaXN0ZW5lciBmb3Igb25TdGFnZUxlZnRcIilcbiAgICAgICAgICBcbiAgICAgICAgICBmdW5jID0gJHNjb3BlLm9uU3RhZ2VMZWZ0XG4gICAgICAgICAgaWYodHlwZW9mIGZ1bmMgaXMgJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkgLT5cbiAgICAgICAgICAgICAgZnVuYyhldmVudClcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBvblN0YWdlTGVmdCBuZWVkcyB0byBiZSBhIGZ1bmN0aW9uLlwiKVxuICAgIGVsc2VcbiAgICAgICRlbGVtZW50Lm9uIFwiY2xpY2tcIiwgXCIuaWNvbi11dGlsaXR5LXJvd3NcIiwgZXZlbnRIYW5kbGVyXG4gICAgXG4gICAgXG5cbiAgICBldmVudEhhbmRsZXIgPSAoZXZlbnQpIC0+XG4gICAgICBpZiAkYXR0cnMub25Ob3RpZmljYXRpb25zIGlzIHVuZGVmaW5lZFxuICAgICAgICByZXR1cm4gY29uc29sZS5sb2coXCJXYXJuaW5nOiBObyBldmVudCBsaXN0ZW5lciBmb3Igb25Ob3RpZmljYXRpb25zXCIpXG4gICAgICBcbiAgICAgIGZ1bmMgPSAkc2NvcGUub25Ob3RpZmljYXRpb25zXG4gICAgICBpZih0eXBlb2YgZnVuYyBpcyAnZnVuY3Rpb24nKVxuICAgICAgICAkc2NvcGUuJGFwcGx5IC0+XG4gICAgICAgICAgZnVuYyhldmVudClcbiAgICAgIGVsc2VcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogb25Ob3RpZmljYXRpb25zIG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24uXCIpXG5cbiAgICBcbiAgICBpZiBldmVudCBpcyAnY2xpY2snIGFuZCBpc1RvdWNoRGV2aWNlKClcblxuICAgICAgdGFwcGluZyA9IGZhbHNlXG4gICAgICAkZWxlbWVudC5iaW5kICd0b3VjaHN0YXJ0JywgKGV2ZW50KSAtPlxuICAgICAgICB0YXBwaW5nID0gdHJ1ZVxuICAgICAgJGVsZW1lbnQuYmluZCAndG91Y2htb3ZlJywgKGV2ZW50KSAtPlxuICAgICAgICB0YXBwaW5nID0gZmFsc2VcbiAgICAgICRlbGVtZW50LmJpbmQgJ3RvdWNoZW5kJywgKGV2ZW50KSAtPlxuICAgICAgICBpZiB0YXBwaW5nXG4gICAgICAgICAgIyBwcmV2ZW50IGV2ZW50IGJ1YmJsaW5nIHRvIGFsbG93IGlubmVyIHRhcCB0YXJnZXRcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuXG4gICAgICAgICAgaWYgJGF0dHJzLm9uTm90aWZpY2F0aW9ucyBpcyB1bmRlZmluZWRcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhcIldhcm5pbmc6IE5vIGV2ZW50IGxpc3RlbmVyIGZvciBvbk5vdGlmaWNhdGlvbnNcIilcbiAgICAgICAgICBcbiAgICAgICAgICBmdW5jID0gJHNjb3BlLm9uTm90aWZpY2F0aW9uc1xuICAgICAgICAgIGlmKHR5cGVvZiBmdW5jIGlzICdmdW5jdGlvbicpXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5IC0+XG4gICAgICAgICAgICAgIGZ1bmMoZXZlbnQpXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogb25Ob3RpZmljYXRpb25zIG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24uXCIpXG4gICAgZWxzZVxuICAgICAgJGVsZW1lbnQub24gXCJjbGlja1wiLCBcIi5pY29uLXV0aWxpdHktbm90aWZpY2F0aW9uXCIsIGV2ZW50SGFuZGxlclxuICAgIFxuICAgICIsIm1vZHVsZS5leHBvcnRzID0gLT5cbiAgcmVzdHJpY3QgOiAnRScgI2VsZW1lbnRcbiAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnQvczFIZWFkZXJQcmltYXJ5TW9kYWwuaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICAgIGhlYWRlcnByaW1hcnltb2RhbGJ1dHRvbmxlZnQ6ICdAYnV0dG9uTGVmdCdcbiAgXG4gICAgaGVhZGVycHJpbWFyeW1vZGFsYnV0dG9ucmlnaHQ6ICdAYnV0dG9uUmlnaHQnXG4gIFxuICAgIGhlYWRlcnByaW1hcnltb2RhbHRpdGxlOiAnQHRpdGxlJ1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUhlYWRlclByaW1hcnlTZWFyY2guaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICAgIGhlYWRlcnByaW1hcnlzZWFyY2hwbGFjZWhvbGRlcjogJ0BwbGFjZWhvbGRlcidcbiAgXG4gIFxuICB9XG4gIGxpbms6ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIC0+XG4gICAgaXNUb3VjaERldmljZSA9IC0+IFwib250b3VjaHN0YXJ0XCIgb2Ygd2luZG93IG9yIFwib25tc2dlc3R1cmVjaGFuZ2VcIiBvZiB3aW5kb3dcblxuICAgICIsIm1vZHVsZS5leHBvcnRzID0gLT5cbiAgcmVzdHJpY3QgOiAnRScgI2VsZW1lbnRcbiAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnQvczFIZWFkZXJTZWNvbmRhcnlDaGlsZEJyb3dzZXIuaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxSGVhZGVyU2Vjb25kYXJ5RmlsZVByZXZpZXcuaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxSW5kaWNhdG9yRG90c0RhcmtCYWNrZ3JvdW5kLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUluZGljYXRvckRvdHNMaWdodEJhY2tncm91bmQuaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxTGlzdEZsYWdPYmplY3RzLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgICBzMWxpc3RmbGFnb2JqZWN0c2ZpcnN0dGl0bGU6ICdAZmlyc3RUaXRsZSdcbiAgXG4gICAgczFsaXN0ZmxhZ29iamVjdHNmaXJzdG1ldGFvbmU6ICdAZmlyc3RTdWJPbmUnXG4gIFxuICAgIHMxbGlzdGZsYWdvYmplY3RzZmlyc3RtZXRhdHdvOiAnQGZpcnN0U3ViVHdvJ1xuICBcbiAgICBzMWxpc3RmbGFnb2JqZWN0c3NlY29uZHRpdGxlOiAnQHNlY29uZFRpdGxlJ1xuICBcbiAgICBzMWxpc3RmbGFnb2JqZWN0c3NlY29uZG1ldGFvbmU6ICdAc2Vjb25kU3ViT25lJ1xuICBcbiAgICBzMWxpc3RmbGFnb2JqZWN0c3NlY29uZG1ldGF0d286ICdAc2Vjb25kU3ViVHdvJ1xuICBcbiAgICBzMWxpc3RmbGFnb2JqZWN0c3RoaXJkdGl0bGU6ICdAdGhpcmRUaXRsZSdcbiAgXG4gICAgczFsaXN0ZmxhZ29iamVjdHN0aGlyZG1ldGFvbmU6ICdAdGhpcmRTdWJPbmUnXG4gIFxuICAgIHMxbGlzdGZsYWdvYmplY3RzdGhpcmRtZXRhdHdvOiAnQHRoaXJkU3ViVHdvJ1xuICBcbiAgICBzMWxpc3RmbGFnb2JqZWN0c2ZvcnRodGl0bGU6ICdAZm9ydGhUaXRsZSdcbiAgXG4gICAgczFsaXN0ZmxhZ29iamVjdHNmb3J0aG1ldGFvbmU6ICdAZm9ydGhTdWJPbmUnXG4gIFxuICAgIHMxbGlzdGZsYWdvYmplY3RzZm9ydGhtZXRhdHdvOiAnQGZvcnRoU3ViVHdvJ1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUxpc3RJdGVtQWNjb3VudC5odG1sJ1xuICByZXBsYWNlIDogdHJ1ZVxuICBcbiAgc2NvcGU6IHtcbiAgXG4gICAgbGlzdGl0ZW1hY2NvdW50dGl0bGU6ICdAdGl0bGUnXG4gIFxuICAgIGxpc3RpdGVtYWNjb3VudGRldGFpbDE6ICdAZGV0YWlsMSdcbiAgXG4gICAgbGlzdGl0ZW1hY2NvdW50ZGV0YWlsMjogJ0BkZXRhaWwyJ1xuICBcbiAgXG4gICAgb25TZWxlY3Q6ICcmJ1xuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICBcblxuICAgIGV2ZW50SGFuZGxlciA9IChldmVudCkgLT5cbiAgICAgIGlmICRhdHRycy5vblNlbGVjdCBpcyB1bmRlZmluZWRcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKFwiV2FybmluZzogTm8gZXZlbnQgbGlzdGVuZXIgZm9yIG9uU2VsZWN0XCIpXG4gICAgICBcbiAgICAgIGZ1bmMgPSAkc2NvcGUub25TZWxlY3RcbiAgICAgIGlmKHR5cGVvZiBmdW5jIGlzICdmdW5jdGlvbicpXG4gICAgICAgICRzY29wZS4kYXBwbHkgLT5cbiAgICAgICAgICBmdW5jKGV2ZW50KVxuICAgICAgZWxzZVxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBvblNlbGVjdCBuZWVkcyB0byBiZSBhIGZ1bmN0aW9uLlwiKVxuXG4gICAgXG4gICAgaWYgZXZlbnQgaXMgJ2NsaWNrJyBhbmQgaXNUb3VjaERldmljZSgpXG5cbiAgICAgIHRhcHBpbmcgPSBmYWxzZVxuICAgICAgJGVsZW1lbnQuYmluZCAndG91Y2hzdGFydCcsIChldmVudCkgLT5cbiAgICAgICAgdGFwcGluZyA9IHRydWVcbiAgICAgICRlbGVtZW50LmJpbmQgJ3RvdWNobW92ZScsIChldmVudCkgLT5cbiAgICAgICAgdGFwcGluZyA9IGZhbHNlXG4gICAgICAkZWxlbWVudC5iaW5kICd0b3VjaGVuZCcsIChldmVudCkgLT5cbiAgICAgICAgaWYgdGFwcGluZ1xuICAgICAgICAgICMgcHJldmVudCBldmVudCBidWJibGluZyB0byBhbGxvdyBpbm5lciB0YXAgdGFyZ2V0XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgICAgICAgIGlmICRhdHRycy5vblNlbGVjdCBpcyB1bmRlZmluZWRcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhcIldhcm5pbmc6IE5vIGV2ZW50IGxpc3RlbmVyIGZvciBvblNlbGVjdFwiKVxuICAgICAgICAgIFxuICAgICAgICAgIGZ1bmMgPSAkc2NvcGUub25TZWxlY3RcbiAgICAgICAgICBpZih0eXBlb2YgZnVuYyBpcyAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSAtPlxuICAgICAgICAgICAgICBmdW5jKGV2ZW50KVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IG9uU2VsZWN0IG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24uXCIpXG4gICAgZWxzZVxuICAgICAgJGVsZW1lbnQub24gXCJjbGlja1wiLCBldmVudEhhbmRsZXJcbiAgICBcbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxTGlzdEl0ZW1DYXNlLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgICBsaXN0aXRlbWNhc2V0aXRsZTogJ0B0aXRsZSdcbiAgXG4gICAgbGlzdGl0ZW1jYXNlZGV0YWlsMTogJ0BkZXRhaWwxJ1xuICBcbiAgICBsaXN0aXRlbWNhc2VkZXRhaWwyOiAnQGRldGFpbDInXG4gIFxuICAgIGxpc3RpdGVtY2FzZWRldGFpbDM6ICdAZGV0YWlsMydcbiAgXG4gIFxuICAgIG9uU2VsZWN0OiAnJidcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgXG5cbiAgICBldmVudEhhbmRsZXIgPSAoZXZlbnQpIC0+XG4gICAgICBpZiAkYXR0cnMub25TZWxlY3QgaXMgdW5kZWZpbmVkXG4gICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhcIldhcm5pbmc6IE5vIGV2ZW50IGxpc3RlbmVyIGZvciBvblNlbGVjdFwiKVxuICAgICAgXG4gICAgICBmdW5jID0gJHNjb3BlLm9uU2VsZWN0XG4gICAgICBpZih0eXBlb2YgZnVuYyBpcyAnZnVuY3Rpb24nKVxuICAgICAgICAkc2NvcGUuJGFwcGx5IC0+XG4gICAgICAgICAgZnVuYyhldmVudClcbiAgICAgIGVsc2VcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogb25TZWxlY3QgbmVlZHMgdG8gYmUgYSBmdW5jdGlvbi5cIilcblxuICAgIFxuICAgIGlmIGV2ZW50IGlzICdjbGljaycgYW5kIGlzVG91Y2hEZXZpY2UoKVxuXG4gICAgICB0YXBwaW5nID0gZmFsc2VcbiAgICAgICRlbGVtZW50LmJpbmQgJ3RvdWNoc3RhcnQnLCAoZXZlbnQpIC0+XG4gICAgICAgIHRhcHBpbmcgPSB0cnVlXG4gICAgICAkZWxlbWVudC5iaW5kICd0b3VjaG1vdmUnLCAoZXZlbnQpIC0+XG4gICAgICAgIHRhcHBpbmcgPSBmYWxzZVxuICAgICAgJGVsZW1lbnQuYmluZCAndG91Y2hlbmQnLCAoZXZlbnQpIC0+XG4gICAgICAgIGlmIHRhcHBpbmdcbiAgICAgICAgICAjIHByZXZlbnQgZXZlbnQgYnViYmxpbmcgdG8gYWxsb3cgaW5uZXIgdGFwIHRhcmdldFxuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgICAgICAgICBpZiAkYXR0cnMub25TZWxlY3QgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS5sb2coXCJXYXJuaW5nOiBObyBldmVudCBsaXN0ZW5lciBmb3Igb25TZWxlY3RcIilcbiAgICAgICAgICBcbiAgICAgICAgICBmdW5jID0gJHNjb3BlLm9uU2VsZWN0XG4gICAgICAgICAgaWYodHlwZW9mIGZ1bmMgaXMgJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkgLT5cbiAgICAgICAgICAgICAgZnVuYyhldmVudClcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBvblNlbGVjdCBuZWVkcyB0byBiZSBhIGZ1bmN0aW9uLlwiKVxuICAgIGVsc2VcbiAgICAgICRlbGVtZW50Lm9uIFwiY2xpY2tcIiwgZXZlbnRIYW5kbGVyXG4gICAgXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUxpc3RJdGVtQ29udGFjdC5odG1sJ1xuICByZXBsYWNlIDogdHJ1ZVxuICBcbiAgc2NvcGU6IHtcbiAgXG4gICAgbGlzdGl0ZW1jb250YWN0aWNvbjogJ0BpY29uJ1xuICBcbiAgICBsaXN0aXRlbWNvbnRhY3R0aXRsZTogJ0B0aXRsZSdcbiAgXG4gICAgbGlzdGl0ZW1jb250YWN0ZGV0YWlsMTogJ0BkZXRhaWwxJ1xuICBcbiAgICBsaXN0aXRlbWNvbnRhY3RkZXRhaWwyOiAnQGRldGFpbDInXG4gIFxuICAgIGxpc3RpdGVtY29udGFjdGRldGFpbDM6ICdAZGV0YWlsMydcbiAgXG4gIFxuICAgIG9uU2VsZWN0OiAnJidcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgXG5cbiAgICBldmVudEhhbmRsZXIgPSAoZXZlbnQpIC0+XG4gICAgICBpZiAkYXR0cnMub25TZWxlY3QgaXMgdW5kZWZpbmVkXG4gICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhcIldhcm5pbmc6IE5vIGV2ZW50IGxpc3RlbmVyIGZvciBvblNlbGVjdFwiKVxuICAgICAgXG4gICAgICBmdW5jID0gJHNjb3BlLm9uU2VsZWN0XG4gICAgICBpZih0eXBlb2YgZnVuYyBpcyAnZnVuY3Rpb24nKVxuICAgICAgICAkc2NvcGUuJGFwcGx5IC0+XG4gICAgICAgICAgZnVuYyhldmVudClcbiAgICAgIGVsc2VcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogb25TZWxlY3QgbmVlZHMgdG8gYmUgYSBmdW5jdGlvbi5cIilcblxuICAgIFxuICAgIGlmIGV2ZW50IGlzICdjbGljaycgYW5kIGlzVG91Y2hEZXZpY2UoKVxuXG4gICAgICB0YXBwaW5nID0gZmFsc2VcbiAgICAgICRlbGVtZW50LmJpbmQgJ3RvdWNoc3RhcnQnLCAoZXZlbnQpIC0+XG4gICAgICAgIHRhcHBpbmcgPSB0cnVlXG4gICAgICAkZWxlbWVudC5iaW5kICd0b3VjaG1vdmUnLCAoZXZlbnQpIC0+XG4gICAgICAgIHRhcHBpbmcgPSBmYWxzZVxuICAgICAgJGVsZW1lbnQuYmluZCAndG91Y2hlbmQnLCAoZXZlbnQpIC0+XG4gICAgICAgIGlmIHRhcHBpbmdcbiAgICAgICAgICAjIHByZXZlbnQgZXZlbnQgYnViYmxpbmcgdG8gYWxsb3cgaW5uZXIgdGFwIHRhcmdldFxuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgICAgICAgICBpZiAkYXR0cnMub25TZWxlY3QgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS5sb2coXCJXYXJuaW5nOiBObyBldmVudCBsaXN0ZW5lciBmb3Igb25TZWxlY3RcIilcbiAgICAgICAgICBcbiAgICAgICAgICBmdW5jID0gJHNjb3BlLm9uU2VsZWN0XG4gICAgICAgICAgaWYodHlwZW9mIGZ1bmMgaXMgJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkgLT5cbiAgICAgICAgICAgICAgZnVuYyhldmVudClcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBvblNlbGVjdCBuZWVkcyB0byBiZSBhIGZ1bmN0aW9uLlwiKVxuICAgIGVsc2VcbiAgICAgICRlbGVtZW50Lm9uIFwiY2xpY2tcIiwgZXZlbnRIYW5kbGVyXG4gICAgXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUxpc3RJdGVtQ29udGFpbmVyLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICB0cmFuc2NsdWRlOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUxpc3RJdGVtQ3VzdG9tT2JqZWN0Lmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgICBsaXN0aXRlbWN1c3RvbXRpdGxlOiAnQHRpdGxlJ1xuICBcbiAgICBsaXN0aXRlbWN1c3RvbWxhYmVsMTogJ0BsYWJlbDEnXG4gIFxuICAgIGxpc3RpdGVtY3VzdG9tbGFiZWwyOiAnQGxhYmVsMidcbiAgXG4gICAgbGlzdGl0ZW1jdXN0b21sYWJlbDM6ICdAbGFiZWwzJ1xuICBcbiAgICBsaXN0aXRlbWN1c3RvbWxhYmVsNDogJ0BsYWJlbDQnXG4gIFxuICAgIGxpc3RpdGVtY3VzdG9tZGV0YWlsMTogJ0BkZXRhaWwxJ1xuICBcbiAgICBsaXN0aXRlbWN1c3RvbWRldGFpbDI6ICdAZGV0YWlsMidcbiAgXG4gICAgbGlzdGl0ZW1jdXN0b21kZXRhaWwzOiAnQGRldGFpbDMnXG4gIFxuICAgIGxpc3RpdGVtY3VzdG9tZGV0YWlsNDogJ0BkZXRhaWw0J1xuICBcbiAgXG4gICAgb25TZWxlY3Q6ICcmJ1xuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICBcblxuICAgIGV2ZW50SGFuZGxlciA9IChldmVudCkgLT5cbiAgICAgIGlmICRhdHRycy5vblNlbGVjdCBpcyB1bmRlZmluZWRcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKFwiV2FybmluZzogTm8gZXZlbnQgbGlzdGVuZXIgZm9yIG9uU2VsZWN0XCIpXG4gICAgICBcbiAgICAgIGZ1bmMgPSAkc2NvcGUub25TZWxlY3RcbiAgICAgIGlmKHR5cGVvZiBmdW5jIGlzICdmdW5jdGlvbicpXG4gICAgICAgICRzY29wZS4kYXBwbHkgLT5cbiAgICAgICAgICBmdW5jKGV2ZW50KVxuICAgICAgZWxzZVxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBvblNlbGVjdCBuZWVkcyB0byBiZSBhIGZ1bmN0aW9uLlwiKVxuXG4gICAgXG4gICAgaWYgZXZlbnQgaXMgJ2NsaWNrJyBhbmQgaXNUb3VjaERldmljZSgpXG5cbiAgICAgIHRhcHBpbmcgPSBmYWxzZVxuICAgICAgJGVsZW1lbnQuYmluZCAndG91Y2hzdGFydCcsIChldmVudCkgLT5cbiAgICAgICAgdGFwcGluZyA9IHRydWVcbiAgICAgICRlbGVtZW50LmJpbmQgJ3RvdWNobW92ZScsIChldmVudCkgLT5cbiAgICAgICAgdGFwcGluZyA9IGZhbHNlXG4gICAgICAkZWxlbWVudC5iaW5kICd0b3VjaGVuZCcsIChldmVudCkgLT5cbiAgICAgICAgaWYgdGFwcGluZ1xuICAgICAgICAgICMgcHJldmVudCBldmVudCBidWJibGluZyB0byBhbGxvdyBpbm5lciB0YXAgdGFyZ2V0XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgICAgICAgIGlmICRhdHRycy5vblNlbGVjdCBpcyB1bmRlZmluZWRcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhcIldhcm5pbmc6IE5vIGV2ZW50IGxpc3RlbmVyIGZvciBvblNlbGVjdFwiKVxuICAgICAgICAgIFxuICAgICAgICAgIGZ1bmMgPSAkc2NvcGUub25TZWxlY3RcbiAgICAgICAgICBpZih0eXBlb2YgZnVuYyBpcyAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSAtPlxuICAgICAgICAgICAgICBmdW5jKGV2ZW50KVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IG9uU2VsZWN0IG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24uXCIpXG4gICAgZWxzZVxuICAgICAgJGVsZW1lbnQub24gXCJjbGlja1wiLCBldmVudEhhbmRsZXJcbiAgICBcbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxTGlzdEl0ZW1EZWZhdWx0Lmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgICBsaXN0aXRlbWRlZmF1bHR0aXRsZTogJ0B0ZXh0J1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUxpc3RJdGVtRXZlbnQuaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICAgIGxpc3RpdGVtZXZlbnR0aW1lOiAnQHRpbWUnXG4gIFxuICAgIGxpc3RpdGVtZXZlbnRkdXJhdGlvbjogJ0BkdXJhdGlvbidcbiAgXG4gICAgbGlzdGl0ZW1ldmVudHRpdGxlOiAnQHRpdGxlJ1xuICBcbiAgICBsaXN0aXRlbWV2ZW50ZGV0YWlsMTogJ0BkZXRhaWwxJ1xuICBcbiAgICBsaXN0aXRlbWV2ZW50ZGV0YWlsMjogJ0BkZXRhaWwyJ1xuICBcbiAgICBsaXN0aXRlbWV2ZW50ZGV0YWlsMzogJ0BkZXRhaWwzJ1xuICBcbiAgXG4gICAgb25TZWxlY3Q6ICcmJ1xuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICBcblxuICAgIGV2ZW50SGFuZGxlciA9IChldmVudCkgLT5cbiAgICAgIGlmICRhdHRycy5vblNlbGVjdCBpcyB1bmRlZmluZWRcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKFwiV2FybmluZzogTm8gZXZlbnQgbGlzdGVuZXIgZm9yIG9uU2VsZWN0XCIpXG4gICAgICBcbiAgICAgIGZ1bmMgPSAkc2NvcGUub25TZWxlY3RcbiAgICAgIGlmKHR5cGVvZiBmdW5jIGlzICdmdW5jdGlvbicpXG4gICAgICAgICRzY29wZS4kYXBwbHkgLT5cbiAgICAgICAgICBmdW5jKGV2ZW50KVxuICAgICAgZWxzZVxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBvblNlbGVjdCBuZWVkcyB0byBiZSBhIGZ1bmN0aW9uLlwiKVxuXG4gICAgXG4gICAgaWYgZXZlbnQgaXMgJ2NsaWNrJyBhbmQgaXNUb3VjaERldmljZSgpXG5cbiAgICAgIHRhcHBpbmcgPSBmYWxzZVxuICAgICAgJGVsZW1lbnQuYmluZCAndG91Y2hzdGFydCcsIChldmVudCkgLT5cbiAgICAgICAgdGFwcGluZyA9IHRydWVcbiAgICAgICRlbGVtZW50LmJpbmQgJ3RvdWNobW92ZScsIChldmVudCkgLT5cbiAgICAgICAgdGFwcGluZyA9IGZhbHNlXG4gICAgICAkZWxlbWVudC5iaW5kICd0b3VjaGVuZCcsIChldmVudCkgLT5cbiAgICAgICAgaWYgdGFwcGluZ1xuICAgICAgICAgICMgcHJldmVudCBldmVudCBidWJibGluZyB0byBhbGxvdyBpbm5lciB0YXAgdGFyZ2V0XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgICAgICAgIGlmICRhdHRycy5vblNlbGVjdCBpcyB1bmRlZmluZWRcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhcIldhcm5pbmc6IE5vIGV2ZW50IGxpc3RlbmVyIGZvciBvblNlbGVjdFwiKVxuICAgICAgICAgIFxuICAgICAgICAgIGZ1bmMgPSAkc2NvcGUub25TZWxlY3RcbiAgICAgICAgICBpZih0eXBlb2YgZnVuYyBpcyAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSAtPlxuICAgICAgICAgICAgICBmdW5jKGV2ZW50KVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IG9uU2VsZWN0IG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24uXCIpXG4gICAgZWxzZVxuICAgICAgJGVsZW1lbnQub24gXCJjbGlja1wiLCBldmVudEhhbmRsZXJcbiAgICBcbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxTGlzdEl0ZW1GaWxlLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgICBsaXN0aXRlbWZpbGV0aXRsZTogJ0B0aXRsZSdcbiAgXG4gICAgbGlzdGl0ZW1maWxlaWNvbjogJ0BmaWxldHlwZSdcbiAgXG4gICAgbGlzdGl0ZW1maWxlZGV0YWlsMTogJ0BkZXRhaWwxJ1xuICBcbiAgICBsaXN0aXRlbWZpbGVkZXRhaWwyOiAnQGRldGFpbDInXG4gIFxuICAgIGxpc3RpdGVtZmlsZWRldGFpbDM6ICdAZGV0YWlsMydcbiAgXG4gICAgbGlzdGl0ZW1maWxlZGV0YWlsNDogJ0BkZXRhaWw0J1xuICBcbiAgXG4gICAgb25TZWxlY3Q6ICcmJ1xuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICBcblxuICAgIGV2ZW50SGFuZGxlciA9IChldmVudCkgLT5cbiAgICAgIGlmICRhdHRycy5vblNlbGVjdCBpcyB1bmRlZmluZWRcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKFwiV2FybmluZzogTm8gZXZlbnQgbGlzdGVuZXIgZm9yIG9uU2VsZWN0XCIpXG4gICAgICBcbiAgICAgIGZ1bmMgPSAkc2NvcGUub25TZWxlY3RcbiAgICAgIGlmKHR5cGVvZiBmdW5jIGlzICdmdW5jdGlvbicpXG4gICAgICAgICRzY29wZS4kYXBwbHkgLT5cbiAgICAgICAgICBmdW5jKGV2ZW50KVxuICAgICAgZWxzZVxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBvblNlbGVjdCBuZWVkcyB0byBiZSBhIGZ1bmN0aW9uLlwiKVxuXG4gICAgXG4gICAgaWYgZXZlbnQgaXMgJ2NsaWNrJyBhbmQgaXNUb3VjaERldmljZSgpXG5cbiAgICAgIHRhcHBpbmcgPSBmYWxzZVxuICAgICAgJGVsZW1lbnQuYmluZCAndG91Y2hzdGFydCcsIChldmVudCkgLT5cbiAgICAgICAgdGFwcGluZyA9IHRydWVcbiAgICAgICRlbGVtZW50LmJpbmQgJ3RvdWNobW92ZScsIChldmVudCkgLT5cbiAgICAgICAgdGFwcGluZyA9IGZhbHNlXG4gICAgICAkZWxlbWVudC5iaW5kICd0b3VjaGVuZCcsIChldmVudCkgLT5cbiAgICAgICAgaWYgdGFwcGluZ1xuICAgICAgICAgICMgcHJldmVudCBldmVudCBidWJibGluZyB0byBhbGxvdyBpbm5lciB0YXAgdGFyZ2V0XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgICAgICAgIGlmICRhdHRycy5vblNlbGVjdCBpcyB1bmRlZmluZWRcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhcIldhcm5pbmc6IE5vIGV2ZW50IGxpc3RlbmVyIGZvciBvblNlbGVjdFwiKVxuICAgICAgICAgIFxuICAgICAgICAgIGZ1bmMgPSAkc2NvcGUub25TZWxlY3RcbiAgICAgICAgICBpZih0eXBlb2YgZnVuYyBpcyAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSAtPlxuICAgICAgICAgICAgICBmdW5jKGV2ZW50KVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IG9uU2VsZWN0IG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24uXCIpXG4gICAgZWxzZVxuICAgICAgJGVsZW1lbnQub24gXCJjbGlja1wiLCBldmVudEhhbmRsZXJcbiAgICBcbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxTGlzdEl0ZW1GbGFnT2JqZWN0cy5odG1sJ1xuICByZXBsYWNlIDogdHJ1ZVxuICBcbiAgc2NvcGU6IHtcbiAgXG4gICAgbGlzdGl0ZW1mbGFnaW1nOiAnQGltZydcbiAgXG4gICAgbGlzdGl0ZW1mbGFndGl0bGU6ICdAdGl0bGUnXG4gIFxuICAgIGxpc3RpdGVtZmxhZ21ldGExOiAnQG1ldGExJ1xuICBcbiAgICBsaXN0aXRlbWZsYWdtZXRhMjogJ0BtZXRhMidcbiAgXG4gIFxuICB9XG4gIGxpbms6ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIC0+XG4gICAgaXNUb3VjaERldmljZSA9IC0+IFwib250b3VjaHN0YXJ0XCIgb2Ygd2luZG93IG9yIFwib25tc2dlc3R1cmVjaGFuZ2VcIiBvZiB3aW5kb3dcblxuICAgICIsIm1vZHVsZS5leHBvcnRzID0gLT5cbiAgcmVzdHJpY3QgOiAnRScgI2VsZW1lbnRcbiAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnQvczFMaXN0SXRlbU9wcG9ydHVuaXR5Lmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgICBsaXN0aXRlbW9wcHR5dGl0bGU6ICdAdGl0bGUnXG4gIFxuICAgIGxpc3RpdGVtb3BwdHlkZXRhaWwxOiAnQGRldGFpbDEnXG4gIFxuICAgIGxpc3RpdGVtb3BwdHlkZXRhaWwyOiAnQGRldGFpbDInXG4gIFxuICAgIGxpc3RpdGVtb3BwdHlkZXRhaWwzOiAnQGRldGFpbDMnXG4gIFxuICAgIGxpc3RpdGVtb3BwdHlkZXRhaWw0OiAnQGRldGFpbDQnXG4gIFxuICBcbiAgICBvblNlbGVjdDogJyYnXG4gIFxuICB9XG4gIGxpbms6ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIC0+XG4gICAgaXNUb3VjaERldmljZSA9IC0+IFwib250b3VjaHN0YXJ0XCIgb2Ygd2luZG93IG9yIFwib25tc2dlc3R1cmVjaGFuZ2VcIiBvZiB3aW5kb3dcblxuICAgIFxuXG4gICAgZXZlbnRIYW5kbGVyID0gKGV2ZW50KSAtPlxuICAgICAgaWYgJGF0dHJzLm9uU2VsZWN0IGlzIHVuZGVmaW5lZFxuICAgICAgICByZXR1cm4gY29uc29sZS5sb2coXCJXYXJuaW5nOiBObyBldmVudCBsaXN0ZW5lciBmb3Igb25TZWxlY3RcIilcbiAgICAgIFxuICAgICAgZnVuYyA9ICRzY29wZS5vblNlbGVjdFxuICAgICAgaWYodHlwZW9mIGZ1bmMgaXMgJ2Z1bmN0aW9uJylcbiAgICAgICAgJHNjb3BlLiRhcHBseSAtPlxuICAgICAgICAgIGZ1bmMoZXZlbnQpXG4gICAgICBlbHNlXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IG9uU2VsZWN0IG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24uXCIpXG5cbiAgICBcbiAgICBpZiBldmVudCBpcyAnY2xpY2snIGFuZCBpc1RvdWNoRGV2aWNlKClcblxuICAgICAgdGFwcGluZyA9IGZhbHNlXG4gICAgICAkZWxlbWVudC5iaW5kICd0b3VjaHN0YXJ0JywgKGV2ZW50KSAtPlxuICAgICAgICB0YXBwaW5nID0gdHJ1ZVxuICAgICAgJGVsZW1lbnQuYmluZCAndG91Y2htb3ZlJywgKGV2ZW50KSAtPlxuICAgICAgICB0YXBwaW5nID0gZmFsc2VcbiAgICAgICRlbGVtZW50LmJpbmQgJ3RvdWNoZW5kJywgKGV2ZW50KSAtPlxuICAgICAgICBpZiB0YXBwaW5nXG4gICAgICAgICAgIyBwcmV2ZW50IGV2ZW50IGJ1YmJsaW5nIHRvIGFsbG93IGlubmVyIHRhcCB0YXJnZXRcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuXG4gICAgICAgICAgaWYgJGF0dHJzLm9uU2VsZWN0IGlzIHVuZGVmaW5lZFxuICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKFwiV2FybmluZzogTm8gZXZlbnQgbGlzdGVuZXIgZm9yIG9uU2VsZWN0XCIpXG4gICAgICAgICAgXG4gICAgICAgICAgZnVuYyA9ICRzY29wZS5vblNlbGVjdFxuICAgICAgICAgIGlmKHR5cGVvZiBmdW5jIGlzICdmdW5jdGlvbicpXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5IC0+XG4gICAgICAgICAgICAgIGZ1bmMoZXZlbnQpXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogb25TZWxlY3QgbmVlZHMgdG8gYmUgYSBmdW5jdGlvbi5cIilcbiAgICBlbHNlXG4gICAgICAkZWxlbWVudC5vbiBcImNsaWNrXCIsIGV2ZW50SGFuZGxlclxuICAgIFxuICAgICIsIm1vZHVsZS5leHBvcnRzID0gLT5cbiAgcmVzdHJpY3QgOiAnRScgI2VsZW1lbnRcbiAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnQvczFMaXN0SXRlbVRhc2suaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICAgIGxpc3RpdGVtdGFza3RpdGxlOiAnQHRpdGxlJ1xuICBcbiAgICBsaXN0aXRlbXRhc2tkZXRhaWwxOiAnQGRldGFpbDEnXG4gIFxuICAgIGxpc3RpdGVtdGFza2RldGFpbDI6ICdAZGV0YWlsMidcbiAgXG4gICAgbGlzdGl0ZW10YXNrZGV0YWlsMzogJ0BkYXRlJ1xuICBcbiAgXG4gICAgb25TZWxlY3Q6ICcmJ1xuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICBcblxuICAgIGV2ZW50SGFuZGxlciA9IChldmVudCkgLT5cbiAgICAgIGlmICRhdHRycy5vblNlbGVjdCBpcyB1bmRlZmluZWRcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKFwiV2FybmluZzogTm8gZXZlbnQgbGlzdGVuZXIgZm9yIG9uU2VsZWN0XCIpXG4gICAgICBcbiAgICAgIGZ1bmMgPSAkc2NvcGUub25TZWxlY3RcbiAgICAgIGlmKHR5cGVvZiBmdW5jIGlzICdmdW5jdGlvbicpXG4gICAgICAgICRzY29wZS4kYXBwbHkgLT5cbiAgICAgICAgICBmdW5jKGV2ZW50KVxuICAgICAgZWxzZVxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBvblNlbGVjdCBuZWVkcyB0byBiZSBhIGZ1bmN0aW9uLlwiKVxuXG4gICAgXG4gICAgaWYgZXZlbnQgaXMgJ2NsaWNrJyBhbmQgaXNUb3VjaERldmljZSgpXG5cbiAgICAgIHRhcHBpbmcgPSBmYWxzZVxuICAgICAgJGVsZW1lbnQuYmluZCAndG91Y2hzdGFydCcsIChldmVudCkgLT5cbiAgICAgICAgdGFwcGluZyA9IHRydWVcbiAgICAgICRlbGVtZW50LmJpbmQgJ3RvdWNobW92ZScsIChldmVudCkgLT5cbiAgICAgICAgdGFwcGluZyA9IGZhbHNlXG4gICAgICAkZWxlbWVudC5iaW5kICd0b3VjaGVuZCcsIChldmVudCkgLT5cbiAgICAgICAgaWYgdGFwcGluZ1xuICAgICAgICAgICMgcHJldmVudCBldmVudCBidWJibGluZyB0byBhbGxvdyBpbm5lciB0YXAgdGFyZ2V0XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgICAgICAgIGlmICRhdHRycy5vblNlbGVjdCBpcyB1bmRlZmluZWRcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhcIldhcm5pbmc6IE5vIGV2ZW50IGxpc3RlbmVyIGZvciBvblNlbGVjdFwiKVxuICAgICAgICAgIFxuICAgICAgICAgIGZ1bmMgPSAkc2NvcGUub25TZWxlY3RcbiAgICAgICAgICBpZih0eXBlb2YgZnVuYyBpcyAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSAtPlxuICAgICAgICAgICAgICBmdW5jKGV2ZW50KVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IG9uU2VsZWN0IG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24uXCIpXG4gICAgZWxzZVxuICAgICAgJGVsZW1lbnQub24gXCJjbGlja1wiLCBldmVudEhhbmRsZXJcbiAgICBcbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxTGlzdEl0ZW1XaXRoSWNvbi5odG1sJ1xuICByZXBsYWNlIDogdHJ1ZVxuICBcbiAgc2NvcGU6IHtcbiAgXG4gICAgbGlzdGl0ZW1pY29udGl0bGU6ICdAdGV4dCdcbiAgXG4gICAgbGlzdGl0ZW1pY29uaWNvbjogJ0BpY29uJ1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUxpc3RJdGVtV2l0aExhYmVsLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgICBsaXN0aXRlbWxhYmVsdGl0bGU6ICdAdGl0bGUnXG4gIFxuICAgIGxpc3RpdGVtbGFiZWxtZXRhOiAnQGxhYmVsJ1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUxpc3RTaW5nbGVMaW5lb2ZUZXh0Lmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUxpc3RXaXRoTGFiZWxzLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMUxvb2t1cERlZmF1bHQuaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxTG9va3VwRXJyb3IuaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxTG9va3VwV2l0aExhYmVsLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgICBsb29rdXB3aXRobGFiZWxsYWJlbDogJ0BsYWJlbCdcbiAgXG4gICAgbG9va3Vwd2l0aGxhYmVscGxhY2Vob2xkZXI6ICdAcGxhY2Vob2xkZXInXG4gIFxuICAgIGxvb2t1cHdpdGhsYWJlbHZhbHVlOiAnQHZhbHVlJ1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMU1EUEJ1dHRvbi5odG1sJ1xuICByZXBsYWNlIDogdHJ1ZVxuICBcbiAgc2NvcGU6IHtcbiAgXG4gIFxuICB9XG4gIGxpbms6ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIC0+XG4gICAgaXNUb3VjaERldmljZSA9IC0+IFwib250b3VjaHN0YXJ0XCIgb2Ygd2luZG93IG9yIFwib25tc2dlc3R1cmVjaGFuZ2VcIiBvZiB3aW5kb3dcblxuICAgICIsIm1vZHVsZS5leHBvcnRzID0gLT5cbiAgcmVzdHJpY3QgOiAnRScgI2VsZW1lbnRcbiAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnQvczFNRFBMYXVuY2hlckRlZmF1bHQuaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICAgIG1kcGxhdW5jaGVybGFiZWx0bDogJ0BsYWJlbFRMJ1xuICBcbiAgICBtZHBsYXVuY2hlcmljb250bDogJ0BpY29uVEwnXG4gIFxuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxTURQTGF1bmNoZXJPdmVyZmxvdy5odG1sJ1xuICByZXBsYWNlIDogdHJ1ZVxuICBcbiAgc2NvcGU6IHtcbiAgXG4gIFxuICB9XG4gIGxpbms6ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIC0+XG4gICAgaXNUb3VjaERldmljZSA9IC0+IFwib250b3VjaHN0YXJ0XCIgb2Ygd2luZG93IG9yIFwib25tc2dlc3R1cmVjaGFuZ2VcIiBvZiB3aW5kb3dcblxuICAgICIsIm1vZHVsZS5leHBvcnRzID0gLT5cbiAgcmVzdHJpY3QgOiAnRScgI2VsZW1lbnRcbiAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnQvczFNb2RhbERpYWxvZ0J1dHRvbnNPbmx5Lmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMU1vZGFsRGlhbG9nV2l0aGNoZWNrYm94Lmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMU1vZGFsRGlhbG9nV2l0aGljb24uaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxTW9kYWxEaWFsb2dXaXRodGV4dC5odG1sJ1xuICByZXBsYWNlIDogdHJ1ZVxuICBcbiAgc2NvcGU6IHtcbiAgXG4gIFxuICB9XG4gIGxpbms6ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIC0+XG4gICAgaXNUb3VjaERldmljZSA9IC0+IFwib250b3VjaHN0YXJ0XCIgb2Ygd2luZG93IG9yIFwib25tc2dlc3R1cmVjaGFuZ2VcIiBvZiB3aW5kb3dcblxuICAgICIsIm1vZHVsZS5leHBvcnRzID0gLT5cbiAgcmVzdHJpY3QgOiAnRScgI2VsZW1lbnRcbiAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnQvczFNb2RhbFNvcnRGaWx0ZXJNdWx0aXNlY3Rpb24uaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxTW9kYWxTb3J0RmlsdGVyT25lc2VjdGlvbi5odG1sJ1xuICByZXBsYWNlIDogdHJ1ZVxuICBcbiAgc2NvcGU6IHtcbiAgXG4gIFxuICB9XG4gIGxpbms6ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIC0+XG4gICAgaXNUb3VjaERldmljZSA9IC0+IFwib250b3VjaHN0YXJ0XCIgb2Ygd2luZG93IG9yIFwib25tc2dlc3R1cmVjaGFuZ2VcIiBvZiB3aW5kb3dcblxuICAgICIsIm1vZHVsZS5leHBvcnRzID0gLT5cbiAgcmVzdHJpY3QgOiAnRScgI2VsZW1lbnRcbiAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnQvczFQYWdlTGV2ZWxFcnJvcnMuaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxUGVyY2VudGFnZUluZGljYXRvckJhci5odG1sJ1xuICByZXBsYWNlIDogdHJ1ZVxuICBcbiAgc2NvcGU6IHtcbiAgXG4gIFxuICB9XG4gIGxpbms6ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIC0+XG4gICAgaXNUb3VjaERldmljZSA9IC0+IFwib250b3VjaHN0YXJ0XCIgb2Ygd2luZG93IG9yIFwib25tc2dlc3R1cmVjaGFuZ2VcIiBvZiB3aW5kb3dcblxuICAgICIsIm1vZHVsZS5leHBvcnRzID0gLT5cbiAgcmVzdHJpY3QgOiAnRScgI2VsZW1lbnRcbiAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnQvczFQaWNrbGlzdERlZmF1bHQuaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICAgIHBpY2tsaXN0ZGVmYXVsdHZhbHVlOiAnQHZhbHVlJ1xuICBcbiAgICBwaWNrbGlzdGRlZmF1bHRsYWJlbDogJ0BsYWJlbCdcbiAgXG4gIFxuICB9XG4gIGxpbms6ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIC0+XG4gICAgaXNUb3VjaERldmljZSA9IC0+IFwib250b3VjaHN0YXJ0XCIgb2Ygd2luZG93IG9yIFwib25tc2dlc3R1cmVjaGFuZ2VcIiBvZiB3aW5kb3dcblxuICAgICIsIm1vZHVsZS5leHBvcnRzID0gLT5cbiAgcmVzdHJpY3QgOiAnRScgI2VsZW1lbnRcbiAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnQvczFQaWNrbGlzdEVycm9yLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgICBwaWNrbGlzdGVycm9ydmFsdWU6ICdAdmFsdWUnXG4gIFxuICAgIHBpY2tsaXN0ZXJyb3JsYWJlbDogJ0BsYWJlbCdcbiAgXG4gIFxuICB9XG4gIGxpbms6ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIC0+XG4gICAgaXNUb3VjaERldmljZSA9IC0+IFwib250b3VjaHN0YXJ0XCIgb2Ygd2luZG93IG9yIFwib25tc2dlc3R1cmVjaGFuZ2VcIiBvZiB3aW5kb3dcblxuICAgICIsIm1vZHVsZS5leHBvcnRzID0gLT5cbiAgcmVzdHJpY3QgOiAnRScgI2VsZW1lbnRcbiAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnQvczFQaWNrbGlzdExhYmVsT3V0c2lkZS5odG1sJ1xuICByZXBsYWNlIDogdHJ1ZVxuICBcbiAgc2NvcGU6IHtcbiAgXG4gICAgcGlja2xpc3RsYWJlbG91dHNpZGV2YWx1ZTogJ0B2YWx1ZSdcbiAgXG4gICAgcGlja2xpc3RvdXRzaWRlbGFiZWxsYWJlbDogJ0BsYWJlbCdcbiAgXG4gIFxuICB9XG4gIGxpbms6ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIC0+XG4gICAgaXNUb3VjaERldmljZSA9IC0+IFwib250b3VjaHN0YXJ0XCIgb2Ygd2luZG93IG9yIFwib25tc2dlc3R1cmVjaGFuZ2VcIiBvZiB3aW5kb3dcblxuICAgICIsIm1vZHVsZS5leHBvcnRzID0gLT5cbiAgcmVzdHJpY3QgOiAnRScgI2VsZW1lbnRcbiAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnQvczFQcm9ncmVzc1NwaW5uZXJEZWZhdWx0Lmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMVByb2dyZXNzU3Bpbm5lck1vZGFsLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMVJhZGlvQnV0dG9uLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMVNlYXJjaFdpZGdldERlZmF1bHQuaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICAgIHNlYXJjaHdpZGdldHBsYWNlaG9sZGVyOiAnQHZhbHVlJ1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMVNlYXJjaFdpZGdldFdpdGhzb3J0ZmlsdGVyLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgICBzZWFyY2h3aWRnZXRzb3J0ZmlsdGVycGxhY2Vob2xkZXI6ICdAcGxhY2Vob2xkZXInXG4gIFxuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxU29ydEZpbHRlci5odG1sJ1xuICByZXBsYWNlIDogdHJ1ZVxuICBcbiAgc2NvcGU6IHtcbiAgXG4gICAgc29ydGZpbHRlcnBsYWNlaG9sZGVyZGVmYXVsdDogJ0BkZWZhdWx0J1xuICBcbiAgICBzb3J0ZmlsdGVycGxhY2Vob2xkZXJhbHRlcm5hdGU6ICdAYWx0ZXJuYXRlJ1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMVN0YWdlZE5hdmlnYXRpb25Ob3RpZmljYXRpb25zLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMVN0YWdlZE5hdmlnYXRpb25TdGFnZUxlZnQuaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxVGV4dElucHV0RGVmYXVsdC5odG1sJ1xuICByZXBsYWNlIDogdHJ1ZVxuICBcbiAgc2NvcGU6IHtcbiAgXG4gICAgdGV4dGlucHV0cGxhY2Vob2xkZXI6ICdAcGxhY2Vob2xkZXInXG4gIFxuICAgIHRleHRpbnB1dHZhbHVlOiAnQHZhbHVlJ1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMVRleHRJbnB1dERpc2FibGVkLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMVRleHRJbnB1dEVycm9yLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMVRleHRJbnB1dFNlYXJjaElucHV0Lmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMVRleHRJbnB1dFdpdGhGaXhlZFRleHQuaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxVGV4dElucHV0V2l0aExhYmVsLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgICB0ZXh0aW5wdXR3aXRobGFiZWxsYWJlbDogJ0BsYWJlbCdcbiAgXG4gICAgdGV4dGlucHV0d2l0aGxhYmVscGxhY2Vob2xkZXI6ICdAcGxhY2Vob2xkZXInXG4gIFxuICAgIHRleHRpbnB1dHdpdGhsYWJlbHZhbHVlOiAnQHZhbHVlJ1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMVRleHRhcmVhRGVmYXVsdC5odG1sJ1xuICByZXBsYWNlIDogdHJ1ZVxuICBcbiAgc2NvcGU6IHtcbiAgXG4gICAgdGV4dGFyZWFkZWZhdWx0cGxhY2Vob2xkZXI6ICdAcGxhY2Vob2xkZXInXG4gIFxuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxVGV4dGFyZWFFcnJvci5odG1sJ1xuICByZXBsYWNlIDogdHJ1ZVxuICBcbiAgc2NvcGU6IHtcbiAgXG4gICAgdGV4dGFyZWFlcnJvcnBsYWNlaG9sZGVyOiAnQHBsYWNlaG9sZGVyJ1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMVRleHRhcmVhV2l0aEJ1dHRvbnMuaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50L3MxVGV4dGFyZWFXaXRoQnV0dG9uc2FuZEVycm9yLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMVRvYXN0Tm90aWZpY2F0aW9uLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIFxuICBzY29wZToge1xuICBcbiAgXG4gIH1cbiAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgLT5cbiAgICBpc1RvdWNoRGV2aWNlID0gLT4gXCJvbnRvdWNoc3RhcnRcIiBvZiB3aW5kb3cgb3IgXCJvbm1zZ2VzdHVyZWNoYW5nZVwiIG9mIHdpbmRvd1xuXG4gICAgIiwibW9kdWxlLmV4cG9ydHMgPSAtPlxuICByZXN0cmljdCA6ICdFJyAjZWxlbWVudFxuICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudC9zMVZpZXdQaWNrZXIuaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgXG4gIHNjb3BlOiB7XG4gIFxuICBcbiAgfVxuICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSAtPlxuICAgIGlzVG91Y2hEZXZpY2UgPSAtPiBcIm9udG91Y2hzdGFydFwiIG9mIHdpbmRvdyBvciBcIm9ubXNnZXN0dXJlY2hhbmdlXCIgb2Ygd2luZG93XG5cbiAgICAiLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnc2dFeGFtcGxlQ29udGFpbmVyLmh0bWwnXG4gIHRyYW5zY2x1ZGU6IHRydWVcbiAgcmVwbGFjZSA6IHRydWVcbiAgbGluazogKHNjb3BlLCBlbGVtZW50LCBhdHRycykgLT5cbiIsIm1vZHVsZS5leHBvcnRzID0gLT5cbiAgcmVzdHJpY3QgOiAnRScgI2VsZW1lbnRcbiAgdGVtcGxhdGVVcmw6ICdzZ0V4YW1wbGVDb250YWluZXJEZWZhdWx0SGVhZGVyLmh0bWwnXG4gIHRyYW5zY2x1ZGU6IHRydWVcbiAgcmVwbGFjZSA6IHRydWVcbiAgbGluazogKHNjb3BlLCBlbGVtZW50LCBhdHRycykgLT5cbiIsIm1vZHVsZS5leHBvcnRzID0gLT5cbiAgcmVzdHJpY3QgOiAnRScgI2VsZW1lbnRcbiAgdGVtcGxhdGVVcmw6ICdzZ0V4YW1wbGVzLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIGxpbms6IChzY29wZSwgZWxlbWVudCwgYXR0cnMpIC0+XG4iLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnc2dOYXYuaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgbGluazogKHNjb3BlLCBlbGVtZW50LCBhdHRycykgLT5cbiIsIm1vZHVsZS5leHBvcnRzID0gLT5cbiAgcmVzdHJpY3QgOiAnRScgI2VsZW1lbnRcbiAgdGVtcGxhdGVVcmw6ICdzZ1Byb2R1Y3RTdHlsZWd1aWRlLmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIGxpbms6IChzY29wZSwgZWxlbWVudCwgYXR0cnMpIC0+XG4iLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnc2dTYW5kYm94Lmh0bWwnXG4gIHJlcGxhY2UgOiB0cnVlXG4gIGxpbms6IChzY29wZSwgZWxlbWVudCwgYXR0cnMpIC0+XG4iLCJtb2R1bGUuZXhwb3J0cyA9IC0+XG4gIHJlc3RyaWN0IDogJ0UnICNlbGVtZW50XG4gIHRlbXBsYXRlVXJsOiAnc2dTdWJuYXYuaHRtbCdcbiAgcmVwbGFjZSA6IHRydWVcbiAgbGluazogKHNjb3BlLCBlbGVtZW50LCBhdHRycykgLT5cbiIsImFuZ3VsYXIubW9kdWxlICdhcHAuZGlyZWN0aXZlcycsIFsnYXBwLmRpcmVjdGl2ZXMnXVxuXG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFBbmNob3JEYXJrJywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxQW5jaG9yRGFyay5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFBbmNob3JMaWdodERlZmF1bHQnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFBbmNob3JMaWdodERlZmF1bHQuY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxQW5jaG9yTGlnaHRMYWJlbG9uQm90dG9tJywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxQW5jaG9yTGlnaHRMYWJlbG9uQm90dG9tLmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMUFuY2hvckxpZ2h0Tm9CYWNrZ3JvdW5kJywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxQW5jaG9yTGlnaHROb0JhY2tncm91bmQuY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxQXZhdGFyRGVmYXVsdCcsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMUF2YXRhckRlZmF1bHQuY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxQXZhdGFyQXR0ZW5kaW5nJywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxQXZhdGFyQXR0ZW5kaW5nLmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMUJ1dHRvblByaW1hcnlEZWZhdWx0JywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxQnV0dG9uUHJpbWFyeURlZmF1bHQuY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxQnV0dG9uUHJpbWFyeURpc2FibGVkJywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxQnV0dG9uUHJpbWFyeURpc2FibGVkLmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMUJ1dHRvblNlY29uZGFyeURlZmF1bHQnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFCdXR0b25TZWNvbmRhcnlEZWZhdWx0LmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMUJ1dHRvblNlY29uZGFyeURpc2FibGVkJywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxQnV0dG9uU2Vjb25kYXJ5RGlzYWJsZWQuY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxQnV0dG9uR3JvdXBzJywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxQnV0dG9uR3JvdXBzLmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMUJ1dHRvblRlcnRpYXJ5JywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxQnV0dG9uVGVydGlhcnkuY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxQ2FsZW5kYXInLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFDYWxlbmRhci5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFDYXJkUmVsYXRlZExpc3QnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFDYXJkUmVsYXRlZExpc3QuY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxQ2FyZEFjY291bnQnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFDYXJkQWNjb3VudC5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFDYXJkQ2FzZScsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMUNhcmRDYXNlLmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMUNhcmRDaGF0dGVyJywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxQ2FyZENoYXR0ZXIuY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxQ2FyZENvbnRhY3QnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFDYXJkQ29udGFjdC5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFDYXJkRmlsZScsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMUNhcmRGaWxlLmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMUNhcmRPcHBvcnR1bml0eScsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMUNhcmRPcHBvcnR1bml0eS5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFDYXJkQ3VzdG9tT2JqZWN0JywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxQ2FyZEN1c3RvbU9iamVjdC5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFDYXJkVGFzaycsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMUNhcmRUYXNrLmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMUNhcmRFdmVudCcsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMUNhcmRFdmVudC5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFDYXJkTGlzdGhlYWRlcicsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMUNhcmRMaXN0aGVhZGVyLmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMUNoZWNrYm94JywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxQ2hlY2tib3guY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxQ2hlY2tib3hEaXNhYmxlZCcsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMUNoZWNrYm94RGlzYWJsZWQuY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxQ29tbWVudFB1Ymxpc2hlckRlZmF1bHQnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFDb21tZW50UHVibGlzaGVyRGVmYXVsdC5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFDb21tZW50UHVibGlzaGVyV2l0aFdhcm5pbmcnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFDb21tZW50UHVibGlzaGVyV2l0aFdhcm5pbmcuY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxRHJvcERvd25EZWZhdWx0JywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxRHJvcERvd25EZWZhdWx0LmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMURyb3BEb3duV2l0aFBob3RvJywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxRHJvcERvd25XaXRoUGhvdG8uY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxRmVlZENvbW1lbnREZWZhdWx0JywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxRmVlZENvbW1lbnREZWZhdWx0LmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMUZlZWRDb21tZW50V2l0aFBheWxvYWQnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFGZWVkQ29tbWVudFdpdGhQYXlsb2FkLmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMUZlZWRDb21tZW50V2l0aE1vZGlmaWVyJywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxRmVlZENvbW1lbnRXaXRoTW9kaWZpZXIuY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxRmVlZEl0ZW1EZWZhdWx0JywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxRmVlZEl0ZW1EZWZhdWx0LmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMUZlZWRJdGVtV2l0aFBheWxvYWQnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFGZWVkSXRlbVdpdGhQYXlsb2FkLmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMUZlZWRJdGVtT25EcmlsbEluJywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxRmVlZEl0ZW1PbkRyaWxsSW4uY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxRmVlZFBheWxvYWRQcmltYXJ5JywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxRmVlZFBheWxvYWRQcmltYXJ5LmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMUZlZWRQYXlsb2FkU2Vjb25kYXJ5JywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxRmVlZFBheWxvYWRTZWNvbmRhcnkuY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxRmVlZFBheWxvYWRDb21wb3VuZCcsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMUZlZWRQYXlsb2FkQ29tcG91bmQuY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxRmlsZVByZXZpZXcnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFGaWxlUHJldmlldy5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFGb290ZXJTZWNvbmRhcnlGaWxlUHJldmlldycsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMUZvb3RlclNlY29uZGFyeUZpbGVQcmV2aWV3LmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMUZvb3RlclNlY29uZGFyeUNoaWxkQnJvd3NlcicsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMUZvb3RlclNlY29uZGFyeUNoaWxkQnJvd3Nlci5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFIZWFkZXJQcmltYXJ5RGVmYXVsdCcsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMUhlYWRlclByaW1hcnlEZWZhdWx0LmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMUhlYWRlclByaW1hcnlTZWFyY2gnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFIZWFkZXJQcmltYXJ5U2VhcmNoLmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMUhlYWRlclByaW1hcnlNb2RhbCcsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMUhlYWRlclByaW1hcnlNb2RhbC5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFIZWFkZXJTZWNvbmRhcnlGaWxlUHJldmlldycsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMUhlYWRlclNlY29uZGFyeUZpbGVQcmV2aWV3LmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMUhlYWRlclNlY29uZGFyeUNoaWxkQnJvd3NlcicsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMUhlYWRlclNlY29uZGFyeUNoaWxkQnJvd3Nlci5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFJbmRpY2F0b3JEb3RzTGlnaHRCYWNrZ3JvdW5kJywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxSW5kaWNhdG9yRG90c0xpZ2h0QmFja2dyb3VuZC5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFJbmRpY2F0b3JEb3RzRGFya0JhY2tncm91bmQnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFJbmRpY2F0b3JEb3RzRGFya0JhY2tncm91bmQuY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxTGlzdFNpbmdsZUxpbmVvZlRleHQnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFMaXN0U2luZ2xlTGluZW9mVGV4dC5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFMaXN0V2l0aExhYmVscycsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMUxpc3RXaXRoTGFiZWxzLmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMUxpc3RGbGFnT2JqZWN0cycsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMUxpc3RGbGFnT2JqZWN0cy5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFMaXN0SXRlbURlZmF1bHQnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFMaXN0SXRlbURlZmF1bHQuY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxTGlzdEl0ZW1XaXRoSWNvbicsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMUxpc3RJdGVtV2l0aEljb24uY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxTGlzdEl0ZW1XaXRoTGFiZWwnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFMaXN0SXRlbVdpdGhMYWJlbC5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFMaXN0SXRlbUZsYWdPYmplY3RzJywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxTGlzdEl0ZW1GbGFnT2JqZWN0cy5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFMaXN0SXRlbUNvbnRhaW5lcicsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMUxpc3RJdGVtQ29udGFpbmVyLmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMUxpc3RJdGVtVGFzaycsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMUxpc3RJdGVtVGFzay5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFMaXN0SXRlbUV2ZW50JywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxTGlzdEl0ZW1FdmVudC5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFMaXN0SXRlbUFjY291bnQnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFMaXN0SXRlbUFjY291bnQuY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxTGlzdEl0ZW1DYXNlJywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxTGlzdEl0ZW1DYXNlLmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMUxpc3RJdGVtQ29udGFjdCcsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMUxpc3RJdGVtQ29udGFjdC5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFMaXN0SXRlbUZpbGUnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFMaXN0SXRlbUZpbGUuY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxTGlzdEl0ZW1PcHBvcnR1bml0eScsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMUxpc3RJdGVtT3Bwb3J0dW5pdHkuY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxTGlzdEl0ZW1DdXN0b21PYmplY3QnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFMaXN0SXRlbUN1c3RvbU9iamVjdC5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFMb29rdXBEZWZhdWx0JywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxTG9va3VwRGVmYXVsdC5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFMb29rdXBFcnJvcicsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMUxvb2t1cEVycm9yLmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMUxvb2t1cFdpdGhMYWJlbCcsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMUxvb2t1cFdpdGhMYWJlbC5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFNRFBCdXR0b24nLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFNRFBCdXR0b24uY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxTURQTGF1bmNoZXJEZWZhdWx0JywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxTURQTGF1bmNoZXJEZWZhdWx0LmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMU1EUExhdW5jaGVyT3ZlcmZsb3cnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFNRFBMYXVuY2hlck92ZXJmbG93LmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMU1vZGFsRGlhbG9nQnV0dG9uc09ubHknLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFNb2RhbERpYWxvZ0J1dHRvbnNPbmx5LmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMU1vZGFsRGlhbG9nV2l0aHRleHQnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFNb2RhbERpYWxvZ1dpdGh0ZXh0LmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMU1vZGFsRGlhbG9nV2l0aGljb24nLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFNb2RhbERpYWxvZ1dpdGhpY29uLmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMU1vZGFsRGlhbG9nV2l0aGNoZWNrYm94JywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxTW9kYWxEaWFsb2dXaXRoY2hlY2tib3guY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxTW9kYWxTb3J0RmlsdGVyT25lc2VjdGlvbicsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMU1vZGFsU29ydEZpbHRlck9uZXNlY3Rpb24uY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxTW9kYWxTb3J0RmlsdGVyTXVsdGlzZWN0aW9uJywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxTW9kYWxTb3J0RmlsdGVyTXVsdGlzZWN0aW9uLmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMVNvcnRGaWx0ZXInLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFTb3J0RmlsdGVyLmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMVBhZ2VMZXZlbEVycm9ycycsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMVBhZ2VMZXZlbEVycm9ycy5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFQZXJjZW50YWdlSW5kaWNhdG9yQmFyJywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxUGVyY2VudGFnZUluZGljYXRvckJhci5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFQaWNrbGlzdERlZmF1bHQnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFQaWNrbGlzdERlZmF1bHQuY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxUGlja2xpc3RFcnJvcicsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMVBpY2tsaXN0RXJyb3IuY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxUGlja2xpc3RMYWJlbE91dHNpZGUnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFQaWNrbGlzdExhYmVsT3V0c2lkZS5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFQcm9ncmVzc1NwaW5uZXJEZWZhdWx0JywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxUHJvZ3Jlc3NTcGlubmVyRGVmYXVsdC5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFQcm9ncmVzc1NwaW5uZXJNb2RhbCcsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMVByb2dyZXNzU3Bpbm5lck1vZGFsLmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMVJhZGlvQnV0dG9uJywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxUmFkaW9CdXR0b24uY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxU2VhcmNoV2lkZ2V0RGVmYXVsdCcsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMVNlYXJjaFdpZGdldERlZmF1bHQuY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxU2VhcmNoV2lkZ2V0V2l0aHNvcnRmaWx0ZXInLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFTZWFyY2hXaWRnZXRXaXRoc29ydGZpbHRlci5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFTdGFnZWROYXZpZ2F0aW9uU3RhZ2VMZWZ0JywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxU3RhZ2VkTmF2aWdhdGlvblN0YWdlTGVmdC5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFTdGFnZWROYXZpZ2F0aW9uTm90aWZpY2F0aW9ucycsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMVN0YWdlZE5hdmlnYXRpb25Ob3RpZmljYXRpb25zLmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMVRleHRhcmVhRGVmYXVsdCcsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMVRleHRhcmVhRGVmYXVsdC5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFUZXh0YXJlYUVycm9yJywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxVGV4dGFyZWFFcnJvci5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFUZXh0YXJlYVdpdGhCdXR0b25zJywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxVGV4dGFyZWFXaXRoQnV0dG9ucy5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFUZXh0YXJlYVdpdGhCdXR0b25zYW5kRXJyb3InLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFUZXh0YXJlYVdpdGhCdXR0b25zYW5kRXJyb3IuY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxVGV4dElucHV0RGVmYXVsdCcsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMVRleHRJbnB1dERlZmF1bHQuY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxVGV4dElucHV0RGlzYWJsZWQnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFUZXh0SW5wdXREaXNhYmxlZC5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFUZXh0SW5wdXRFcnJvcicsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMVRleHRJbnB1dEVycm9yLmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMVRleHRJbnB1dFdpdGhMYWJlbCcsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMVRleHRJbnB1dFdpdGhMYWJlbC5jb2ZmZWUnKSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnczFUZXh0SW5wdXRTZWFyY2hJbnB1dCcsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMVRleHRJbnB1dFNlYXJjaElucHV0LmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMVRleHRJbnB1dFdpdGhGaXhlZFRleHQnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9jb21wb25lbnQvczFUZXh0SW5wdXRXaXRoRml4ZWRUZXh0LmNvZmZlZScpKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdzMVRvYXN0Tm90aWZpY2F0aW9uJywgcmVxdWlyZSgnLi9kaXJlY3RpdmUvY29tcG9uZW50L3MxVG9hc3ROb3RpZmljYXRpb24uY29mZmVlJykpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3MxVmlld1BpY2tlcicsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL2NvbXBvbmVudC9zMVZpZXdQaWNrZXIuY29mZmVlJykpO1xuXG4iLCJyZXF1aXJlKCcuL2RpcmVjdGl2ZXMuY29mZmVlJyk7XG5cbm15QXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFsnYXBwLmRpcmVjdGl2ZXMnXSlcblxubXlBcHAuY29udHJvbGxlciAnYXBwQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29udHJvbGxlci9hcHBDb250cm9sbGVyLmNvZmZlZScpXG5teUFwcC5jb250cm9sbGVyICdleGFtcGxlc0NvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbnRyb2xsZXIvZXhhbXBsZXNDb250cm9sbGVyLmNvZmZlZScpXG5cbm15QXBwLmRpcmVjdGl2ZSAnc2dOYXYnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9zZ05hdi5jb2ZmZWUnKVxubXlBcHAuZGlyZWN0aXZlICdzZ1N1Ym5hdicsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL3NnU3VibmF2LmNvZmZlZScpXG5teUFwcC5kaXJlY3RpdmUgJ3NnUHJvZHVjdFN0eWxlZ3VpZGUnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9zZ1Byb2R1Y3RTdHlsZWd1aWRlLmNvZmZlZScpXG5teUFwcC5kaXJlY3RpdmUgJ3NnRXhhbXBsZXMnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9zZ0V4YW1wbGVzLmNvZmZlZScpXG5teUFwcC5kaXJlY3RpdmUgJ3NnU2FuZGJveCcsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL3NnU2FuZGJveC5jb2ZmZWUnKVxubXlBcHAuZGlyZWN0aXZlICdzZ0V4YW1wbGVDb250YWluZXInLCByZXF1aXJlKCcuL2RpcmVjdGl2ZS9zZ0V4YW1wbGVDb250YWluZXIuY29mZmVlJylcbm15QXBwLmRpcmVjdGl2ZSAnc2dFeGFtcGxlQ29udGFpbmVyRGVmYXVsdEhlYWRlcicsIHJlcXVpcmUoJy4vZGlyZWN0aXZlL3NnRXhhbXBsZUNvbnRhaW5lckRlZmF1bHRIZWFkZXIuY29mZmVlJylcblxubXlBcHAuc2VydmljZSgnbG9jYWx5dGljc1NlcnZpY2UnLCByZXF1aXJlKCcuL3NlcnZpY2UvbG9jYWx5dGljc1NlcnZpY2UuY29mZmVlJykpOyIsIm1vZHVsZS5leHBvcnRzID0gLT5cbiAgaW5pdDogKGFwaUtleSkgLT5cbiAgICBjb25zb2xlLmxvZyBcImluaXQgbG9jYXl0aWNzIFwiICsgYXBpS2V5XG4gICAgQGxvY2FseXRpY3NTZXNzaW9uID0gTG9jYWx5dGljc1Nlc3Npb24oYXBpS2V5LCB7bG9nZ2VyOnRydWV9KVxuICAgIEBsb2NhbHl0aWNzU2Vzc2lvbi5vcGVuKClcbiAgICBAbG9jYWx5dGljc1Nlc3Npb24udXBsb2FkKClcblxuICB0YWdFdmVudDogKGV2ZW50TmFtZSwgYXR0cmlidXRlcykgLT5cbiAgICBpZiBhdHRyaWJ1dGVzIGlzIHVuZGVmaW5lZFxuICAgICAgY29uc29sZS5sb2cgXCJ0YWdFdmVudCBcIiArIGV2ZW50TmFtZVxuICAgICAgQGxvY2FseXRpY3NTZXNzaW9uLnRhZ0V2ZW50IGV2ZW50TmFtZVxuICAgIGVsc2VcbiAgICAgIGNvbnNvbGUubG9nIFwidGFnRXZlbnQgXCIgKyBldmVudE5hbWUgKyBcIiAoXCIgKyBKU09OLnN0cmluZ2lmeShhdHRyaWJ1dGVzKSArIFwiKVwiXG4gICAgICBAbG9jYWx5dGljc1Nlc3Npb24udGFnRXZlbnQgZXZlbnROYW1lLCBhdHRyaWJ1dGVzXG5cbiAgdGFnU2NyZWVuOiAoc2NyZWVuTmFtZSkgLT5cbiAgICBjb25zb2xlLmxvZyBcInRhZ1NjcmVlbiBcIiArIHNjcmVlbk5hbWVcbiAgICBAbG9jYWx5dGljc1Nlc3Npb24udGFnU2NyZWVuIHNjcmVlbk5hbWUiXX0=
;